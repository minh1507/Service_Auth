import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TagEnum } from 'src/common/enum/tag.enum';
import { SuccessResponse } from 'src/common/response/success.response';
import { FileService } from '../service/file.service';
import { FileDto } from '../dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
@ApiTags(TagEnum.FILE)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() payload: FileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.fileService.upload(file)
    return SuccessResponse.response(data);
  }

  @Get(':id')
  async url(
    @Param('id') id: string
  ) {
    const data = await this.fileService.url(id)
    return SuccessResponse.response(data);
  }

  @Get()
  async findAll() {
    const data = await this.fileService.findAll()
    return SuccessResponse.response(data);
  }
}
