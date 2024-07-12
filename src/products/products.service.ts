import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
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

    private readonly dataSource: DataSource,
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

  async findOne(id: string) {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images, ...dataToUpdate } = updateProductDto;
    const product = await this.productRepository.preload({
      id,
      ...dataToUpdate,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (!product)
      throw new NotFoundException(`Product whit id: ${id} not found`);

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((item) =>
          this.productImageRepository.create({ url: item }),
        );
      } else {
      }
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      this.errorService.errorHandler(error);
    }
    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product)
      throw new NotFoundException(`Product whit id: ${id} not found`);
    await this.productRepository.delete(id);
    return;
  }
}
