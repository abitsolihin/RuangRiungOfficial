import React, { useState } from 'react';
import { AdminPageProps } from '../types/admin.types';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { useAdminSettings } from '../hooks/useAdminSettings';
import { LoginForm } from '../components/admin/LoginForm';
import { SettingsPanel } from '../components/admin/SettingsPanel';

export const AdminPage: React.FC<AdminPageProps> = ({ darkMode }) => {
  const { isAuthenticated, username, password, setUsername, setPassword, login, logout } = useAdminAuth();
  const { topupEnabled, toggleTopup, wartitleEnabled, toggleWartitle } = useAdminSettings();
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    const success = login();
    if (success) {
      setLoginError('');
    } else {
      setLoginError('Username atau password salah!');
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        error={loginError}
      />
    );
  }

  return (
    <SettingsPanel
      topupEnabled={topupEnabled}
      onToggleTopup={toggleTopup}
      wartitleEnabled={wartitleEnabled}
      onToggleWartitle={toggleWartitle}
      onLogout={logout}
    />
  );
};
