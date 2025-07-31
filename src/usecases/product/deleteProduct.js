import productRepository from "../../repositories/productRepository.js";

export const deleteProduct = async (id) => {
  try {
    const found = await productRepository.findById(id);

    if (!found) {
      throw new Error("Product not found");
    }

    const deleted = await productRepository.deleteById(id);
    if (!deleted) {
      throw new Error("Failed to delete product");
    }

    return true;  
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};
