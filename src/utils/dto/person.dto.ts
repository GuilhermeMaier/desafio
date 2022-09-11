import {
	IsArray,
	IsISO8601,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

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

	@IsNumber()
	personType: number;

	@IsISO8601()
	birthDate: Date;

	// @IsArray()
	// @MinLength(1)
	// addresses: string[];
}

export class PersonParam {
	@IsOptional()
	@IsNumberString()
	id: number;
}
