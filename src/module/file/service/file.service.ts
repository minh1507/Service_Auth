import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../schemas/file.entity';
import { Repository } from 'typeorm';
import { MinioService } from 'src/module/minio/minio.service';
import { Product } from 'src/module/product/schemas/product.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    protected fileRepository: Repository<File>,

    @InjectRepository(Product)
    protected productRepository: Repository<Product>,

    private readonly minioService: MinioService,
    
  ) {}

  async upload(file: Express.Multer.File) {
    const key = await this.minioService.createFile(file, true, 'file');

    const saveFile = await this.fileRepository.save({
      file: key.trim(),
      originName: this.minioService.originalName(file.originalname),
      mimetype: file.mimetype,
    });

    return saveFile
  }

  async url(id: string) {
    return await this.minioService.findOneFile(id, 'file')
  }

  async findAll(){
    const file = await this.fileRepository.find();
    const newFile: any[] = []

    for (var i = 0; i < file.length; i++){
      const producs = await this.productRepository.find({
        where: {
          file: {
            id: file[i].id
          }
        }
      })

      if(!producs.length){
        newFile.push(file[i])
      }
    }

    return newFile
  }

  async delete(id: number) {
    await this.fileRepository.delete(id)
  }
}
