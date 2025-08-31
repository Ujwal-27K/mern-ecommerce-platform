import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>
              <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.name} width={150} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
