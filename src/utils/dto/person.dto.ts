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
import { UpdateAddressBody, NewAddressBody } from './address.dto';

export enum PersonType {
	naturalPerson = 1,
	legalPerson = 2,
}

export class PersonParam {
	@IsNumberString()
	id: number;
}

export class NewPersonBody {
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
	@Type(() => NewAddressBody)
	@IsInstance(NewAddressBody, { each: true })
	@ArrayMinSize(1)
	@IsArray()
	addresses: NewAddressBody[];
}

export class UpdatePersonBody {
	@IsNumber()
	id?: number;

	@IsOptional()
	@IsString()
	@MaxLength(150)
	name: string;

	@IsOptional()
	@IsString()
	@MinLength(11)
	@MaxLength(14)
	identification: string;

	@IsOptional()
	@IsEnum(PersonType, {
		message:
			'personType must be number 1 for natural person or 2 for legal person.',
	})
	personType: PersonType;

	@IsOptional()
	@IsISO8601()
	birthDate: Date;

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => UpdateAddressBody)
	@IsInstance(UpdateAddressBody, { each: true })
	@ArrayMinSize(1)
	@IsArray()
	addresses: UpdateAddressBody[];
}
