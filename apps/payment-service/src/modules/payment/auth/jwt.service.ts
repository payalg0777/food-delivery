import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret = 'your_jwt_secret'; // Use the same secret used in the auth service

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new UnauthorizedException(`Invalid token: ${error}`);
    }
  }
}
