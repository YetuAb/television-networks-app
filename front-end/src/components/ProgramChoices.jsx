import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import liveTvIcon from '../assets/images/live-tv-icon.png';
import moviesIcon from '../assets/images/movies-icon.png';
import tvShowsIcon from '../assets/images/tv-shows-icon.png';
import sportsIcon from '../assets/images/sports-icon.png';

const ProgramChoices = ({ onChoiceSelect }) => {
  const choices = [
    { name: 'Live TV', description: '+5000 Channels', image: liveTvIcon },
    { name: 'Movies', description: '+500 Movies', image: moviesIcon },
    { name: 'TV Shows', description: '+900 Series', image: tvShowsIcon },
    { name: 'Sports', description: '+200 Channels', image: sportsIcon },
  ];

  return (
    <Grid container spacing={2}>
      {choices.map(choice => (
        <Grid item xs={12} sm={6} md={3} key={choice.name}>
          <Paper
            sx={{
              backgroundColor: '#191A39',
              padding: 2.5,
              cursor: 'pointer',
              marginTop: 10,
              color: 'white',
            }}
            onClick={() => onChoiceSelect(choice.name)}
          >
            <Box
              component="img"
              src={choice.image}
              alt={choice.name}
              sx={{
                display: 'block', 
                width: '100%', 
                height: 'auto',
                margin: 'auto',
                marginBottom: 2,
                borderRadius: '4px',
              }}
            />
            <Typography variant="subtitle1" sx={{ marginTop: 1, textAlign: 'start', }}>{choice.name}</Typography>
            <Typography variant="subtitle2" sx={{ marginTop: 1, textAlign: 'start', }}>{choice.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProgramChoices;
