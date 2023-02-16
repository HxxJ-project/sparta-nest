import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Article } from 'src/board/article.entity';

@Injectable() // 처음에 무조건 필수
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  // 생성자를 통해 DI
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // 데이터베이스 설정에 관련된 내용
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [Article],
      synchronize: true,
      // 개발버전에서는 스키마의 용이한 수정을 위해 오버라이트(배포에는 절대 true안됨)
    };
  }
}
