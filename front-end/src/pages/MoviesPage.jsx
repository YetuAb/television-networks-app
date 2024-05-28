import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('recommended'); // Default filter

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/programs', {
        params: { type: filter },
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#11112D', minHeight: '100vh', color: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <IconButton onClick={() => navigate('/homepage')} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Movies</Typography>
        <IconButton sx={{ color: 'white' }}>
          <SearchIcon />
        </IconButton>
        <IconButton sx={{ color: 'white' }}>
          <AccountCircleIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
          <Typography
            variant="button"
            sx={{ cursor: 'pointer', color: filter === 'recommended' ? 'primary.main' : 'white' }}
            onClick={() => setFilter('recommended')}
          >
            Recommended
          </Typography>
          <Typography
            variant="button"
            sx={{ cursor: 'pointer', color: filter === 'popular' ? 'primary.main' : 'white' }}
            onClick={() => setFilter('popular')}
          >
            Popular
          </Typography>
          <Typography
            variant="button"
            sx={{ cursor: 'pointer', color: filter === 'featured' ? 'primary.main' : 'white' }}
            onClick={() => setFilter('featured')}
          >
            Featured
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Paper sx={{ p: 2, backgroundColor: '#191A39', color: 'white' }}>
                <Typography variant="h6">{movie.title}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="body2">{movie.duration}</Typography>
                  <Box>
                    <IconButton sx={{ color: 'white' }}>
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }}>
                      <BookmarkBorderIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Movies;
