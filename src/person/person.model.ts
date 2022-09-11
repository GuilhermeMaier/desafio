import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	identification: string;

	@Column()
	personType: number;

	@Column()
	birthDate: Date;

	// @Column()
	// addresses: string[];
}
