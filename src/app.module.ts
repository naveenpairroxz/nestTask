import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TodoModule,
    MongooseModule.forRoot('mongodb+srv://practice:practice123@cluster0.keloo.mongodb.net/nestTask'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
