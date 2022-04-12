import { Body, Controller, Get, Param, Post, Put, Res, HttpStatus, UseGuards, Request } from '@nestjs/common';
// import { Users } from './schemas/users.schema'
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { response } from 'express';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/ChangePassword-user.dto';




@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    async createUsers(@Res() response, @Body() createUserDto: CreateUserDto) {
        const newUsers = await this.usersService.create(createUserDto);
        return response.status(HttpStatus.CREATED).json({
            newUsers
        })
    }

    @Post('/changePassword')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Res() response, @Body() changePasswordDto:ChangePasswordDto ){
        const changePassword = await this.usersService.changePassword(changePasswordDto);
        return response.status(HttpStatus.OK).json({
            changePassword
        })
    }


    // @Get('/test')
    // @UseGuards(JwtAuthGuard)
    // testAuthRoute(@Request() req) {
    //     return req.user;
    // }


}