import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const MovieCard = ({ id, title, description, videoUrl, onSave, onFavorite }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="iframe" height="140" src={videoUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onSave(id)}>Watch Later</Button>
        <Button size="small" onClick={() => onFavorite(id)}>Favorite</Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
