// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey', // Use environment variable
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthGuard],
  exports: [AuthService, AuthGuard, PassportModule], // Export for use in other modules
})
export class AuthModule {}
