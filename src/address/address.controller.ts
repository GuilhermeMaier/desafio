import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import {
	UpdateAddressBody,
	AddressParam,
	NewAddressBody,
} from 'src/utils/dto/address.dto';
import { AddressModel } from './address.model';
import { AddressService } from './address.service';

@Controller('/address')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@Get(':id')
	async fetchOne(@Param() params: AddressParam): Promise<AddressModel> {
		return this.addressService.fetchOne(params);
	}

	@Get('/byZipCode/:zipCode')
	async fetchOneByZipCodeAndHouseNumber(
		@Param() params: AddressParam,
	): Promise<AddressModel> {
		return this.addressService.fetchOneByZipCodeAndHouseNumber(params);
	}

	@Get()
	async fetchAll(): Promise<AddressModel[]> {
		return this.addressService.fetchAll();
	}

	@Post()
	async createAddress(@Body() body: NewAddressBody): Promise<AddressModel> {
		return this.addressService.createAddress(body);
	}

	@Put(':id')
	async updateAddress(
		@Param() params: AddressParam,
		@Body() body: UpdateAddressBody,
	): Promise<AddressModel> {
		return this.addressService.updateAddress(params, body);
	}

	@Delete(':id')
	async deleteAddress(@Param() params: AddressParam): Promise<string> {
		return this.addressService.deleteAddress(params);
	}
}
