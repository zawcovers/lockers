import React, { useState } from 'react';
import { LockerProvider } from './context/LockerContext';
import AdminPanel from './components/AdminPanel';
import PublicPanel from './components/PublicPanel';
import './index.css';

function App() {
  const [view, setView] = useState('admin'); // 'admin' or 'public'

  return (
    <LockerProvider>
      <div className="app-container">
        {/* Navigation / Toggle - In a real app this might be protected or hidden */}
        <nav style={{ position: 'fixed', top: 10, right: 10, zIndex: 100 }}>
          {view === 'admin' ? (
            <button
              onClick={() => setView('public')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Go to Public View
            </button>
          ) : (
            <button
              onClick={() => setView('admin')}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: 'rgba(255,255,255,0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Admin
            </button>
          )}
        </nav>

        {view === 'admin' ? <AdminPanel /> : <PublicPanel />}
      </div>
    </LockerProvider>
  );
}

export default App;
