import couponRepository from "../../repositories/couponRepository.js";
 
export const deleteCoupon = async (id) => {
  try {
    const found = await couponRepository.getById(id);

    if (!found) {
      throw new Error("Coupon not found");
    }

    const deleted = await couponRepository.deleteCoupon(id);
    if (!deleted) {
      throw new Error("Failed to delete product");
    }

    return true;  
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
};
