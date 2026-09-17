import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AdminsService, AuthenticatedAdmin } from './admins.service';

type AuthenticatedRequest = Request & { admin?: AuthenticatedAdmin };

@Injectable()
export class AdminsGuard implements CanActivate {
  constructor(private readonly adminsService: AdminsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.getToken(request);

    if (!token) {
      throw new UnauthorizedException('Admin authentication is required.');
    }

    const admin = await this.adminsService.getSession(token);

    if (!admin) {
      throw new UnauthorizedException('Admin session is invalid or expired.');
    }

    request.admin = admin;
    return true;
  }

  private getToken(request: Request) {
    const authorization = request.headers.authorization;

    if (authorization?.startsWith('Bearer ')) {
      return authorization.slice('Bearer '.length).trim();
    }

    const cookies = request.headers.cookie?.split(';') ?? [];
    const sessionCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('admin_session='),
    );

    return sessionCookie?.split('=')[1];
  }
}
