import { IsInt, IsPositive, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsString()
  restaurantId: string;

  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty()
  @IsString()
  paymentMethodId: string; // Token or ID for the payment method

  @ApiProperty()
  @IsString()
  @Length(4, 4) // Assuming cardEnding is a 4-digit number
  cardEnding: string;

  @ApiProperty()
  @IsString()
  cardType: string; // e.g., "Visa", "MasterCard"
}
