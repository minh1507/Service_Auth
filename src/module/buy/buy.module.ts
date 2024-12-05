import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buy } from './schemas/buy.entity';
import { BuyController } from './controller/buy.controller';
import { BuyService } from './service/buy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Buy])],
  controllers: [BuyController],
  providers: [BuyService]
})
export class BuyModule {}
