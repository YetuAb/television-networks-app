import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, IconButton, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/programs');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleBack = () => {
    history.push('/homepage');
  };

  return (
    <Box sx={{ backgroundColor: '#11112D', minHeight: '100vh', py: 4, px: 2 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton color="inherit" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">Movies</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Box>
      <Container>
        <Grid container spacing={3}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6">{movie.title}</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="body2">{movie.duration}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <IconButton color="inherit">
                    {/* Play icon */}
                  </IconButton>
                  <IconButton color="inherit">
                    {/* Watch-later icon */}
                  </IconButton>
                  <IconButton color="inherit">
                    {/* Favorites icon */}
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MoviesPage;
