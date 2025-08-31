import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" mb={3}>Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <>
          {cartItems.map(item => <CartItem key={item.product} item={item} />)}
          <Typography variant="h6" mt={2}>Total: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={checkoutHandler}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
