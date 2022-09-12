import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	UpdateAddressBody,
	AddressParam,
	NewAddressBody,
} from 'src/utils/dto/address.dto';
import { Repository } from 'typeorm';
import { AddressModel } from './address.model';

@Injectable()
export class AddressService {
	constructor(
		@InjectRepository(AddressModel)
		private addressRepository: Repository<AddressModel>,
	) {}

	public async fetchOne(params: AddressParam): Promise<AddressModel> {
		const response = await this.addressRepository.findOne({
			where: { id: params.id },
		});
		if (!response)
			throw new NotFoundException(
				`No address found with the code ${params.id}.`,
			);
		return response;
	}

	public async fetchOneByZipCodeAndHouseNumber(
		params: AddressParam,
	): Promise<AddressModel> {
		const response = await this.addressRepository.findOne({
			where: { zipCode: params.zipCode, houseNumber: params.houseNumber },
		});
		if (!response)
			throw new NotFoundException(
				`No address found with the zipCode ${params.zipCode}.`,
			);
		return response;
	}

	public async fetchAll(): Promise<AddressModel[]> {
		return await this.addressRepository.find();
	}

	public async createAddress(body: NewAddressBody): Promise<AddressModel> {
		return await this.addressRepository.save(body);
	}

	public async updateAddress(
		params: AddressParam,
		body: UpdateAddressBody,
	): Promise<AddressModel> {
		if (!(await this.addressRepository.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No address found with the code ${params.id}.`,
			);
		const whereClause = { id: params.id };
		await this.addressRepository.update(whereClause, body);
		return await this.addressRepository.findOne({ where: { id: params.id } });
	}

	public async deleteAddress(params: AddressParam): Promise<string> {
		if (!(await this.addressRepository.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No address found with the code ${params.id}.`,
			);
		const whereClause = { id: params.id };
		await this.addressRepository.delete(whereClause);
		return 'The address was successfully deleted';
	}
}
