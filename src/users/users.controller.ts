import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { UserRequest } from 'src/interfaces';
import { JwtGuard } from 'src/guards';
import { User } from 'src/entities';

@Controller('users')
@ApiTags('Users')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    description: 'Current user data',
    type: User,
    isArray: true,
    status: 200,
  })
  current(@Req() request: UserRequest) {
    return this.usersService.get(request.user.id);
  }
}
