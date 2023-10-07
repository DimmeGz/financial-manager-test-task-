import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto';

@Injectable()
export class PasswordMatchPipe implements PipeTransform {
  transform(createUserDTO: CreateUserDTO) {
    if (createUserDTO.password !== createUserDTO.confirmPassword) {
      throw new BadRequestException(
        'password and confirmationPassword do not match',
      );
    }

    return createUserDTO;
  }
}
