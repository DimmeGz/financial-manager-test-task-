import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { PaymentType } from 'src/enums';

export class CreatePaymentDto {
  @ApiProperty({ minLength: 3, description: 'Payment type', enum: PaymentType })
  @IsEnum(PaymentType)
  type: PaymentType;

  @ApiProperty({
    description: 'Payment amount',
    type: Number,
    multipleOf: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Payment description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Payment category id',
    required: false,
    type: Number,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  category?: number;
}
