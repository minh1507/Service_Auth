import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/entity.base';
import { Product } from 'src/module/product/schemas/product.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Buy extends BaseEntity {
    @IsOptional()
    @Column('varchar', {
        length: 200,
        nullable: false,
    })
    name: string;

    @IsOptional()
    @Column('varchar', {
        length: 200,
        nullable: false,
    })
    address: string;

    @IsOptional()
    @Column('varchar', {
        length: 200,
        nullable: false,
    })
    phone: string;

    @IsOptional()
    @Column('varchar', {
        length: 200,
        nullable: false,
    })
    quantity: string;

    @ManyToOne(() => Product, (item) => item.buy)
    @JoinColumn()
    product: Product;
}
