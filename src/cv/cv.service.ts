import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CvService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @InjectRepository(CvEntity)
    private readonly cvRepository: Repository<CvEntity>
  ){}

  async findAll(userId: number) {
    let cvs;
    
    // look for users by userId
    const user = await this.userService.getUserbyId(userId);
    if(!user)
        throw new UnauthorizedException('User Non autorisé.')

    cvs = await this.cvRepository
      .createQueryBuilder("cv")
      .where("user.id = :userId", { userId })
      .leftJoin("cv.user", "user")
      .addSelect([
        "user.id",
        "user.username",
      ])
      .getMany();
    return cvs;
  }

  async findOne(id: number) {
    const cv = await this.cvRepository.findOne({
      where: {id: id},
      relations: ['user', 'skill'],
    });

    if(!cv) {
      throw new NotFoundException("Le CV n'existe pas");
    }

    return cv;
  }

  async create(createCv: CreateCvDto) {
    const userId = createCv.userId;
    let newCv;

    // look for users by userId
    const user = await this.userService.getUserbyId(userId);
    if(!user)
      throw new UnauthorizedException('Non autorisé.')
    if (createCv.skill) {
      newCv = {
        name: createCv.name,
        firstname: createCv.firstname,
        age: createCv.age,
        cin: createCv.cin,
        job: createCv.job,
        path: createCv.path,
        user,
        skill: createCv.skill
      }
    } else {
      newCv = {
        name: createCv.name,
        firstname: createCv.firstname,
        age: createCv.age,
        cin: createCv.cin,
        job: createCv.job,
        path: createCv.path,
        user,
      }
    }

    try {
      await this.cvRepository.save(newCv);
      const result = {
        createCv,
        user: {
          id: userId,
          username: user.username
        }
      }
      return result;
    } catch (e) {
        throw new Error(e);
    }
  }

  async update(id: number, updateCv: UpdateCvDto) {
    let oldCv = await this.findOne(id);
    if (!oldCv)
        throw new NotFoundException('Cv pas trouvé!');
    
    // look for users by userId
    const user = await this.userService.getUserbyId(updateCv?.userId);
    if(!user)
        throw new UnauthorizedException('User Non autorisé.')
    
    if(user.id !== oldCv.user?.id)
      throw new UnauthorizedException('Non autorisée.')

    const newCv = {
      name: updateCv.name || oldCv.name,
      firstname: updateCv.firstname || oldCv.firstname,
      age: updateCv.age || oldCv.age,
      cin: updateCv.cin || oldCv.cin,
      job: updateCv.job || oldCv.job,
      path: updateCv.path || oldCv.path,
    }

    await this.cvRepository.update(id,newCv)
    return newCv;
  }

  async remove(data: {cvId: number, userId: number}) {
    // look for cv by cvId
    let oldCv = await this.findOne(data.cvId);
    if (!oldCv)
        throw new NotFoundException('Cv non trouvé!');

    // look for users by userId
    try {
      const user = await this.userService.getUserbyId(data.userId);
      if(!user)
        throw new UnauthorizedException('Non autorisé.')
      
      if(user.id !== oldCv.user.id){
        throw new UnauthorizedException('Non autorisé.')
      }
    } catch (e) {
      throw new UnauthorizedException('Non autorisé.')
    }

    return this.cvRepository.delete(data.cvId);
  }
}
