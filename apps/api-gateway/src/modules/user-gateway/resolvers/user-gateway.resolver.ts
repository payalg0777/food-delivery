import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserGatewayService } from '../services/user-gateway.service';
import { UserGateway } from '../entities/user-gateway.entity';
import { CreateUserGatewayInput } from '../dtos/create-user-gateway.input';
import { UpdateUserGatewayInput } from '../dtos/update-user-gateway.input';

@Resolver(() => UserGateway)
export class UserGatewayResolver {
  constructor(private readonly userGatewayService: UserGatewayService) {}

  @Mutation(() => UserGateway)
  createUserGateway(
    @Args('createUserGatewayInput')
    createUserGatewayInput: CreateUserGatewayInput,
  ) {
    return this.userGatewayService.create(createUserGatewayInput);
  }

  @Query(() => [UserGateway], { name: 'userGateway' })
  findAll() {
    return this.userGatewayService.findAll();
  }

  @Query(() => UserGateway, { name: 'userGateway' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userGatewayService.findOne(id);
  }

  @Mutation(() => UserGateway)
  updateUserGateway(
    @Args('updateUserGatewayInput')
    updateUserGatewayInput: UpdateUserGatewayInput,
  ) {
    return this.userGatewayService.update(
      updateUserGatewayInput.id,
      updateUserGatewayInput,
    );
  }

  @Mutation(() => UserGateway)
  removeUserGateway(@Args('id', { type: () => Int }) id: number) {
    return this.userGatewayService.remove(id);
  }
}
