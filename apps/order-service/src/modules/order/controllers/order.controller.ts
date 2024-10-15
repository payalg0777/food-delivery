import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderInput } from '../dto/create-order.dto';
import { UpdateOrderInput } from '../dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderType } from '../dto/order-output.dto';

@ApiTags('orders') // Grouping in Swagger UI
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderType,
  })
  async createOrder(@Body() createOrderInput: CreateOrderInput) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: OrderType,
  })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderInput: UpdateOrderInput,
  ) {
    return this.orderService.updateOrder(Number(id), updateOrderInput);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order details.',
    type: OrderType,
  })
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Get('customer/:customerId/history')
  @ApiOperation({ summary: 'Get order history of a customer' })
  @ApiResponse({
    status: 200,
    description: 'The order history for the customer.',
    type: [OrderType],
  })
  async getOrderHistoryOfCustomer(@Param('customerId') customerId: string) {
    return this.orderService.getOrderHistoryOfCustomer(customerId);
  }
}
