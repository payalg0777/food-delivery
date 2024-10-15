import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDto } from './order-item.dto';

@ObjectType()
export class OrderType {
  @ApiProperty()
  @Field(() => Int)
  id: number;

  @ApiProperty()
  @Field()
  customer_id: string;

  @ApiProperty()
  @Field()
  restaurant_id: string;

  @ApiProperty()
  @Field()
  address_id: string;

  @ApiProperty()
  @Field(() => [OrderItemDto])
  items: OrderItemDto[];

  @ApiProperty()
  @Field(() => Float)
  orderTotal: number;

  @ApiProperty()
  @Field()
  status?: string;

  @ApiProperty()
  @Field()
  created_at: Date;

  @ApiProperty()
  @Field()
  updated_at: Date;
}

@ObjectType()
export class OrderItem {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field(() => Float)
  price: number;
}
