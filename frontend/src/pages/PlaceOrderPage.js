import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../slices/cartSlice';
import api from '../utils/api';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const steps = ['Cart', 'Shipping', 'Payment', 'Place Order'];

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.auth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Get shipping address from localStorage
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');
  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const taxPrice = totalPrice * 0.08;
  const finalTotal = totalPrice + taxPrice;

  const placeOrderHandler = async () => {
    setLoading(true);
    setError('');
    
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item.product || item._id,
          name: item.name,
          image: item.images?.[0]?.url || item.image,
          price: item.price,
          qty: item.qty
        })),
        shippingAddress: {
          address: `${shippingAddress.address}`,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country
        },
        paymentMethod: 'PayPal', // Default payment method
        itemsPrice: totalPrice,
        taxPrice: taxPrice,
        shippingPrice: 0,
        totalPrice: finalTotal
      };

      const response = await api.post('/orders', orderData);
      
      setOrderId(response.data.data._id);
      setOrderSuccess(true);
      dispatch(clearCart());
      localStorage.removeItem('shippingAddress');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>Order Placed Successfully!</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your order #{orderId} has been placed and will be processed soon.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} size="large">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning">Your cart is empty. Please add items before placing an order.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={3} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      
      <Typography variant="h4" gutterBottom>Review Your Order</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Grid container spacing={3}>
        {/* Order Details */}
        <Grid item xs={12} md={8}>
          {/* Shipping Address */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <Typography>
              {shippingAddress.firstName} {shippingAddress.lastName}
            </Typography>
            <Typography>{shippingAddress.address}</Typography>
            <Typography>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
            </Typography>
            <Typography>{shippingAddress.country}</Typography>
            {shippingAddress.phone && <Typography>Phone: {shippingAddress.phone}</Typography>}
          </Paper>
          
          {/* Payment Method */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Payment Method</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CreditCardIcon />
              <Typography>PayPal / Credit Card</Typography>
            </Box>
          </Paper>
          
          {/* Order Items */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Order Items</Typography>
            <List>
              {cartItems.map((item, index) => (
                <React.Fragment key={item.product || index}>
                  <ListItem sx={{ px: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <img 
                        src={item.images?.[0]?.url || item.image || '/placeholder.png'} 
                        alt={item.name}
                        style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 16 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Items ({totalItems}):</Typography>
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Tax:</Typography>
                <Typography>${taxPrice.toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${finalTotal.toFixed(2)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={placeOrderHandler}
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/shipping')}
              >
                Back to Shipping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderPage;
