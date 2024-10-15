import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartDto {
  @Field()
  customer_id: string;
}
