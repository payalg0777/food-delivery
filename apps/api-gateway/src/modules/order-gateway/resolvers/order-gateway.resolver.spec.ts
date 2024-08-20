import { Test, TestingModule } from '@nestjs/testing';
import { OrderGatewayResolver } from './order-gateway.resolver';
import { OrderGatewayService } from '../services/order-gateway.service';

describe('OrderGatewayResolver', () => {
  let resolver: OrderGatewayResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderGatewayResolver, OrderGatewayService],
    }).compile();

    resolver = module.get<OrderGatewayResolver>(OrderGatewayResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
