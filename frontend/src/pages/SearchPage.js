import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { Container, Typography, Grid, CircularProgress, Alert, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const { products, loading, error, page, pages } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ keyword }));
  }, [dispatch, keyword]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for "{keyword}"
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          {/* TODO: Add Pagination */}
        </>
      )}
    </Container>
  );
};

export default SearchPage;
