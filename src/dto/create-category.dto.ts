import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ minLength: 3, description: 'Category name' })
  @IsString()
  @MinLength(3)
  title: string;
}
