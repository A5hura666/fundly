import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.investments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'investorId' })
  investor: User;

  @Column()
  investorId: number;

  @ManyToOne(() => Project, (project) => project.investments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @CreateDateColumn()
  date: Date;
}
