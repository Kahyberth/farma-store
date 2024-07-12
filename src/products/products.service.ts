import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductImage } from './entities';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly errorService: ErrorHandlerService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { images = [], ...data } = createProductDto;
    let product: Product;
    try {
      product = this.productRepository.create({
        ...data,
        images: images.map((item) =>
          this.productImageRepository.create({ url: item }),
        ),
      });
    } catch (error) {
      this.errorService.errorHandler(error);
    }
    await this.productRepository.save(product);
    return;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;

    const product = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      },
    });

    return product;
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
