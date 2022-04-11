import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { comparedPassword, hashPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';




@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
    ) { }

    async create(user: CreateUserDto) {
        const password = hashPassword(user.password)
        // console.log('hash passwoed=======>>>>>',password);
        const createdUser = new this.userModel({...user, password});
        return await createdUser.save();
    }

    async login(user: LoginUserDto): Promise<any> {
        // this.userModel.findOne({ email: user.email }, async (err: any, data: any) => {
        //     if (data == null) {
        //         console.log(data,"=============>>>>>>>>>");               
        //         // return err               
        //         //no email exist in db
        //     } else {
        //         if (data.email == user.email) {
        //             bcrypt.compare(user.password, data.password, async function (err, hash_result) {
        //                 console.log(hash_result, "<<<<============");
                        
        //             });
        //         }
        //     }
            
        // })
        return await this.userModel.findOne(user).lean();

    }

    async editUser(user: UpdateUserDto): Promise<any> {
        return await this.userModel.findOneAndUpdate(user).exec()
    }

    async findUserById(userId: any) {
        return await this.userModel.findById(userId).lean();
    }

}