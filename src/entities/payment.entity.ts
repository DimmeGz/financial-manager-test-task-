import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../enums';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ minimum: 1 })
  id: number;

  @Column()
  @ApiProperty({ enum: PaymentType })
  type: string;

  @Column()
  @ApiProperty()
  amount: number;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @ManyToOne(() => Category, (category) => category.payments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty()
  category: number;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({
    precision: 0,
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({
    precision: 0,
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updated_at: Date;
}
