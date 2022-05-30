import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { WinstonModule } from 'nest-winston';
import * as path from 'path';
import { CustomExceptionsFilter } from './CustomExceptionFilter';
import mysqlconfig from './config/mysql.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoModule } from './modules/settings/contacto/contacto.module';
import * as winston from 'winston';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRoot(mysqlconfig),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${process.env.NODE_ENV}.env`,
		}),
		MailModule,
		WinstonModule.forRoot({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json()
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					dirname: path.join(__dirname, './../log/'),
					filename: 'error.log',
					level: 'error',
				}),
			],
		}),
		ContactoModule,
	],

	providers: [{ provide: APP_FILTER, useClass: CustomExceptionsFilter }],
})
export class AppModule {}
