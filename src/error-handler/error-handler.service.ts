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
    const { status, response } = error;

    if (+error.code === 23505) {
      this.logger.error(`Product is already exist in database ${error.detail}`);
      throw new BadRequestException(error.detail);
    }

    if (+status !== 500) {
      this.logger.error(response.message);
      throw new BadRequestException(response.message);
    }

    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
