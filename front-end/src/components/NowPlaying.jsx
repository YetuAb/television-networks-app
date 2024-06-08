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
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!program) {
    return <p>No currently playing program found.</p>;
  }

  return (
    <Box>
      <Typography variant="h6">Now Playing</Typography>
      <Typography variant="h4">{program.title}</Typography>
      <Typography>{program.description}</Typography>
      <Box sx={{ width: '100%', marginY: 2 }}>
        <LinearProgress variant="determinate" value={program.progress || 0} />
        <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>00:00</span>
          <span>{program.duration}</span>
        </Typography>
      </Box>
      <Button variant="contained" color="primary">Play</Button>
    </Box>
  );
};

export default NowPlaying;
