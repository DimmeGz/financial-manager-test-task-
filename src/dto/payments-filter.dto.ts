import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class PaymentsFilterDTO {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date?: Date;

  @IsOptional()
  @IsString()
  description?: number;
}
