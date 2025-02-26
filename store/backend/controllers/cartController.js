import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = req.user;

    //  Find the item
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // Increment the quantity
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in the addToCart Controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      // return empty cart item if we dont have productId
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    // remaned id for readability
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity === 0) {
        // if quantity is zero delete the product from the cart
        user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        // save changes
        await user.save();
        // return response
        return res.json(user.cartItems);
      }
      //   Decrement or increment
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not dound" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });

    // Add a quantity for each products

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return {
        ...product.toJSON(),
        quantity: item.quantity,
      };
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
