import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { CvEntity } from "./cv.entity";

@Entity('skill')
export class SkillEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Designation: string

    @ManyToMany(() => CvEntity, (cv) => cv.id)
    cv: CvEntity

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