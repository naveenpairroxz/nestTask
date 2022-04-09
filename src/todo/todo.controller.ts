import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, UseGuards } from '@nestjs/common';
// import {Todo} from './schemas/todo.schema'
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {CreateTodoDto} from '../todo/dto/create-todo.dto'
import {UpdateTodoDto} from '../todo/dto/update-todo.dto'



@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createtodo(@Res() response, @Body() todo: CreateTodoDto) {
        const newtodo = await this.todoService.create(todo);
        return response.status(HttpStatus.CREATED).json({
            newtodo
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchAll(@Res() response) {
        const todoList = await this.todoService.readAll();
        return response.status(HttpStatus.OK).json({
            todoList
        })
    }
   
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
        const todo = await this.todoService.readById(id);
        return response.status(HttpStatus.OK).json({
            todo
        })
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() todo: UpdateTodoDto) {
        const updated = await this.todoService.update(id, todo);
        return response.status(HttpStatus.OK).json({
            updated
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        const deleted = await this.todoService.delete(id);
        return response.status(HttpStatus.OK).json({
            deleted
        })
    }
}