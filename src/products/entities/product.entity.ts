import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-images.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  brand: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  type: string;

  @Column('text')
  description: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('float')
  price: number;

  @Column('text')
  country: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];
}
