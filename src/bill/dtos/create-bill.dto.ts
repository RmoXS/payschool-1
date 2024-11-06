import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsIn,
  IsNotEmpty,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class TargetDto {
  @IsNotEmpty()
  @IsIn(['ALL', 'BYCLASS', 'BYSTUDENT'], {
    message: 'Type must be one of: ALL, BYCLASS, BYSTUDENT',
  })
  type: string;

  @IsArray()
  value: any[]; // Bisa diubah tipe datanya tergantung kebutuhan, misalnya string[] atau number[]
}

export class CreateBillDto {
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TargetDto)
  target: TargetDto;

  @IsNotEmpty()
  @IsDate()
  deadline: string;
}
