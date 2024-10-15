import { Field, Float, ObjectType, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class OrderItemDto {
  @ApiProperty()
  @Field(() => Int)
  id: number;

  @ApiProperty()
  @Field()
  name: string;

  @ApiProperty()
  @Field()
  quantity: number;

  @ApiProperty()
  @Field(() => Float)
  price: number;
}

@InputType('OrderItemInput')
export class OrderItemInputDto {
  @Field()
  name: string;

  @Field()
  quantity: number;

  @Field(() => Float)
  price: number;
}
