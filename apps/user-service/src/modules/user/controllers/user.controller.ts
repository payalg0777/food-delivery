import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  //   UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../services/user.service';
// import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AddressDto } from '../dtos/address.dto';
// import { UpdateAddressDto } from '../dtos/update-address.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
// @UseGuards(AuthGuard('jwt')) // Protect the user endpoints with JWT auth
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/:userId')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getProfile(@Param('userId') userId: string) {
    return this.userService.getUserProfile(Number(userId));
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
  })
  async updateProfile(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserProfile(
      updateUserDto.userId,
      updateUserDto,
    );
  }

  @Post('address')
  @ApiOperation({ summary: 'Add a new address' })
  @ApiResponse({ status: 201, description: 'Address added successfully.' })
  async addAddress(@Body() createAddressDto: AddressDto) {
    return this.userService.addAddress(createAddressDto);
  }

  @Patch('address/:id')
  @ApiOperation({ summary: 'Update an existing address' })
  @ApiResponse({ status: 200, description: 'Address updated successfully.' })
  async updateAddress(
    @Param('id') id: number,
    @Body() updateAddressDto: AddressDto,
  ) {
    return this.userService.updateAddress(id, updateAddressDto);
  }

  @Delete('address/:id')
  @ApiOperation({ summary: 'Delete an address' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully.' })
  async deleteAddress(@Param('id') id: number) {
    return this.userService.deleteAddress(id);
  }

  @Get('addresses/:userId') // New endpoint to get addresses by userId
  //   @UseGuards(AuthGuard('jwt')) // Protect the endpoint
  @ApiOperation({ summary: 'Get all addresses for a user' })
  @ApiResponse({
    status: 200,
    description: 'Addresses retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getAddresses(@Param('userId') userId: string) {
    return this.userService.getUserAddresses(Number(userId)); // Convert to number
  }

  //   @Get('orders')
  //   @ApiOperation({ summary: 'Get user order history' })
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Order history retrieved successfully.',
  //   })
  //   async getOrderHistory(@Param('userId') userId: number) {
  //     return this.userService.getOrderHistory(userId);
  //   }

  // Additional endpoints for payment and preferences...
}
