import ProductModel from '../models/productModel.js';
import Product from '../domain/entities/product.entity.js';


class ProductRepository {

    async getAllProduct() {
        try {
            const products = await ProductModel.findAll();
            return products.map(product => Product.fromDb(product.toJSON()))

        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

async getProductsByIds(ids) {
  try {
    const products = await ProductModel.findAll({
      where: {
        id: ids,
      },
    });
    return products.map(product => Product.fromDb(product.toJSON()));
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
}


    async getProductById(id) {
        try {
            const data = await ProductModel.findByPk(id);
            if (!data) return null;
            return Product.fromDb(data.toJSON());

        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    async createProduct(dataProduct) {
        try {
            const product = await ProductModel.create(dataProduct);
            return new Product(product.toJSON());
        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    async updateProduct(id, dataProduct) {
        try {
            const [affectedCount, updatedRows] = await ProductModel.update(dataProduct, {
                where: { id },
                returning: true,
            });
            if (affectedCount === 0) {
                throw new Error('Product not found');
            }

            const updatedProduct = updatedRows[0].toJSON();
            return Product.fromDb(updatedProduct);
        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    async findById(id) {
        return await ProductModel.findByPk(id);
    }

    async deleteById(id) {
        return await ProductModel.destroy({ where: { id } });
    }

    async reduceStock(productId, quantity) {
  try {
    const product = await ProductModel.findByPk(productId);

    if (!product) {
      throw new Error('Produk tidak ditemukan');
    }

    if (product.stock < quantity) {
      throw new Error(`Stok tidak cukup untuk produk ${product.name}`);
    }

    product.stock -= quantity;
    await product.save();

    return Product.fromDb(product.toJSON());
  } catch (error) {
    throw new Error('Error mengurangi stok: ' + error.message);
  }
}

}

export default new ProductRepository();