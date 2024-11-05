import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDto } from './dtos/user.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    await this.authService.register(registerData);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@User() user: UserDto) {
    const token = await this.authService.login(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        token,
      },
    };
  }
}
