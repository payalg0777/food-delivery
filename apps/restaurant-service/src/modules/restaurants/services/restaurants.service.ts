import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from '../dtos/create-restaurant.input';
import { UpdateRestaurantInput } from '../dtos/update-restaurant.input';

@Injectable()
export class RestaurantsService {
  create(createRestaurantInput: CreateRestaurantInput) {
    return 'This action adds a new restaurant';
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantInput: UpdateRestaurantInput) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
