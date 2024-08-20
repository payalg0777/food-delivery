import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserGateway {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
