import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  ShoppingBag as ShoppingBagIcon,
  Star as StarIcon
} from '@mui/icons-material';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [name, setName] = useState(userInfo?.name || '');
  const [phone, setPhone] = useState(userInfo?.phone || '');

  if (!userInfo) return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography>Loading user profile...</Typography>
    </Container>
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    // TODO: dispatch update profile action
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={userInfo.avatar?.url} alt={userInfo.name} sx={{ width: 72, height: 72 }}>
                  {userInfo.name.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6">{userInfo.name}</Typography>
                  <Chip label={userInfo.role} color={userInfo.role === 'admin' ? 'secondary' : 'default'} size="small" />
                </Box>
              </Box>

              <List>
                <ListItem>
                  <ListItemIcon><EmailIcon /></ListItemIcon>
                  <ListItemText primary={userInfo.email} secondary="Email" />
                </ListItem>
                {userInfo.phone && (
                  <ListItem>
                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                    <ListItemText primary={userInfo.phone} secondary="Phone" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Edit */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Edit Profile</Typography>
            <Divider sx={{ mb: 2 }} />

            <Box component="form" onSubmit={handleUpdate}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Button type="submit" variant="contained" sx={{ mt: 2 }} startIcon={<EditIcon />}>Save Changes</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
