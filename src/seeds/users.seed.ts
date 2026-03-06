import { INestApplicationContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from '../modules/users/entities/user.entity';
import { Interest } from '../modules/interests/entities/interest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/locale/fr';
import * as bcrypt from 'bcrypt';

export async function seedUsers(
  app: INestApplicationContext,
  interests: Interest[],
) {
  const repo = app.get<Repository<User>>(getRepositoryToken(User));

  const users: User[] = [];

  const roles = [
    UserRole.ENTREPRENEUR,
    UserRole.INVESTOR,
    UserRole.INVESTOR,
    UserRole.ENTREPRENEUR,
  ];

  for (let i = 0; i < 20; i++) {
    const password = await bcrypt.hash('password123', 10);

    const user = repo.create({
      email: faker.internet.email(),
      password,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      role: faker.helpers.arrayElement(roles),
      interests: faker.helpers.arrayElements(interests, { min: 1, max: 3 }),
    });

    users.push(user);
  }

  // admin fixe
  const admin = repo.create({
    email: 'admin@test.com',
    password: await bcrypt.hash('admin123', 10),
    firstname: 'Admin',
    lastname: 'Root',
    role: UserRole.ADMIN,
    interests: [],
  });

  users.push(admin);

  await repo.save(users);
  return users;
}
