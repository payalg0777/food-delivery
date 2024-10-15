import {
  IsOptional,
  IsString,
  IsInt,
  IsArray,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateUserDto {
  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;

  @IsOptional()
  @IsInt()
  order_id?: number;

  @IsOptional()
  @IsInt()
  restaurant_id?: number;

  @IsOptional()
  @IsInt()
  payment_id?: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  userType: string;

  @IsArray()
  @IsOptional()
  address?: AddressDto[];
}
