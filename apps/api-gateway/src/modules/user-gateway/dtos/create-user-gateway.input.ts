import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserGatewayInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
