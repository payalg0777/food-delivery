import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
// import { CreateOrderInput } from './create-order.input';

@InputType()
// export class UpdateOrderInput extends PartialType(CreateOrderInput) {
export class UpdateOrderInput {
  @ApiProperty()
  @Field({ nullable: true })
  status?: string;
}
