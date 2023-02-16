import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  // constructor(
  //   @InjectRepository(Article) private articleRepository: Repository<Article>,
  // ) {}

  // 원래는 repository를 참조하여 비지니스 로직을 실행을 해야하지만 여기서는 인-메모리로 해결
  private articles = [];

  private articlePassword = new Map();

  getArticles() {
    return this.articles;
  }

  getArticleById(id: number) {
    return this.articles.find((article) => {
      return article.id === id;
    });
  }

  createArticle(title: string, content: string, password: number) {
    const articleId = this.articles.length + 1;
    this.articles.push({ id: articleId, title, content });
    this.articlePassword.set(articleId, password);
    return articleId;
  }

  updateArticle(id: number, title: string, content: string, password: number) {
    if (this.articlePassword.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id:' + id);
    }

    const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException('Article not found. id:' + id);
    }

    article.title = title;
    article.content = content;
  }

  deleteArticle(id: number, password: number) {
    if (this.articlePassword.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id:' + id);
    }

    // article 배열안에 인자값으로 전달받은 id가 아닌것만 필터링
    this.articles = this.articles.filter((article) => {
      return article.id !== id;
    });
  }
}
