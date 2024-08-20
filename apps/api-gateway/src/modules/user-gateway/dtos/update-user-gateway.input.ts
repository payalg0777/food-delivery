import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateUserGatewayInput } from './create-user-gateway.input';

@InputType()
export class UpdateUserGatewayInput extends PartialType(
  CreateUserGatewayInput,
) {
  @Field(() => Int)
  id: number;
}
