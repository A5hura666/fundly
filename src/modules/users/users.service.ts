import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Interest } from '../interests/entities/interest.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { interests: interestIds, ...userData } = createUserDto;

    const user = this.userRepository.create(userData);

    if (interestIds && interestIds.length > 0) {
      user.interests = interestIds.map((id) => {
        const interest = new Interest();
        interest.id = id;
        return interest;
      });
    }

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['interests'],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
    if (updateUserDto.password !== undefined)
      user.password = updateUserDto.password;
    if (updateUserDto.firstname !== undefined)
      user.firstname = updateUserDto.firstname;
    if (updateUserDto.lastname !== undefined)
      user.lastname = updateUserDto.lastname;
    if (updateUserDto.role !== undefined) user.role = updateUserDto.role;

    if (updateUserDto.interests) {
      user.interests = updateUserDto.interests.map((id) => {
        const interest = new Interest();
        interest.id = id;
        return interest;
      });
    }

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
