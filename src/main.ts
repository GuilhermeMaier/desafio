import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/interceptors/responseInterceptor.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	await app.listen(8080);
}
bootstrap();
