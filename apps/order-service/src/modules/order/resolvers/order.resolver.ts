import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from '../services/order.service';
import { CreateOrderInput } from '../dto/create-order.dto';
import { UpdateOrderInput } from '../dto/update-order.dto';
import { OrderType } from '../dto/order-output.dto';

@Resolver(() => OrderType)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderType)
  async createOrder(@Args('data') data: CreateOrderInput) {
    console.log('data: ', data);
    return this.orderService.createOrder(data);
  }

  @Mutation(() => OrderType)
  async updateOrder(
    @Args('id') id: number,
    @Args('data') data: UpdateOrderInput,
  ) {
    return this.orderService.updateOrder(id, data);
  }

  @Query(() => OrderType)
  async getOrderDetails(@Args('id') id: number) {
    return this.orderService.getOrderDetails(id);
  }

  @Query(() => OrderType)
  async getOrderById(@Args('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Query(() => [OrderType])
  async getOrderHistoryOfCustomer(@Args('customer_id') customer_id: string) {
    return this.orderService.getOrderHistoryOfCustomer(customer_id);
  }
}
