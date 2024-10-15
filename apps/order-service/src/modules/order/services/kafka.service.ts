import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { EventEmitter2 } from 'eventemitter2'; // Import EventEmitter2
import { PaymentEvent } from '../events/payment-event'; // Import PaymentEvent class
// import { OrderService } from './order.service'; // Import OrderService

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['kafka:9092'], // Adjust based on your Kafka setup
  });

  private consumer = this.kafka.consumer({ groupId: 'order-group' });
  private producer = this.kafka.producer();

  constructor(private eventEmitter: EventEmitter2) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.producer.connect();
    await this.consumer.subscribe({ topic: 'payment-status' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentEvent = JSON.parse(message.value.toString());
        // Handle the payment event here
        console.log('Payment successful:', paymentEvent);
        const event = new PaymentEvent(
          paymentEvent.payment.order_id,
          paymentEvent.status,
        );
        this.eventEmitter.emit('payment.status', event);
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    await this.producer.disconnect();
  }

  async publishOrderStatusUpdate(event: string, data: any) {
    await this.producer.send({
      topic: 'order-status-updates',
      messages: [
        {
          value: JSON.stringify({ event, data }),
        },
      ],
    });
  }
}
