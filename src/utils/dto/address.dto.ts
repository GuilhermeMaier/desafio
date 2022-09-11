import {
	IsEnum,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export enum AddressType {
	residential = 1,
	commercial = 2,
}

export class AddressParam {
	@IsNumberString()
	id: number;
}

export class AddressBody {
	@IsOptional()
	@IsNumber()
	id: number;

	@IsString()
	@MinLength(9)
	@MaxLength(9)
	zipCode: string;

	@IsString()
	street: string;

	@IsNumber()
	houseNumber: number;

	@IsString()
	neighborhood: string;

	@IsOptional()
	@IsString()
	adjunct: string;

	@IsString()
	city: string;

	@IsString()
	uf: string;

	@IsEnum(AddressType, {
		message:
			'addressType must be number 1 for residential or 2 for commercial.',
	})
	addressType: AddressType;
}
