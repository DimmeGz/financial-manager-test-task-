import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { PaymentsService } from './payments.service';

import { CreatePaymentDto, PaymentsFilterDTO, UpdatePaymentDto } from '../dto';
import { JwtGuard } from 'src/guards';
import { UserRequest } from 'src/interfaces';
import { Payment } from 'src/entities';

@Controller('payments')
@ApiTags('Payments')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Payment,
  })
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: UserRequest,
  ) {
    return this.paymentsService.create(createPaymentDto, request.user.id);
  }

  @Get()
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: Payment,
    isArray: true,
    status: 200,
  })
  findAll(
    @Req() request: UserRequest,
    @Query() searchQuery?: PaymentsFilterDTO,
  ) {
    return this.paymentsService.findAll(request.user.id, searchQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() request: UserRequest) {
    return this.paymentsService.findOne(id, request.user.id);
  }

  @Patch(':id')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: Payment,
    status: 200,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Req() request: UserRequest,
  ) {
    return this.paymentsService.update(id, updatePaymentDto, request.user.id);
  }

  @Delete(':id')
  @ApiResponse({
    description: 'The record has been successfully created.',
    type: Payment,
    status: 200,
  })
  remove(@Param('id', ParseIntPipe) id: number, @Req() request: UserRequest) {
    return this.paymentsService.remove(id, request.user.id);
  }
}
