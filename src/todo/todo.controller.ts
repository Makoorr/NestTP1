import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/addtodo.dto';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { UpdateTodoDto } from './dto/updatetodo.dto';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ) {}

    @Get('/')
    getTodos() {
        return this.todoService.getTodos();
    }

    @Get('/:id')
    getTodosById(
        @Param() params
    ) {
        return this.todoService.getTodoById(params.id);
    }

    @Get('/status/:status')
    getCountByStatus(
        @Param() params
    ){
        const status: TodoStatusEnum = params.status;
        return this.todoService.getCountByStatus(status);  
    }

    @Post('/')
    addTodo(
        @Body() newTodo: AddTodoDto
    ): Promise<TodoEntity> {
        return this.todoService.addTodo(newTodo);
    }

    @Put('/:id')
    updateTodo(
        @Param() params,
        @Body() todo: UpdateTodoDto
    ){
        const id = params.id;
        return this.todoService.updateTodo(id, todo);
    }
}
