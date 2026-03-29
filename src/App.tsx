import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from './utils/cn';
import { TopupPage } from './pages/topupPage';
import { WarTitlePage } from './pages/warTitlePage';
import { AdminPage } from './pages/AdminPage';
import { getAdminSettings } from './services/googleSheets.service';
import { STORAGE_KEYS } from './constants/admin.constants';


// Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Pattern
const GamePattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <pattern id="gamePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect x="5" y="5" width="10" height="10" rx="2" fill="currentColor" fillOpacity="0.08"/>
      <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.12"/>
    </pattern>
    <rect width="100" height="100" fill="url(#gamePattern)"/>
  </svg>
);



// Map features
const mapFeatures = [
  {
    icon: "🏠",
    title: "Rumah Sunda Tradisional",
    desc: "Eksplorasi rumah adat Sunda dengan detail autentik dan suasana yang nyaman untuk berkumpul."
  },
  {
    icon: "🎮",
    title: "Mini Games Seru",
    desc: "Berbagai permainan tradisional yang dikemas modern seperti congklak, egrang, dan lainnya."
  },
  {
    icon: "🎵",
    title: "Musik & Ambience",
    desc: "Nikmati alunan gamelan degung dan suara alam yang menenangkan saat menjelajahi map."
  },
  {
    icon: "👥",
    title: "Hangout Spot",
    desc: "Tempat nongkrong asik untuk kumpul bareng teman-teman dengan view pemandangan indah."
  },
  {
    icon: "🌿",
    title: "Sawah & Kebun",
    desc: "Area pertanian interaktif dimana kamu bisa farming dan menikmati keindahan alam."
  },
  {
    icon: "🎭",
    title: "Event Mingguan",
    desc: "Event spesial setiap minggu dengan hadiah menarik dan aktivitas seru bersama komunitas."
  }
];

