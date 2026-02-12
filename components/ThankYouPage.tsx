
import React from 'react';

interface ThankYouPageProps {
    onReset: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onReset }) => {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700 py-10">
            <div className="flex justify-center">
                <div className="text-8xl animate-bounce">🥰</div>
            </div>

            <div className="space-y-4">
                <h2 className="text-5xl font-romantic text-rose-600">
                    Thank You, My Valentine!
                </h2>
                <p className="text-xl text-rose-700 italic px-4">
                    Voucher secured! ✨
                </p>
            </div>

            <div className="bg-rose-50 p-8 rounded-3xl border-2 border-rose-100 shadow-inner max-w-sm mx-auto">
                <p className="text-lg font-bold text-rose-800 leading-relaxed">
                    Don’t forget to send me a screenshot or the voucher file on <span className="text-rose-600 underline decoration-rose-300">my WhatsApp</span> so I can book the place right away! 📱💨
                </p>
            </div>

            <div className="pt-6">
                <button
                    onClick={onReset}
                    className="px-8 py-3 bg-white text-rose-400 font-bold text-sm rounded-full shadow-md border border-rose-100 hover:bg-rose-50 transition-colors"
                >
                    Start Over
                </button>
            </div>

            <div className="flex justify-center gap-2 text-rose-200">
                <span>✨</span>
                <span>Created by VIN</span>
                <span>✨</span>
            </div>
        </div>
    );
};

export default ThankYouPage;
