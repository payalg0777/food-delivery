import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderGatewayService } from '../services/order-gateway.service';
import { OrderGateway } from '../entities/order-gateway.entity';
import { CreateOrderGatewayInput } from '../dtos/create-order-gateway.input';
import { UpdateOrderGatewayInput } from '../dtos/update-order-gateway.input';

@Resolver(() => OrderGateway)
export class OrderGatewayResolver {
  constructor(private readonly orderGatewayService: OrderGatewayService) {}

  @Mutation(() => OrderGateway)
  createOrderGateway(
    @Args('createOrderGatewayInput')
    createOrderGatewayInput: CreateOrderGatewayInput,
  ) {
    return this.orderGatewayService.create(createOrderGatewayInput);
  }

  @Query(() => [OrderGateway], { name: 'orderGateway' })
  findAll() {
    return this.orderGatewayService.findAll();
  }

  @Query(() => OrderGateway, { name: 'orderGateway' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderGatewayService.findOne(id);
  }

  @Mutation(() => OrderGateway)
  updateOrderGateway(
    @Args('updateOrderGatewayInput')
    updateOrderGatewayInput: UpdateOrderGatewayInput,
  ) {
    return this.orderGatewayService.update(
      updateOrderGatewayInput.id,
      updateOrderGatewayInput,
    );
  }

  @Mutation(() => OrderGateway)
  removeOrderGateway(@Args('id', { type: () => Int }) id: number) {
    return this.orderGatewayService.remove(id);
  }
}
