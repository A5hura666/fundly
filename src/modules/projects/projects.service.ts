import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Interest } from '../interests/entities/interest.entity';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(userId: number, createProjectDto: CreateProjectDto) {
    const { interests: interestIds, ...projectData } = createProjectDto;

    const project = this.projectRepository.create({
      ...projectData,
      ownerId: userId,
    });

    if (interestIds && interestIds.length > 0) {
      project.interests = interestIds.map((id) => {
        const interest = new Interest();
        interest.id = id;
        return interest;
      });
    }

    return this.projectRepository.save(project);
  }

  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    return project;
  }

  async update(userId: number, id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['interests'],
    });

    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas le propriétaire de ce projet",
      );
    }

    if (updateProjectDto.title !== undefined)
      project.title = updateProjectDto.title;
    if (updateProjectDto.description !== undefined)
      project.description = updateProjectDto.description;
    if (updateProjectDto.budget !== undefined)
      project.budget = updateProjectDto.budget;
    if (updateProjectDto.category !== undefined)
      project.category = updateProjectDto.category;

    if (updateProjectDto.interests) {
      project.interests = updateProjectDto.interests.map((id) => {
        const interest = new Interest();
        interest.id = id;
        return interest;
      });
    }

    return this.projectRepository.save(project);
  }

  async remove(userId: number, userRole: UserRole, id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException('Projet non trouvé');
    }

    if (userRole !== UserRole.ADMIN && project.ownerId !== userId) {
      throw new ForbiddenException(
        "Vous n'êtes pas le propriétaire de ce projet",
      );
    }

    await this.projectRepository.delete(id);

    return { message: 'Projet supprimé avec succès' };
  }
}
