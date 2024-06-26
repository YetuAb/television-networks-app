const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const programs = await prisma.program.findMany();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, duration, description, status, videoUrl, category, type } = req.body;
    const newProgram = await prisma.program.create({
      data: {
        title,
        duration,
        description, 
        status: Boolean(status),
        videoUrl,
        category,
        type,
      },
    });
    res.json(newProgram);
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, description, status, videoUrl, category, type, hidden } = req.body;
    const updatedProgram = await prisma.program.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        duration,
        description,
        status: status !== undefined ? Boolean(status) : undefined,
        videoUrl,
        category,
        type,
        hidden: hidden !== undefined ? Boolean(hidden) : undefined,
      },
    });
    res.json(updatedProgram);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.program.delete({
      where: { id: parseInt(id, 10) },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const programs = await prisma.program.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      }
    });
    res.json(programs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
