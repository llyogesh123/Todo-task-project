const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fbgugrhuerhgerrguie';

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

// Get todos
router.get('/', authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

// Create todo
router.post('/', authMiddleware, async (req, res) => {
  const newTodo = await Todo.create({ ...req.body, userId: req.userId });
  res.status(201).json(newTodo);
});

// Delete todo
router.delete('/:id', authMiddleware, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
