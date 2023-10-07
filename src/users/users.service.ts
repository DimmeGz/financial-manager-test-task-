import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async get(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['payments'],
    });

    return { user };
  }
}
