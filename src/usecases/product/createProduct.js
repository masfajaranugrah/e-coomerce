import productRepository from '../../repositories/productRepository.js';

export const createProduct = async (productData) => {
    try {
        return await productRepository.createProduct(productData);
    } catch (error) {
        throw new Error(`Failed to create product: ${error.message}`);
    }
};

