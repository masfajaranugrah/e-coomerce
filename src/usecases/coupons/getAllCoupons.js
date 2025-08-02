import couponRepository from "../../repositories/couponRepository.js";

export const getAllCoupons = async() => {
    const data = await couponRepository.getAllCoupons();
    return data;
}