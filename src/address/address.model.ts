import { AddressType } from 'src/utils/dto/address.dto';
import { PersonType } from 'src/utils/dto/person.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddressModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	zipCode: string;

	@Column()
	street: string;

	@Column()
	houseNumber: number;

	@Column()
	neighborhood: string;

	@Column()
	adjunct: string;

	@Column()
	city: string;

	@Column()
	uf: string;

	@Column()
	addressType: AddressType;
}
