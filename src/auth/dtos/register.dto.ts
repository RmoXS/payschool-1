import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
