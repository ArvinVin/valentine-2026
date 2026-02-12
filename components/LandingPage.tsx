
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="space-y-10 animate-in fade-in zoom-in duration-1000">
      <div className="relative inline-block group">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <img
            // src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop" 
            src="assets/aaa.png"
            alt="Romantic Valentine"
            className="rounded-2xl shadow-2xl border-4 border-white/80 w-full max-w-sm mx-auto transform transition duration-500 hover:rotate-1 object-cover h-64 md:h-80"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg transform -rotate-6">
            <span className="text-2xl">🌹</span>
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg transform rotate-6">
            <span className="text-2xl">💍</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-romantic text-rose-600 drop-shadow-md animate-soft-pulse">
          Happy Valentine's Day
        </h1>

        <div className="relative">
          <div className="h-px w-24 bg-rose-200 mx-auto my-4"></div>
          <p className="text-rose-700 text-xl font-medium italic">
            "To the person who makes every day feel like spring..."
          </p>
          <div className="h-px w-24 bg-rose-200 mx-auto my-4"></div>
        </div>

        <p className="text-rose-500/80 text-lg max-w-sm mx-auto leading-relaxed">
          I have a special message that only you can open. Ready to see it?
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={onStart}
          className="shimmer-btn px-12 py-5 text-white font-bold text-2xl rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-2xl hover:shadow-rose-400 flex items-center gap-3 mx-auto"
        >
          <span>Open Invitation</span>
          <span className="animate-bounce">💌</span>
        </button>
      </div>

      <div className="flex justify-center gap-4 text-rose-300 opacity-50">
        <span className="text-xl">💖</span>
        <span className="text-xl">Created by VIN</span>
        <span className="text-xl">💖</span>
      </div>
    </div>
  );
};

export default LandingPage;
