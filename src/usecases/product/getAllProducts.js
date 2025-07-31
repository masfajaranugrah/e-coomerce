 import productRepository from "../../repositories/productRepository.js";

 export const getAllProduct = async () => {
   try {
    const data = await productRepository.getAllProduct();
    return  data
  } catch (error) {
           throw new Error(`Failed to retriaved product: ${error.message}`);

  }
 }