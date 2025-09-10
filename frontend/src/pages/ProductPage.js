import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice';
import api from '../utils/api';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  Chip,
  Rating,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Alert,
  Breadcrumbs,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ButtonGroup,
  TextField
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

const API_URL = process.env.REACT_APP_API_URL;

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Product not found.</Alert>
      </Container>
    );
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/">Home</Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.images?.[0]?.url || '/placeholder.png'}
              alt={product.name}
              sx={{ objectFit: 'contain', height: 400 }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.name}</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {product.brand} • SKU: {product.sku || product._id}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.ratings?.average || 0} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.ratings?.count || 0} reviews)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 2 }}>
            <Typography variant="h4" color="primary">${product.price.toFixed(2)}</Typography>
            {product.comparePrice && product.comparePrice > product.price && (
              <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ${product.comparePrice.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <ButtonGroup size="small" variant="outlined">
              <IconButton onClick={() => setQty(q => Math.max(1, q - 1))} size="small">
                <RemoveIcon />
              </IconButton>
              <Button disabled sx={{ minWidth: 40 }}>{qty}</Button>
              <IconButton onClick={() => setQty(q => Math.min((product.stock || 10), q + 1))} size="small">
                <AddIcon />
              </IconButton>
            </ButtonGroup>

            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              size="large"
              onClick={addToCartHandler}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            <IconButton color="secondary"><FavoriteIcon /></IconButton>
            <IconButton><ShareIcon /></IconButton>
          </Box>

          <Divider sx={{ my: 3 }} />

          <List>
            <ListItem>
              <ListItemText primary="Category" secondary={product.category} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Brand" secondary={product.brand} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Stock" secondary={product.stock > 0 ? `${product.stock} available` : 'Out of stock'} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
