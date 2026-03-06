import { INestApplicationContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from '../modules/projects/entities/project.entity';
import { User, UserRole } from '../modules/users/entities/user.entity';
import { Interest } from '../modules/interests/entities/interest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/locale/fr';

export async function seedProjects(
  app: INestApplicationContext,
  users: User[],
  interests: Interest[],
) {
  const repo = app.get<Repository<Project>>(getRepositoryToken(Project));

  const entrepreneurs = users.filter((u) => u.role === UserRole.ENTREPRENEUR);

  const projects: Project[] = [];

  for (let i = 0; i < 30; i++) {
    const owner = faker.helpers.arrayElement(entrepreneurs);

    const project = repo.create({
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      budget: faker.number.int({ min: 10000, max: 500000 }),
      category: faker.commerce.department(),
      owner,
      ownerId: owner.id,
      interests: faker.helpers.arrayElements(interests, {
        min: 1,
        max: 3,
      }),
    });

    projects.push(project);
  }

  await repo.save(projects);
  return projects;
}
