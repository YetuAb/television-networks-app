import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { VictoryPie, VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import PeopleIcon from '@mui/icons-material/People'; // Import PeopleIcon

const socket = io('http://localhost:5000/dashboard');

const Dashboard = () => {
  const [systemUserCount, setSystemUserCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);
  const [programCategoryData, setProgramCategoryData] = useState([]);
  const [programTypeData, setProgramTypeData] = useState([]);

  useEffect(() => {
    socket.emit('getInitialData');
    
    socket.on('initialData', data => {
      setSystemUserCount(data.systemUserCount);
      setProgramCount(data.programCount);
      setChannelCount(data.channelCount);
      setProgramCategoryData(data.programCategoryData);
      setProgramTypeData(data.programTypeData);
    });

    socket.on('updateData', data => {
      setSystemUserCount(data.systemUserCount);
      setProgramCount(data.programCount);
      setChannelCount(data.channelCount);
      setProgramCategoryData(data.programCategoryData);
      setProgramTypeData(data.programTypeData);
    });

    return () => {
      socket.off('initialData');
      socket.off('updateData');
    };
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'start' }}>
            <Typography variant="h6">System Users</Typography>
            <Typography variant="h6">
               {systemUserCount}<PeopleIcon sx={{marginLeft:14}} />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'start' }}>
            <Typography variant="h6">Programs</Typography>
            <Typography variant="h6">{programCount}<PeopleIcon sx={{marginLeft:14}} /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'start' }}>
            <Typography variant="h6">Channels</Typography>
            <Typography variant="h6">{channelCount}<PeopleIcon sx={{marginLeft:14,}} /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Programs by Category</Typography>
            <VictoryPie data={programCategoryData} x="category" y="count" />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Programs by Type</Typography>
            <VictoryChart>
              <VictoryAxis tickFormat={programTypeData.map(d => d.type)} />
              <VictoryAxis dependentAxis />
              <VictoryLine data={programTypeData} x="type" y="count" />
            </VictoryChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
