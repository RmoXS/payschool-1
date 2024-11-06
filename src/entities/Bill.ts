import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
