import Cart from "../models/Cart.js";

// Getting cart items
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// Add to cart functionality
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cartItem = new Cart({ productId, quantity });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: "Error adding to cart" });
  }
};

// update cart item controller
export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updateCartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.status(200).json(updateCartItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating cart item" });
  }
};

// Delete Cart Item
export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Cart Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item" });
  }
};
