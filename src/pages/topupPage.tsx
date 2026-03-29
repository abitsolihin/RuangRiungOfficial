import { cn } from '../utils/cn';
import { TopupPageProps } from '../types/topup.types';
import { robuxPackages, bankInfo } from '../constants/topup.constants';
import { useTopupForm } from '../hooks/useTopupForm';
import { ProgressSteps } from '../components/topup/ProgressSteps';
import { PackageSelector } from '../components/topup/PackageSelector';
import { AccountForm } from '../components/topup/AccountForm';
import { PaymentSection } from '../components/topup/PaymentSection';
import { OrderSummary } from '../components/topup/OrderSummary';
import { SuccessModal } from '../components/topup/SuccesModal';

export function TopupPage({ darkMode, formatPrice }: TopupPageProps) {
  const {
    currentStep,
    setCurrentStep,
    selectedPackage,
    setSelectedPackage,
    username,
    setUsername,
    whatsapp,
    setWhatsapp,
    proofImage,
    proofFileName,
    copied,
    showSuccess,
    orderNumber,
    fileInputRef,
    copyToClipboard,
    handleFileChange,
    removeImage,
    handleSubmitOrder,
    resetForm,
    canProceedStep2,
    canProceedStep3,
    canProceedStep4,
  } = useTopupForm();

  const selectedPkg = robuxPackages.find(pkg => pkg.id === selectedPackage);

  return (
    <section className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className={cn(
            "inline-block px-4 py-2 rounded-full text-sm font-medium mb-4",
            darkMode 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-emerald-100 text-emerald-700"
          )}>
            💎 Topup Robux
          </span>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Topup Robux Murah
          </h1>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            darkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Beli Robux dengan harga terjangkau via metode Gamepass. 
            Pembayaran melalui transfer SeaBank!
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps darkMode={darkMode} currentStep={currentStep} />

        {/* Info Banner */}
        <div className={cn(
          "p-4 rounded-2xl mb-8 backdrop-blur-xl border",
          darkMode 
            ? "bg-yellow-500/10 border-yellow-500/30" 
            : "bg-yellow-50 border-yellow-200"
        )}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <h3 className={cn(
                "font-bold",
                darkMode ? "text-yellow-400" : "text-yellow-700"
              )}>
                Estimasi Pengiriman: 1-5 Hari Kerja
              </h3>
              <p className={cn(
                "text-sm",
                darkMode ? "text-yellow-500/80" : "text-yellow-600"
              )}>
                Metode: Transfer SeaBank → Gamepass
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Pilih Paket */}
            {currentStep === 1 && (
              <PackageSelector
                darkMode={darkMode}
                packages={robuxPackages}
                selectedPackage={selectedPackage}
                onSelectPackage={setSelectedPackage}
                formatPrice={formatPrice}
              />
            )}

            {/* Step 2: Data Akun */}
            {currentStep === 2 && (
              <AccountForm
                darkMode={darkMode}
                username={username}
                whatsapp={whatsapp}
                onUsernameChange={setUsername}
                onWhatsappChange={setWhatsapp}
              />
            )}

            {/* Step 3: Pembayaran */}
            {currentStep === 3 && (
              <PaymentSection
                darkMode={darkMode}
                bankInfo={bankInfo}
                selectedPackage={selectedPkg}
                formatPrice={formatPrice}
                copied={copied}
                onCopy={copyToClipboard}
                proofImage={proofImage}
                proofFileName={proofFileName}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onRemoveImage={removeImage}
              />
            )}

            {/* Step 4: Konfirmasi */}
            {currentStep === 4 && (
              <div>
                <h2 className={cn(
                  "text-2xl font-bold mb-6 flex items-center gap-2",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  ✅ Konfirmasi Pesanan
                </h2>

                <div className={cn(
                  "p-6 rounded-2xl backdrop-blur-xl border space-y-6",
                  darkMode ? "bg-gray-800/30 border-emerald-500/20" : "bg-white/50 border-emerald-200"
                )}>
                  {/* Order Summary */}
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg mb-4 pb-2 border-b",
                      darkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
                    )}>
                      Ringkasan Pesanan
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Paket Robux</span>
                        <span className={cn("font-semibold", darkMode ? "text-white" : "text-gray-900")}>
                          {selectedPkg?.robux} Robux
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Total Bayar</span>
                        <span className={cn("font-bold text-xl", darkMode ? "text-emerald-400" : "text-emerald-600")}>
                          Rp {formatPrice(selectedPkg?.price || 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg mb-4 pb-2 border-b",
                      darkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
                    )}>
                      Data Akun
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Username Roblox</span>
                        <span className={cn("font-semibold", darkMode ? "text-white" : "text-gray-900")}>{username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>WhatsApp</span>
                        <span className={cn("font-semibold", darkMode ? "text-white" : "text-gray-900")}>{whatsapp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg mb-4 pb-2 border-b",
                      darkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
                    )}>
                      Pembayaran
                    </h3>
                    <div className="flex justify-between">
                      <span className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>Metode</span>
                      <span className={cn("font-semibold", darkMode ? "text-white" : "text-gray-900")}>Transfer SeaBank</span>
                    </div>
                  </div>

                  {/* Proof Preview */}
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg mb-4 pb-2 border-b",
                      darkMode ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
                    )}>
                      Bukti Transfer
                    </h3>
                    {proofImage && (
                      <img
                        src={proofImage}
                        alt="Bukti Transfer"
                        className={cn(
                          "w-full max-h-40 object-contain rounded-xl border",
                          darkMode ? "border-emerald-500/30" : "border-emerald-200"
                        )}
                      />
                    )}
                  </div>

                  {/* Agreement */}
                  <div className={cn(
                    "p-4 rounded-xl text-sm",
                    darkMode ? "bg-gray-900/50 text-gray-400" : "bg-gray-50 text-gray-600"
                  )}>
                    Dengan mengklik "Kirim Pesanan", kamu menyetujui bahwa data yang dimasukkan sudah benar 
                    dan menyetujui syarat & ketentuan yang berlaku.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className={cn(
                    "flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
                    darkMode 
                      ? "bg-gray-700 hover:bg-gray-600 text-white" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                >
                  ← Kembali
                </button>
              )}
              
              {currentStep < 4 && (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStep === 1 && !canProceedStep2) ||
                    (currentStep === 2 && !canProceedStep3) ||
                    (currentStep === 3 && !canProceedStep4)
                  }
                  className={cn(
                    "flex-1 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
                    "shadow-lg shadow-emerald-500/30 hover:shadow-xl"
                  )}
                >
                  Lanjutkan →
                </button>
              )}

              {currentStep === 4 && (
                <button
                  onClick={handleSubmitOrder}
                  className={cn(
                    "flex-1 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
                    "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
                    "shadow-lg shadow-emerald-500/30 hover:shadow-xl"
                  )}
                >
                  ✅ Kirim Pesanan
                </button>
              )}
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              darkMode={darkMode}
              selectedPackage={selectedPkg}
              username={username}
              proofImage={proofImage}
              formatPrice={formatPrice}
            />
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16">
          <h2 className={cn(
            "text-2xl font-bold mb-8 text-center",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Cara Order Robux
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "📦", title: "Pilih Paket", desc: "Pilih jumlah Robux sesuai kebutuhan" },
              { step: "2", icon: "📝", title: "Isi Data", desc: "Masukkan username Roblox & WhatsApp" },
              { step: "3", icon: "💳", title: "Transfer", desc: "Transfer ke SeaBank & upload bukti" },
              { step: "4", icon: "✅", title: "Selesai", desc: "Tunggu 1-5 hari, Robux dikirim via Gamepass" }
            ].map((item, idx) => (
              <div key={idx} className={cn(
                "text-center p-6 rounded-2xl backdrop-blur-xl border",
                darkMode 
                  ? "bg-gray-800/30 border-emerald-500/20" 
                  : "bg-white/40 border-emerald-100"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4",
                  "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                )}>
                  {item.step}
                </div>
                <span className="text-3xl block mb-3">{item.icon}</span>
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
      </div>

      {/* Success Modal */}
      {selectedPkg && (
        <SuccessModal
          darkMode={darkMode}
          show={showSuccess}
          orderNumber={orderNumber}
          selectedPackage={selectedPkg}
          username={username}
          formatPrice={formatPrice}
          onReset={resetForm}
        />
      )}
    </section>
  );
}
