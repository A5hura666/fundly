import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { seedInterests } from './interests.seed';
import { seedUsers } from './users.seed';
import { seedProjects } from './projects.seed';
import { seedInvestments } from './investments.seed';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const interests = await seedInterests(app);
  console.log(`Seeded ${interests.length} interests`);

  const users = await seedUsers(app, interests);
  console.log(`Seeded ${users.length} users`);

  const projects = await seedProjects(app, users, interests);
  console.log(`Seeded ${projects.length} projects`);

  await seedInvestments(app, users, projects);
  console.log(`Seeded investments`);

  await app.close();
}

seed();
