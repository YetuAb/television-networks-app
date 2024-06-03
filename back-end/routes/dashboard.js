const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = (io) => {
  const router = express.Router();

  router.get('/initial-data', async (req, res) => {
    try {
      const initialData = await fetchInitialData();
      io.emit('initialData', initialData);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/update-data', async (req, res) => {
    try {
      const updatedData = await fetchInitialData();
      io.emit('updateData', updatedData);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};

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
