import  {createProduct}  from "../usecases/product/createProduct.js";
import { deleteProduct } from "../usecases/product/deleteProduct.js";
import { getAllProduct } from "../usecases/product/getAllProducts.js";
import { getProductById } from "../usecases/product/getProductById.js";
import { updateProduct } from "../usecases/product/updateProduct.js";



const getAllProductController = async (req, res) => {
  try {
      const data = await getAllProduct()
    res.status(200).json({
        status : "success",
        message : "Products retriaved successfully",
        data : data
      })
  } catch (error) {
     res.status(error.message.includes('not found') ? 404 : 500).json({
        status: "error",
        message: error.message
      })  
  }
}


const getByIdProductController = async (req, res) => {
  try {
    const data = await getProductById(req.params.id);
     res.status(200).json({
        status : "success",
        message : "Products retriaved successfully",
        data : data
      })
  } catch (error) {
     res.status(error.message.includes('not found') ? 404 : 500).json({
        status: "error",
        message: error.message
      })  
  }
}


const createProductController = async (req, res) => {
    try {
       const product = await createProduct(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};  

const updateProductController = async (req, res) => {
    try {
        const id = req.params.id;
      const dataProduct = req.body
       const updatedProduct = await updateProduct(id, dataProduct);
         res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};  

const deleteProductController = async (req, res) => {
 
  try {
    await deleteProduct(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(error.message.includes("not found") ? 404 : 500).json({
      status: "error",
      message: error.message,
    });
  }
};


export {
  createProductController,
  deleteProductController,
  getAllProductController,
  updateProductController,
  getByIdProductController
}