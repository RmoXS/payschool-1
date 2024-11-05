import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('class_origins')
export class ClassOrigin {
  @PrimaryGeneratedColumn('increment')
  class_origin_id: number;

  @Column({ type: 'int' })
  grade: number;

  @Column({ type: 'varchar', length: 255 })
  major: string;

  @Column({ type: 'int' })
  sub_class: number;

  @OneToMany(() => User, (user) => user.classOrigin)
  users: User[];
}
