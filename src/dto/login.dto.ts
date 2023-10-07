import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  mail: string;

  @IsString()
  @MinLength(8)
  password: string;
}
