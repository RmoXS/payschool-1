import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from './dtos/user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginResponseDto } from './dtos/login-response.dto';
import { BaseResponseInterface } from 'src/common/interfaces/base-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    await this.authService.register(registerData);
    const response: BaseResponseInterface = {
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };

    return response;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserDto) {
    const token = await this.authService.login(user);
    const response: LoginResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        token,
      },
    };

    return response;
  }

  @Get('student')
  @UseGuards(JwtAuthGuard)
  async getAllStudents() {
    const result = await this.authService.getAllStudents();
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        students: result,
      },
    };
  }
}
