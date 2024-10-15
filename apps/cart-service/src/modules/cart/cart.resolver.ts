import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemDto } from './dto/cart-item.dto';
import { TotalDto } from './dto/total.dto';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query('getCart')
  getCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.getCart(id);
  }

  @Query('getAllCarts')
  getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @Mutation('createCart')
  createCart(@Args('data') data: CreateCartDto) {
    return this.cartService.createCart(data);
  }

  @Mutation('updateCart')
  updateCart(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateCartDto,
  ) {
    return this.cartService.updateCart(id, data);
  }

  @Mutation('addItem')
  addItem(
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('item') item: CartItemDto,
  ) {
    return this.cartService.addItem(cartId, item);
  }

  @Mutation('setTotal')
  setTotal(
    @Args('cartId', { type: () => Int }) cartId: number,
    @Args('total') total: TotalDto,
  ) {
    return this.cartService.setTotal(cartId, total);
  }
}
