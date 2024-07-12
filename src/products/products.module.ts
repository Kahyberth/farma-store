import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductImage } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ErrorHandlerService],
  imports: [TypeOrmModule.forFeature([ProductImage, Product])],
})
export class ProductsModule {}
