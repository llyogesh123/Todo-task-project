import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSignup} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-white">Signup</h2>
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Signup
        </button>
        <p className="text-white mt-4 text-center">
          Already have an account? <Link className="text-blue-400" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
