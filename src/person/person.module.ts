import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModel } from 'src/address/address.model';
import { AddressService } from 'src/address/address.service';
import { PersonController } from './person.controller';
import { PersonModel } from './person.model';
import { PersonService } from './person.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([PersonModel]),
		TypeOrmModule.forFeature([AddressModel]),
	],
	providers: [PersonService, AddressService],
	controllers: [PersonController],
	exports: [PersonService],
})
export class PersonModule {}
