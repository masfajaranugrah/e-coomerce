import couponRepository from "../../repositories/couponRepository.js";

export const updateCoupon = async(id, dataCoupon) => {
    const data = await couponRepository.updateCoupon(id, dataCoupon);
    if(!data){
        throw new Error("Coupon Tidak Di temukan");
        
    }
    return data
}