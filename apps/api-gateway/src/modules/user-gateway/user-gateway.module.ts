import { Module } from '@nestjs/common';
import { UserGatewayService } from './services/user-gateway.service';
import { UserGatewayResolver } from './resolvers/user-gateway.resolver';
import { UserGatewayController } from './controllers/user-gateway.controller';

@Module({
  providers: [UserGatewayResolver, UserGatewayService],
  controllers: [UserGatewayController],
})
export class UserGatewayModule {}
