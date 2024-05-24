// routes/addAdmin.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const router = express.Router();
const prisma = new PrismaClient();

const userSchema = z.object({
  phoneNumber: z.string().min(6),
  password: z.string().min(6),
  username: z.string().min(1, 'Username is required'),
  userType: z.string().min(1, 'UserType is required')
});

router.post('/', async (req, res) => {
  try {
    const { phoneNumber, password, username, userType } = userSchema.parse(req.body);

    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        password,
        username,
        userType,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;
