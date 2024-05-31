const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const channels = await prisma.channel.findMany();
    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, status, hidden } = req.body;
    const newChannel = await prisma.channel.create({
      data: {
        name,
        status: Boolean(status),  
        hidden: Boolean(hidden)   
      },
    });
    res.json(newChannel);
  } catch (error) {
    console.error('Error creating channel:', error);
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, hidden } = req.body;
    const updatedChannel = await prisma.channel.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        status: Boolean(status),  
        hidden: Boolean(hidden)   
      },
    });
    res.json(updatedChannel);
  } catch (error) {
    console.error('Error updating channel:', error);
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.channel.delete({
      where: { id: parseInt(id, 10) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting channel:', error);
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.query || '';
  try {
    const channels = await prisma.channel.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
    res.json(channels);
  } catch (error) {
    console.error('Error searching channels:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
