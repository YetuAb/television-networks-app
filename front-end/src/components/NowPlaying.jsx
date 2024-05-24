import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, LinearProgress, Button } from '@mui/material';

const NowPlaying = () => {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nowPlaying');
      setProgram(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching now playing program:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Typography variant="h6">Now Playing</Typography>
      <Typography variant="h4">{program.title}</Typography>
      <Typography>{program.description}</Typography>
      <Box sx={{ width: '100%', marginY: 2 }}>
        <LinearProgress variant="determinate" value={program.progress} />
      </Box>
      <Button variant="contained" color="primary">Play</Button>
    </Box>
  );
};

export default NowPlaying;
