import { UserRoleEnum } from 'src/enums/user-role.enum'
import { TodoEntity } from 'src/todo/entities/todo.entity/todo.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, OneToMany } from 'typeorm'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER,
    })
    role: string

    @OneToMany(() => TodoEntity, (todo) => todo.id)
    todo: TodoEntity[]

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