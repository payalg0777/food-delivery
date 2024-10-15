import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItemDto } from './dto/cart-item.dto';
import { TotalDto } from './dto/total.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(data: CreateCartDto) {
    return this.prisma.cart.create({
      data,
    });
  }

  async updateCart(id: number, data: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }

  async addItem(cartId: number, item: CartItemDto) {
    return this.prisma.cartItem.create({
      data: { ...item, cart_id: cartId },
    });
  }

  async setTotal(cartId: number, total: TotalDto) {
    return this.prisma.total.upsert({
      where: { cart_id: cartId },
      update: total,
      create: { cart_id: cartId, ...total },
    });
  }

  async getCart(id: number) {
    return this.prisma.cart.findUnique({
      where: { id },
      include: { items: true, totals: true },
    });
  }

  async getAllCarts() {
    return this.prisma.cart.findMany({
      include: { items: true, totals: true },
    });
  }
}
