import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  LocalShipping as LocalShippingIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const steps = ['Cart', 'Shipping', 'Payment', 'Place Order'];

const ShippingPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart);
  
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  const handleInputChange = (field) => (event) => {
    setShippingData({ ...shippingData, [field]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Save shipping info in localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
    navigate('/placeorder');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Grid container spacing={3}>
        {/* Shipping Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <LocalShippingIcon color="primary" />
              <Typography variant="h5">Shipping Address</Typography>
            </Box>
            
            <Box component="form" onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    value={shippingData.firstName}
                    onChange={handleInputChange('firstName')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    value={shippingData.lastName}
                    onChange={handleInputChange('lastName')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    value={shippingData.address}
                    onChange={handleInputChange('address')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    value={shippingData.city}
                    onChange={handleInputChange('city')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State/Province"
                    value={shippingData.state}
                    onChange={handleInputChange('state')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Postal Code"
                    value={shippingData.postalCode}
                    onChange={handleInputChange('postalCode')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country"
                    value={shippingData.country}
                    onChange={handleInputChange('country')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    value={shippingData.phone}
                    onChange={handleInputChange('phone')}
                    fullWidth
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Continue to Payment
                </Button>
              </Box>
            </Box>
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
                <Typography>${(totalPrice * 0.08).toFixed(2)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${(totalPrice + totalPrice * 0.08).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShippingPage;
