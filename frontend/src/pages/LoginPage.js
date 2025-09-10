import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector(state => state.auth);

  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <StoreIcon color="primary" sx={{ fontSize: 48 }} />
        <Typography variant="h4" fontWeight="bold">Welcome to ShopMERN</Typography>
        <Typography variant="body2" color="text.secondary">Sign in to continue</Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Tabs value={mode} onChange={(e, v) => setMode(v)} centered sx={{ mb: 3 }}>
          <Tab label="Login" value="login" />
          <Tab label="Register" value="register" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                )
              }}
            />
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : mode === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" textAlign="center">
          By continuing, you agree to ShopMERN's Terms of Service and Privacy Policy.
        </Typography>
      </Paper>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2">
          Having trouble? <Link to="/">Contact support</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
