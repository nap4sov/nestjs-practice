import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ContextType,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    switch (host.getType() as ContextType | 'graphql') {
      case 'graphql':
        return exception;
      default:
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const httpStatus =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.message || 'Internal server error';

        const responseBody = {
          statusCode: httpStatus,
          message,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest().url,
          method: ctx.getRequest().method,
        };

        response.status(httpStatus).json(responseBody);
    }
  }
}
