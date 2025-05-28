import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContextInstance';

export default function TodoApp() {
  const { token, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTodos(res.data));
  }, [token]);

  const addTodo = async () => {
    const res = await axios.post('http://localhost:5000/api/todos', { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos([...todos, res.data]);
    setText('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">My Todos</h2>
          <button onClick={logout} className="text-red-400 hover:underline">Logout</button>
        </div>
        <div className="flex mb-4">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-grow p-2 rounded-l bg-gray-700"
            placeholder="Add a todo..."
          />
          <button onClick={addTodo} className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r">Add</button>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className="flex justify-between items-center bg-gray-700 p-2 my-2 rounded">
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} className="text-red-400 hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
