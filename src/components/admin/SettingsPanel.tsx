import React from 'react';

interface SettingsPanelProps {
  topupEnabled: boolean;
  onToggleTopup: () => void;
  wartitleEnabled: boolean;
  onToggleWartitle: () => void;
  onLogout: () => void;
  loading?: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  topupEnabled,
  onToggleTopup,
  wartitleEnabled,
  onToggleWartitle,
  onLogout,
  loading = false,
}) => {
  return (
    <div className="min-h-screen p-4 md:p-8 ">
      <div className="max-w-4xl pt-20 mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <button
              onClick={onLogout}
              type="button"
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Pengaturan Fitur</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white/60 mt-2">Memuat pengaturan...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Topup Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Top Up Robux</h3>
                  <p className="text-white/60 text-sm">
                    {topupEnabled ? 'Fitur top up aktif dan dapat diakses user' : 'Fitur top up dinonaktifkan'}
                  </p>
                </div>
                
                <button
                  onClick={onToggleTopup}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    topupEnabled ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      topupEnabled ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* War Title Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">War Title</h3>
                  <p className="text-white/60 text-sm">
                    {wartitleEnabled ? 'Fitur war title aktif dan dapat diakses user' : 'Fitur war title dinonaktifkan'}
                  </p>
                </div>
                
                <button
                  onClick={onToggleWartitle}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    wartitleEnabled ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      wartitleEnabled ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Status Info */}
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <p className="text-emerald-200 text-sm">
              💡 Status saat ini:
            </p>
            <ul className="mt-2 space-y-1 text-emerald-200 text-sm">
              <li>• Top Up: <span className="font-semibold">{topupEnabled ? 'AKTIF' : 'NONAKTIF'}</span></li>
              <li>• War Title: <span className="font-semibold">{wartitleEnabled ? 'AKTIF' : 'NONAKTIF'}</span></li>
            </ul>
          </div>
          
          {/* Info */}
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-blue-200 text-sm">
              ℹ️ Perubahan akan berlaku untuk semua user dalam 30 detik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
