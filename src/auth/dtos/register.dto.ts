import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  @MaxLength(16)
  nis: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  class_origin: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
