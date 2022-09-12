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
	@IsOptional()
	@IsNumberString()
	id?: number;

	@IsOptional()
	@IsString()
	@MinLength(9)
	@MaxLength(9)
	@IsNumberString()
	zipCode?: string;

	@IsOptional()
	@IsNumber()
	houseNumber?: number;
}

export class NewAddressBody {
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
	adjunct?: string;

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

export class UpdateAddressBody {
	@IsNumber()
	id: number;

	@IsOptional()
	@IsString()
	@MinLength(9)
	@MaxLength(9)
	zipCode: string;

	@IsOptional()
	@IsString()
	street: string;

	@IsOptional()
	@IsNumber()
	houseNumber: number;

	@IsOptional()
	@IsString()
	neighborhood: string;

	@IsOptional()
	@IsOptional()
	@IsString()
	adjunct?: string;

	@IsOptional()
	@IsString()
	city: string;

	@IsOptional()
	@IsString()
	uf: string;

	@IsOptional()
	@IsEnum(AddressType, {
		message:
			'addressType must be number 1 for residential or 2 for commercial.',
	})
	addressType: AddressType;
}
