import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [pRes, eRes] = await Promise.all([api.get('/api/products'), api.get('/api/employees')]);
        setProductsCount(pRes.data.length);
        setEmployeesCount(eRes.data.length);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Dashboard</h1>
        <div className="cards">
          <div className="card">
            <h3>Total Products</h3>
            <div className="big">{productsCount}</div>
          </div>
          <div className="card">
            <h3>Total Employees</h3>
            <div className="big">{employeesCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
