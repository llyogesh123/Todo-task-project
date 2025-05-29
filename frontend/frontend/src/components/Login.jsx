import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContextInstance';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

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
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
        <p className="text-white mt-4 text-center">
          Don't have an account? <Link className="text-blue-400" to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
