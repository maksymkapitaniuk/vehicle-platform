import { AxiosError } from 'axios';
import { toPossessive, type RequestTarget } from './requestTarget';

export interface AppErrorOptions extends ErrorOptions {
  errorCode?: string | undefined;
}

export class AppError extends Error {
  name = 'AppError';
  errorCode: string;

  constructor(message?: string | undefined, options?: AppErrorOptions) {
    super(message, options);

    this.errorCode = options?.errorCode ?? 'unknown_error';
  }
}

export interface ValidationErrorOptions extends AppErrorOptions {
  errors?: Record<string, string | string[]>[] | undefined;
}

export class ValidationError extends AppError {
  name = 'ValidationError';
  errors?: Record<string, string | string[]>[] | undefined;

  constructor(message?: string | undefined, options?: ValidationErrorOptions) {
    super(message, options);

    this.errors = options?.errors;
    if (!options?.errorCode) {
      this.errorCode = 'data_validation_error';
    }
  }
}

export class NotFoundError extends AppError {
  name = 'NotFoundError';

  constructor(message?: string | undefined, options?: AppErrorOptions) {
    super(message, options);

    if (!options?.errorCode) {
      this.errorCode = 'data_not_found_error';
    }
  }
}

export interface HttpErrorOptions {
  requestTarget?: RequestTarget | undefined;
}

export function processHttpError(
  err: unknown,
  options: HttpErrorOptions = {},
): AppError {
  if (err instanceof Error && err.name === 'ZodError') {
    const errors = JSON.parse(err.message).map(
      (e: Record<string, string | string[]>) =>
        e.code === 'unrecognized_keys'
          ? {
              keys: e.keys,
              message: e.message,
            }
          : {
              field: Array.isArray(e.path) ? e.path.join('.') : e.path,
              message: e.message,
            },
    );

    return new ValidationError(
      `Oops... We received invalid ${options.requestTarget ? toPossessive(options.requestTarget) + ' ' : ''}data from server.`,
      {
        cause: err,
        errorCode: 'response_validation_error',
        errors,
      },
    );
  }

  if (err instanceof AxiosError && err.code === 'ERR_NETWORK') {
    return new AppError(
      'Oops... We cannot send a request to the server due to network issues.',
      {
        cause: err,
        errorCode: 'network_error',
      },
    );
  }

  if (err instanceof AxiosError && err.response) {
    let message = err.response.data.message ?? 'Unknown axios error';
    const errorCode = err.response.data.errorCode;

    if (err.status === 404) {
      message =
        err.response.data.message ??
        `No ${options.requestTarget ?? 'data'} found`;

      return new NotFoundError(message, { cause: err, errorCode });
    }

    if (err.status === 400 || err.status === 422) {
      message = err.response.data.message ?? 'Invalid request data';
      let errors: Record<string, string | string[]>[] | undefined;

      if (
        options?.requestTarget === 'user' ||
        options?.requestTarget === 'users'
      ) {
        message = err.response.data.message?.join?.(', ');
        errors = err.response.data.message.map((entry: string) => ({
          message: entry,
        }));
      } else {
        errors = err.response.data.errors;
      }

      return new ValidationError(message, { cause: err, errorCode, errors });
    }

    return new AppError(message, { cause: err, errorCode });
  }

  return new AppError(
    `Oops... We have encountered an unknown ${options.requestTarget ? toPossessive(options.requestTarget) + ' ' : ''}data error.`,
    {
      cause: err,
    },
  );
}
