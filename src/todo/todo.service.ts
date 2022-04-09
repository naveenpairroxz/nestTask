import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<any>,
    ) { }

    async create(Todo: any): Promise<any> {
        const newTodo = new this.todoModel(Todo);
        return newTodo.save();
    }

    async readAll(): Promise<any[]> {
        return await this.todoModel.find().exec();
    }

    async readById(id: any): Promise<any> {
        return await this.todoModel.findById(id).exec();
    }

    async update(id: any, todo: any): Promise<any> {
        return await this.todoModel.findByIdAndUpdate(id, todo, { new: true })
    }

    async delete(id: any): Promise<any> {
        return await this.todoModel.findByIdAndRemove(id);
    }

}