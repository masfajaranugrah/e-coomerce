import  createPaymentUse  from "../usecases/payment/createPayment.js";

const createPaymentController = async (req, res) => {
 try {
    const { productId } = req.body;
    const result = await createPaymentUse(productId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
  }
}

export {
  createPaymentController
}