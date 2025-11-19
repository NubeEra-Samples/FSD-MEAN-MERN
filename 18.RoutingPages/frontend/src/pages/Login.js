import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="centered">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="note">Sample user: admin@example.com / password123</div>
    </div>
  );
}
