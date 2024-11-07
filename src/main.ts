import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]): any => {
        const firstErrorMessage =
          errors[0].constraints[Object.keys(errors[0].constraints)[0]];

        return new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: firstErrorMessage,
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
}
bootstrap();
