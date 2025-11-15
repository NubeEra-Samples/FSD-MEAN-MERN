import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', quantity: '' });

  const load = async () => {
    const res = await api.get('/api/products');
    setProducts(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    await api.post('/api/products', { ...form, price: parseFloat(form.price || 0), quantity: parseInt(form.quantity || 0) });
    setForm({ name: '', description: '', price: '', quantity: '' });
    load();
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete product?')) return;
    await api.delete(`/api/products/${id}`);
    load();
  };

  const handleEdit = async p => {
    const name = prompt('Name', p.name);
    if (name == null) return;
    const description = prompt('Description', p.description || '');
    const price = prompt('Price', p.price);
    const quantity = prompt('Quantity', p.quantity);
    await api.put(`/api/products/${p.id}`, { name, description, price: parseFloat(price), quantity: parseInt(quantity) });
    load();
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Products</h2>
        <form className="form-inline" onSubmit={handleAdd}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
          <button type="submit">Add</button>
        </form>

        <table className="list">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Price</th><th>Qty</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
