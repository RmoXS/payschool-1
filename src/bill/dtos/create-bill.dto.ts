import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @MaxLength(16)
  target: string;

  @IsNotEmpty()
  @IsDate()
  deadline: string;
}
