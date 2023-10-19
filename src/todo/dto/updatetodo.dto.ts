import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { AddTodoDto } from './addtodo.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(AddTodoDto){
    @IsOptional()
    name: string;
    
    @IsOptional()
    description: string;

    @IsEnum(TodoStatusEnum)
    @IsOptional()
    status: string;
}