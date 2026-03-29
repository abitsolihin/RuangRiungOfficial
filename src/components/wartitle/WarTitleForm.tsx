import { cn } from '../../utils/cn';
import { WarTitleFormProps } from '../../types/wartitle.types';
import { TITLE_OPTIONS, COMMUNITY_OPTIONS } from '../../constants/wartitle.constants';

export function WarTitleForm({
  darkMode,
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
  canSubmit,
}: WarTitleFormProps) {
  return (
    <div className={cn(
      "max-w-2xl mx-auto p-8 rounded-3xl backdrop-blur-xl border",
      darkMode ? "bg-gray-800/30 border-emerald-500/20" : "bg-white/50 border-emerald-200"
    )}>
      <div className="space-y-6">
        {/* Nickname */}
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Nickname <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => onFormChange('nickname', e.target.value)}
            placeholder="Masukkan nickname kamu..."
            className={cn(
              "w-full px-4 py-3 rounded-xl border transition-all",
              "focus:outline-none focus:ring-2",
              darkMode 
                ? "bg-gray-900/50 border-emerald-500/30 text-white placeholder-gray-500 focus:ring-emerald-500/50" 
                : "bg-white border-emerald-200 text-gray-900 placeholder-gray-400 focus:ring-emerald-500/30"
            )}
          />
          <p className={cn(
            "text-xs mt-2",
            darkMode ? "text-gray-500" : "text-gray-500"
          )}>
            Nickname yang akan ditampilkan di game
          </p>
        </div>

        {/* Username Roblox */}
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Username Roblox <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => onFormChange('username', e.target.value)}
            placeholder="Masukkan username Roblox kamu..."
            className={cn(
              "w-full px-4 py-3 rounded-xl border transition-all",
              "focus:outline-none focus:ring-2",
              darkMode 
                ? "bg-gray-900/50 border-emerald-500/30 text-white placeholder-gray-500 focus:ring-emerald-500/50" 
                : "bg-white border-emerald-200 text-gray-900 placeholder-gray-400 focus:ring-emerald-500/30"
            )}
          />
          <p className={cn(
            "text-xs mt-2",
            darkMode ? "text-gray-500" : "text-gray-500"
          )}>
            Username Roblox kamu yang terdaftar
          </p>
        </div>

        {/* Username Discord */}
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Username Discord <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.discordUsername}
            onChange={(e) => onFormChange('discordUsername', e.target.value)}
            placeholder="Masukkan username Discord kamu..."
            className={cn(
              "w-full px-4 py-3 rounded-xl border transition-all",
              "focus:outline-none focus:ring-2",
              darkMode 
                ? "bg-gray-900/50 border-emerald-500/30 text-white placeholder-gray-500 focus:ring-emerald-500/50" 
                : "bg-white border-emerald-200 text-gray-900 placeholder-gray-400 focus:ring-emerald-500/30"
            )}
          />
          <p className={cn(
            "text-xs mt-2",
            darkMode ? "text-gray-500" : "text-gray-500"
          )}>
            Username Discord kamu (contoh: username#1234 atau username)
          </p>
        </div>

        {/* Sudah Masuk Komunitas */}
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Sudah Masuk Komunitas? <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {COMMUNITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onFormChange('joinedCommunity', option.value)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-300 text-left",
                  formData.joinedCommunity === option.value
                    ? (darkMode 
                        ? "bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20" 
                        : "bg-emerald-100 border-emerald-500 shadow-lg shadow-emerald-200")
                    : (darkMode 
                        ? "bg-gray-800/30 border-emerald-500/20 hover:border-emerald-500/50" 
                        : "bg-white/40 border-emerald-100 hover:border-emerald-300")
                )}
              >
                <span className={cn(
                  "font-semibold",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pilihan Title */}
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Pilih Title <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TITLE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onFormChange('titleChoice', option.value)}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all duration-300 text-center",
                  "hover:-translate-y-1",
                  formData.titleChoice === option.value
                    ? (darkMode 
                        ? "bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20" 
                        : "bg-emerald-100 border-emerald-500 shadow-lg shadow-emerald-200")
                    : (darkMode 
                        ? "bg-gray-800/30 border-emerald-500/20 hover:border-emerald-500/50" 
                        : "bg-white/40 border-emerald-100 hover:border-emerald-300")
                )}
              >
                <div className="text-4xl mb-3">{option.label.split(' ')[0]}</div>
                <div className={cn(
                  "text-lg font-bold mb-1",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {option.value}
                </div>
                <div className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className={cn(
            "w-full py-4 rounded-xl font-semibold text-white transition-all duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
            "shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40",
            "hover:-translate-y-1"
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Mengirim Data...
            </span>
          ) : (
            '🎯 Kirim Data'
          )}
        </button>

        {/* Info */}
        <div className={cn(
          "p-4 rounded-xl border",
          darkMode ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-200"
        )}>
          <div className="flex items-start gap-3">
            <span className="text-xl">ℹ️</span>
            <div className="text-sm">
              <p className={cn(
                "font-bold mb-1",
                darkMode ? "text-blue-400" : "text-blue-700"
              )}>
                Informasi
              </p>
              <p className={cn(
                darkMode ? "text-blue-500/80" : "text-blue-600"
              )}>
                Data yang kamu kirim akan diproses untuk pemberian title di game. 
                Pastikan semua data sudah benar sebelum mengirim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
