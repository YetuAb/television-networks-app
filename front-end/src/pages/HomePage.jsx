import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from '../components/Sidebar';
import NowPlaying from '../components/NowPlaying';
import ProgramChoices from '../components/ProgramChoices';
import Header from '../components/Header';
import axios from 'axios';


const HomePage = () => {
  const [selectedMenu, setSelectedMenu] = useState('channels');
  const [channels, setChannels] = useState([]);
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [nowPlaying, setNowPlaying] = useState({});

  useEffect(() => {
    fetchChannels();
    fetchNowPlaying();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/channel');
      setChannels(response.data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nowPlaying');
      setNowPlaying(response.data);
    } catch (error) {
      console.error('Error fetching now playing:', error);
    }
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#10112F', color: 'white'  }}>
      <Sidebar selectedMenu={selectedMenu} onMenuSelect={handleMenuSelect} />
      <Container sx={{ flex: 1, padding: 4, position: 'relative' }}>
        <Header />
        <NowPlaying movie={nowPlaying} />
        {nowPlaying.image && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${nowPlaying.image})`,
              backgroundSize: 'cover',
              opacity: 0.1,
              zIndex: -1,
            }}
          />
        )}
        
        <ProgramChoices onChoiceSelect={(choice) => console.log(`Redirect to ${choice} page`)} />
      </Container>
    </Box>
  );
};

export default HomePage;
