import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
  exports: [AdminsService],
  imports: [ConfigModule],
})
export class AdminsModule {}
