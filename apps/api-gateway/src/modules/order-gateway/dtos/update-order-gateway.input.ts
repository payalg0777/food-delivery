import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderGatewayInput } from './create-order-gateway.input';

@InputType()
export class UpdateOrderGatewayInput extends PartialType(
  CreateOrderGatewayInput,
) {
  @Field(() => Int)
  id: number;
}
