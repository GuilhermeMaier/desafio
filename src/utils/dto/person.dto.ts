import {
	IsArray,
	IsEnum,
	IsISO8601,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export enum PersonType {
	naturalPerson = 1,
	legalPerson = 2,
}

export class PersonParam {
	@IsOptional()
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

	// @IsArray()
	// @MinLength(1)
	// addresses: string[];
}
