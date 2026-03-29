import { cn } from '../../utils/cn';
import { SuccessMessageProps } from '../../types/wartitle.types';

export function SuccessMessage({ 
  darkMode, 
  show, 
  onClose,
  submittedData 
}: SuccessMessageProps) {
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
          Data Berhasil Dikirim!
        </h3>
        <p className={cn(
          "mb-6",
          darkMode ? "text-gray-400" : "text-gray-600"
        )}>
          Terima kasih telah mendaftar War Title
        </p>

        <div className={cn(
          "space-y-3 text-left mb-6 p-4 rounded-xl",
          darkMode ? "bg-gray-800/50" : "bg-gray-50"
        )}>
          <div className="flex justify-between text-sm">
            <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Nickname</span>
            <span className={cn("font-semibold", darkMode ? "text-white" : "text-gray-900")}>
              {submittedData.nickname}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Username</span>
            <span className={cn("font-semibold", darkMode ? "text-white" : "text-gray-900")}>
              {submittedData.username}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Title</span>
            <span className={cn("font-bold", darkMode ? "text-emerald-400" : "text-emerald-600")}>
              {submittedData.titleChoice}
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
            Admin akan memproses permintaan title kamu. Title akan diberikan dalam 1-3 hari kerja.
          </p>
        </div>

        <button
          onClick={onClose}
          className={cn(
            "w-full py-3 rounded-xl font-semibold transition-all",
            "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
            "text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl"
          )}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
