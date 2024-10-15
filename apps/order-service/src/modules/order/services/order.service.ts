import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateOrderInput } from '../dto/create-order.dto';
import { UpdateOrderInput } from '../dto/update-order.dto';
import { KafkaConsumerService } from './kafka.service';
import { EventEmitter2 } from 'eventemitter2';
import { PaymentEvent } from '../events/payment-event';
// import { OrderType } from './dto/order.type';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaService: KafkaConsumerService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.on(
      'payment.status',
      this.handlePaymentStatusEvent.bind(this),
    );
  }

  async createOrder(data: CreateOrderInput) {
    const { items, customerId, restaurantId, addressId, ...rest } = data;

    // Create the order and its related order items
    const order = await this.prisma.order.create({
      data: {
        ...rest,
        customer_id: customerId,
        restaurant_id: restaurantId,
        address_id: addressId,
        items: {
          create: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true, // Include the nested items in the response
      },
    });

    await this.kafkaService.publishOrderStatusUpdate('order-created', order);

    return order;
  }

  async updateOrder(id: number, data: UpdateOrderInput) {
    const updatedOrder = this.prisma.order.update({
      where: { id },
      data: {
        status: data.status,
        updated_at: new Date(),
      },
    });
    let orderEvent = 'updated';
    if (data.status === 'P') {
      orderEvent = 'pending';
    }
    if (data.status === 'C') {
      orderEvent = 'cancelled';
    } else if (data.status === 'R') {
      orderEvent = 'rejected';
    } else if (data.status === 'F') {
      orderEvent = 'failed';
    } else if (data.status === 'D') {
      orderEvent = 'completed';
    }
    await this.kafkaService.publishOrderStatusUpdate(
      `order-${orderEvent}`,
      updatedOrder,
    );
    return updatedOrder;
  }

  async getOrderDetails(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    return order;
  }

  async getOrderById(id: number) {
    return this.getOrderDetails(id);
  }

  async getOrderHistoryOfCustomer(customerId: string) {
    const orders = await this.prisma.order.findMany({
      where: { customer_id: customerId },
      include: { items: true },
    });
    return orders;
  }

  async handlePaymentStatusEvent(event: PaymentEvent) {
    if (event.status === 'success') {
      await this.updateOrder(event.orderId, {
        status: 'D',
      }); // Update order status to 'Completed'
    } else if (event.status === 'failed') {
      await this.updateOrder(event.orderId, {
        status: 'F',
      }); // Update order status to 'Failed'
    }
  }
}
