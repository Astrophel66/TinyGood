import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/completion/history/');
      setHistory(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Link to="/home" style={styles.back}>← Back</Link>
          <h2 style={styles.title}>Your History</h2>
        </div>
        {history.length === 0 ? (
          <p style={styles.empty}>No completed acts yet. Start today!</p>
        ) : (
          history.map((item) => (
            <div key={item.id} style={styles.item}>
              <p style={styles.itemAct}>{item.act.act}</p>
              <p style={styles.itemDate}>{new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', width: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '80vh', overflowY: 'auto' },
  header: { display: 'flex', alignItems: 'center', gap: '1rem' },
  back: { color: '#4f46e5', textDecoration: 'none', fontSize: '0.875rem' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#1a1a2e', margin: 0 },
  empty: { textAlign: 'center', color: '#888' },
  item: { background: '#f7f7ff', borderRadius: '10px', padding: '1rem' },
  itemAct: { margin: '0 0 0.25rem', color: '#1a1a2e', fontWeight: '500' },
  itemDate: { margin: 0, color: '#888', fontSize: '0.8rem' }
};