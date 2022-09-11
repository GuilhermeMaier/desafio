import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonBody, PersonParam } from 'src/utils/dto/person.dto';
import { Repository } from 'typeorm';
import { PersonModel } from './person.model';

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(PersonModel) private model: Repository<PersonModel>,
	) {}

	public async fetchOne(params: PersonParam): Promise<PersonModel> {
		const response = await this.model.findOne({ where: { id: params.id } });
		if (!response)
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		return response;
	}

	public async fetchAll(): Promise<PersonModel[]> {
		return await this.model.find();
	}

	public async createPerson(body: PersonBody): Promise<PersonModel> {
		return await this.model.save(body);
	}

	public async updatePerson(
		params: PersonParam,
		body: PersonBody,
	): Promise<PersonModel> {
		if (!(await this.model.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		const whereClause = { id: params.id };
		await this.model.update(whereClause, body);
		return await this.model.findOne({ where: { id: params.id } });
	}

	public async deletePerson(params: PersonParam): Promise<string> {
		if (!(await this.model.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);
		const whereClause = { id: params.id };
		await this.model.delete(whereClause);
		return 'The person was successfully deleted';
	}
}
