import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dtos/create-bill.dto';
import { BaseResponseInterface } from 'src/common/interfaces/base-response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBill(@Body() billData: CreateBillDto) {
    await this.billService.createBill(billData);
    const response: BaseResponseInterface = {
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };

    return response;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllBills() {
    const result = await this.billService.getAllBills();
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        students: result,
      },
    };
  }
}
