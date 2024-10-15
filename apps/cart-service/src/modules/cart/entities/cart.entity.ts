import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Cart {
  @Field(() => ID)
  id: string;

  @Field()
  customer_id: string;

  @Field(() => [CartItem])
  items: CartItem[];

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@ObjectType()
export class CartItem {
  @Field(() => ID)
  id: string;

  @Field()
  cart_id: string;

  @Field()
  name: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
