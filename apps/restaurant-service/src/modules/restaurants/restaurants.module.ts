import { Module } from '@nestjs/common';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantsResolver } from './resolvers/restaurants.resolver';
import { RestaurantsController } from './controllers/restaurants.controller';

@Module({
  providers: [RestaurantsResolver, RestaurantsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
