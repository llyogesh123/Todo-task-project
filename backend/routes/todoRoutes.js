const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTodos, addTodo, deleteTodo } = require('../controllers/todoController');

router.get('/', auth, getTodos);
router.post('/', auth, addTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;
