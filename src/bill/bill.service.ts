import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Bill } from 'src/entities/Bill';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dtos/create-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDto } from './dtos/bill.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  async createBill(billData: CreateBillDto) {
    try {
      const bill = new Bill();
      bill.name = billData.name;
      bill.amount = billData.amount;
      bill.target = billData.target;
      bill.deadline = billData.deadline;
      await this.billRepository.save(bill);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAllBills() {
    try {
      const bills = await this.billRepository.find();
      const formatedBills: BillDto[] = bills.map((data: Bill) => ({
        billId: data.bill_id,
        name: data.name,
        amount: data.amount,
        target: data.target,
        deadline: data.deadline,
      }));
      return formatedBills;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
