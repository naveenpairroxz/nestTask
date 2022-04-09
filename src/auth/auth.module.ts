import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
// import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JwtService,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // UsersService
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }