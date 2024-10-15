import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CartItemDto {
  @Field()
  name: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  price: number;
}
