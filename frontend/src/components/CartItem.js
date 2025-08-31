import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../slices/cartSlice';
import { Button, IconButton, Box, Typography, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(removeFromCart(item.product));
  };

  const qtyChangeHandler = (e) => {
    dispatch(addToCart({...item, qty: Number(e.target.value)}));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p={1} borderBottom="1px solid #ccc">
      <img src={item.image} alt={item.name} width={80} />
      <Typography variant="subtitle1" sx={{ flex: 1, ml: 2 }}>{item.name}</Typography>
      <Typography variant="subtitle1">${item.price.toFixed(2)}</Typography>
      <Select value={item.qty} onChange={qtyChangeHandler} size="small" sx={{ width: 60, ml: 2 }}>
        {[...Array(item.countInStock).keys()].map(x => (
          <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
        ))}
      </Select>
      <IconButton onClick={removeHandler} color="error" sx={{ ml: 2 }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;
