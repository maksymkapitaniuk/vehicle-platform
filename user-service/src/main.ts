import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './filters/prisma-client.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('ENV') ?? 'LOCAL';
  const clientUrl =
    configService.get<string>('CLIENT_URL') ?? 'http://localhost:5173';
  const port = configService.get<number>('PORT') ?? 3000;

  if (environment === 'LOCAL') {
    app.enableCors({ origin: clientUrl, credentials: true });
  }

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(port);
}
bootstrap();
