import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = { ...action.payload, product: action.payload._id };
      const exist = state.cartItems.find(x => x.product === item.product);
      if (exist) {
        exist.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(x => x.product !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCartItem(state, action) {
      const { productId, qty } = action.payload;
      const item = state.cartItems.find(x => x.product === productId);
      if (item && qty > 0) {
        item.qty = qty;
      } else if (item && qty <= 0) {
        state.cartItems = state.cartItems.filter(x => x.product !== productId);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  }
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
