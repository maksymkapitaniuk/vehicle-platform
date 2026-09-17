import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { AdminsModule } from '../admins/admins.module';
import { AdminsGuard } from '../admins/admins.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AdminsGuard],
  imports: [
    ConfigModule,
    AdminsModule,
    ClientsModule.registerAsync([
      {
        name: 'EVENTS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>(
                'RABBITMQ_CONNECTION_STRING',
                'amqp://localhost',
              ),
            ],
            queue: configService.get<string>(
              'RABBITMQ_QUEUE_NAME',
              'events_queue',
            ),
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class UsersModule {}
