import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
    ) { }

    async create(user: CreateUserDto) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async login(user: LoginUserDto): Promise<any> {
        return await this.userModel.findOne(user).lean();
    }

    async editUser(user: UpdateUserDto): Promise<any> {
        return await this.userModel.findOneAndUpdate(user).exec()
    }

    async findUserById(userId: any) {
        return await this.userModel.findById(userId).lean();
    }

}