import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonModel } from './person.model';
import { PersonService } from './person.service';

@Module({
	imports: [TypeOrmModule.forFeature([PersonModel])],
	providers: [PersonService],
	controllers: [PersonController],
	exports: [PersonService],
})
export class PersonModule {}
