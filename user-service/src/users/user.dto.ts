import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsDate,
  MinDate,
  MaxDate,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword({
    minSymbols: 0,
  })
  password!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(new Date('1900-01-01'))
  @MaxDate(new Date())
  birthDate!: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsStrongPassword({
    minSymbols: 0,
  })
  password!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date('1900-01-01'))
  @MaxDate(new Date())
  birthDate!: Date;
}
