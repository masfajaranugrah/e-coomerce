import couponRepository from "../../repositories/couponRepository.js";

export const getCouponById = async(id) => {
    const data = await couponRepository.getById(id);
     if (!data) {
            throw new Error("Coupon not found");
        }
    return data;
}