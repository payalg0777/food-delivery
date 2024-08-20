import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserGatewayModule } from './user-gateway/user-gateway.module';
import { OrderGatewayModule } from './order-gateway/order-gateway.module';

@Module({
  imports: [UserGatewayModule, OrderGatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
