import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/addtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { TodoStatusEnum } from 'src/enums/todo-status.enum';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    getTodos() {
        return this.todoRepository.find();
    }

    async getTodoById(id: number): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOne({where: {id: id}});
        console.log(id);
        if (!todo)
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
        return todo;
    }

    async getCountByStatus(stat: TodoStatusEnum): Promise<number>{
        return await this.todoRepository.count({where: {status: stat}});
    }

    addTodo(todo: AddTodoDto): Promise<TodoEntity> {
        const {name, description} = todo;

        const newTodo = {
            name,
            description,
        };

        return this.todoRepository.save(newTodo);
    }

    async updateTodo( id: number, sentTodo: Partial<UpdateTodoDto> ) {
        let oldTodo = await this.getTodoById(id);
        if (!oldTodo)
            throw new NotFoundException('Todo pas trouvé!');

        const newTodo: UpdateTodoDto = {
            name: sentTodo.name || oldTodo.name,
            description: sentTodo.description || oldTodo.description,
            status: sentTodo.status || oldTodo.status
        }
        await this.todoRepository.update(id,newTodo)
        return newTodo;
    }

    deleteTodoById(id: number) {
        return this.todoRepository.delete(id);
    }

    softDeleteTodoById(id: number) {
        return this.todoRepository.softDelete(id);
    }

    restoreTodoById(id: number) {
        return this.todoRepository.restore(id);
    }
}
