import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto'
import { comparedPassword } from 'src/utils/bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.login(loginUserDto);
    // console.log(user, "++++++++++++++++++++++++++++");
    if (user) {
      // const matched = await comparedPassword( user.password)
      // console.log(matched, "******************************************************");
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: { _id: any; }) {
    const payload = { sub: user._id };
    return {
      data: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}