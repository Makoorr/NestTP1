import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
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
