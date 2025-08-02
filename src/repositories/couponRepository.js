import Coupon from "../models/couponModel.js";
import CouponEntity from "../domain/entities/coupons.entity.js";
import db from "../config/database.js";
const couponRepository = {
  /**
   * Cari kupon berdasarkan kode
   * @param {string} code
   */
  async findByCode(code) {
    return await Coupon.findOne({ where: { code } });
  },

  /**
   * Buat kupon baru
   * @param {object} data
   */
  async createCoupon(data) {
    return await Coupon.create(data);
  },

 async  getByCode(code) {
  return await Coupon.findOne({ where: { code } });
},

 
  /**
   * Ambil semua kupon dan konversi ke entitas
   */
  async getAllCoupons() {
    const coupons = await Coupon.findAll();
    return coupons.map(c => CouponEntity.fromDatabase(c).toJSON());
  },

  /**
   * Ambil kupon berdasarkan ID
   * @param {string} id
   */
  async getById(id) {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) return null;
    return CouponEntity.fromDatabase(coupon).toJSON();
  },

  /**
   * Update kupon berdasarkan ID
   * @param {string} id
   * @param {object} data
   */
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

  /**
   * Hapus kupon berdasarkan ID
   * @param {string} id
   */
  async deleteCoupon(id) {
    return await Coupon.destroy({ where: { id } });
  },

  /**
   * Tambahkan penggunaan kupon sebanyak 1x
   * @param {string} id
   */
  async incrementUsedCount(id) {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) throw new Error("Kupon tidak ditemukan");

    if (coupon.used_count >= coupon.usage_limit) {
      throw new Error("Kupon telah melebihi batas penggunaan");
    }

    coupon.used_count += 1;
    await coupon.save();

    return CouponEntity.fromDatabase(coupon).toJSON();
  }
};

export default couponRepository;
