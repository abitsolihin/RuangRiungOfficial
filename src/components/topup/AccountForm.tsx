import { cn } from '../../utils/cn';
import { WhatsAppIcon } from './icons';

interface AccountFormProps {
  darkMode: boolean;
  username: string;
  whatsapp: string;
  onUsernameChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
}

export function AccountForm({ 
  darkMode, 
  username, 
  whatsapp, 
  onUsernameChange, 
  onWhatsappChange 
}: AccountFormProps) {
  return (
    <div>
      <h2 className={cn(
        "text-2xl font-bold mb-6 flex items-center gap-2",
        darkMode ? "text-white" : "text-gray-900"
      )}>
        🎮 Data Akun
      </h2>
      <div className={cn(
        "p-6 rounded-2xl backdrop-blur-xl border space-y-6",
        darkMode ? "bg-gray-800/30 border-emerald-500/20" : "bg-white/50 border-emerald-200"
      )}>
        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Username Roblox <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
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
            Pastikan username benar dan akun tidak di-private
          </p>
        </div>

        <div>
          <label className={cn(
            "block text-sm font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700"
          )}>
            Nomor WhatsApp <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <WhatsAppIcon />
            </span>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => onWhatsappChange(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="08xxxxxxxxxx"
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl border transition-all",
                "focus:outline-none focus:ring-2",
                darkMode 
                  ? "bg-gray-900/50 border-emerald-500/30 text-white placeholder-gray-500 focus:ring-emerald-500/50" 
                  : "bg-white border-emerald-200 text-gray-900 placeholder-gray-400 focus:ring-emerald-500/30"
              )}
            />
          </div>
          <p className={cn(
            "text-xs mt-2",
            darkMode ? "text-gray-500" : "text-gray-500"
          )}>
            Untuk konfirmasi dan notifikasi pengiriman Robux
          </p>
        </div>
      </div>
    </div>
  );
}
