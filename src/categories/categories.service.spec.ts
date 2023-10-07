import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from 'src/entities';

const categorytitle = 'new category';
const categoryExample: Category = {
  id: 1,
  title: categorytitle,
  created_at: new Date(),
  updated_at: new Date(),
  payments: [],
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn().mockReturnValue([categoryExample]),
            findOneByOrFail: jest.fn().mockReturnValue(categoryExample),
            save: jest.fn().mockReturnValue(categoryExample),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test category create', async () => {
    const res = await service.create({
      title: categorytitle,
    });
    expect(res).toEqual({ category: categoryExample });
  });

  it('test categories find', async () => {
    const res = await service.findAll();
    expect(res).toEqual({ categories: [categoryExample] });
  });

  it('test category by id', async () => {
    const res = await service.findOne(1);
    expect(res).toEqual({ category: categoryExample });
  });

  it('test category delete', async () => {
    const res = await service.remove(1);
    expect(res).toEqual({ category: categoryExample });
  });
});
