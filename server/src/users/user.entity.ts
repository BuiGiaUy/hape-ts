import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  email_verified: boolean;

  @Column({ nullable: true })
  verify_key: boolean;

  @Column({ length: 60 })
  password: string;

  @Column({ nullable: true })
  google_id: string;

  @Column({ nullable: true })
  facebook_id: string;

  @Column({ nullable: true })
  apple_id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
