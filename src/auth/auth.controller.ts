import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/dto';
import { PasswordMatchPipe } from 'src/pipes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(PasswordMatchPipe) createUserDTO: CreateUserDTO) {
    return this.authService.create(createUserDTO);
  }
}
