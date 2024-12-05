import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { postgresOption } from './config/data-source.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { CategoryModule } from './module/category/category.module';
import { MinioModule } from './module/minio/minio.module';
import { FileModule } from './module/file/file.module';
import { ProductModule } from './module/product/product.module';
import { AnonymousModule } from './module/anonymous/anonymous.module';
import { BuyModule } from './module/buy/buy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => postgresOption,
    }),
    AuthModule,
    CategoryModule,
    MinioModule,
    FileModule,
    ProductModule,
    AnonymousModule,
    BuyModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
