import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { Repository } from 'typeorm';
import { AddTodoDto } from './dto/addtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
    constructor(
        @Inject(UserService)
        private userService: UserService,
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    async getTodos(take?: number, skip?: number) {
        if (!take || !skip)
        {
            const todos: TodoEntity[] = await this.todoRepository
                .createQueryBuilder("todo")
                .leftJoin('todo.user', 'user')
                .addSelect([
                    'user.id',
                    'user.username'
                ])
                .getMany();
            return todos;
        }    
        
        const todos: TodoEntity[] = await this.todoRepository
            .createQueryBuilder("todo")
            .leftJoinAndSelect('todo.user', 'user')
            .select([
                'user.id',
                'user.username'
            ])
            .take(take)
            .skip(skip)
            .getMany();

        return todos;
    }

    async getTodoById(id: number): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOne({
            where: {id: id},
            relations: ['user']
        });
        if (!todo)
            throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
        return todo;
    }

    getTodoBy(param1: string, status: TodoStatusEnum) {
        const res = this.todoRepository
            .createQueryBuilder('todo')
            .where('todo.name LIKE :param1', {param1: `%${param1}%`})
            .orWhere('todo.description LIKE :param1', {param1: `%${param1}%`})
            .andWhere('todo.status LIKE :status', {status: `%${status}%`})
            .getMany();
        return res;
    }

    async getCountByStatus(stat: TodoStatusEnum): Promise<number>{
        return await this.todoRepository.count({where: {status: stat}});
    }

    async addTodo(todo: AddTodoDto): Promise<TodoEntity> {
        const {name, description, userId} = todo;

        // look for users by userId
        const user = await this.userService.getUserbyId(userId);
        if(!user)
            throw new UnauthorizedException('Non autorisé.')
        
        const newTodo = {
            name,
            description,
            user,
        };

        try {
            const result = await this.todoRepository.save(newTodo);
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateTodo(id: number, sentTodo: Partial<UpdateTodoDto>) {
        let oldTodo = await this.getTodoById(id);
        if (!oldTodo)
            throw new NotFoundException('Todo pas trouvé!');

        // look for users by userId
        const user = await this.userService.getUserbyId(sentTodo?.userId);
        if(!user)
            throw new UnauthorizedException('User Non autorisé.')
        
        console.log(user);
        console.log(oldTodo);

        if(user.id !== oldTodo.user?.id)
            throw new UnauthorizedException('Non autorisée.')

        const newTodo = {
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
