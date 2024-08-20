import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [UserResolver, UserService],
  controllers: [UserController],
})
export class UserModule {}
