import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TagEnum } from 'src/common/enum/tag.enum';
import { SuccessResponse } from 'src/common/response/success.response';
import { FileService } from '../service/file.service';
import { FileDto } from '../dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'stream';

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
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const stream  = await this.fileService.url(id)

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${id}"`);

    // Pipe the stream to the response
    stream.pipe(res);
  }

  @Get()
  async findAll() {
    const data = await this.fileService.findAll()
    return SuccessResponse.response(data);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number
  ) {
    await this.fileService.delete(id)
    return SuccessResponse.base();
  }
}
