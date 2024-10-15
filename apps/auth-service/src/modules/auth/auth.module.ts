import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Use a strong secret
      signOptions: { expiresIn: '60s' }, // Token expiration
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
