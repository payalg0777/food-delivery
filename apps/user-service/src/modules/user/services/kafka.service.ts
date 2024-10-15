import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['kafka:9092'], // Adjust based on your Kafka setup
  });

  private consumer = this.kafka.consumer({ groupId: 'user-group' });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'payment-status' });
    await this.consumer.subscribe({ topic: 'order-status-updates' });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // Handle the payment event here
        try {
          console.log('*****message: ', message);
          const value = message.value?.toString();
          let event;
          // Attempt to parse JSON, fallback to plain string
          try {
            event = JSON.parse(value);
          } catch (error) {
            event = { message: value, error }; // Handle as a plain string
          }
          console.log('Event successful in user:', event, ' topic: ', topic);
          if (topic === 'payment-status') {
            this.handlePaymentSuccess(event);
          } else if (topic === 'order-status-updates') {
            this.handleOrderUpdate(event);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }

  private handlePaymentSuccess(event: any) {
    console.log('Payment successful in user:', event);
  }

  private handleOrderUpdate(event: any) {
    switch (event.event) {
      case 'order-created':
        console.log('Order Created:', event.data);
        break;
      case 'order-updated':
        console.log('Order Updated:', event.data);
        break;
      case 'order-cancelled':
        console.log('Order Cancelled:', event.data);
        break;
      default:
        console.warn('Unknown event type:', event.event);
    }
  }
}
