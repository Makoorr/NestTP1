import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot({
      //@ts-ignore
      type: process.env.DB_TYPE,
      url: process.env.DB_URL,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // autoloadentities: true,
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