type Page = 'home' | 'topup' | 'wartitle' | 'admin';

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [topupEnabled, setTopupEnabled] = useState(true);
  const [wartitleEnabled, setWartitleEnabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentPage = (): Page => {
    const path = location.pathname;
    if (path === '/topup') return 'topup';
    if (path === '/wartitle') return 'wartitle';
    if (path === '/admin') return 'admin';
    return 'home';
  };
  
  const currentPage = getCurrentPage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load settings dari Google Sheets
    const loadSettings = async () => {
      const settings = await getAdminSettings();
      if (settings) {
        setTopupEnabled(settings.topup);
        setWartitleEnabled(settings.wartitle);
        localStorage.setItem(STORAGE_KEYS.TOPUP_ENABLED, String(settings.topup));
        localStorage.setItem(STORAGE_KEYS.WARTITLE_ENABLED, String(settings.wartitle));
      } else {
        // Fallback ke localStorage
        const savedTopup = localStorage.getItem(STORAGE_KEYS.TOPUP_ENABLED);
        const savedWartitle = localStorage.getItem(STORAGE_KEYS.WARTITLE_ENABLED);
        setTopupEnabled(savedTopup === null ? true : savedTopup === 'true');
        setWartitleEnabled(savedWartitle === null ? true : savedWartitle === 'true');
      }
    };
    
    loadSettings();
    // Refresh settings setiap 30 detik
    const interval = setInterval(loadSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navigateTo = (page: Page) => {
    const routes = {
      home: '/',
      topup: '/topup',
      wartitle: '/wartitle',
      admin: '/admin',
    };
    navigate(routes[page]);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className={cn(
      "min-h-screen font-sans transition-all duration-500",
      darkMode 
        ? "bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900" 
        : "bg-gradient-to-br from-white via-emerald-50 to-green-100"
    )}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <GamePattern className={cn(
          "absolute top-0 left-0 w-full h-full",
          darkMode ? "text-emerald-500" : "text-emerald-600"
        )} />
      </div>

      {/* Floating decorative elements */}
      <div className={cn(
        "fixed top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none",
        darkMode ? "bg-emerald-600" : "bg-green-300"
      )} />
      <div className={cn(
        "fixed bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none",
        darkMode ? "bg-green-700" : "bg-emerald-200"
      )} />

      {/* Navigation */}
      <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "py-2" : "py-4"
       )}>
        <div className={cn(
    "max-w-6xl mx-auto px-4 rounded-2xl transition-all duration-300",
    scrolled && (darkMode 
      ? "bg-gray-900/70 backdrop-blur-xl border border-emerald-500/20 shadow-lg shadow-emerald-500/10" 
      : "bg-white/70 backdrop-blur-xl border border-emerald-200/50 shadow-lg shadow-green-200/30")
  )}>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <span className="text-2xl">🎮</span>
              <span className={cn(
                "text-xl font-bold",
                darkMode ? "text-emerald-400" : "text-emerald-700"
              )}>
                Ruang Riung
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigateTo('home')}
                className={cn(
                  "font-medium transition-colors",
                  currentPage === 'home' 
                    ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                    : (darkMode ? "text-gray-300 hover:text-emerald-400" : "text-gray-700 hover:text-emerald-500")
                )}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('topup')}
                className={cn(
                  "font-medium transition-colors",
                  currentPage === 'topup' 
                    ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                    : (darkMode ? "text-gray-300 hover:text-emerald-400" : "text-gray-700 hover:text-emerald-500")
                )}
              >
                Topup Robux
              </button>
              <button
                onClick={() => navigateTo('wartitle')}
                className={cn(
                  "font-medium transition-colors",
                  currentPage === 'wartitle' 
                    ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                    : (darkMode ? "text-gray-300 hover:text-emerald-400" : "text-gray-700 hover:text-emerald-500")
                )}
              >
                War Title
              </button>
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  darkMode 
                    ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                    : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                )}
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  darkMode 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-emerald-100 text-emerald-600"
                )}
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "p-2 rounded-xl",
                  darkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={cn(
            "md:hidden mx-4 mt-2 p-4 rounded-2xl backdrop-blur-xl border",
            darkMode 
              ? "bg-gray-900/80 border-emerald-500/20" 
              : "bg-white/80 border-emerald-200/50"
          )}>
            <button
              onClick={() => navigateTo('home')}
              className={cn(
                "block w-full text-left py-3 font-medium transition-colors",
                currentPage === 'home' 
                  ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                  : (darkMode ? "text-gray-300" : "text-gray-700")
              )}
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigateTo('topup')}
              className={cn(
                "block w-full text-left py-3 font-medium transition-colors",
                currentPage === 'topup' 
                  ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                  : (darkMode ? "text-gray-300" : "text-gray-700")
              )}
            >
              💎 Topup Robux
            </button>
            <button
              onClick={() => navigateTo('wartitle')}
              className={cn(
                "block w-full text-left py-3 font-medium transition-colors",
                currentPage === 'wartitle' 
                  ? (darkMode ? "text-emerald-400" : "text-emerald-600")
                  : (darkMode ? "text-gray-300" : "text-gray-700")
              )}
            >
              🏆 War Title
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {currentPage === 'home' ? (
        <HomePage darkMode={darkMode} navigateTo={navigateTo} mapFeatures={mapFeatures} />
      ) : currentPage === 'topup' ? (
        topupEnabled ? (
          <TopupPage 
            darkMode={darkMode} 
            formatPrice={formatPrice}
          />
        ) : (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🚧</span>
              <h2 className={cn(
                "text-3xl font-bold mb-2",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                Fitur Top Up Sedang Maintenance
              </h2>
              <p className={cn(
                "text-lg",
                darkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Mohon maaf, fitur top up sementara tidak tersedia.
              </p>
            </div>
          </div>
        )
      ) : currentPage === 'wartitle' ? (
        wartitleEnabled ? (
          <WarTitlePage darkMode={darkMode} />
        ) : (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🚧</span>
              <h2 className={cn(
                "text-3xl font-bold mb-2",
                darkMode ? "text-white" : "text-gray-900"
              )}>
                Fitur War Title Sedang Maintenance
              </h2>
              <p className={cn(
                "text-lg",
                darkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Mohon maaf, fitur war title sementara tidak tersedia.
              </p>
            </div>
          </div>
        )
      ) : (
        <AdminPage darkMode={darkMode} />
      )}

      {/* Footer */}
      <footer className={cn(
        "py-10 px-4 border-t relative z-10",
        darkMode 
          ? "border-emerald-500/20 bg-gray-900/50" 
          : "border-emerald-200/50 bg-white/30"
      )}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎮</span>
              <span className={cn(
                "text-xl font-bold",
                darkMode ? "text-emerald-400" : "text-emerald-700"
              )}>
                Ruang Riung
              </span>
            </div>
            
            <p className={cn(
              "text-sm text-center",
              darkMode ? "text-gray-500" : "text-gray-600"
            )}>
              © 2024 Ruang Riung Roblox Map. Tema Sunda Modern.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://discord.gg/WzF3zSxwfs" className={cn(
                "text-sm font-medium transition-colors",
                darkMode ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"
              )}>
                Discord
              </a>
              <a href="https://www.roblox.com/games/131848958487439/Ruang-Riung" className={cn(
                "text-sm font-medium transition-colors",
                darkMode ? "text-gray-400 hover:text-emerald-400" : "text-gray-600 hover:text-emerald-600"
              )}>
                Roblox
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
interface HomePageProps {
  darkMode: boolean;
  navigateTo: (page: Page) => void;
  mapFeatures: typeof mapFeatures;
}

function HomePage({ darkMode, navigateTo, mapFeatures }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className={cn(
            "inline-flex items-center px-4 py-2 rounded-full mb-6 backdrop-blur-md border",
            darkMode 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
              : "bg-white/50 border-emerald-200 text-emerald-700"
          )}>
            <span className="mr-2">🎮</span>
            <span className="text-sm font-medium">Roblox Map</span>
          </div>
          
          <h1 className={cn(
            "text-5xl md:text-7xl font-bold mb-6 leading-tight",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            Selamat Datang di{' '}
            <span className={cn(
              "bg-clip-text text-transparent",
              darkMode 
                ? "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400" 
                : "bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600"
            )}>
              Ruang Riung
            </span>
          </h1>
          
          <p className={cn(
            "text-lg md:text-xl mb-10 max-w-2xl mx-auto",
            darkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Map Roblox bertema Sunda yang seru untuk hangout bareng teman-teman! 
            Eksplorasi rumah tradisional, main game, dan nikmati vibes santai khas Sunda 🌿
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.roblox.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300",
                "bg-gradient-to-r from-emerald-500 to-green-600",
                "hover:from-emerald-600 hover:to-green-700",
                "shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40",
                "hover:-translate-y-1"
              )}
            >
              🚀 Main Sekarang
            </a>
            <button
              onClick={() => navigateTo('topup')}
              className={cn(
                "px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-md border",
                darkMode 
                  ? "bg-white/5 border-white/20 text-white hover:bg-white/10" 
                  : "bg-white/50 border-emerald-200 text-emerald-700 hover:bg-white/70"
              )}
            >
              💎 Topup Robux
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
            {[
              { value: "600K+", label: "Players" },
              { value: "⭐ 93%", label: "Rating" },
              { value: "1K+", label: "Favorites" }
            ].map((stat, idx) => (
              <div key={idx} className={cn(
                "p-4 rounded-2xl backdrop-blur-md border",
                darkMode 
                  ? "bg-gray-800/30 border-emerald-500/20" 
                  : "bg-white/40 border-emerald-200/50"
              )}>
                <div className={cn(
                  "text-2xl font-bold",
                  darkMode ? "text-emerald-400" : "text-emerald-600"
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  "text-sm",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className={cn(
            "w-6 h-10 rounded-full border-2 flex items-start justify-center p-2",
            darkMode ? "border-emerald-500/50" : "border-emerald-500"
          )}>
            <div className={cn(
              "w-1 h-2 rounded-full animate-pulse",
              darkMode ? "bg-emerald-400" : "bg-emerald-600"
            )} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className={cn(
              "inline-block px-4 py-2 rounded-full text-sm font-medium mb-4",
              darkMode 
                ? "bg-emerald-500/20 text-emerald-400" 
                : "bg-emerald-100 text-emerald-700"
            )}>
              Fitur Map
            </span>
            <h2 className={cn(
              "text-4xl md:text-5xl font-bold mb-4",
              darkMode ? "text-white" : "text-gray-900"
            )}>
              Apa Aja di Ruang Riung?
            </h2>
            <p className={cn(
              "text-lg max-w-2xl mx-auto",
              darkMode ? "text-gray-400" : "text-gray-600"
            )}>
              Banyak hal seru yang bisa kamu eksplorasi di map kami!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mapFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={cn(
                  "group p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300",
                  "hover:-translate-y-2 hover:shadow-2xl",
                  darkMode 
                    ? "bg-gray-800/30 border-emerald-500/20 hover:bg-gray-800/50 hover:border-emerald-500/40 hover:shadow-emerald-500/10" 
                    : "bg-white/40 border-emerald-100 hover:bg-white/60 hover:border-emerald-200 hover:shadow-emerald-200/50"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110",
                  darkMode 
                    ? "bg-gradient-to-br from-emerald-500/20 to-green-600/20" 
                    : "bg-gradient-to-br from-emerald-100 to-green-100"
                )}>
                  {feature.icon}
                </div>
                <h3 className={cn(
                  "text-xl font-bold mb-2",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "text-sm leading-relaxed",
                  darkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className={cn(
          "max-w-4xl mx-auto p-10 md:p-16 rounded-3xl backdrop-blur-xl border text-center",
          darkMode 
            ? "bg-gradient-to-br from-emerald-900/30 to-green-900/20 border-emerald-500/20" 
            : "bg-gradient-to-br from-emerald-50/80 to-green-50/80 border-emerald-200/50"
        )}>
          <span className="text-6xl mb-6 block">🏠</span>
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            darkMode ? "text-white" : "text-gray-800"
          )}>
            Yuk Gabung Sekarang!
          </h2>
          <p className={cn(
            "text-lg mb-8",
            darkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Ajak teman-temanmu dan rasakan vibes hangout ala Sunda di Roblox. 
            Seru-seruan bareng sambil eksplorasi map yang aesthetic! ✨
          </p>
          <a
            href="https://www.roblox.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-block px-10 py-4 rounded-2xl font-semibold text-white transition-all duration-300",
              "bg-gradient-to-r from-emerald-500 to-green-600",
              "hover:from-emerald-600 hover:to-green-700",
              "shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40",
              "hover:-translate-y-1"
            )}
          >
            🎮 Play on Roblox
          </a>
        </div>
      </section>
    </>
  );
}

