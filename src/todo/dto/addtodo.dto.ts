import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class AddTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: 'Nom trop court.'
    })
    @MaxLength(10)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10, {
        message: 'Description trop courte.'
    })
    description: string;

    userId: number;
}