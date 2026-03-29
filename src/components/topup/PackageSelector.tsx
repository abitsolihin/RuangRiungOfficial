import { cn } from '../../utils/cn';
import { RobuxPackage } from '../../types/topup.types';

interface PackageSelectorProps {
  darkMode: boolean;
  packages: RobuxPackage[];
  selectedPackage: number | null;
  onSelectPackage: (id: number) => void;
  formatPrice: (price: number) => string;
}

export function PackageSelector({ 
  darkMode, 
  packages, 
  selectedPackage, 
  onSelectPackage,
  formatPrice 
}: PackageSelectorProps) {
  return (
    <div>
      <h2 className={cn(
        "text-2xl font-bold mb-6 flex items-center gap-2",
        darkMode ? "text-white" : "text-gray-900"
      )}>
        💎 Pilih Paket Robux
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => onSelectPackage(pkg.id)}
            className={cn(
              "relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 text-left",
              "hover:-translate-y-1 hover:shadow-xl",
              selectedPackage === pkg.id
                ? (darkMode 
                    ? "bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20" 
                    : "bg-emerald-100 border-emerald-500 shadow-lg shadow-emerald-200")
                : (darkMode 
                    ? "bg-gray-800/30 border-emerald-500/20 hover:border-emerald-500/50" 
                    : "bg-white/40 border-emerald-100 hover:border-emerald-300")
            )}
          >
            {pkg.popular && (
              <span className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full">
                POPULER
              </span>
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💎</span>
              <span className={cn(
                "text-2xl font-bold",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                {pkg.robux}
              </span>
            </div>
            <p className={cn(
              "text-xs mb-3",
              darkMode ? "text-gray-500" : "text-gray-500"
            )}>
              Robux
            </p>
            <p className={cn(
              "text-lg font-bold",
              darkMode ? "text-emerald-400" : "text-emerald-600"
            )}>
              Rp {formatPrice(pkg.price)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
