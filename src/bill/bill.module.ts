import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/Bill';
import { UserBill } from 'src/entities/UserBill';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, UserBill, User])],
  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}
