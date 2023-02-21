import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async getArticlesByViewCount() {
    const result = await this.createQueryBuilder()
      .select('articles')
      .from(Article, 'articles') // alias이름으로 select, orderBy에 사용해야 함.
      .orderBy('articles.view', 'DESC')
      .getMany();
    // .getQuery(); // 로우쿼리 확인하는 메서드
    return result;
  }
  // find() 메서드 사용도 가능. service에서 작성하면 더 간결해짐
  // async getArticlesByViewCount() {
  //   const result = await this.find({
  //     order: {
  //       view: 'DESC',
  //     },
  //   });
  //   return result;
  // }
}
