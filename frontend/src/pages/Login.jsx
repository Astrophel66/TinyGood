import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login/', form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/home');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>TinyGood</h1>
        <p style={styles.subtitle}>one kind act a day</p>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} name="email" placeholder="Email" onChange={handleChange} />
        <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button style={styles.button} onClick={handleSubmit}>Login</button>
        <p style={styles.link}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', width: '360px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { fontSize: '2rem', fontWeight: '700', color: '#1a1a2e', textAlign: 'center', margin: 0 },
  subtitle: { color: '#888', textAlign: 'center', margin: 0, fontSize: '0.9rem' },
  input: { padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem', outline: 'none' },
  button: { padding: '0.75rem', borderRadius: '8px', background: '#4f46e5', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
  error: { color: '#e53e3e', fontSize: '0.875rem', textAlign: 'center' },
  link: { textAlign: 'center', fontSize: '0.875rem', color: '#888' }
};