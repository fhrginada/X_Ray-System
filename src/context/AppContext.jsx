import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AUTH_KEY = 'xray-auth-v2';
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auth, setAuth] = useState(() => {
    try {
      const saved = window.localStorage.getItem(AUTH_KEY);
      return saved ? JSON.parse(saved) : { isAuthenticated: false, currentUser: null };
    } catch {
      return { isAuthenticated: false, currentUser: null };
    }
  });

  useEffect(() => {
    api.getRequests().then(setRequests);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }, [auth]);

  const notify = (type, message) => {
    const item = { id: `${Date.now()}-${Math.random()}`, type, message };
    setNotifications((prev) => [item, ...prev].slice(0, 6));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== item.id));
    }, 3200);
  };

  const refreshRequests = async () => {
    const data = await api.getRequests();
    setRequests(data);
    return data;
  };

  const value = useMemo(
    () => ({
      requests,
      setRequests,
      notifications,
      notify,
      auth,
      setAuth,
      refreshRequests,
    }),
    [requests, notifications, auth],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
