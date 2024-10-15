import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { PrismaService } from './services/prisma.service';
import { KafkaService } from './services/kafka.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, KafkaService],
})
export class PaymentModule {}
