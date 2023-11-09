import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as ngneat from '@ngneat/falso';
import { CvService } from '../cv/cv.service';
import { CvEntity } from '../cv/entities/cv.entity';
import { UserService } from '../user/user.service';
import { UserRoleEnum } from '../enums/user-role.enum';
import { CreateCvDto } from '../cv/dto/create-cv.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dbService = app.get(CvService);
  for (let i=0; i<10; i++) {
        const fakeData: CreateCvDto = {
            name: ngneat.randUserName(),
            firstname: ngneat.randFirstName(),
            age: ngneat.rand([20, 30]),
            cin: ngneat.rand([1,2,3,4,5,6,7,8,9], {length: 8}).toString(),
            job: ngneat.randJobTitle(),
            path: ngneat.randJobArea(),
            userId: ngneat.rand([2, 3, 4]),
            }
        ngneat.seed();
        await dbService.create(fakeData);
    }
  await app.close();
}
bootstrap();