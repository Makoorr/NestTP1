import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TodoEntity]
    ),
    UserModule,
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
