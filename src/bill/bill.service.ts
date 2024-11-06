import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Bill } from 'src/entities/Bill';
import { In, Repository } from 'typeorm';
import { CreateBillDto } from './dtos/create-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDto } from './dtos/bill.dto';
import { UserBill } from 'src/entities/UserBill';
import { User } from 'src/entities/User';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(UserBill)
    private userBillRepository: Repository<UserBill>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBill(billData: CreateBillDto) {
    try {
      const targetName = billData.target.type;

      const bill = new Bill();
      bill.name = billData.name;
      bill.amount = billData.amount;
      bill.target = targetName;
      bill.deadline = billData.deadline;

      const newBill = await this.billRepository.save(bill);

      let users: User[];
      let savePromises: Promise<UserBill>[];

      switch (targetName) {
        case 'ALL':
          users = await this.userRepository.find({
            where: { role: 'student' },
          });
          savePromises = users.map((user) => {
            const userBill = new UserBill();
            userBill.bill = newBill;
            userBill.debt = newBill.amount;
            userBill.is_paid_off = false;
            userBill.user = user;

            return this.userBillRepository.save(userBill);
          });

          await Promise.all(savePromises);
          break;
        case 'BYCLASS':
          const class_origin = billData.target.value;
          users = await this.userRepository.find({
            where: { class_origin: In(class_origin), role: 'student' },
          });

          savePromises = users.map((user) => {
            const userBill = new UserBill();
            userBill.bill = newBill;
            userBill.debt = newBill.amount;
            userBill.is_paid_off = false;
            userBill.user = user;

            return this.userBillRepository.save(userBill);
          });

          await Promise.all(savePromises);
          break;
        case 'BYSTUDENT':
          const userIds = billData.target.value;
          users = await this.userRepository.find({
            where: { user_id: In(userIds), role: 'student' },
          });

          savePromises = users.map((user) => {
            const userBill = new UserBill();
            userBill.bill = newBill;
            userBill.debt = newBill.amount;
            userBill.is_paid_off = false;
            userBill.user = user;

            return this.userBillRepository.save(userBill);
          });

          await Promise.all(savePromises);
          break;
        default:
          throw new BadRequestException('Target not identified');
      }
    } catch (error) {
      console.log(error);
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
