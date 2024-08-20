import { Injectable } from '@nestjs/common';
import { CreateUserGatewayInput } from '../dtos/create-user-gateway.input';
import { UpdateUserGatewayInput } from '../dtos/update-user-gateway.input';

@Injectable()
export class UserGatewayService {
  create(createUserGatewayInput: CreateUserGatewayInput) {
    return 'This action adds a new userGateway';
  }

  findAll() {
    return `This action returns all userGateway`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGateway`;
  }

  update(id: number, updateUserGatewayInput: UpdateUserGatewayInput) {
    return `This action updates a #${id} userGateway`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGateway`;
  }
}
