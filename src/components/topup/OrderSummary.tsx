import { cn } from '../../utils/cn';
import { RobuxPackage } from '../../types/topup.types';
import { CheckIcon, WhatsAppIcon } from './icons';

interface OrderSummaryProps {
  darkMode: boolean;
  selectedPackage: RobuxPackage | undefined;
  username: string;
  proofImage: string | null;
  formatPrice: (price: number) => string;
}

export function OrderSummary({ 
  darkMode, 
  selectedPackage, 
  username, 
  proofImage,
  formatPrice 
}: OrderSummaryProps) {
  return (
    <div className={cn(
      "p-6 rounded-3xl backdrop-blur-xl border sticky top-28",
      darkMode 
        ? "bg-gray-800/30 border-emerald-500/20" 
        : "bg-white/50 border-emerald-200/50"
    )}>
      <h3 className={cn(
        "text-xl font-bold mb-4",
        darkMode ? "text-white" : "text-gray-900"
      )}>
        Pesanan Kamu
      </h3>

      {selectedPackage ? (
        <div className="space-y-4">
          <div className={cn(
            "p-4 rounded-xl text-center",
            darkMode ? "bg-emerald-500/10" : "bg-emerald-50"
          )}>
            <span className="text-3xl mb-2 block">💎</span>
            <p className={cn(
              "text-3xl font-bold",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              {selectedPackage.robux}
            </p>
            <p className={cn(
              "text-sm",
              darkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Robux
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Harga Paket</span>
              <span className={cn(darkMode ? "text-white" : "text-gray-900")}>
                Rp {formatPrice(selectedPackage.price)}
              </span>
            </div>
            <div className={cn(
              "flex justify-between pt-2 border-t",
              darkMode ? "border-gray-700" : "border-gray-200"
            )}>
              <span className="font-bold">Total</span>
              <span className={cn(
                "font-bold",
                darkMode ? "text-emerald-400" : "text-emerald-600"
              )}>
                Rp {formatPrice(selectedPackage.price)}
              </span>
            </div>
          </div>

          {username && (
            <div className={cn(
              "pt-4 border-t",
              darkMode ? "border-gray-700" : "border-gray-200"
            )}>
              <p className={cn(
                "text-xs mb-1",
                darkMode ? "text-gray-500" : "text-gray-500"
              )}>
                Username Roblox
              </p>
              <p className={cn(
                "font-semibold",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                {username}
              </p>
            </div>
          )}

          {proofImage && (
            <div className={cn(
              "pt-4 border-t",
              darkMode ? "border-gray-700" : "border-gray-200"
            )}>
              <p className={cn(
                "text-xs mb-2",
                darkMode ? "text-gray-500" : "text-gray-500"
              )}>
                Bukti Transfer
              </p>
              <div className={cn(
                "flex items-center gap-2",
                darkMode ? "text-emerald-400" : "text-emerald-600"
              )}>
                <CheckIcon />
                <span className="text-sm">Terupload</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cn(
          "text-center py-8",
          darkMode ? "text-gray-500" : "text-gray-400"
        )}>
          <span className="text-4xl mb-3 block opacity-50">💎</span>
          <p>Pilih paket Robux</p>
        </div>
      )}

      {/* Help */}
      <div className={cn(
        "mt-6 pt-6 border-t",
        darkMode ? "border-gray-700" : "border-gray-200"
      )}>
        <p className={cn(
          "text-sm mb-3",
          darkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Butuh bantuan?
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition-colors text-white text-sm font-medium"
        >
          <WhatsAppIcon /> Chat Admin
        </a>
      </div>
    </div>
  );
}
