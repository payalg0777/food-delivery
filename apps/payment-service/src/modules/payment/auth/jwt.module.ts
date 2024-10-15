import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service'; // Adjust the import as needed

@Module({
  providers: [JwtService],
  exports: [JwtService], // Export JwtService so it can be used in other modules
})
export class JwtModule {}
