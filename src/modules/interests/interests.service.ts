import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interest } from './entities/interest.entity';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  create(createInterestDto: CreateInterestDto) {
    return this.interestRepository.save(createInterestDto);
  }

  findAll() {
    return this.interestRepository.find();
  }

  findOne(id: number) {
    return this.interestRepository.findOneBy({ id });
  }

  update(id: number, updateInterestDto: UpdateInterestDto) {
    return this.interestRepository.update(id, updateInterestDto);
  }

  remove(id: number) {
    return this.interestRepository.delete(id);
  }
}
