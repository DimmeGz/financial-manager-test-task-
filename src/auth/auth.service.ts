import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from 'src/dto';
import { User } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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

      return await this.usersRepository.save(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
