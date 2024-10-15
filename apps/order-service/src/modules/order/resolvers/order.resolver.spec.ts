import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from './order.resolver';
import { OrderService } from '../services/order.service';

describe('OrderResolver', () => {
  let resolver: OrderResolver;
  // let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderResolver, OrderService],
    }).compile();

    resolver = module.get<OrderResolver>(OrderResolver);
    // service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // Add more integration tests here
});
