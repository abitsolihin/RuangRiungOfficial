export const TITLE_OPTIONS = [
  { value: 'Jajaka Kasep', label: '👨 Jajaka Kasep', description: 'Untuk pemain laki-laki' },
  { value: 'Mojang Geulis', label: '👩 Mojang Geulis', description: 'Untuk pemain perempuan' },
];

export const COMMUNITY_OPTIONS = [
  { value: 'Ya', label: 'Ya, sudah masuk' },
  { value: 'Belom', label: 'Belum masuk' },
];

// Ambil dari environment variable
export const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL || '';
