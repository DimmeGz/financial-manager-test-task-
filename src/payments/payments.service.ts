import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto, PaymentsFilterDTO, UpdatePaymentDto } from '../dto';
import { Payment, User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentType } from '../enums';
import { LoggerService } from '../logger/logger.service';
import { Action } from '../interfaces';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, userId: number) {
    try {
      const payment = this.paymentsRepository.create({
        ...createPaymentDto,
        user: { id: userId },
      });

      const createdPayment = await this.paymentsRepository.save(payment);

      let changeBalance = createPaymentDto.amount;
      if (createPaymentDto.type === PaymentType.expense) {
        changeBalance = changeBalance * -1;
      }

      const user = await this.usersRepository.findOneByOrFail({ id: userId });
      user.balance += changeBalance;
      await this.usersRepository.save(user);

      this.loggerService.save({
        action: Action.create,
        amount: createPaymentDto.amount,
        category: createPaymentDto.category,
        paymentType: createPaymentDto.type,
        paymentDate: createdPayment.created_at,
        created_at: new Date(),
      });

      return { createdPayment };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(userId: number, searchQuery?: PaymentsFilterDTO) {
    try {
      const qb = this.paymentsRepository
        .createQueryBuilder('payment')
        .where('payment.user.id = :userId', { userId });

      if (searchQuery && searchQuery.start_date) {
        qb.andWhere('payment.created_at >= :startDate', {
          startDate: searchQuery.start_date,
        });
      }

      if (searchQuery && searchQuery.end_date) {
        qb.andWhere('payment.created_at <= :endDate', {
          endDate: searchQuery.end_date,
        });
      }

      if (searchQuery && searchQuery.description) {
        qb.andWhere('payment.description LIKE :description', {
          description: `%${searchQuery.description}%`,
        });
      }
      const payments = await qb.getMany();

      return payments;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: number, userId: number) {
    try {
      const payment = await this.paymentsRepository.findOneByOrFail({
        id,
        user: { id: userId },
      });

      return { payment };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto, userId: number) {
    try {
      const payment = await this.paymentsRepository.findOneByOrFail({
        id,
        user: { id: userId },
      });

      let changeBalance = updatePaymentDto.amount - payment.amount;
      if (payment.type === PaymentType.expense) {
        changeBalance = changeBalance * -1;
      }
      const user = await this.usersRepository.findOneByOrFail({ id: userId });
      user.balance += changeBalance;

      await this.usersRepository.save(user);
      const newPayment = Object.assign(payment, updatePaymentDto);
      const updatedPayment = await this.paymentsRepository.save(newPayment);

      this.loggerService.save({
        action: Action.update,
        amount: updatedPayment.amount,
        category: updatedPayment.category,
        paymentType: updatedPayment.type,
        paymentDate: updatedPayment.created_at,
        created_at: new Date(),
      });

      return { updatedPayment };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number, userId: number) {
    try {
      const payment = await this.paymentsRepository.findOneByOrFail({
        id,
        user: { id: userId },
      });

      let changeBalance = payment.amount;
      if (payment.type === PaymentType.expense) {
        changeBalance = changeBalance * -1;
      }
      const user = await this.usersRepository.findOneByOrFail({ id: userId });
      user.balance -= changeBalance;

      await this.usersRepository.save(user);
      await this.paymentsRepository.remove(payment);

      this.loggerService.save({
        action: Action.delete,
        amount: payment.amount,
        category: payment.category,
        paymentType: payment.type,
        paymentDate: payment.created_at,
        created_at: new Date(),
      });

      return { payment };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
