import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparedPassword, hashPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/ChangePassword-user.dto';


import * as bcrypt from 'bcrypt';




@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<any>,
    ) { }

    async create(user: CreateUserDto) {
        const password = hashPassword(user.password)
        console.log('hash password=======>>>>>',password);
        const createdUser = new this.userModel({...user, password});
        return await createdUser.save();

        // this.userModel.findOne({ email: user.email }, async (err: any, data: any) => {
        //     if (data == null) {
        //         bcrypt.genSalt(10, async function (err, salt) {
        //             await bcrypt.hash(user.password, salt, async function (err, hash_password) {
        //                 console.log('=====>', hash_password);
                        
        //                 const createdUser = new this.userModel({ ...user, password: hash_password });
        //                 return await createdUser.save();
        //             });
        //         });
        //     } else {
        //         console.log('err==============>>>>', err);
        //         return null
        //     }
        // });
    }

    async login(dto: LoginUserDto): Promise<any> {
        // let match;
        // await this.userModel.findOne({ email: user.email }, async (err: any, data: any) => {
        //     if (data == null) {
        //         console.log(data,"=============>>>>>>>>>");               
        //         // return err               
        //         //no email exist in db
        //     } else {
        //         if (data.email == user.email) {

        //             await bcrypt.compare(user.password, data.password, async function (err, hash_result) {
        //                 console.log('=========>>>>>>',hash_result);
        //                 match = true;
        //             });
        //         }
        //     }
        // });
        // if(match) {
        //     console.log(match, "++++++++++++++++++++++++++++++++++++++++++++");
        //     return await this.userModel.findOne(user).lean();
        // }
        // else {
        //     return;
        // }

        const user = await this.userModel.findOne({ email: dto.email }).lean();
        const match = await bcrypt.compare(dto.password, user.password);
        if (match) {
            console.log(match, "++++++++++++++++++++++++++++++++++++++++++++");
            return user;
        }
        return;
    }

    async changePassword(dto: ChangePasswordDto): Promise<any> {
        const user = await this.userModel.findOne({ email: dto.email }).lean();
        const match = await bcrypt.compare(dto.oldPassword, user.password);
        if (match) {
            console.log(user,'sdfghj2345678=========>>>>');
            const password = hashPassword(dto.newPassword)

            // const salt = await bcrypt.genSalt(10);
            // const password = await bcrypt.hash(dto.newPassword, salt)
            // console.log(dto.newPassword,'sdfghjsdfghjk');
            
            return await this.userModel.updateOne({ ...user, password: password }, { new: true });
        } else {
            return;
        }
    }



    async editUser(user: UpdateUserDto): Promise<any> {
        return await this.userModel.findOneAndUpdate(user).exec()
    }

    async findUserById(userId: any) {
        return await this.userModel.findById(userId).lean();
    }

}