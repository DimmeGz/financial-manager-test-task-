import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class PaymentsFilterDTO {
  @ApiProperty({
    description: 'Start date for filtering',
    required: false,
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date?: Date;

  @ApiProperty({
    description: 'End date for filtering',
    required: false,
    type: Date,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date?: Date;

  @ApiProperty({
    description: 'Partial payment description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
