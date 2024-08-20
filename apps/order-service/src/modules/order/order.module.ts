import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderResolver } from './resolvers/order.resolver';
import { OrderController } from './controllers/order.controller';

@Module({
  providers: [OrderResolver, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
