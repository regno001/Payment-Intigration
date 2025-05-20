import { instance } from "../server.js";
import crypto from 'crypto';

// 1. Create Razorpay Order
export const processPayment = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // Razorpay works with paise
    currency: "INR"
  };

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order
  });
};

// 2. Send Razorpay Key to Frontend
export const getKey = (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
};

// 3. Payment Verification
export const paymentVerification = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Redirect to frontend success page with payment reference
    return res.redirect(
      `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
