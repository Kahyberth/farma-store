import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductImage } from './entities';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly errorService: ErrorHandlerService,
  ) {}

  create(createProductDto: CreateProductDto) {
    const { images = [], ...data } = createProductDto;
    try {
      const product = this.productRepository.create({
        ...data,
        images: images.map((item) =>
          this.productImageRepository.create({ url: item }),
        ),
      });
      this.productRepository.save(product);
    } catch (error) {
      this.errorService.errorHandler(error);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
