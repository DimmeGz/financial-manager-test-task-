import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/entities';

import { CreateCategoryDto } from '../dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoriesRepository.create({
        ...createCategoryDto,
      });
      const createdCategory = await this.categoriesRepository.save(category);

      return { category: createdCategory };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll() {
    const categories = await this.categoriesRepository.find();
    return { categories };
  }

  async findOne(id: number) {
    try {
      const category = await this.categoriesRepository.findOneByOrFail({ id });
      return { category };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoriesRepository.findOneByOrFail({ id });
      await this.categoriesRepository.remove(category);
      return { category };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
