import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword({
    minUppercase: 0,
    minSymbols: 0,
  })
  password!: string;

  @IsString()
  name!: string;

  @IsDateString()
  birthDate!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsStrongPassword({
    minUppercase: 0,
    minSymbols: 0,
  })
  password!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsDateString()
  birthDate!: string;
}
