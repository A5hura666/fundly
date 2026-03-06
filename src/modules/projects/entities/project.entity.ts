import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Investment } from '../../investments/entities/investment.entity';
import { Interest } from '../../interests/entities/interest.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  budget: number;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column('uuid')
  ownerId: number;

  @OneToMany(() => Investment, (investment) => investment.project)
  investments: Investment[];

  @ManyToMany(() => Interest, (interest) => interest.projects)
  @JoinTable({ name: 'project_interests' })
  interests: Interest[];
}
