import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { QueryFailedError, Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { ValidateLoginDto } from './dtos/validate-login.dto';
import { UserDto } from './dtos/user.dto';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { StudentsDto } from './dtos/students.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(registerData: RegisterDto) {
    try {
      const saltRounds: number = 10;

      if (registerData.password !== registerData.confirmPassword) {
        throw new BadRequestException(
          'Password and confirm password do not match',
        );
      }

      const plainPassword = registerData.password;
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

      const user = new User();
      user.email = registerData.email;
      user.name = registerData.name;
      user.password = hashedPassword;
      user.role = registerData.role;
      user.class_origin = registerData.class_origin;
      user.nis = registerData.nis;

      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof QueryFailedError) {
        const emailConstraintName = 'UQ_users_email';
        const nisConstraintName = 'UQ_users_nis';

        if (error.message.includes(emailConstraintName)) {
          throw new BadRequestException('Email has been registered');
        } else if (error.message.includes(nisConstraintName)) {
          throw new BadRequestException('NIS has been registered');
        } else {
          throw new InternalServerErrorException('Something went wrong');
        }
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async validateLogin(validateLoginData: ValidateLoginDto) {
    const { email, password } = validateLoginData;

    const user = await this.userRepository.findOne({
      where: [{ email: email }],
    });

    if (!user) {
      throw new UnauthorizedException('User not registered');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const userPaylod: UserDto = { userId: user.user_id };

    return userPaylod;
  }

  async login(user: UserDto) {
    const payload: JwtPayloadDto = {
      sub: user.userId,
    };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async getAllStudents() {
    try {
      const students = await this.userRepository.find({
        where: [{ role: 'student' }],
      });
      const formatedStudents: StudentsDto[] = students.map((data: User) => ({
        userId: data.user_id,
        name: data.name,
        nis: data.nis,
        email: data.email,
        class_origin: data.class_origin,
      }));
      return formatedStudents;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
