import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { SkillEntity } from "./skill.entity";

@Entity('cv')
export class CvEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    firstname: string

    @Column()
    age: number

    @Column()
    cin: string

    @Column()
    job: string

    @Column()
    path: string

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity

    @ManyToMany(() => SkillEntity, (skill) => skill.id)
    skill: SkillEntity

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