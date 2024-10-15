import { InputType, Field, Float } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItemInputDto } from './order-item.dto';

@InputType()
export class CreateOrderInput {
  @ApiProperty()
  @Field()
  customerId: string;

  @ApiProperty()
  @Field()
  restaurantId: string;

  @ApiProperty()
  @Field()
  addressId: string;

  @ApiProperty()
  @Field(() => [OrderItemInputDto])
  items: OrderItemInputDto[];

  @ApiProperty()
  @Field(() => Float)
  orderTotal: number;

  @ApiProperty()
  @Field({ defaultValue: 'P' })
  status?: string;
}
