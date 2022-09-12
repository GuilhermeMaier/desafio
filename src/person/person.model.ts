import { AddressModel } from 'src/address/address.model';
import { PersonType } from 'src/utils/dto/person.dto';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class PersonModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	identification: string;

	@Column()
	personType: PersonType;

	@Column()
	birthDate: Date;

	@Column()
	addresses: string;
}
