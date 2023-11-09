import { PartialType } from "@nestjs/mapped-types";
import { SkillEntity } from "../entities/skill.entity";

export class CreateCvDto {
    name: string;
    firstname: string
    age: number
    cin: string
    job: string
    path: string
    userId: number
    skill?: SkillEntity[]
}
