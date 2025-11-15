import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', position: '', email: '', salary: '' });

  const load = async () => {
    const res = await api.get('/api/employees');
    setEmployees(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    await api.post('/api/employees', { ...form, salary: parseFloat(form.salary || 0) });
    setForm({ name: '', position: '', email: '', salary: '' });
    load();
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete employee?')) return;
    await api.delete(`/api/employees/${id}`);
    load();
  };

  const handleEdit = async emp => {
    const name = prompt('Name', emp.name);
    if (name == null) return;
    const position = prompt('Position', emp.position || '');
    const email = prompt('Email', emp.email || '');
    const salary = prompt('Salary', emp.salary || 0);
    await api.put(`/api/employees/${emp.id}`, { name, position, email, salary: parseFloat(salary) });
    load();
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Employees</h2>
        <form className="form-inline" onSubmit={handleAdd}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Position" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Salary" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
          <button type="submit">Add</button>
        </form>

        <table className="list">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Position</th><th>Email</th><th>Salary</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>{emp.salary}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
