import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './entities/investment.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(userId: number, createInvestmentDto: CreateInvestmentDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const project = await this.projectRepository.findOneBy({
      id: createInvestmentDto.projectId,
    });
    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    return this.investmentRepository.save({
      ...createInvestmentDto,
      investorId: userId,
    });
  }

  async findByInvestor(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return this.investmentRepository.find({
      where: { investorId: userId },
      relations: ['project'],
    });
  }

  async findByProject(projectId: number) {
    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    return this.investmentRepository.find({
      where: { projectId },
      relations: ['investor'],
    });
  }

  findAll() {
    return this.investmentRepository.find();
  }

  findOne(id: number) {
    return this.investmentRepository.findOneBy({ id });
  }

  update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentRepository.update(id, updateInvestmentDto);
  }

  async remove(userId: number, userRole: UserRole, id: number) {
    const investment = await this.investmentRepository.findOneBy({ id });
    if (!investment) {
      throw new NotFoundException('Investissement non trouvé');
    }

    if (userRole !== UserRole.ADMIN && investment.investorId !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas le propriétaire de cet investissement",
      );
    }

    await this.investmentRepository.delete(id);

    return { message: 'Investissement annulé avec succès' };
  }
}
