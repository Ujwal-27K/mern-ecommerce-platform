import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <IconButton
          component={Link}
          to="/"
          sx={{ mr: 2 }}
          color="inherit"
        >
          <StoreIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold'
            }}
          >
            ShopMERN
          </Typography>
        </IconButton>

        {/* Search */}
        <SearchBox />

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Products Link */}
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              display: { xs: 'none', md: 'block' },
              textDecoration: location.pathname === '/' ? 'underline' : 'none'
            }}
          >
            Products
          </Button>

          {/* Cart Button */}
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Menu */}
          {userInfo ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar 
                  src={userInfo.avatar?.url} 
                  alt={userInfo.name}
                  sx={{ width: 32, height: 32 }}
                >
                  {userInfo.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {/* User Info */}
                <MenuItem onClick={() => handleNavigation('/profile')}>
                  <Avatar 
                    src={userInfo.avatar?.url} 
                    alt={userInfo.name}
                  >
                    {userInfo.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {userInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userInfo.email}
                    </Typography>
                  </Box>
                </MenuItem>
                
                <Divider />
                
                {/* Profile */}
                <MenuItem onClick={() => handleNavigation('/profile')}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>My Profile</ListItemText>
                </MenuItem>

                {/* Admin Dashboard */}
                {userInfo.role === 'admin' && (
                  <MenuItem onClick={() => handleNavigation('/admin')}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Admin Dashboard</ListItemText>
                  </MenuItem>
                )}

                <Divider />
                
                {/* Logout */}
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<AccountCircleIcon />}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
    