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
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto';
import { JwtGuard } from 'src/guards';
import { UserRequest } from 'src/interfaces';

@Controller('payments')
@UseGuards(JwtGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() request: UserRequest,
  ) {
    return this.paymentsService.create(createPaymentDto, request.user.id);
  }

  @Get()
  findAll(@Req() request: UserRequest) {
    return this.paymentsService.findAll(request.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() request: UserRequest) {
    return this.paymentsService.findOne(id, request.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
    @Req() request: UserRequest,
  ) {
    return this.paymentsService.update(id, updatePaymentDto, request.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() request: UserRequest) {
    return this.paymentsService.remove(id, request.user.id);
  }
}
