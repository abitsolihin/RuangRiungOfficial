import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/admin.constants';
import { getAdminSettings, updateAdminSetting } from '../services/googleSheets.service';

export const useAdminSettings = () => {
  const [topupEnabled, setTopupEnabled] = useState(true);
  const [wartitleEnabled, setWartitleEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
    // Refresh settings setiap 30 detik
    const interval = setInterval(loadSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSettings = async () => {
    const settings = await getAdminSettings();
    if (settings) {
      setTopupEnabled(settings.topup);
      setWartitleEnabled(settings.wartitle);
      // Simpan ke localStorage sebagai cache
      localStorage.setItem(STORAGE_KEYS.TOPUP_ENABLED, String(settings.topup));
      localStorage.setItem(STORAGE_KEYS.WARTITLE_ENABLED, String(settings.wartitle));
    } else {
      // Fallback ke localStorage jika gagal fetch
      const savedTopupStatus = localStorage.getItem(STORAGE_KEYS.TOPUP_ENABLED);
      if (savedTopupStatus !== null) {
        setTopupEnabled(savedTopupStatus === 'true');
      }
      
      const savedWartitleStatus = localStorage.getItem(STORAGE_KEYS.WARTITLE_ENABLED);
      if (savedWartitleStatus !== null) {
        setWartitleEnabled(savedWartitleStatus === 'true');
      }
    }
    setLoading(false);
  };

  const toggleTopup = async () => {
    const newStatus = !topupEnabled;
    setTopupEnabled(newStatus);
    localStorage.setItem(STORAGE_KEYS.TOPUP_ENABLED, String(newStatus));
    await updateAdminSetting('topup', newStatus);
  };
  
  const toggleWartitle = async () => {
    const newStatus = !wartitleEnabled;
    setWartitleEnabled(newStatus);
    localStorage.setItem(STORAGE_KEYS.WARTITLE_ENABLED, String(newStatus));
    await updateAdminSetting('wartitle', newStatus);
  };

  return {
    topupEnabled,
    toggleTopup,
    wartitleEnabled,
    toggleWartitle,
    loading,
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
