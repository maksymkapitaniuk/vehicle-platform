import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma.service';
import { LoginAdminDto, RegisterAdminDto } from './admin.dto';

export type AuthenticatedAdmin = {
  id: number;
  email: string;
};

const SESSION_TTL_SECONDS = 60 * 60 * 8;
const SESSION_LOOKUP_TIMEOUT_MS = 2000;

@Injectable()
export class AdminsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterAdminDto) {
    const saltRounds = this.getSaltRounds();
    const hash = await bcrypt.hash(dto.password, saltRounds);

    try {
      return await this.prisma.admin.create({
        data: { email: dto.email, password: hash },
        omit: { password: true },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Admin with such email already exists.');
      }

      throw error;
    }
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (!admin || !(await bcrypt.compare(dto.password, admin.password))) {
      throw new UnauthorizedException('Invalid admin credentials.');
    }

    const token = randomUUID();
    const session: AuthenticatedAdmin = { id: admin.id, email: admin.email };
    try {
      await Promise.race([
        this.cache.set(
          this.sessionKey(token),
          session,
          SESSION_TTL_SECONDS * 1000,
        ),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error('Redis session write timed out.')),
            SESSION_LOOKUP_TIMEOUT_MS,
          ),
        ),
      ]);
    } catch {
      throw new ServiceUnavailableException(
        'Authentication service is temporarily unavailable.',
      );
    }

    return { token, expiresIn: SESSION_TTL_SECONDS, admin: session };
  }

  async getSession(token: string): Promise<AuthenticatedAdmin | null> {
    try {
      return (
        (await Promise.race([
          this.cache.get<AuthenticatedAdmin>(this.sessionKey(token)),
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error('Redis session lookup timed out.')),
              SESSION_LOOKUP_TIMEOUT_MS,
            ),
          ),
        ])) ?? null
      );
    } catch {
      throw new ServiceUnavailableException(
        'Authentication service is temporarily unavailable.',
      );
    }
  }

  async logout(token: string) {
    await this.cache.del(this.sessionKey(token));
  }

  private sessionKey(token: string) {
    return `admin:session:${token}`;
  }

  private getSaltRounds() {
    const saltRounds = Number(
      this.configService.get<string>('HASH_SALT_ROUNDS'),
    );

    if (!saltRounds) {
      throw new InternalServerErrorException(
        'Cannot hash password: undefined HASH_SALT_ROUNDS.',
      );
    }

    return saltRounds;
  }
}
