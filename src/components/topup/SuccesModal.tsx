import { cn } from '../../utils/cn';
import { RobuxPackage } from '../../types/topup.types';
import { WhatsAppIcon } from './icons';

interface SuccessModalProps {
  darkMode: boolean;
  show: boolean;
  orderNumber: string;
  selectedPackage: RobuxPackage;
  username: string;
  formatPrice: (price: number) => string;
  onReset: () => void;
}

export function SuccessModal({ 
  darkMode, 
  show, 
  orderNumber, 
  selectedPackage, 
  username,
  formatPrice,
  onReset 
}: SuccessModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={cn(
        "w-full max-w-md p-8 rounded-3xl backdrop-blur-xl border text-center",
        darkMode 
          ? "bg-gray-900/95 border-emerald-500/30" 
          : "bg-white border-emerald-200"
      )}>
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
          "bg-gradient-to-r from-emerald-500 to-green-500"
        )}>
          <span className="text-4xl">✅</span>
        </div>
        
        <h3 className={cn(
          "text-2xl font-bold mb-2",
          darkMode ? "text-white" : "text-gray-900"
        )}>
          Pesanan Berhasil!
        </h3>
        <p className={cn(
          "mb-6",
          darkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Terima kasih telah memesan di Ruang Riung
        </p>

        <div className={cn(
          "p-4 rounded-xl mb-6",
          darkMode ? "bg-gray-800" : "bg-gray-100"
        )}>
          <p className={cn(
            "text-sm mb-1",
            darkMode ? "text-gray-500" : "text-gray-500"
          )}>
            Nomor Pesanan
          </p>
          <p className={cn(
            "text-xl font-bold font-mono",
            darkMode ? "text-emerald-400" : "text-emerald-600"
          )}>
            {orderNumber}
          </p>
        </div>

        <div className={cn(
          "space-y-3 text-left mb-6 p-4 rounded-xl",
          darkMode ? "bg-gray-800/50" : "bg-gray-50"
        )}>
          <div className="flex justify-between text-sm">
            <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Paket</span>
            <span className={cn(darkMode ? "text-white" : "text-gray-900")}>{selectedPackage.robux} Robux</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Username</span>
            <span className={cn(darkMode ? "text-white" : "text-gray-900")}>{username}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Total</span>
            <span className={cn("font-bold", darkMode ? "text-emerald-400" : "text-emerald-600")}>
              Rp {formatPrice(selectedPackage.price)}
            </span>
          </div>
        </div>

        <div className={cn(
          "p-4 rounded-xl mb-6 text-left",
          darkMode ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-yellow-50 border border-yellow-200"
        )}>
          <p className={cn(
            "text-sm",
            darkMode ? "text-yellow-400" : "text-yellow-700"
          )}>
            <span className="font-bold">📋 Langkah Selanjutnya:</span><br/>
            Admin akan memverifikasi pembayaran kamu dalam 1x24 jam. 
            Robux akan dikirim dalam 1-5 hari kerja via Gamepass.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onReset}
            className={cn(
              "flex-1 py-3 rounded-xl font-semibold transition-all",
              darkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            )}
          >
            Order Lagi
          </button>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold transition-colors flex items-center justify-center gap-2 text-white"
          >
            <WhatsAppIcon /> Chat Admin
          </a>
        </div>
      </div>
    </div>
  );
}
