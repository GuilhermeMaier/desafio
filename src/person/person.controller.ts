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
	NewPersonBody,
	UpdatePersonBody,
	PersonParam,
} from 'src/utils/dto/person.dto';
import { PersonModel } from './person.model';
import { PersonService } from './person.service';

@Controller('/person')
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@Get(':id')
	async fetchOne(@Param() params: PersonParam): Promise<PersonModel> {
		return this.personService.fetchOne(params);
	}

	@Get()
	async fetchAll(): Promise<PersonModel[]> {
		return this.personService.fetchAll();
	}

	@Post()
	async createPerson(@Body() body: NewPersonBody): Promise<PersonModel> {
		return this.personService.createPerson(body);
	}

	@Put(':id')
	async updatePerson(
		@Param() params: PersonParam,
		@Body() body: UpdatePersonBody,
	): Promise<PersonModel> {
		return this.personService.updatePerson(params, body);
	}

	@Delete(':id')
	async deletePerson(@Param() params: PersonParam): Promise<string> {
		return this.personService.deletePerson(params);
	}
}
