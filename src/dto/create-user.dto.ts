import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { LoginDTO } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO extends LoginDTO {
  @ApiProperty({ description: 'User password' })
  @IsString()
  @MinLength(8)
  confirmPassword: string;

  @ApiProperty({ description: 'User first name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ description: 'User last name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}
