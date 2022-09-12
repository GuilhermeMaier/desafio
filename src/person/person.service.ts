import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressModel } from 'src/address/address.model';
import { AddressService } from 'src/address/address.service';
import {
	NewPersonBody,
	UpdatePersonBody,
	PersonParam,
} from 'src/utils/dto/person.dto';
import { Repository } from 'typeorm';
import { PersonModel } from './person.model';

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(PersonModel)
		private personRepository: Repository<PersonModel>,
		private addressService: AddressService,
	) {}

	public async fetchOne(params: PersonParam): Promise<PersonModel> {
		const response = await this.personRepository.findOne({
			where: { id: params.id },
		});
		if (!response)
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		return response;
	}

	public async fetchAll(): Promise<PersonModel[]> {
		return await this.personRepository.find();
	}

	public async createPerson(body: NewPersonBody): Promise<PersonModel> {
		const addedAddresses = [];
		for (const currentAddress of body.addresses)
			addedAddresses.push(
				(await this.addressService.createAddress(currentAddress)).id,
			);
		return await this.personRepository.save({
			...body,
			...{
				addresses: addedAddresses.join(','),
			},
		});
	}

	public async updatePerson(
		params: PersonParam,
		body: UpdatePersonBody,
	): Promise<PersonModel> {
		const currentPersonData = await this.personRepository.findOne({
			where: { id: params.id },
		});
		if (!currentPersonData)
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		if (body.addresses) {
			for (const currentAddressId of currentPersonData.addresses
				.split(',')
				.filter(currentAddressId =>
					body.addresses.find(
						currentBodyAddress =>
							currentBodyAddress.id === Number(currentAddressId),
					),
				)) {
				this.addressService.updateAddress(
					{ id: Number(currentAddressId) },
					body.addresses.find(
						currentAddress => currentAddress.id === Number(currentAddressId),
					),
				);
			}
		}
		await this.personRepository.update(
			{ id: params.id },
			{
				...body,
				...{
					addresses: currentPersonData.addresses,
				},
			},
		);
		return await this.personRepository.findOne({ where: { id: params.id } });
	}

	public async deletePerson(params: PersonParam): Promise<string> {
		const currentPersonData = await this.personRepository.findOne({
			where: { id: params.id },
		});
		if (!currentPersonData)
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		for (const currentAddressId of currentPersonData.addresses.split(',')) {
			this.addressService.deleteAddress({ id: Number(currentAddressId) });
		}
		await this.personRepository.delete({ id: params.id });
		return 'The person was successfully deleted';
	}
}
