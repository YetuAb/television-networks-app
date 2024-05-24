import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // import useNavigate
import { Box, Grid, Typography, TextField, Button, useMediaQuery, useTheme, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import axios from 'axios';
import LoginLogo from '../assets/images/LoginLogo.png';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();  

  const handleSubmit = async () => {
    try {
      setErrors({});

      const response = await axios.post('http://localhost:5000/login', { phoneNumber, password });
      console.log('Login successful');
      console.log('Login response:', response.data);
      if (response.data.isVerified) {
        const userType = response.data.userType;
        window.localStorage.setItem('token', response.data.message);
        window.localStorage.setItem('loggedIn', true);
        if (userType === 'Admin') {
          navigate('/admin');  
        } else if (userType === 'Customer') {
          navigate('/homepage');  
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert('Endpoint not found. Please check the URL.');
        } else if (error.response.status === 400) {
          const errorObject = {};
          error.response.data.errors.forEach(err => {
            errorObject[err.path] = err.message;
          });
          setErrors(errorObject);
        } else {
          alert(`Error: ${error.response.status} - ${error.response.data.message}`);
        }
      } else {
        console.error('login error:', error);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} sx={{ backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box p={4}>
          <img src={LoginLogo} alt="Logo" style={{ height: '240px', marginLeft: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }} />
          <Typography variant="h1" color="white" fontFamily="sans-serif">T-Movie</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box p={4} width={isMobile ? '100%' : '80%'}>
          <Typography variant="h4" mb={4} fontFamily="sans-serif" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>LOGIN</Typography>
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password ? true : false}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button fullWidth variant="contained" onClick={handleSubmit} sx={{ backgroundColor: 'black', textTransform: 'none' }}>Login</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
