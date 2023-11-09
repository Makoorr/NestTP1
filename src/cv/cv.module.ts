import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { UserModule } from 'src/user/user.module';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [CvEntity, SkillEntity]
    ),
    UserModule
  ],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
