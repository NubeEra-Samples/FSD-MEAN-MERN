import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/employees">Employees</Link>
      </div>
      <div className="nav-right">
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
