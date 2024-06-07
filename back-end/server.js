const express = require('express');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const { PrismaClient } = require('@prisma/client');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const prisma = new PrismaClient();

const dashboard = require('./routes/dashboard')(io); 
const addAdmin = require('./routes/addAdmin');
const userData = require('./routes/userData');
const login = require('./routes/login');
const programs = require('./routes/programs');
const channels = require('./routes/channel');
const nowPlaying = require('./routes/nowPlaying');

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use('/addAdmin', addAdmin);
app.use('/userData', userData);
app.use('/login', login);
app.use('/programs', programs);
app.use('/dashboard', dashboard);
app.use('/channel', channels);
app.use('/nowPlaying', nowPlaying);

io.on('connection', (socket) => {
  console.log('New client connected');

  fetchInitialData().then((data) => socket.emit('initialData', data));

  socket.on('getInitialData', async () => {
    const data = await fetchInitialData();
    socket.emit('initialData', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const fetchInitialData = async () => {
  const systemUserCount = await prisma.user.count();
  const programCount = await prisma.program.count();
  const channelCount = await prisma.channel.count();
  const programCategoryData = await prisma.program.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
  });
  const programTypeData = await prisma.program.groupBy({
    by: ['type'],
    _count: {
      type: true,
    },
  });

  const transformedCategoryData = programCategoryData.map(data => ({
    category: data.category,
    count: data._count.category,
  }));

  const transformedTypeData = programTypeData.map(data => ({
    type: data.type,
    count: data._count.type,
  }));

  return {
    systemUserCount,
    programCount,
    channelCount,
    programCategoryData: transformedCategoryData,
    programTypeData: transformedTypeData,
  };
};

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
