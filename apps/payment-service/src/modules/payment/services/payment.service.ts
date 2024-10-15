import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { KafkaService } from './kafka.service'; // Import the Kafka service

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService, // Inject Kafka service
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    try {
      // Create a Stripe Payment Intent - Todo

      // Save payment info to DB
      const payment = await this.prisma.payment.create({
        data: {
          order_id: createPaymentDto.orderId,
          restaurant_id: createPaymentDto.restaurantId,
          customer_id: createPaymentDto.customerId,
          amount: createPaymentDto.amount,
          status: 'success',
          cardEnding: createPaymentDto.cardEnding,
          cardType: createPaymentDto.cardType,
          paymentMethodId: createPaymentDto.paymentMethodId,
        },
      });

      // Publish payment success event
      await this.kafkaService.publish('payment-status', {
        status: 'success',
        payment,
      });

      return payment;
    } catch (error) {
      await this.kafkaService.publish('payment-status', {
        status: 'failed',
        error,
      });
      throw new UnauthorizedException(`Invalid token: ${error}`);
    }
  }

  async getPaymentsByOrderId(orderId: string) {
    return this.prisma.payment.findMany({
      where: {
        order_id: orderId,
      },
    });
  }
}
