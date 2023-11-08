import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import * as dotenv from 'dotenv';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserModule } from './user/user.module';

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
    TodoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(
      {path: 'todo', method: RequestMethod.GET},
      {path: 'todo*', method: RequestMethod.POST},
      {path: 'todo*', method: RequestMethod.PUT},
    );
  }

}