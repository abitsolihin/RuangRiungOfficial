# Sistem Admin Global - Ruang Riung

## Masalah Sebelumnya
Fitur admin menggunakan `localStorage` yang hanya tersimpan di browser admin saja. Ketika admin toggle fitur topup/wartitle, perubahan tidak terlihat oleh user lain karena setiap browser punya `localStorage` sendiri.

## Solusi
Menggunakan **Google Sheets sebagai database global** untuk menyimpan settings yang bisa diakses oleh semua user.

## Cara Kerja Sistem Baru

### 1. Admin Toggle Setting
- Admin login ke `/admin`
- Toggle fitur topup/wartitle ON/OFF
- Setting disimpan ke Google Sheets (global)
- Setting juga disimpan ke localStorage (cache lokal)

### 2. User Mengakses Website
- Website otomatis fetch settings dari Google Sheets setiap 30 detik
- Jika fetch berhasil: gunakan data dari Google Sheets
- Jika fetch gagal: gunakan cache localStorage sebagai fallback
- User melihat status fitur sesuai setting admin

### 3. Auto-Refresh
- Settings di-refresh otomatis setiap 30 detik
- Perubahan dari admin akan terlihat oleh semua user maksimal dalam 30 detik

## Setup Google Sheets

Ikuti panduan lengkap di file `ADMIN_SETUP.md`

### Ringkasan Setup:
1. Buat Google Sheet dengan 2 sheet: "Settings" dan "WarTitle"
2. Isi sheet "Settings" dengan data awal
3. Buat Google Apps Script untuk handle GET/POST request
4. Deploy sebagai Web App
5. Copy URL dan paste ke `.env`

## File yang Diubah

1. **src/services/googleSheets.service.ts**
   - Tambah `getAdminSettings()` - fetch settings dari Google Sheets
   - Tambah `updateAdminSetting()` - update settings ke Google Sheets

2. **src/hooks/useAdminSettings.ts**
   - Fetch settings dari Google Sheets saat load
   - Auto-refresh setiap 30 detik
   - Simpan ke localStorage sebagai cache

3. **src/App.tsx**
   - Fetch settings saat app load
   - Auto-refresh setiap 30 detik
   - Gunakan state untuk kontrol tampilan fitur

4. **src/pages/AdminPage.tsx**
   - Pass loading state ke SettingsPanel

5. **src/components/admin/SettingsPanel.tsx**
   - Tampilkan loading spinner saat fetch
   - Info bahwa perubahan berlaku dalam 30 detik

## Testing

### Test Admin Panel:
1. Buka `/admin` dan login
2. Toggle fitur topup OFF
3. Buka tab baru (sebagai user)
4. Tunggu maksimal 30 detik
5. Refresh halaman user
6. Fitur topup seharusnya menampilkan "Sedang Maintenance"

### Test Fallback:
1. Matikan koneksi internet
2. Website tetap berfungsi dengan cache localStorage
3. Nyalakan koneksi kembali
4. Settings akan sync otomatis dalam 30 detik

## Environment Variables

Pastikan `.env` sudah diisi:
```env
VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=ruangriung2024
```

## Deploy ke Vercel

1. Commit semua perubahan
2. Push ke repository
3. Vercel akan auto-deploy
4. Pastikan environment variables sudah diset di Vercel dashboard

## Troubleshooting

### Settings tidak update
- Cek apakah Google Apps Script sudah di-deploy
- Cek apakah URL di `.env` sudah benar
- Cek console browser untuk error

### CORS Error
- Pastikan Google Apps Script menggunakan `ContentService.createTextOutput()`
- Untuk POST request, gunakan `mode: 'no-cors'`
- Untuk GET request, tidak perlu `mode: 'no-cors'`

### Perubahan lambat terlihat
- Normal, karena refresh setiap 30 detik
- User bisa refresh manual untuk update lebih cepat
- Admin bisa lihat perubahan langsung di admin panel
