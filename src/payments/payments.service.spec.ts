import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Payment, User } from 'src/entities';
import { CreatePaymentDto } from 'src/dto';
import { PaymentType } from 'src/enums';

const paymentPayload: CreatePaymentDto = {
  type: PaymentType.income,
  amount: 100,
};
const createdPayment = Object.assign(paymentPayload, { userId: 1 });

const queryBuilder: any = {
  where: () => queryBuilder,
  getMany: () => [createdPayment],
};

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneByOrFail: jest.fn().mockReturnValue({ id: 1, balance: 0 }),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Payment),
          useValue: {
            save: jest.fn().mockReturnValue(createdPayment),
            findOneByOrFail: jest.fn().mockReturnValue(createdPayment),
            create: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test payment create', async () => {
    const res = await service.create(paymentPayload, 1);
    expect(res).toEqual({ createdPayment });
  });

  it('test payments get', async () => {
    const res = await service.findAll(1);
    expect(res).toEqual([createdPayment]);
  });

  it('test payment get by id', async () => {
    const res = await service.findOne(1, 1);
    expect(res).toEqual({ payment: createdPayment });
  });

  it('test update payment', async () => {
    const res = await service.update(1, paymentPayload, 1);
    expect(res).toEqual({ updatedPayment: createdPayment });
  });

  it('test remove payment', async () => {
    const res = await service.remove(1, 1);
    expect(res).toEqual({ payment: createdPayment });
  });
});
