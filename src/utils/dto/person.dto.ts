import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsEnum,
	IsInstance,
	IsISO8601,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { AddressBody } from './address.dto';

export enum PersonType {
	naturalPerson = 1,
	legalPerson = 2,
}

export class PersonParam {
	@IsNumberString()
	id: number;
}

export class PersonBody {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsString()
	@MaxLength(150)
	name: string;

	@IsString()
	@MinLength(11)
	@MaxLength(14)
	identification: string;

	@IsEnum(PersonType, {
		message:
			'personType must be number 1 for natural person or 2 for legal person.',
	})
	personType: PersonType;

	@IsISO8601()
	birthDate: Date;

	@ValidateNested({ each: true })
	@Type(() => AddressBody)
	@IsInstance(AddressBody, { each: true })
	@ArrayMinSize(1)
	@IsArray()
	addresses: AddressBody[];
}
