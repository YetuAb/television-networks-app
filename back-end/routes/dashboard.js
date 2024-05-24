const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = (io) => {
  const router = express.Router();

  router.get('/initial-data', async (req, res) => {
    try {
      const systemUserCount = await prisma.user.count();
      const programCount = await prisma.program.count();
      const channelCount = await prisma.channel.count();
      const programCategoryData = await prisma.program.groupBy({
        by: ['category'],
        _count: true,
      });
      const programTypeData = await prisma.program.groupBy({
        by: ['type'],
        _count: true,
      });

      io.emit('initialData', {
        systemUserCount,
        programCount,
        channelCount,
        programCategoryData,
        programTypeData,
      });

      res.sendStatus(200);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/update-data', async (req, res) => {
    try {
      const systemUserCount = await prisma.user.count();
      const programCount = await prisma.program.count();
      const channelCount = await prisma.channel.count();
      const programCategoryData = await prisma.program.groupBy({
        by: ['category'],
        _count: true,
      });
      const programTypeData = await prisma.program.groupBy({
        by: ['type'],
        _count: true,
      });

      const updatedData = {
        systemUserCount,
        programCount,
        channelCount,
        programCategoryData,
        programTypeData,
      };

      io.emit('updateData', updatedData);

      res.sendStatus(200);
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
