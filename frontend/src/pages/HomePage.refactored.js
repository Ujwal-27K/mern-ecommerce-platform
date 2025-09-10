import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import {
  Container,
  Typography,
  Grid,
  Box,
  Pagination,
  Skeleton,
  Alert,
  TextField,
  InputAdornment,
  Card,
  CardContent
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error, page, pages, total } = useSelector(state => state.products);

  const [filters, setFilters] = useState({
    search: '',
    category: [],
    sortBy: 'createdAt',
    order: 'desc',
    priceRange: [0, 2000],
    page: 1,
    limit: 12,
    minRating: 0,
  });

  useEffect(() => {
    const params = {
      page: filters.page,
      limit: filters.limit,
      sortBy: filters.sortBy.startsWith('-') ? filters.sortBy.slice(1) : filters.sortBy,
      order: filters.sortBy.startsWith('-') ? 'desc' : 'asc',
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      minRating: filters.minRating,
    };

    if (filters.search) params.search = filters.search;
    if (filters.category.length > 0) params.category = filters.category.join(',');

    dispatch(getProducts(params));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value }));
  };

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
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Products
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {total > 0 ? `Showing ${products.length} of ${total} products` : 'No products found'}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {loading ? (
              Array.from({ length: filters.limit }).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <ProductSkeleton />
                </Grid>
              ))
            ) : products.length > 0 ? (
              products.map(product => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
