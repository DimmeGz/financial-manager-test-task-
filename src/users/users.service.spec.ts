import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { PaymentType } from 'src/enums';

const userObject = {
  id: 1,
  mail: 'test@example.com',
  balance: 100,
  created_at: new Date(),
  updated_at: new Date(),
  payments: [
    {
      id: 1,
      amount: 100,
      description: 'payment',
      type: PaymentType.income,
      created_at: new Date(),
      updated_at: new Date(),
      category: null,
    },
  ],
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockReturnValue(userObject),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get user with payments', async () => {
    const res = await service.get(1);
    expect(res).toEqual({ user: userObject });
  });
});
