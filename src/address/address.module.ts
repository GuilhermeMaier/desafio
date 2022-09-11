import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressModel } from './address.model';
import { AddressService } from './address.service';

@Module({
	imports: [TypeOrmModule.forFeature([AddressModel])],
	providers: [AddressService],
	controllers: [AddressController],
	exports: [AddressService],
})
export class AddressModule {}
