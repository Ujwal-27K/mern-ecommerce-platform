import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingBag as ShoppingBagIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  const { userInfo } = useSelector(state => state.auth);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch users
        const usersResponse = await api.get('/admin/users');
        setUsers(usersResponse.data.data || []);
        
        // Fetch products
        const productsResponse = await api.get('/products?limit=5');
        setProducts(productsResponse.data.data || []);
        
        // Set basic stats (these could be fetched from dedicated endpoints)
        setStats({
          totalUsers: usersResponse.data.data?.length || 0,
          totalProducts: productsResponse.data.total || 0,
          totalOrders: 0, // Would come from orders API
          totalRevenue: 0 // Would come from orders API
        });
        
        setError(null);
      } catch (err) {
        setError(err.response?.data.message || err.message);
        setUsers([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (userInfo?.role === 'admin') {
      fetchDashboardData();
    }
  }, [userInfo]);

  if (userInfo?.role !== 'admin') {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">Access denied. Admin privileges required.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">{stats.totalUsers}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Users</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <InventoryIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">{stats.totalProducts}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Products</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ShoppingBagIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">{stats.totalOrders}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Orders</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AttachMoneyIcon color="primary" sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">${stats.totalRevenue}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Revenue</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Users Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Users</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.slice(0, 5).map(user => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role} 
                            color={user.role === 'admin' ? 'secondary' : 'default'} 
                            size="small" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Products Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Products</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.slice(0, 5).map(product => (
                      <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <Chip 
                            label={product.stock} 
                            color={product.stock > 0 ? 'success' : 'error'} 
                            size="small" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
