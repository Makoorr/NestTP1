import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/addtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';

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
        if (todo)
            return todo;
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }

    addTodo(todo: AddTodoDto): Promise<TodoEntity> {
        const {name, description} = todo;

        const newTodo = {
            name,
            description,
        };

        return this.todoRepository.save(newTodo);
    }

    updateTodo(todo: UpdateTodoDto) {
        return this.todoRepository.save(todo);
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
