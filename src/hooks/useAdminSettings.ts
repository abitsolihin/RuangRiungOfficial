import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/admin.constants';

export const useAdminSettings = () => {
  const [topupEnabled, setTopupEnabled] = useState(true);
  const [wartitleEnabled, setWartitleEnabled] = useState(true);

  useEffect(() => {
    const savedTopupStatus = localStorage.getItem(STORAGE_KEYS.TOPUP_ENABLED);
    if (savedTopupStatus !== null) {
      setTopupEnabled(savedTopupStatus === 'true');
    }
    
    const savedWartitleStatus = localStorage.getItem(STORAGE_KEYS.WARTITLE_ENABLED);
    if (savedWartitleStatus !== null) {
      setWartitleEnabled(savedWartitleStatus === 'true');
    }
  }, []);

  const toggleTopup = () => {
    const newStatus = !topupEnabled;
    setTopupEnabled(newStatus);
    localStorage.setItem(STORAGE_KEYS.TOPUP_ENABLED, String(newStatus));
  };
  
  const toggleWartitle = () => {
    const newStatus = !wartitleEnabled;
    setWartitleEnabled(newStatus);
    localStorage.setItem(STORAGE_KEYS.WARTITLE_ENABLED, String(newStatus));
  };

  return {
    topupEnabled,
    toggleTopup,
    wartitleEnabled,
    toggleWartitle,
  };
};

export const getTopupStatus = (): boolean => {
  const savedStatus = localStorage.getItem(STORAGE_KEYS.TOPUP_ENABLED);
  return savedStatus === null ? true : savedStatus === 'true';
};

export const getWartitleStatus = (): boolean => {
  const savedStatus = localStorage.getItem(STORAGE_KEYS.WARTITLE_ENABLED);
  return savedStatus === null ? true : savedStatus === 'true';
};
