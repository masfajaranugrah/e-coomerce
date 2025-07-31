import productRepository from "../../repositories/productRepository.js";

export const getProductById = async (id) => {
    try {
        const data = await productRepository.getProductById(id);
        if (!data) {
            throw new Error("Product not found");
        }
        return data;
    } catch (error) {
        throw new Error(`Failed to get product: ${error.message}`);
    }
};
