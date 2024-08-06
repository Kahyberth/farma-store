import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { Users } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from 'src/common/types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly errorHandlerService: ErrorHandlerService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userInfo } = createUserDto;
    const user = this.usersRepository.create({
      password: bcrypt.hashSync(password, 10),
      ...userInfo,
    });
    try {
      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });
      if (!user)
        throw new UnauthorizedException(`User not found whit email: ${email}`);

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException(
          `Incorrect password, please verify that you have entered your credentials correctly.`,
        );
      }
      return {
        ...user,
        token: this.signPayload({ id: user.id }),
      };
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }

  async checkAuthStatus(id: string) {
    const token = this.signPayload({ id });
    const user = await this.usersRepository.findOne({
      where: { id },
      select: { email: true, id: true, fullName: true, role: true },
    });
    return {
      token,
      user,
    };
  }

  private signPayload(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
