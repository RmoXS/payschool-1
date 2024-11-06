import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Bill } from './Bill';

@Entity('user_bills')
export class UserBill {
  @PrimaryGeneratedColumn('increment')
  user_bill_id: number;

  @Column({ type: 'int' })
  debt: number;

  @Column({ type: 'boolean' })
  is_paid_off: boolean;

  @ManyToOne(() => User, (user) => user.userBill)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Bill, (bill) => bill.userBill)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;
}
