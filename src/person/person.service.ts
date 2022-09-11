import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonBody, PersonParam } from 'src/utils/dto/person.dto';
import { Repository } from 'typeorm';
import { PersonModel } from './person.model';

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(PersonModel)
		private personRepository: Repository<PersonModel>,
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

	public async createPerson(body: PersonBody): Promise<PersonModel> {
		return await this.personRepository.save(body);
	}

	public async updatePerson(
		params: PersonParam,
		body: PersonBody,
	): Promise<PersonModel> {
		if (!(await this.personRepository.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		const whereClause = { id: params.id };
		await this.personRepository.update(whereClause, body);
		return await this.personRepository.findOne({ where: { id: params.id } });
	}

	public async deletePerson(params: PersonParam): Promise<string> {
		if (!(await this.personRepository.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		const whereClause = { id: params.id };
		await this.personRepository.delete(whereClause);
		return 'The person was successfully deleted';
	}
}
