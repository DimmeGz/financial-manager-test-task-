import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto, PaymentsFilterDTO, UpdatePaymentDto } from '../dto';
import { Payment, User } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentType } from 'src/enums';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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

      if (searchQuery.start_date) {
        qb.andWhere('payment.created_at >= :startDate', {
          startDate: searchQuery.start_date,
        });
      }

      if (searchQuery.end_date) {
        qb.andWhere('payment.created_at <= :endDate', {
          endDate: searchQuery.end_date,
        });
      }

      if (searchQuery.description) {
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

      return { payment };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
