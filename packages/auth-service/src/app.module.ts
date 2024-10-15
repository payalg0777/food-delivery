import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
