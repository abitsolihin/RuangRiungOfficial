import { useState, useEffect } from 'react';
import { ADMIN_USERNAME, ADMIN_PASSWORD, STORAGE_KEYS } from '../constants/admin.constants';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    setUsername('');
    setPassword('');
  };

  return {
    isAuthenticated,
    username,
    password,
    setUsername,
    setPassword,
    login,
    logout,
  };
};
