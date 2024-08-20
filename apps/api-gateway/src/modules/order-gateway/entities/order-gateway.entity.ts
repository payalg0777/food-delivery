import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderGateway {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
