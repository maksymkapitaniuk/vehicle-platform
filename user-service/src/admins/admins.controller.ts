import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AdminsService } from './admins.service';
import { LoginAdminDto, RegisterAdminDto } from './admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  register(@Body() dto: RegisterAdminDto) {
    return this.adminsService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async login(
    @Body() dto: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.adminsService.login(dto);
    response.cookie('admin_session', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.ENV !== 'LOCAL',
      maxAge: result.expiresIn * 1000,
    });
    return result;
  }

  @Post('logout')
  @HttpCode(204)
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = this.getToken(request);
    if (token) {
      await this.adminsService.logout(token);
    }
    response.clearCookie('admin_session');
  }

  private getToken(request: Request) {
    const authorization = request.headers.authorization;
    if (authorization?.startsWith('Bearer ')) {
      return authorization.slice('Bearer '.length).trim();
    }
    return request.headers.cookie
      ?.split(';')
      .find((cookie) => cookie.trim().startsWith('admin_session='))
      ?.split('=')[1];
  }
}
