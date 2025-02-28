import Coupon from "../models/couponModel.js";
import razorpay from "../lib/razorpay.js";
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
        amount: amount,
        quantity: product.quantity,
        currency: "INR",
      };
    });
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        const discountAmount = (totalAmount * coupon.discountPercentage) / 100;
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
      products: lineItems,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
