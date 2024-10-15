// src/middleware/auth.middleware.ts

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) {
      throw new UnauthorizedException('Token not found.');
    }

    try {
      const decoded = this.jwtService.verify(token); // Verify the token
      if (!decoded) {
        throw new UnauthorizedException('Invalid token.');
      }
      // req.user = decoded; // Attach user info to request object
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
