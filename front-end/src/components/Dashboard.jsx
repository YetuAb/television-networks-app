import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { VictoryPie, VictoryLine, VictoryChart, VictoryAxis, VictoryLegend } from 'victory';
import PeopleIcon from '@mui/icons-material/People';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [systemUserCount, setSystemUserCount] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [channelCount, setChannelCount] = useState(0);
  const [programCategoryData, setProgramCategoryData] = useState([]);
  const [programTypeData, setProgramTypeData] = useState([]);
  const [colorScale, setColorScale] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    socket.emit('getInitialData');

    socket.on('initialData', data => {
      setSystemUserCount(data.systemUserCount);
      setProgramCount(data.programCount);
      setChannelCount(data.channelCount);
      setProgramCategoryData(data.programCategoryData.map(d => ({ x: d.category, y: d.count })));
      setProgramTypeData(data.programTypeData.map(d => ({ x: daysOfWeek.indexOf(d.day), y: d.count, type: d.type })));
      setColorScale(data.programCategoryData.map((_, index) => `hsl(${(index * 360) / data.programCategoryData.length}, 70%, 50%)`));
    });

    socket.on('updateData', data => {
      setSystemUserCount(data.systemUserCount);
      setProgramCount(data.programCount);
      setChannelCount(data.channelCount);
      setProgramCategoryData(data.programCategoryData.map(d => ({ x: d.category, y: d.count })));
      setProgramTypeData(data.programTypeData.map(d => ({ x: daysOfWeek.indexOf(d.day), y: d.count, type: d.type })));
      setColorScale(data.programCategoryData.map((_, index) => `hsl(${(index * 360) / data.programCategoryData.length}, 70%, 50%)`));
    });

    return () => {
      socket.off('initialData');
      socket.off('updateData');
    };
  }, []);

  const programTypeLineData = programTypeData.reduce((acc, curr) => {
    const typeIndex = acc.findIndex(line => line.name === curr.type);
    if (typeIndex === -1) {
      acc.push({ name: curr.type, data: [{ x: curr.x, y: curr.y }] });
    } else {
      acc[typeIndex].data.push({ x: curr.x, y: curr.y });
    }
    return acc;
  }, []);

  // Determine the maximum y value for setting the y-axis domain
  const maxY = Math.max(...programTypeData.map(d => d.y), 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'start' }}>
            <Typography variant="h6">System Users</Typography>
            <Typography variant="h6">
              {systemUserCount}<PeopleIcon sx={{ marginLeft: 14 }} />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'start' }}>
            <Typography variant="h6">Programs</Typography>
            <Typography variant="h6">{programCount}<PeopleIcon sx={{ marginLeft: 14 }} /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: 'start' }}>
            <Typography variant="h6">Channels</Typography>
            <Typography variant="h6">{channelCount}<PeopleIcon sx={{ marginLeft: 14 }} /></Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Programs by Category</Typography>
            <VictoryPie 
              data={programCategoryData}
              colorScale={colorScale}
              x="x" 
              y="y" 
            />
            <VictoryLegend x={50} y={10}
              orientation="vertical"
              gutter={20}
              data={programCategoryData.map((d, index) => ({
                name: d.x,
                symbol: { fill: colorScale[index] }
              }))}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Programs by Type</Typography>
            <VictoryChart>
              <VictoryAxis 
                tickFormat={daysOfWeek} 
                style={{
                  tickLabels: { angle: -45, fontSize: 10, padding: 15 }
                }}
              />
              <VictoryAxis 
                dependentAxis
                tickValues={[...Array(Math.ceil(maxY) + 1).keys()]} // Ensure y-axis ticks are whole numbers
              />
              {programTypeLineData.map((line, index) => (
                <VictoryLine 
                  key={index} 
                  data={line.data} 
                  x="x" 
                  y="y"
                  style={{ data: { stroke: colorScale[index % colorScale.length] } }} 
                />
              ))}
              <VictoryLegend x={50} y={10}
                orientation="vertical"
                gutter={20}
                data={programTypeLineData.map((line, index) => ({
                  name: line.name,
                  symbol: { fill: colorScale[index % colorScale.length] }
                }))}
              />
            </VictoryChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
