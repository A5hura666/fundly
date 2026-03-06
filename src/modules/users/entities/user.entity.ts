import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Investment } from '../../investments/entities/investment.entity';
import { Interest } from '../../interests/entities/interest.entity';

export enum UserRole {
  ENTREPRENEUR = 'entrepreneur',
  INVESTOR = 'investor',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname?: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @OneToMany(() => Investment, (investment) => investment.investor)
  investments: Investment[];

  @ManyToMany(() => Interest, (interest) => interest.users)
  @JoinTable({ name: 'user_interests' })
  interests: Interest[];
}
