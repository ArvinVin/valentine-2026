
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import QuestionPage from './components/QuestionPage';
import SuccessPage from './components/SuccessPage';
import ThankYouPage from './components/ThankYouPage';
import FloatingHearts from './components/FloatingHearts';

export enum PageState {
  LANDING = 'LANDING',
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS',
  THANK_YOU = 'THANK_YOU'
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>(PageState.LANDING);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <FloatingHearts />

      <div className="z-10 w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-8 text-center transition-all duration-500 transform">
        {currentPage === PageState.LANDING && (
          <LandingPage onStart={() => setCurrentPage(PageState.QUESTION)} />
        )}

        {currentPage === PageState.QUESTION && (
          <QuestionPage onYes={() => setCurrentPage(PageState.SUCCESS)} />
        )}

        {currentPage === PageState.SUCCESS && (
          <SuccessPage
            onReset={() => setCurrentPage(PageState.LANDING)}
            onClaimed={() => setCurrentPage(PageState.THANK_YOU)}
          />
        )}

        {currentPage === PageState.THANK_YOU && (
          <ThankYouPage onReset={() => setCurrentPage(PageState.LANDING)} />
        )}
      </div>

      <footer className="fixed bottom-4 text-rose-400 text-xs font-medium">
        Made with ❤️ for someone special
      </footer>
    </div>
  );
};

export default App;
