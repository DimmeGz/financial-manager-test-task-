import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO, LoginDTO } from 'src/dto';
import { User } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDTO: CreateUserDTO) {
    try {
      const hash = await bcrypt.hash(createUserDTO.password, 10);

      const user = this.usersRepository.create({
        mail: createUserDTO.mail,
        password: hash,
        firstName: createUserDTO.firstName,
        lastName: createUserDTO.lastName,
      });

      const createdUser = await this.usersRepository.save(user);
      const payload = { id: createdUser.id };
      const token = this.jwtService.sign(payload);

      return { token };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(loginDTO: LoginDTO) {
    try {
      const user = await this.usersRepository.findOneByOrFail({
        mail: loginDTO.mail,
      });

      const isRightPassword = await bcrypt.compare(
        loginDTO.password,
        user.password,
      );
      if (!isRightPassword) {
        throw new Error('Wrong password');
      }

      const payload = { id: user.id };
      const token = this.jwtService.sign(payload);

      return { token };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
