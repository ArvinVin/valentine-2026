
import React, { useState, useEffect } from 'react';

interface SuccessPageProps {
  onReset: () => void;
  onClaimed: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onReset, onClaimed }) => {
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const places = ["Aged Butchered", "Animale", "Sushimaru", "Beautiful Night", "Yao Hotpot", "Sukiyakirin"];
  const [selectedPlace, setSelectedPlace] = useState<string>("Beautiful Night");

  // Track offsets and rotations for "naughty" buttons
  const [naughtyStates, setNaughtyStates] = useState<Record<string, { x: number; y: number; rotate: number; scale: number }>>({
    "Aged Butchered": { x: 0, y: 0, rotate: 0, scale: 1 },
    "Animale": { x: 0, y: 0, rotate: 0, scale: 1 }
  });

  const generateRomanticNote = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAiMessage("Yay! I’m so happy you agreed to be my Valentine! ❤️ The voucher below is ready — just make sure you choose the right place… 😉");
    } catch (error) {
      setAiMessage("Yay! I’m so happy you agreed to be my Valentine! ❤️ The voucher below is ready — just make sure you choose the right place… 😉");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateRomanticNote();
  }, []);

  const handleNaughtyHover = (place: string) => {
    if (place === "Aged Butchered" || place === "Animale") {
      const newX = (Math.random() - 0.5) * 220;
      const newY = (Math.random() - 0.5) * 160;
      const newRotate = (Math.random() - 0.5) * 30;
      const newScale = 0.9 + Math.random() * 0.2;

      setNaughtyStates(prev => ({
        ...prev,
        [place]: { x: newX, y: newY, rotate: newRotate, scale: newScale }
      }));
    }
  };

  const handleClaim = () => {
    // 1. Buat daftar link sesuai dengan nama tempatnya
    const downloadLinks = {
        'Yao Hotpot': 'https://files.fivemerr.com/images/c4608b5f-5e99-4b5f-8f27-cca832aa0660.png',
        'Sushimaru': 'https://files.fivemerr.com/images/b1fbe0c8-6e0f-48f5-9b39-1c98eaf8711d.png',
        'Sukiyakirin': 'https://files.fivemerr.com/images/f16d32ef-2703-4d69-ac40-05a5309c7650.png',
        'Beautiful Night': 'https://files.fivemerr.com/images/8737e53e-3fc8-41c6-bc2d-6ca524858826.png',
        'Animale': 'https://files.fivemerr.com/images/121ae795-4fdf-45e5-b51b-2c4a20dd0fc7.png',
        'Aged Butchered': 'https://files.fivemerr.com/images/e111a2f3-6dca-4fda-994c-299017175ddd.png'
    };

    // 2. Ambil URL berdasarkan selectedPlace
    // Pastikan isi variabel 'selectedPlace' sama persis dengan kunci di atas (huruf kecil/spasi)
    const targetUrl = downloadLinks[selectedPlace];
    const fileName = `${selectedPlace}.png`;

    // Cek jika link ditemukan
    if (targetUrl) {
        const link = document.createElement('a');
        link.href = targetUrl;
        link.download = fileName;
        link.target = '_blank'; // Opsional: untuk memastikan tetap terbuka jika download otomatis gagal
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.error('Link tidak ditemukan untuk:', selectedPlace);
    }

    // Alert then proceed to the next page
    setTimeout(() => {
        onClaimed();
    }, 500);
};

  return (
    <div className="space-y-8 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-1000 max-w-md mx-auto relative">
      <div className="space-y-2">
        <h2 className="text-5xl md:text-6xl font-romantic text-rose-600">
          YAYYY! 💖
        </h2>
        <p className="text-rose-400 font-bold uppercase tracking-widest text-sm">It's a Date!</p>
      </div>

      <div className="bg-rose-50 p-6 rounded-2xl border-2 border-dashed border-rose-200 italic text-rose-800 relative shadow-inner">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce mx-1" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <p className="text-xl leading-relaxed">"{aiMessage}"</p>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 space-y-6 text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-100 rounded-bl-full opacity-50"></div>

        <div className="space-y-4">
          <h3 className="font-bold text-rose-600 text-lg flex items-center gap-2">
            <span>📅</span> Date Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-rose-300 uppercase">Date</label>
              <div className="p-3 bg-rose-50 rounded-xl text-rose-700 font-semibold border border-rose-100">
                14 Feb 2026
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-rose-300 uppercase">Time</label>
              <div className="p-3 bg-rose-50 rounded-xl text-rose-700 font-semibold border border-rose-100">
                19:00 - 21:00
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-rose-300 uppercase">Pick Our Dining Spot</label>
            <div className="grid grid-cols-2 gap-3 relative min-h-[180px]">
              {places.map((place) => {
                const isNaughty = place === "Aged Butchered" || place === "Animale";
                const state = isNaughty ? (naughtyStates[place] || { x: 0, y: 0, rotate: 0, scale: 1 }) : { x: 0, y: 0, rotate: 0, scale: 1 };

                return (
                  <div
                    key={place}
                    className="relative"
                    style={{
                      transform: isNaughty ? `translate(${state.x}px, ${state.y}px) rotate(${state.rotate}deg) scale(${state.scale})` : 'none',
                      transition: isNaughty ? 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
                      zIndex: isNaughty ? 100 : 10
                    }}
                  >
                    <button
                      onMouseEnter={() => handleNaughtyHover(place)}
                      onClick={() => setSelectedPlace(place)}
                      className={`w-full p-3 text-sm font-semibold rounded-xl border-2 transition-all whitespace-nowrap active:scale-95 ${selectedPlace === place
                        ? "bg-rose-500 border-rose-600 text-white shadow-md scale-105"
                        : "bg-white border-rose-100 text-rose-400 hover:border-rose-200"
                        }`}
                    >
                      {place}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={handleClaim}
          className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xl rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 group z-[60] relative mt-4"
        >
          <span>Claim Voucher</span>
          <span className="group-hover:rotate-12 transition-transform">🎟️</span>
        </button>
      </div>

      <div className="pt-4 flex flex-col items-center gap-4">
        <button
          onClick={onReset}
          className="text-rose-300 hover:text-rose-500 text-xs underline transition-colors"
        >
          Back to Start
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
