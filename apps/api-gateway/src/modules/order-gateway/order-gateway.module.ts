import { Module } from '@nestjs/common';
import { OrderGatewayService } from './services/order-gateway.service';
import { OrderGatewayResolver } from './resolvers/order-gateway.resolver';
import { OrderGatewayController } from './controllers/order-gateway.controller';

@Module({
  providers: [OrderGatewayResolver, OrderGatewayService],
  controllers: [OrderGatewayController],
})
export class OrderGatewayModule {}
