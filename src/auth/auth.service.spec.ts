import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { JwtService } from '@nestjs/jwt';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk2NjY4ODcwLCJleHAiOjE2OTcyNzM2NzB9.7VvRvVZbgbZBTks0Gi-WjOXuBA8HnzGOR6ij62fR0iw';
const createUser = {
  mail: 'mail@example.com',
  password: '12345678',
  confirmPassword: '12345678',
};
const createdUser = Object.assign(createUser, { id: 1 });
const userFromDb = {
  id: 1,
  mail: 'mail@example.com',
  password: '$2b$10$mhhp0jZpRuqY7t4mJvqxuea6ZNUvK4Pd9LZUpGsVumwv1tVAAT66a',
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn().mockReturnValue(createdUser),
            findOneByOrFail: jest.fn().mockReturnValue(userFromDb),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(token),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test registration', async () => {
    const res = await service.create(createUser);
    expect(res).toEqual({ token });
  });

  it('test login', async () => {
    const res = await service.login(createUser);
    expect(res).toEqual({ token });
  });
});
