import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @ApiProperty({ description: 'User type (e.g., "customer", "driver")' })
  @IsString({ message: 'User type should be a string' })
  userType: string;

  @ApiProperty({ description: 'User name' })
  @IsString({ message: 'Name should be a string' })
  name: string;
}

export class LoginDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail({}, { message: 'Invalid email format' }) // Validate email format
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty({ message: 'Password should not be empty' }) // Ensure password is not empty
  password: string;
}
