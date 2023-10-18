import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: 'Nom trop court.'
    })
    @MaxLength(10)
    name: string;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    @MinLength(10, {
        message: 'Description trop courte.'
    })
    description: string;
    
    @Column({
        type: 'enum',
        enum: TodoStatusEnum,
        default: TodoStatusEnum.PENDING,
    })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @VersionColumn()
    version: number;
}
