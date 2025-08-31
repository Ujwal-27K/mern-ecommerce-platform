import React from 'react';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';

const PlaceOrderPage = () => {
  const { cartItems } = useSelector(state => state.cart);

  const placeOrderHandler = () => {
    // Integrate order API call to backend here
    alert("Order placed! (Implement order submission)");
  };

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" mb={3}>Place Order</Typography>
      <List>
        {cartItems.map(item => (
          <ListItem key={item.product} sx={{ justifyContent: 'space-between' }}>
            <Typography>{item.name} x {item.qty}</Typography>
            <Typography>${(item.price * item.qty).toFixed(2)}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
        </ListItem>
      </List>
      <Button variant="contained" color="primary" fullWidth onClick={placeOrderHandler}>
        Place Order
      </Button>
    </Box>
  );
};

export default PlaceOrderPage;
