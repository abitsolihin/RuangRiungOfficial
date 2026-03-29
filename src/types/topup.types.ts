export interface RobuxPackage {
  id: number;
  robux: number;
  price: number;
  popular: boolean;
}

export interface BankInfo {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface TopupPageProps {
  darkMode: boolean;
  formatPrice: (price: number) => string;
}


