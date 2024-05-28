const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const nowPlaying = await prisma.program.findFirst({
      where: {
        title: "Gray's Anatomy,"
      },
    });

    if (!nowPlaying) {
      return res.status(404).json({ error: 'No currently playing program found' });
    }

    res.json(nowPlaying);
  } catch (error) {
    console.error('Error fetching now playing program:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
