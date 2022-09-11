import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonBody, PersonParam } from 'src/utils/dto/person.dto';
import { Repository } from 'typeorm';
import { PersonModel } from './person.model';

@Controller('/person')
export class PersonController {
	constructor(
		@InjectRepository(PersonModel) private model: Repository<PersonModel>,
	) {}

	@Get(':id')
	public async fetchOne(@Param() params: PersonParam): Promise<PersonModel> {
		const response = await this.model.findOne({ where: { id: params.id } });

		if (!response)
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);

		return response;
	}

	@Get()
	public async fetchAll(): Promise<PersonModel[]> {
		const response = await this.model.find();
		return response;
	}

	@Post()
	public async createPerson(@Body() body: PersonBody): Promise<PersonModel> {
		const response = await this.model.save(body);
		return response;
	}

	@Put(':id')
	public async updatePerson(
		@Param() params: PersonParam,
		@Body() body: PersonBody,
	): Promise<PersonModel> {
		if (!(await this.model.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);

		const whereClause = { id: params.id };
		await this.model.update(whereClause, body);

		return await this.model.findOne({ where: { id: params.id } });
	}

	@Delete(':id')
	public async deletePerson(@Param() params: PersonParam): Promise<string> {
		if (!(await this.model.findOne({ where: { id: params.id } })))
			throw new NotFoundException(
				`No person found with the code ${params.id}.`,
			);

		const whereClause = { id: params.id };
		await this.model.delete(whereClause);

		return 'The person was successfully deleted';
	}
}
