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
  @IsEmail({}, { message: 'The provided email address is invalid.' })
  email!: string;

  @IsStrongPassword(
    {
      minSymbols: 0,
    },
    {
      message:
        'The password has to be from 8 to 64 characters long and has to contain at least 1 lowercase latin letter (a-z), 1 uppercase latin letter (A-Z) and 1 numeric digit (0-9).',
    },
  )
  password!: string;

  @IsString({ message: 'The name is of invalid type (has to be string).' })
  @MinLength(2, {
    message: 'The name is too short (has to be at least 2 characters long).',
  })
  @MaxLength(50, {
    message: 'The name is too long (has to be at most 50 characters long).',
  })
  name!: string;

  @Type(() => Date)
  @IsDate({ message: 'The provided birth date format is invalid.' })
  @MinDate(new Date('1900-01-01'), {
    message: 'The birth date has to be not earlier than 1900-01-01.',
  })
  @MaxDate(new Date(), {
    message: 'The birth date has to be not later than now.',
  })
  birthDate!: Date;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'The provided email address is invalid.' })
  email!: string;

  @IsOptional()
  @IsStrongPassword(
    {
      minSymbols: 0,
    },
    {
      message:
        'The password has to be from 8 to 64 characters long and has to contain at least 1 lowercase latin letter (a-z), 1 uppercase latin letter (A-Z) and 1 numeric digit (0-9).',
    },
  )
  password!: string;

  @IsOptional()
  @IsString({ message: 'The name is of invalid type (has to be string).' })
  @MinLength(2, {
    message: 'The name is too short (has to be at least 2 characters long).',
  })
  @MaxLength(50, {
    message: 'The name is too long (has to be at most 50 characters long).',
  })
  name!: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'The provided birth date format is invalid.' })
  @MinDate(new Date('1900-01-01'), {
    message: 'The birth date has to be not earlier than 1900-01-01.',
  })
  @MaxDate(new Date(), {
    message: 'The birth date has to be not later than now.',
  })
  birthDate!: Date;
}
