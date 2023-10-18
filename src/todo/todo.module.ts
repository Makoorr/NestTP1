import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TodoEntity]
    ),
  ],
  providers: [TodoService],
  controllers: [],
})
export class TodoModule {}
