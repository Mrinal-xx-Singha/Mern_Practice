import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Thunks for API calls
export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, product);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; //Return the deleted product's ID
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false, error: null },

  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //  Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
