import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message || 'Internal server error';
    Logger.debug(exception.getStatus());
    const responseBody = {
      statusCode: httpStatus,
      message,
      timestamp: new Date().toISOString(),
    };

    return exception;
  }
}
