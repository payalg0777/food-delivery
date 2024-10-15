import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Payment created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      // const userId = req.user?.sub; // Get user ID from the token payload
      // const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header
      return await this.paymentService.createPayment(createPaymentDto);
    } catch (error) {
      throw new HttpException(
        `Payment creation failed ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  async getPaymentsByOrderId(@Query('orderId') orderId: string) {
    return this.paymentService.getPaymentsByOrderId(orderId);
  }
}
