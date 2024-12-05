import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../schemas/category.entity';
import { CreateCategoryDto, ListCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { CustomBadRequestException } from 'src/common/exeption/bad-request.exeption';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    protected categoryRepository: Repository<Category>,
  ) {}

  async list(request: ListCategoryDto){
    return await this.categoryRepository.find({
      skip: request.offset,
      take: request.limit,
      order: {
        id: "DESC"
      }
    })
  }

  async detail(id: number){
    return await this.categoryRepository.findOne({
      where: {
        id: id
      }
    })
  }

  async create(
    request: CreateCategoryDto,
  ) {
    this.categoryRepository.save(request)
  }

  async update(
    request: UpdateCategoryDto,
    id: number
  ) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id
      }
    })

    if(!category){
      return new CustomBadRequestException("Danh mục không tồn tại")
    }

    category.code = request.code as string
    category.name = request.name as string

    this.categoryRepository.save(category)
  }

  async delete(
    id: number
  ){
    const category = await this.categoryRepository.findOne({
      where: {
        id: id
      }
    })

    if(!category){
      return new CustomBadRequestException("Danh mục không tồn tại")
    }

    this.categoryRepository.delete(category)
  }
}
