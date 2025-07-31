import productRepository from "../../repositories/productRepository.js";

export const updateProduct =  async(id, dataProduct) => {
    const updateProduct = await productRepository.updateProduct(id, dataProduct)
    return updateProduct
}