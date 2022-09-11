import {
	IsEmail,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	Min,
} from 'class-validator';

export class PersonBody {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsString()
	@MaxLength(120)
	name: string;

	@IsNumber()
	@Min(1)
	age: number;

	@IsEmail()
	@MaxLength(255)
	email: string;
}

export class PersonParam {
	@IsOptional()
	@IsNumberString()
	id: number;
}
