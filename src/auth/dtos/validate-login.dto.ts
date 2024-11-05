import { IsNotEmpty } from 'class-validator';

export class ValidateLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
