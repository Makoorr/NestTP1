import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/addtodo.dto';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { TodoStatusEnum } from 'src/enums/todo-status.enum';

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
}
