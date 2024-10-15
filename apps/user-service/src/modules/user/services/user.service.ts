import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
// import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AddressDto } from '../dtos/address.dto';
// import { UpdateAddressDto } from '../dtos/address.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { address: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { address, ...rest } = user;
    delete rest.password;
    return {
      ...rest,
      addresses: address,
    };
  }

  async updateUserProfile(userId: number, updateData: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
    return user;
  }

  async addAddress(addressData: AddressDto) {
    const { userId, ...rest } = addressData;
    const address = await this.prisma.address.create({
      data: { ...rest, user_id: Number(userId) },
    });
    return address;
  }

  async updateAddress(addressId: number, addressData: AddressDto) {
    const address = await this.prisma.address.update({
      where: { id: addressId },
      data: addressData,
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async deleteAddress(addressId: number) {
    const address = await this.prisma.address.delete({
      where: { id: addressId },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return { message: 'Address deleted successfully' };
  }

  async getUserAddresses(userId: number) {
    const addresses = await this.prisma.address.findMany({
      where: { user_id: userId },
    });

    return addresses;
  }

  // async getOrderHistory(userId: number) {
  //   const orders = await this.prisma.order.findMany({
  //     where: { userId },
  //     include: { items: true }, // Assuming orders have associated items
  //   });
  //   return orders;
  // }

  // Additional methods for payment and preferences can be added here
}
