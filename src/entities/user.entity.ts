import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  mail: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  firstName: string;

  @Column({ nullable: true })
  @ApiProperty()
  lastName: string;

  @OneToMany(() => Payment, (payment) => payment.user)
  @ApiProperty({ isArray: true, type: Payment })
  payments: Payment[];

  @Column({ default: 0 })
  @ApiProperty()
  balance: number;

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
