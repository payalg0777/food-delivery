import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderGatewayInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
