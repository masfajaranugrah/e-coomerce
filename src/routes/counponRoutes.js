import express from 'express';
import {createCouponControllerHandle, deleteCounponController, getAllCouponControllerHanle, getByIdCouponControllerHanle, updateCouponController} from "../controllers/couponController.js"

const router = express.Router();

router.get('/', getAllCouponControllerHanle)
router.get('/:id', getByIdCouponControllerHanle)
router.post('/', createCouponControllerHandle)
router.patch('/:id', updateCouponController)
router.delete('/:id', deleteCounponController)

export default router;