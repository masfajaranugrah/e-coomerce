import express from 'express';
 
const router = express.Router();
import getShippingCostById from '../services/rajaongkirService.js';
/**
 * POST /api/shipping/cost
 * {
 *   origin: 501, // ID kota asal
 *   destination: 114, // ID kota tujuan
 *   weight: 1700, // berat dalam gram
 *   courier: "jne"
 * }
 */

router.get('/shipping-cost', async (req, res) => {
  const { origin, destination, weight, courier } = req.query;
   // Validasi input
  if (!origin || !destination || !weight || !courier) {
    return res.status(400).json({
      success: false,
      message: 'Parameter origin, destination, weight, dan courier wajib diisi.',
    });
  }

  try {
    const result = await getShippingCostById({
      origin: Number(origin),
      destination: Number(destination),
      weight: Number(weight),
      courier,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Layanan pengiriman tidak ditemukan.',
      });
    }

    return res.json({
      success: true,
      message: 'Ongkir berhasil diambil.',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


router.post('/cost', async (req, res) => {
  try {
    const { origin, destination, weight, courier } = req.body;

    // Validasi input
    if (!origin || !destination || !weight || !courier) {
      return res.status(400).json({ error: 'Mohon lengkapi origin, destination, weight, dan courier.' });
    }

    const result = await calculateShippingCost(origin, destination, weight, courier);
    res.json(result);
  } catch (error) {
    console.error('DETAIL ERROR:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Gagal menghitung ongkos kirim' });
  }
});

export default router;
