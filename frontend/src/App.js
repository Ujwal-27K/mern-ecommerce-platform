import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import SearchPage from './pages/SearchPage';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/search" element={<Navigate to="/" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<PrivateRoute><ShippingPage /></PrivateRoute>} />
          <Route path="/placeorder" element={<PrivateRoute><PlaceOrderPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="app-footer">
          <div className="footer-trademark">
            <p>
              Built by{" "}
              <a
                href="https://portfolio-eta-blush-qsq9j1ksqi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Ujwal Khairnar</strong>
              </a>
            </p>
            <p>© 2025 Ujwal Khairnar. All rights reserved.</p>
            <div className="footer-links">
              <a
                href="https://github.com/Ujwal-27K"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/ujwal-khairnar"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a href="mailto: ujwal.khairnar.uk@gmail.com">Contact</a>
            </div>
          </div>
        </footer>
    </ThemeProvider>
  );
}

export default App;
