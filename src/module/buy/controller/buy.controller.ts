import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  import { TagEnum } from 'src/common/enum/tag.enum';
  import { SuccessResponse } from 'src/common/response/success.response';
import { BuyService } from '../service/buy.service';
import { CreateBuyDto } from '../dto/buy.dto';
  
  @Controller("buy")
  @ApiTags(TagEnum.BUY)
  export class BuyController {
    constructor(
      private readonly categoryService: BuyService
    ) { }

    @Post()
    create(@Body() request: CreateBuyDto) {
      this.categoryService.create(request);
      return SuccessResponse.base()
    }
  }
  