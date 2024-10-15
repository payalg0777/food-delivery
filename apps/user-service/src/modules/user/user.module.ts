import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
// import { UserResolver } from './resolvers/user.resolver';
import { UserController } from './controllers/user.controller';
import { PrismaService } from './services/prisma.service';
import { KafkaConsumerService } from './services/kafka.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, KafkaConsumerService],
})
export class UserModule {}
