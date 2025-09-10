import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary'
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            size="large"
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Shopping Cart ({totalItems} items)
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2 }}>
            {cartItems.map((item, index) => (
              <Box key={item.product}>
                <CartItem item={item} />
                {index < cartItems.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal ({totalItems} items):</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax:</Typography>
                <Typography>${(totalPrice * 0.08).toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${(totalPrice + totalPrice * 0.08).toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={checkoutHandler}
                sx={{ mb: 2 }}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
