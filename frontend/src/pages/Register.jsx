import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ email: '', full_name: '', phone: '', password1: '', password2: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register/', form);
      navigate('/');
    } catch (err) {
  console.log(err.response.data);
  setError(JSON.stringify(err.response.data));
}
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>TinyGood</h1>
        <p style={styles.subtitle}>create your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} name="full_name" placeholder="Full Name" onChange={handleChange} />
        <input style={styles.input} name="email" placeholder="Email" onChange={handleChange} />
        <input style={styles.input} name="phone" placeholder="Phone" onChange={handleChange} />
        <input style={styles.input} name="password1" type="password" placeholder="Password" onChange={handleChange} />
        <input style={styles.input} name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} />
        <button style={styles.button} onClick={handleSubmit}>Register</button>
        <p style={styles.link}>Already have an account? <Link to="/">Login</Link></p>
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