import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../modules/users/entities/user.entity';
import { Interest } from '../modules/interests/entities/interest.entity';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { interests: interestIds, password, ...rest } = createUserDto;

    const hashed = await bcrypt.hash(password, 10);

    const interests = interestIds?.length
      ? await this.interestRepository.findBy({ id: In(interestIds) })
      : [];

    const user = this.userRepository.create({
      ...rest,
      password: hashed,
      interests,
    });

    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return { access_token: this.generateToken(user) };
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
