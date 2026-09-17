import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterAdminDto {
  @IsEmail({}, { message: 'The provided email address is invalid.' })
  email!: string;

  @IsStrongPassword(
    { minSymbols: 0 },
    {
      message:
        'The password has to be from 8 to 64 characters long and has to contain at least 1 lowercase latin letter (a-z), 1 uppercase latin letter (A-Z) and 1 numeric digit (0-9).',
    },
  )
  password!: string;
}

export class LoginAdminDto {
  @IsEmail({}, { message: 'The provided email address is invalid.' })
  email!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}
