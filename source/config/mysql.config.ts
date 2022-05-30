import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Contacto } from 'source/modules/settings/contacto/entities/contacto.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const pathEnv = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${pathEnv}.env` });

const exportsData: TypeOrmModuleOptions = {
	namingStrategy: new SnakeNamingStrategy(),
	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(<string>process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [Contacto],
	synchronize: false,
	migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: './source/migrations',
	},
	migrationsRun: pathEnv === 'development' ? true : false,

	logging: pathEnv === 'development' ? true : false,
	autoLoadEntities: true,
};

export default exportsData;
