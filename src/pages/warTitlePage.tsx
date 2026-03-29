import { cn } from '../utils/cn';
import { WarTitlePageProps } from '../types/wartitle.types';
import { useWarTitleForm } from '../hooks/useWarTitleForm';
import { WarTitleForm } from '../components/wartitle/WarTitleForm';
import { SuccessMessage } from '../components/wartitle/SuccessMessage';

export function WarTitlePage({ darkMode }: WarTitlePageProps) {
  const {
    formData,
    isSubmitting,
    showSuccess,
    canSubmit,
    handleFormChange,
    handleSubmit,
    resetForm,
  } = useWarTitleForm();

  return (
    <section className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className={cn(
            "inline-block px-4 py-2 rounded-full text-sm font-medium mb-4",
            darkMode 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-emerald-100 text-emerald-700"
          )}>
            🏆 War Title
          </span>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Daftar War Title
          </h1>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            darkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Dapatkan title eksklusif untuk karakter kamu di Ruang Riung! 
            Pilih antara Jajaka Kasep atau Mojang Geulis 🎭
          </p>
        </div>

        {/* Info Banner */}
        <div className={cn(
          "max-w-2xl mx-auto p-4 rounded-2xl mb-8 backdrop-blur-xl border",
          darkMode 
            ? "bg-emerald-500/10 border-emerald-500/30" 
            : "bg-emerald-50 border-emerald-200"
        )}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className={cn(
                "font-bold",
                darkMode ? "text-emerald-400" : "text-emerald-700"
              )}>
                Syarat & Ketentuan
              </h3>
              <ul className={cn(
                "text-sm mt-1 space-y-1",
                darkMode ? "text-emerald-500/80" : "text-emerald-600"
              )}>
                <li>• Harus sudah join komunitas Discord/Roblox Group</li>
                <li>• Satu akun hanya bisa mendaftar satu kali</li>
                <li>• Title akan diberikan dalam 1-3 hari kerja</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <WarTitleForm
          darkMode={darkMode}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
        />

        {/* Features Info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className={cn(
            "text-2xl font-bold mb-8 text-center",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Keuntungan Punya Title
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: "✨", 
                title: "Tampil Beda", 
                desc: "Title eksklusif yang membuat karakter kamu stand out di game" 
              },
              { 
                icon: "🎖️", 
                title: "Status Spesial", 
                desc: "Menunjukkan kamu adalah member aktif komunitas Ruang Riung" 
              },
              { 
                icon: "🎁", 
                title: "Bonus Event", 
                desc: "Akses prioritas ke event-event spesial yang akan datang" 
              }
            ].map((item, idx) => (
              <div key={idx} className={cn(
                "text-center p-6 rounded-2xl backdrop-blur-xl border",
                darkMode 
                  ? "bg-gray-800/30 border-emerald-500/20" 
                  : "bg-white/40 border-emerald-100"
              )}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={cn(
                  "font-bold mb-2",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {item.title}
                </h3>
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className={cn(
            "text-2xl font-bold mb-6 text-center",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Berapa lama proses pemberian title?",
                a: "Title akan diberikan dalam 1-3 hari kerja setelah data terverifikasi."
              },
              {
                q: "Apakah bisa ganti title setelah dipilih?",
                a: "Untuk saat ini belum bisa. Pilih dengan bijak ya!"
              },
              {
                q: "Bagaimana cara join komunitas?",
                a: "Kamu bisa join Discord server atau Roblox Group kami. Link ada di footer."
              }
            ].map((faq, idx) => (
              <div key={idx} className={cn(
                "p-6 rounded-2xl backdrop-blur-xl border",
                darkMode 
                  ? "bg-gray-800/30 border-emerald-500/20" 
                  : "bg-white/40 border-emerald-100"
              )}>
                <h3 className={cn(
                  "font-bold mb-2",
                  darkMode ? "text-emerald-400" : "text-emerald-600"
                )}>
                  {faq.q}
                </h3>
                <p className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessMessage
        darkMode={darkMode}
        show={showSuccess}
        onClose={resetForm}
        submittedData={formData}
      />
    </section>
  );
}
