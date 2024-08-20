import { Injectable } from '@nestjs/common';
import { CreateOrderGatewayInput } from '../dtos/create-order-gateway.input';
import { UpdateOrderGatewayInput } from '../dtos/update-order-gateway.input';

@Injectable()
export class OrderGatewayService {
  create(createOrderGatewayInput: CreateOrderGatewayInput) {
    return 'This action adds a new orderGateway';
  }

  findAll() {
    return `This action returns all orderGateway`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderGateway`;
  }

  update(id: number, updateOrderGatewayInput: UpdateOrderGatewayInput) {
    return `This action updates a #${id} orderGateway`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderGateway`;
  }
}
