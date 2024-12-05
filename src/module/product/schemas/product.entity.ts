import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { RootEntity } from 'src/common/base/rootEntity.base';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { File } from 'src/module/file/schemas/file.entity';
import { Category } from 'src/module/category/schemas/category.entity';
import { Buy } from 'src/module/buy/schemas/buy.entity';

@Entity()
export class Product extends RootEntity {
  @ApiProperty({
    description: 'Tiêu đề',
    example: 'Tiêu đề 1',
    maxLength: 200,
    required: true
  })
  @IsNotEmpty({
    message: 'Tiêu đề không được để trống',
  })
  @MaxLength(200, {
    message: 'Tiêu đề không được vượt quá 200 ký tự',
  })
  @Column('varchar', {
    length: 200,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    description: 'Giá cũ',
    example: 1,
    required: true
  })
  @IsNotEmpty({
    message: 'Giá cũ không được để trống',
  })
  @Column('integer', {
    nullable: false
  })
  oldPrice: number;

  @ApiProperty({
    description: 'Giá mới',
    example: 1,
    required: true
  })
  @IsNotEmpty({
    message: 'Giá mới không được để trống',
  })
  @Column('integer', {
    nullable: false
  })
  newPrice: number;

  @ApiProperty({
    description: 'Mô tả',
    example: 'Mô tả 1',
    maxLength: 1000,
    required: true
  })
  @IsOptional()
  @Column('varchar', {
    length: 1000,
    nullable: true,
  })
  description?: string;

  @OneToOne(() => File)
  @JoinColumn()
  file: File;

  @ManyToOne(() => Category, (item) => item.product)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Buy, (item) => item.product)
  buy: Buy[];
}
