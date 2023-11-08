import { TodoStatusEnum } from 'src/enums/todo-status.enum';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @CreateDateColumn({
        update: false,
    })
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @VersionColumn()
    version: number;
}
