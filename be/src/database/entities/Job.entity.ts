import { IsDate, IsOptional, MaxLength, MinLength } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class Job {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @MaxLength(255)
  @MinLength(1)
  @Column()
  title: string;

  @Column()
  @IsDate()
  expiry_date: Date;

  @MaxLength(1000)
  @IsOptional()
  @Column()
  description: string;

  @CreateDateColumn()
  @Column()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;
}
