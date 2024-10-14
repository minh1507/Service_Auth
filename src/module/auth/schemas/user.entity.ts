import { IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RelationTypeBase } from '../../../common/base/class.base';
import { Type } from 'class-transformer';
import { Role } from './role.entity';
import { RootEntity } from '../../../common/base/rootEntity.base';
import { ApiProperty, PickType } from '@nestjs/swagger';

@Entity()
export class User extends RootEntity {
  // swagger
  @ApiProperty({
    description: 'Code',
    maxLength: 100,
  })

  // validate
  @IsString()
  @MaxLength(100)

  //entity
  @Column('varchar', { length: 100})
  username: string;

  // swagger
  @ApiProperty({
    description: 'Code',
    maxLength: 100,
  })

  // validate
  @IsString()
  @MaxLength(100)

  //entity
  @Column('varchar', { length: 100})
  password: string;

  // swagger
  @ApiProperty({
    description: 'Role',
    type: RelationTypeBase,
  })
  // validate
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PickType(Role, ['id']))
  // entity
  @ManyToOne(() => Role, (item) => item.user)
  @JoinColumn()
  role: Role;
}