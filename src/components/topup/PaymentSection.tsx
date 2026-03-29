import { cn } from '../../utils/cn';
import { BankInfo, RobuxPackage } from '../../types/topup.types';
import { CopyIcon, CheckIcon, UploadIcon, ImageIcon, CloseIcon } from './icons';

interface PaymentSectionProps {
  darkMode: boolean;
  bankInfo: BankInfo;
  selectedPackage: RobuxPackage | undefined;
  formatPrice: (price: number) => string;
  copied: boolean;
  onCopy: (text: string) => void;
  proofImage: string | null;
  proofFileName: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function PaymentSection({
  darkMode,
  bankInfo,
  selectedPackage,
  formatPrice,
  copied,
  onCopy,
  proofImage,
  proofFileName,
  fileInputRef,
  onFileChange,
  onRemoveImage
}: PaymentSectionProps) {
  return (
    <div>
      <h2 className={cn(
        "text-2xl font-bold mb-6 flex items-center gap-2",
        darkMode ? "text-white" : "text-gray-900"
      )}>
        💳 Pembayaran & Upload Bukti
      </h2>

      {/* Bank Info Card */}
      <div className={cn(
        "p-6 rounded-2xl backdrop-blur-xl border mb-6",
        darkMode ? "bg-gray-800/30 border-emerald-500/20" : "bg-white/50 border-emerald-200"
      )}>
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            darkMode ? "bg-blue-500/20" : "bg-blue-100"
          )}>
            <span className="text-2xl">🏦</span>
          </div>
          <div>
            <h3 className={cn(
              "font-bold text-lg",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Transfer ke {bankInfo.bank}
            </h3>
            <p className={cn(
              "text-sm",
              darkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Pembayaran manual via transfer bank
            </p>
          </div>
        </div>

        {/* Account Number */}
        <div className={cn(
          "p-4 rounded-xl mb-4 flex items-center justify-between",
          darkMode ? "bg-gray-900/50" : "bg-emerald-50"
        )}>
          <div>
            <p className={cn(
              "text-xs mb-1",
              darkMode ? "text-gray-500" : "text-gray-500"
            )}>
              Nomor Rekening
            </p>
            <p className={cn(
              "text-2xl font-bold font-mono tracking-wider",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              {bankInfo.accountNumber}
            </p>
          </div>
          <button
            onClick={() => onCopy(bankInfo.accountNumber)}
            className={cn(
              "p-3 rounded-xl transition-all flex items-center gap-2",
              copied 
                ? "bg-emerald-500 text-white" 
                : (darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700")
            )}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span className="text-sm font-medium">{copied ? 'Tersalin!' : 'Salin'}</span>
          </button>
        </div>

        {/* Account Name */}
        <div className={cn(
          "p-4 rounded-xl mb-4",
          darkMode ? "bg-gray-900/50" : "bg-gray-50"
        )}>
          <p className={cn(
            "text-xs mb-1",
            darkMode ? "text-gray-500" : "text-gray-500"
          )}>
            Atas Nama
          </p>
          <p className={cn(
            "text-lg font-bold",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            {bankInfo.accountName}
          </p>
        </div>

        {/* Transfer Amount */}
        <div className={cn(
          "p-4 rounded-xl border-2 border-dashed",
          darkMode ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-300"
        )}>
          <p className={cn(
            "text-xs mb-1",
            darkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Jumlah Transfer
          </p>
          <p className={cn(
            "text-3xl font-bold",
            darkMode ? "text-emerald-400" : "text-emerald-600"
          )}>
            {selectedPackage ? `Rp ${formatPrice(selectedPackage.price)}` : '-'}
          </p>
        </div>

        {/* Warning */}
        <div className={cn(
          "mt-4 p-4 rounded-xl border",
          darkMode ? "bg-yellow-500/10 border-yellow-500/30" : "bg-yellow-50 border-yellow-200"
        )}>
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-sm">
              <p className={cn(
                "font-bold mb-1",
                darkMode ? "text-yellow-400" : "text-yellow-700"
              )}>
                Penting!
              </p>
              <ul className={cn(
                "space-y-1",
                darkMode ? "text-yellow-500/80" : "text-yellow-600"
              )}>
                <li>• Transfer sesuai nominal yang tertera</li>
                <li>• Simpan bukti transfer untuk di-upload</li>
                <li>• Pastikan transfer dari rekening atas nama sendiri</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className={cn(
        "p-6 rounded-2xl backdrop-blur-xl border",
        darkMode ? "bg-gray-800/30 border-emerald-500/20" : "bg-white/50 border-emerald-200"
      )}>
        <h3 className={cn(
          "font-bold text-lg mb-4 flex items-center gap-2",
          darkMode ? "text-white" : "text-gray-900"
        )}>
          <ImageIcon /> Upload Bukti Transfer
        </h3>

        {!proofImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
              darkMode 
                ? "border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/5" 
                : "border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50"
            )}
          >
            <UploadIcon />
            <p className={cn(
              "font-medium mb-2 mt-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Klik untuk upload bukti transfer
            </p>
            <p className={cn(
              "text-sm",
              darkMode ? "text-gray-500" : "text-gray-500"
            )}>
              PNG, JPG, atau JPEG (Maks. 5MB)
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={proofImage}
              alt="Bukti Transfer"
              className={cn(
                "w-full max-h-80 object-contain rounded-xl border",
                darkMode ? "border-emerald-500/30" : "border-emerald-200"
              )}
            />
            <button
              onClick={onRemoveImage}
              className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <CloseIcon />
            </button>
            <p className={cn(
              "text-sm text-center mt-3",
              darkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {proofFileName}
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
