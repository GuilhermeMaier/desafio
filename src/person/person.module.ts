import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonModel } from './person.model';

@Module({
	imports: [TypeOrmModule.forFeature([PersonModel])],
	controllers: [PersonController],
})
export class PersonModule {}
