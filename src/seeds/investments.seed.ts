import { INestApplicationContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Investment } from '../modules/investments/entities/investment.entity';
import { User, UserRole } from '../modules/users/entities/user.entity';
import { Project } from '../modules/projects/entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/locale/fr';

export async function seedInvestments(
  app: INestApplicationContext,
  users: User[],
  projects: Project[],
) {
  const repo = app.get<Repository<Investment>>(getRepositoryToken(Investment));

  const investors = users.filter((u) => u.role === UserRole.INVESTOR);

  const investments: Investment[] = [];

  for (let i = 0; i < 50; i++) {
    const investor = faker.helpers.arrayElement(investors);
    const project = faker.helpers.arrayElement(projects);

    const investment = repo.create({
      investor,
      investorId: investor.id,
      project,
      projectId: project.id,
      amount: faker.number.int({ min: 1000, max: 50000 }),
    });

    investments.push(investment);
  }

  await repo.save(investments);
}
