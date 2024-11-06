import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBill } from './UserBill';

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn('increment')
  bill_id: number;

  @Column({ type: 'varchar', length: 32 })
  name: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'varchar', length: 16 })
  target: string;

  @Column({ type: 'date' })
  deadline: string;

  @OneToMany(() => UserBill, (userBill) => userBill.bill)
  userBill: UserBill[];
}
