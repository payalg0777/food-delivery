import { Test, TestingModule } from '@nestjs/testing';
import { UserGatewayResolver } from './user-gateway.resolver';
import { UserGatewayService } from '../services/user-gateway.service';

describe('UserGatewayResolver', () => {
  let resolver: UserGatewayResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGatewayResolver, UserGatewayService],
    }).compile();

    resolver = module.get<UserGatewayResolver>(UserGatewayResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
