import Coupon from "../models/couponModel.js";
import CouponEntity from "../domain/entities/coupons.entity.js";

const couponRepository = {
  async findByCode(code) {
    return await Coupon.findOne({ where: { code } });
  },

  async createCoupon(data) {
    return await Coupon.create(data);
  },

  async getAllCoupons() {
    const coupons = await Coupon.findAll();
    return coupons.map(c => CouponEntity.fromDatabase(c).toJSON());
  },

  async getById(id) {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) return null;
    return CouponEntity.fromDatabase(coupon).toJSON();
  },

async updateCoupon(id, data) {
    const [updatedCount] = await Coupon.update(data, { where: { id } });

    if (updatedCount === 0) {
      return {
        success: false,
        message: `Coupon with id ${id} not found or no changes made.`,
      };
    }

    const updatedCoupon = await Coupon.findByPk(id);
    if (!updatedCoupon) {
      return {
        success: false,
        message: `Coupon with id ${id} not found after update.`,
      };
    }

    const formatted = CouponEntity.fromDatabase(updatedCoupon).toJSON();

    return {
      success: true,
      message: "Coupon updated successfully.",
      data: formatted,
    };
  },


  async deleteCoupon(id) {
    return await Coupon.destroy({ where: { id } });
  },

  async incrementUsedCount(id) {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) return null;

    if (coupon.used_count >= coupon.usage_limit) {
      throw new Error("Kupon telah melebihi batas penggunaan");
    }

    coupon.used_count += 1;
    await coupon.save();
    return CouponEntity.fromDatabase(coupon).toJSON();
  }
};

export default couponRepository;
