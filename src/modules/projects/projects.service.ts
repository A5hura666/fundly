import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Interest } from '../interests/entities/interest.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { interests: interestIds, ...projectData } = createProjectDto;

    const project = this.projectRepository.create(projectData);

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

  findOne(id: number) {
    return this.projectRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['interests'],
    });

    if (!project) {
      throw new NotFoundException('Projet non trouvé');
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

  remove(id: number) {
    return this.projectRepository.delete(id);
  }
}
