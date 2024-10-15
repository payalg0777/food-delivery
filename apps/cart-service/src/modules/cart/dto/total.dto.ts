import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class TotalDto {
  @Field(() => Float)
  tax: number;

  @Field(() => Float)
  subtotal: number;

  @Field(() => Float)
  shipping: number;
}
