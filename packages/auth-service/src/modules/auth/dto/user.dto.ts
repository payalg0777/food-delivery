import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail({}, { message: 'Invalid email format' }) // Validate email format
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password should not be empty' }) // Ensure password is not empty
  password: string;
}
