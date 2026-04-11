import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function Home() {
  const [act, setAct] = useState(null);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAct();
    fetchStreak();
  }, []);

  const fetchAct = async () => {
    try {
      const res = await api.get('/acts/today/');
      setAct(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/');
    }
  };

  const fetchStreak = async () => {
    try {
      const res = await api.get('/completion/streak/');
      setStreak(res.data.streak);
    } catch (err) {}
  };

  const handleComplete = async () => {
    try {
      await api.post('/completion/complete/');
      setCompleted(true);
      setMessage('Great job! 🎉');
      fetchStreak();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>TinyGood</h2>
          <button style={styles.logout} onClick={handleLogout}>Logout</button>
        </div>
        <div style={styles.streak}>🔥 {streak} day streak</div>
        <div style={styles.actCard}>
          <p style={styles.label}>Today's Kind Act</p>
          <p style={styles.actText}>{act ? act.act : 'Loading...'}</p>
        </div>
        {message && <p style={styles.message}>{message}</p>}
        <button style={completed ? styles.buttonDone : styles.button} onClick={handleComplete} disabled={completed}>
          {completed ? '✓ Completed' : 'Mark as Done'}
        </button>
        <Link to="/history" style={styles.historyLink}>View History →</Link>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', width: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#1a1a2e', margin: 0 },
  logout: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.875rem' },
  streak: { textAlign: 'center', fontSize: '1.25rem', fontWeight: '600', color: '#4f46e5' },
  actCard: { background: '#f7f7ff', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' },
  label: { fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.75rem' },
  actText: { fontSize: '1.1rem', color: '#1a1a2e', lineHeight: '1.6', margin: 0, fontWeight: '500' },
  button: { padding: '0.75rem', borderRadius: '8px', background: '#4f46e5', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' },
  buttonDone: { padding: '0.75rem', borderRadius: '8px', background: '#48bb78', color: 'white', border: 'none', fontSize: '1rem', fontWeight: '600', cursor: 'not-allowed' },
  message: { textAlign: 'center', color: '#48bb78', fontWeight: '500' },
  historyLink: { textAlign: 'center', color: '#4f46e5', fontSize: '0.875rem', textDecoration: 'none' }
};