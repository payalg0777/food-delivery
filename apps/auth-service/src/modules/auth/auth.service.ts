import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service'; // Make sure to create a Prisma service
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(payload) {
    const { email, password, name, userType } = payload;
    // Check if the user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User already exists with this email.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
      },
    });

    // Return user info without the password
    return { email: newUser.email, message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password.'); // Clear error for incorrect password
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }

  async user() {
    try {
      // const cookie = request.cookies['jwt'];
      // const data = await this.jwtService.verifyAsync(cookie);
      // if (!data) {
      // throw new UnauthorizedException();
      // }
      return { msg: 'success' };
    } catch (e) {
      console.log('Error: ', e);
      throw new UnauthorizedException();
    }
  }
}

// save token to shared space. Redis cache - if expired?, config file - dependency need to add, dependency injection inside other services
