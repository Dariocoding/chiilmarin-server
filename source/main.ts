import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as compression from 'compression';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bodyParser: true,
		cors: true,
	});
	app.use(compression());
	app.useGlobalPipes(new ValidationPipe());
	app.useStaticAssets(join(__dirname, '..', 'public'), {
		index: false,
	});

	app.enableCors({
		origin: '*',
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
	});

	await app.listen(process.env.PORT || 4000);
}
bootstrap();
