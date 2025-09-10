import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.images[0]?.url}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
          }}>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.ratings?.average || 0} readOnly precision={0.5} size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.ratings?.count || 0} reviews)
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button variant="contained" size="small" component={Link} to={`/product/${product._id}`}>
          View Details
        </Button>
        <Button variant="outlined" size="small">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
