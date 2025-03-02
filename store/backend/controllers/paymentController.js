import Coupon from "../models/couponModel.js";
import razorpay from "../lib/razorpay.js";
import Order from "../models/orderModel.js";
import crypto from "crypto";

export const createCheckoutSession = async () => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = product.price * 100; // Amount in paisa (1 = 100 paisa)
      totalAmount += amount * product.quantity;
      return {
        name: product.name,
        amount,
        quantity: product.quantity,
        currency: "INR",
      };
    });
    let coupon = null;
    let discountAmount = 0;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        const discountAmount = Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
        totalAmount -= discountAmount; //Apply discount
      }
    }

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // auto capture payment
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      discount: discountAmount / 100, // convert,back to rupees
      products: lineItems,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
      couponCode,
    } = req.body;

    // Generate HMAC SHA256 signature using Razorpay Secret Key
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    let totalAmount = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    // If a coupon was used, deactivate it
    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= (totalAmount * coupon.discountPercentage) / 100;
        await Coupon.findOneAndUpdate(
          { code: couponCode },
          { isActive: false }
        );
      }
    }

    // Create new order in database
    const newOrder = new Order({
      user: req.user._id,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified, order created successfully!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
