const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get all channels
router.get('/', async (req, res) => {
  try {
    const channels = await prisma.channel.findMany();
    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new channel
router.post('/', async (req, res) => {
  try {
    const { name, status, hidden } = req.body;
    const newChannel = await prisma.channel.create({
      data: {
        name,
        status: Boolean(status),  // Ensure status is a Boolean
        hidden: Boolean(hidden)   // Ensure hidden is a Boolean
      },
    });
    res.json(newChannel);
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a channel
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, hidden } = req.body;
    const updatedChannel = await prisma.channel.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        status: Boolean(status),  // Ensure status is a Boolean
        hidden: Boolean(hidden)   // Ensure hidden is a Boolean
      },
    });
    res.json(updatedChannel);
  } catch (error) {
    console.error('Error updating channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a channel
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.channel.delete({
      where: { id: parseInt(id, 10) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
