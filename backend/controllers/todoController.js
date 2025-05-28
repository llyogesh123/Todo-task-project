const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text, user: req.user.id });
  await todo.save();
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: 'Deleted' });
};
