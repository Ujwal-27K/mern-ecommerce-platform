import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  products: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Handle price range
      if (params.priceRange) {
        const [minPrice, maxPrice] = params.priceRange;
        params.minPrice = minPrice;
        params.maxPrice = maxPrice;
        delete params.priceRange;
      }

      const query = new URLSearchParams(params).toString();
      const { data } = await api.get(`/products?${query}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data.message || err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const fetchProducts = getProducts;
export default productSlice.reducer;
