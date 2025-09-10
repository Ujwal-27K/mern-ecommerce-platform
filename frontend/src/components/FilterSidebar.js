import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../slices/categorySlice';
import { Box, Typography, List, ListItem, ListItemText, Checkbox, Slider, Rating, Divider, CircularProgress } from '@mui/material';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    const newCategories = filters.category?.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...(filters.category || []), category];
    onFilterChange('category', newCategories);
  };

  const handlePriceChange = (event, newValue) => {
    onFilterChange('priceRange', newValue);
  };

  const handleRatingChange = (event, newValue) => {
    onFilterChange('minRating', newValue);
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider />

      {/* Category Filter */}
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Category
        </Typography>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <List dense>
            {categories.map((category) => (
              <ListItem key={category._id} disablePadding>
                <Checkbox
                  edge="start"
                  checked={filters.category?.includes(category.name) || false}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Divider />

      {/* Price Range Filter */}
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={filters.priceRange || [0, 1000]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{ mx: 1 }}
        />
      </Box>
      <Divider />

      {/* Rating Filter */}
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Rating
        </Typography>
        <Rating
          name="rating-filter"
          value={filters.minRating || 0}
          onChange={handleRatingChange}
        />
      </Box>
    </Box>
  );
};

export default FilterSidebar;
