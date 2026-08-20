import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/client';

import { Response } from 'express';

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: PrismaClientKnownRequestError | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof PrismaClientValidationError) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      console.log('HERE');

      response.status(status).json({
        statusCode: status,
        message: exception.message,
        error: 'Internal Server Error',
      });
      return;
    }

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;

        response.status(status).json({
          statusCode: status,
          message: 'Unique constraint violation.',
          error: 'Conflict',
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;

        response.status(status).json({
          statusCode: status,
          message:
            'Cannot perform the operation, because it depends on a record that was not found.',
          error: 'Not Found',
        });
        break;
      }
      default: {
        super.catch(exception, host);
        break;
      }
    }
  }
}
