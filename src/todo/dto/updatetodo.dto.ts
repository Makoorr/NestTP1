import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { AddTodoDto } from './addtodo.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(AddTodoDto){
    @IsString()
    @MinLength(3, {
        message: 'Nom trop court.'
    })
    @MaxLength(10)
    name: string;
    
    @IsString()
    @MinLength(10, {
        message: 'Description trop courte.'
    })
    description: string;

    @IsEnum(TodoStatusEnum)
    status: string;
}