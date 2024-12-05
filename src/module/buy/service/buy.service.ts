import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buy } from '../schemas/buy.entity';
import { CreateBuyDto } from '../dto/buy.dto';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(Buy)
    protected buyRepository: Repository<Buy>,
  ) {}
  async create(
    request: CreateBuyDto,
  ) {
    const buyer = {
      name: request.name,
      address: request.address,
      phone: request.phone,
      quantity: request.quantity,
      product: {
        id: Number(request.productId)
      },
      isPurchase: false
    } 

    this.buyRepository.save(buyer)
  }

  async findAll(){
    const data = await this.buyRepository.find({
      relations: {
        product: true
      },
      order: {
        createdAt: "DESC"
      }
    })

    return data
  }
}
