import { IsEmail, IsIn, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsIn(['Medellin', 'Cali', 'Bogota', 'Tulua', 'Cartagena', 'Bucaramanga'])
  city: string;
}
