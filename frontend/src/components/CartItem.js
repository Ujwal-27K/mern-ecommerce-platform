import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../slices/cartSlice';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  ButtonGroup,
  Button,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(removeFromCart(item.product));
  };

  const increaseQty = () => {
    if (item.qty < (item.stock || 10)) {
      dispatch(updateCartItem({ productId: item.product, qty: item.qty + 1 }));
    }
  };

  const decreaseQty = () => {
    if (item.qty > 1) {
      dispatch(updateCartItem({ productId: item.product, qty: item.qty - 1 }));
    } else {
      dispatch(removeFromCart(item.product));
    }
  };

  const itemTotal = (item.price * item.qty).toFixed(2);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
      {/* Product Image */}
      <Avatar
        component={Link}
        to={`/products/${item._id}`}
        src={item.images?.[0]?.url || item.image}
        alt={item.name}
        variant="rounded"
        sx={{
          width: 80,
          height: 80,
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 }
        }}
      />

      {/* Product Details */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component={Link}
          to={`/products/${item._id}`}
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' }
          }}
          noWrap
        >
          {item.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.brand}
        </Typography>
        
        {item.stock > 0 ? (
          <Chip 
            label={`${item.stock} in stock`} 
            color="success" 
            size="small" 
            variant="outlined"
          />
        ) : (
          <Chip 
            label="Out of stock" 
            color="error" 
            size="small" 
            variant="outlined"
          />
        )}
      </Box>

      {/* Price */}
      <Box sx={{ textAlign: 'center', minWidth: 80 }}>
        <Typography variant="body1" color="primary" fontWeight="medium">
          ${item.price.toFixed(2)}
        </Typography>
      </Box>

      {/* Quantity Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ButtonGroup size="small" variant="outlined">
          <IconButton onClick={decreaseQty} size="small">
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Button disabled sx={{ minWidth: 40, cursor: 'default' }}>
            {item.qty}
          </Button>
          <IconButton onClick={increaseQty} size="small" disabled={item.qty >= (item.stock || 10)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </ButtonGroup>
      </Box>

      {/* Item Total */}
      <Box sx={{ textAlign: 'center', minWidth: 80 }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ${itemTotal}
        </Typography>
      </Box>

      {/* Remove Button */}
      <IconButton 
        onClick={removeHandler} 
        color="error"
        sx={{ '&:hover': { backgroundColor: 'error.light', color: 'white' } }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;
