import { RobuxPackage, BankInfo } from '../types/topup.types';

export const robuxPackages: RobuxPackage[] = [
  { id: 1, robux: 100, price: 15000, popular: false },
  { id: 2, robux: 200, price: 28000, popular: false },
  { id: 3, robux: 400, price: 55000, popular: true },
  { id: 4, robux: 800, price: 105000, popular: false },
  { id: 5, robux: 1000, price: 130000, popular: true },
  { id: 6, robux: 2000, price: 255000, popular: false },
];

export const bankInfo: BankInfo = {
  bank: 'SeaBank',
  accountNumber: '901234567890',
  accountName: 'RUANG RIUNG STORE',
};

export const steps = [
  { number: 1, title: 'Pilih Paket' },
  { number: 2, title: 'Data Akun' },
  { number: 3, title: 'Pembayaran' },
  { number: 4, title: 'Konfirmasi' },
];
