const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const prisma = new PrismaClient();

const loginSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const generateToken = (user) => {
  return jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

router.post('/', async (req, res) => {
  try {
    const { phoneNumber, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (user && user.password === password) {
      const token = generateToken(user);
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
      res.status(200).json({ message: token, isVerified: true, userType: user.userType });
    } else {
      res.status(401).json({ error: 'Invalid phone number or password', isVerified: false });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


module.exports = router;
