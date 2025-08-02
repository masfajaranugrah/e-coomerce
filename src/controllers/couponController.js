import couponRepository from "../repositories/couponRepository.js";
import CouponEntity from "../domain/entities/coupons.entity.js";
import { getAllCoupons } from "../usecases/coupons/getAllCoupons.js";
import { getCouponById } from "../usecases/coupons/getByIdCoupons.js";
import { updateCoupon } from "../usecases/coupons/updateCoupon.js";
import { deleteCoupon } from "../usecases/coupons/deleteCoupon.js";

const getAllCouponControllerHanle = async (req, res) => {
    try {
        const coupon = await getAllCoupons();
          res.status(200).json({
        status : "success",
        message : "Coupon retriaved successfully",
        data : coupon
      })
    } catch (error) {
          res.status(error.message.includes('not found') ? 404 : 500).json({
        status: "error",
        message: error.message
      })  
    }
}

const getByIdCouponControllerHanle = async (req, res) => {
    try {
        const id = req.params.id;
        const coupon = await getCouponById(id);
          res.status(200).json({
        status : "success",
        message : "Coupon retriaved successfully",
        data : coupon
      })
    } catch (error) {
          res.status(error.message.includes('not found') ? 404 : 500).json({
        status: "error",
        message: error.message
      })  
    }
}

const createCouponControllerHandle = async (req, res) => {
  try {
    const data = req.body;

    console.log("🚀 Incoming data:", data);

    const requiredFields = ["code", "type", "amount", "expires_at"];
    for (let field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ message: `Field '${field}' wajib diisi` });
      }
    }

    if (!["percent", "fixed"].includes(data.type)) {
      return res.status(400).json({ message: "Tipe kupon harus 'percent' atau 'fixed'" });
    }

    const created = await couponRepository.createCoupon(data);
    const entity = CouponEntity.fromDatabase(created);
    return res.status(201).json({
      message: "Kupon berhasil dibuat",
      data: entity.toJSON()
    });

  } catch (error) {
    console.error("❌ Error creating coupon:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateCouponController = async (req, res) => {
    try {
        const id = req.params.id;
       const dataCoupon = req.body
       const updatedCoupon = await updateCoupon(id, dataCoupon);
         res.status(200).json({
      data: updatedCoupon,
    });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};  

const deleteCounponController = async (req, res) => {
 
  try {
    await deleteCoupon(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    return res.status(error.message.includes("not found") ? 404 : 500).json({
      status: "error",
      message: error.message,
    });
  }
};


export {
    createCouponControllerHandle,
    getAllCouponControllerHanle,
    updateCouponController,
    getByIdCouponControllerHanle,
    deleteCounponController
}