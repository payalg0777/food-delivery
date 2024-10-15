import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { OrderService } from './order.service';
import { PrismaService } from './prisma.service';

describe('OrderService', () => {
  let service: OrderService;
  // let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: new PrismaClient() },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    // prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more unit tests here
});
