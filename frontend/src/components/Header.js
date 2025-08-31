import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="navbar">
      <Link to="/">MERN E-Commerce</Link>
      <nav>
        <Link to="/cart">
          <ShoppingCartIcon /> Cart ({cartItems.length})
        </Link>
        <Link to="/">Products</Link>
        {userInfo ? (
          <>
            <Link to="/profile">{userInfo.name}</Link>
            {userInfo.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={logoutHandler}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
    