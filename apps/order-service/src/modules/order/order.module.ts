import { Module } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { OrderService } from './services/order.service';
import { OrderResolver } from './resolvers/order.resolver';
import { PrismaService } from './services/prisma.service';
import { OrderController } from './controllers/order.controller';
import { KafkaConsumerService } from './services/kafka.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderResolver,
    PrismaService,
    KafkaConsumerService,
    EventEmitter2,
  ],
})
export class OrderModule {}
