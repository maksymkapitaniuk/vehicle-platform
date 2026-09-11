import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const saltRounds = Number(process.env.HASH_SALT_ROUNDS);

    if (!saltRounds) {
      throw new InternalServerErrorException(
        'Cannot hash password: undefined HASH_SALT_ROUNDS.',
      );
    }

    const hash = await bcrypt.hash(dto.password, saltRounds);

    try {
      return await this.prisma.user.create({
        data: { ...dto, password: hash },
        omit: {
          password: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('User with such email already exists.');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findById(id: number) {
    const res = await this.prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });

    if (res === null) {
      throw new NotFoundException('User with such id was not found.');
    }

    return res;
  }

  async updateById(id: number, dto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: dto,
        omit: { password: true },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User with such id was not found.');
      }

      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
        omit: { password: true },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User with such id was not found.');
      }

      throw error;
    }
  }
}
