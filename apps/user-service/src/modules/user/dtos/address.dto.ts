import { IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  userId: string;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip: string;
}
