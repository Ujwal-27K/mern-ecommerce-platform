import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Box,
  Pagination,
  Skeleton,
  Alert,
  Chip,
  Rating,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, total, page, pages } = useSelector(state => state.products);
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    sortBy: 'createdAt',
    order: 'desc',
    priceRange: [0, 2000],
    page: 1,
    limit: 12
  });

  const categories = ['Electronics', 'Clothing', 'Home & Garden'];
  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-ratings.average', label: 'Top Rated' },
    { value: 'name', label: 'Name A-Z' }
  ];

  useEffect(() => {
    const params = {
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy.startsWith('-') ? filters.sortBy.slice(1) : filters.sortBy,
      order: filters.sortBy.startsWith('-') ? 'desc' : filters.order
    };
    
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) {
      params.priceRange = filters.priceRange;
    }
    
    dispatch(fetchProducts(params));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

  const ProductCard = ({ product }) => (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.images?.[0]?.url || '/placeholder.png'}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          {product.featured && (
            <Chip 
              label="Featured" 
              color="primary" 
              size="small" 
              sx={{ mb: 1 }} 
            />
          )}
          <Typography gutterBottom variant="h6" component="h2" noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.brand}
          </Typography>
          <Rating value={product.ratings?.average || 0} precision={0.5} readOnly size="small" />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            ({product.ratings?.count || 0})
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" color="primary" component="span">
              ${product.price.toFixed(2)}
            </Typography>
            {product.comparePrice && product.comparePrice > product.price && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                component="span" 
                sx={{ ml: 1, textDecoration: 'line-through' }}
              >
                ${product.comparePrice.toFixed(2)}
              </Typography>
            )}
          </Box>
          {product.stock > 0 ? (
            <Typography variant="body2" color="success.main">
              In Stock ({product.stock})
            </Typography>
          ) : (
            <Typography variant="body2" color="error.main">
              Out of Stock
            </Typography>
          )}
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCartIcon />}
          onClick={() => handleAddToCart(product)}
          disabled={product.stock === 0}
          size="small"
        >
          Add to Cart
        </Button>
        <IconButton color="secondary">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  const ProductSkeleton = () => (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search and Filters Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filters Row */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                label="Sort By"
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                {sortOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Typography>
            <Slider
              value={filters.priceRange}
              onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={2000}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>

        {/* Results Summary */}
        <Typography variant="body2" color="text.secondary">
          {total > 0 ? `Showing ${products.length} of ${total} products` : 'No products found'}
        </Typography>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Products Grid */}
      <Grid container spacing={3}>
        {loading ? (
          // Loading Skeletons
          Array.from({ length: filters.limit }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ProductSkeleton />
            </Grid>
          ))
        ) : products.length > 0 ? (
          // Product Cards
          products.map(product => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          // Empty State
          <Grid item xs={12}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                color: 'text.secondary'
              }}
            >
              <FilterIcon sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body2">
                Try adjusting your search or filter criteria
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Pagination */}
      {pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pages} 
            page={filters.page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton 
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
