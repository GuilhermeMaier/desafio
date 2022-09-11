import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { PersonModule } from './person/person.module';

@Module({
	imports: [
		PersonModule,
		AddressModule,
		TypeOrmModule.forRoot({
			database: './db.sql',
			type: 'sqlite',
			synchronize: true,
			entities: ['dist/**/*.model.js'],
		}),
	],
})
export class AppModule {}
