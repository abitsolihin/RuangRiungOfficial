export const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'ruangriung2024';

export const STORAGE_KEYS = {
  ADMIN_AUTH: 'ruangriung_admin_auth',
  TOPUP_ENABLED: 'ruangriung_topup_enabled',
  WARTITLE_ENABLED: 'ruangriung_wartitle_enabled',
} as const;
