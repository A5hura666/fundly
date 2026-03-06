import { INestApplicationContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Interest } from '../modules/interests/entities/interest.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export async function seedInterests(app: INestApplicationContext) {
  const repo = app.get<Repository<Interest>>(getRepositoryToken(Interest));

  const names = [
    'Technologie',
    'Écologie',
    'Finance',
    'Santé',
    'Éducation',
    'IA',
    'Blockchain',
    'E-commerce',
  ];

  const interests: Interest[] = [];

  for (const name of names) {
    let interest = await repo.findOne({ where: { name } });

    if (!interest) {
      interest = repo.create({ name });
      await repo.save(interest);
    }

    interests.push(interest);
  }

  return interests;
}
