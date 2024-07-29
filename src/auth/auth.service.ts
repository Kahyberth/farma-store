import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Injectable()
export class AuthService {
  constructor(private readonly errorHandlerService: ErrorHandlerService) {}

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
