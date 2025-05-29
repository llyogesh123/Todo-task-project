const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || '8f7d1c2e-4b6a-4e2f-9c3d-7a1b2c3d4e5f';
const JWT_EXPIRES_IN = '2d';

// Signup Controller
const signupUser = async (req, res) => {
  try {
    const { clerkId, username, email, password, name, imageUrl } = req.body;
    if (!clerkId || !username || !email || !password) {
      return res.status(400).json({ message: 'clerkId, username, email, and password are required.' });
    }

    const existingUser = await User.findOne({ $or: [{ clerkId }, { username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      clerkId,
      username,
      email,
      password: hashedPassword,
      name,
      imageUrl,
    });

    return res.status(201).json({
      user: {
        id: newUser._id,
        clerkId: newUser.clerkId,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        imageUrl: newUser.imageUrl,
      },
      message: 'Signup successful',
    });
  } catch (err) {
    console.error('Signup failed:', err);
    res.status(500).json({ message: 'Signup failed' });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ username });
if (!user || !user.password) {
  return res.status(400).json({ message: 'Invalid credentials.' });
}

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        clerkId: user.clerkId,
        name: user.name,
        imageUrl: user.imageUrl,
      },
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Routes
router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;