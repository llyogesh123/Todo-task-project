const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || '8f7d1c2e-4b6a-4e2f-9c3d-7a1b2c3d4e5f';

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Get all todos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// Get todo by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todo' });
  }
});

// Create todo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { text, completed } = req.body;
    const newTodo = new Todo({
      text,
      completed: completed || false,
      userId: req.userId
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update todo
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { text, completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found or not authorized' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// Delete todo
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Todo not found or not authorized' });
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

module.exports = router;