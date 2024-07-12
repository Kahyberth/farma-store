import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { errorType } from './errorHandler.type';

@Injectable()
export class ErrorHandlerService {
  private readonly logger = new Logger('errorHandler');
  constructor() {}
  errorHandler(error: errorType) {
    if (+error.code === 23505) {
      this.logger.error(`Product is already exist in database ${error.detail}`);
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
