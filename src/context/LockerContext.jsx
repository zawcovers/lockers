import React, { createContext, useContext, useState, useEffect } from 'react';

const LockerContext = createContext();

export const useLockers = () => useContext(LockerContext);

export const LockerProvider = ({ children }) => {
  const [lockers, setLockers] = useState(() => {
    const saved = localStorage.getItem('lockers');
    if (saved) return JSON.parse(saved);
    
    // Initialize 60 empty lockers
    return Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      name: '',
      type: 'Line', // 'Line', 'Leader', 'External'
      status: 'Available', // 'Available', 'Occupied'
      hasKey: true
    }));
  });

  useEffect(() => {
    localStorage.setItem('lockers', JSON.stringify(lockers));
  }, [lockers]);

  const updateLocker = (id, updates) => {
    setLockers(prev => prev.map(locker => 
      locker.id === id ? { ...locker, ...updates } : locker
    ));
  };

  const getStats = () => {
    const total = lockers.length;
    const occupied = lockers.filter(l => l.status === 'Occupied').length;
    const available = total - occupied;
    return { total, occupied, available };
  };

  return (
    <LockerContext.Provider value={{ lockers, updateLocker, getStats }}>
      {children}
    </LockerContext.Provider>
  );
};
