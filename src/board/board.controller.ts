import { CreateArticleDto } from './dto/create-article.dto';
import { BoardService } from './board.service';
import {
  Param,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('board') // routing path => board (...host:3000/board)
export class BoardController {
  // 서비스 주입
  constructor(private readonly boardService: BoardService) {}

  // 게시물 목록을 가져오는 API
  @Get('/articles')
  getArticles() {
    return this.boardService.getArticles();
  }

  // 게시물 상세보기 -> 게시물 ID로 확인
  @Get('/articles/:id')
  getArticleById(@Param('id') articleId: number) {
    return this.boardService.getArticleById(articleId);
  }

  // 게시물 작성
  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    // body에서 받아온 데이터들
    return this.boardService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  // 게시물 수정
  @Put('/articles/:id')
  updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
    );
  }

  // 게시물 삭제
  @Delete('/articles/:id')
  deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return this.boardService.deleteArticle(articleId, data.password);
  }
}
