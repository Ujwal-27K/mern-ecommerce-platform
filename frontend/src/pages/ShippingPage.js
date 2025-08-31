import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShippingPage = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    // Save shipping info in localStorage or redux if needed
    navigate('/placeorder');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" mb={3}>Shipping Address</Typography>
      <form onSubmit={submitHandler} noValidate>
        <TextField label="Address" value={address} required fullWidth margin="normal" onChange={e => setAddress(e.target.value)} />
        <TextField label="City" value={city} required fullWidth margin="normal" onChange={e => setCity(e.target.value)} />
        <TextField label="Postal Code" value={postalCode} required fullWidth margin="normal" onChange={e => setPostalCode(e.target.value)} />
        <TextField label="Country" value={country} required fullWidth margin="normal" onChange={e => setCountry(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Continue</Button>
      </form>
    </Box>
  );
};

export default ShippingPage;
