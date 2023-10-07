import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { LoginDTO } from './login.dto';

export class CreateUserDTO extends LoginDTO {
  @IsString()
  @MinLength(8)
  confirmPassword: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;
}
