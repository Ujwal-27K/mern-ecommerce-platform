import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
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
    </>
  );
}

export default App;
