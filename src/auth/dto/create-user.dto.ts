import {
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 3,
    minNumbers: 2,
    minUppercase: 1,
  })
  password: string;

  @IsString()
  @Min(5)
  fullName: string;

  @IsString()
  @Min(6)
  @IsIn(['Medellin', 'Cali', 'Bogota', 'Tulua', 'Cartagena', 'Bucaramanga'])
  city: string;
}
