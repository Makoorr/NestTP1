import { PartialType } from "@nestjs/mapped-types";
import { SkillEntity } from "../entities/skill.entity";
import { IsNotEmpty } from "class-validator";

export class CreateCvDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    firstname: string

    @IsNotEmpty()
    age: number
    
    @IsNotEmpty()
    cin: string
    
    @IsNotEmpty()
    job: string
    
    @IsNotEmpty()
    path: string

    @IsNotEmpty()
    userId: number

    skill?: SkillEntity[]
}
