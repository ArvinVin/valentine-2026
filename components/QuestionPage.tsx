
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface QuestionPageProps {
  onYes: () => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState({ x: 140, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = useCallback((mouseX?: number, mouseY?: number) => {
    if (!containerRef.current || !noButtonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noButtonRef.current.getBoundingClientRect();
    
    const padding = 80;
    const limitX = (containerRect.width / 2) - padding;
    const limitY = (containerRect.height / 2) - padding;

    if (mouseX === undefined || mouseY === undefined) {
      setNoPosition({
        x: (Math.random() - 0.5) * limitX * 2,
        y: (Math.random() - 0.5) * limitY * 2
      });
      return;
    }

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    let diffX = btnCenterX - mouseX;
    let diffY = btnCenterY - mouseY;

    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    const safeDistance = Math.max(distance, 1);
    
    const pushFactor = 140; 
    let moveX = (diffX / safeDistance) * pushFactor;
    let moveY = (diffY / safeDistance) * pushFactor;

    let newX = noPosition.x + moveX;
    let newY = noPosition.y + moveY;

    if (Math.abs(newX) > limitX) newX = newX > 0 ? limitX - 30 : -limitX + 30;
    if (Math.abs(newY) > limitY) newY = newY > 0 ? limitY - 30 : -limitY + 30;

    setNoPosition({ x: newX, y: newY });
    setRotation((Math.random() - 0.5) * 25);
    setMoveCount(prev => prev + 1);
  }, [noPosition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!noButtonRef.current) return;
      
      const rect = noButtonRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
      );

      if (distance < 120) {
        moveNoButton(mouseX, mouseY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [moveNoButton]);

  const messages = [
    "Will you be my valentine?"
  ];

  const currentMessageIndex = Math.min(Math.floor(moveCount / 3), messages.length - 1);

  return (
    <div ref={containerRef} className="relative min-h-[450px] flex flex-col items-center justify-center space-y-12 py-10 overflow-hidden select-none">
      <div className="space-y-4 px-4 z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-romantic text-rose-600 transition-all duration-500 min-h-[1.5em]">
          {messages[currentMessageIndex]}
        </h2>
        <p className={`text-rose-400 italic transition-opacity duration-500 ${moveCount > 5 ? 'opacity-100' : 'opacity-0'}`}>
          {moveCount > 15 ? "Udah capek belom? Klik Yes aja sih... 🙄" : "Capek ya? Klik Yes aja mending..."}
        </p>
      </div>
      
      <div className="flex items-center justify-center w-full relative h-40">
        <button 
          onClick={onYes}
          className="z-30 px-12 py-5 bg-gradient-to-br from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700 text-white font-bold text-3xl rounded-2xl transition-all transform hover:scale-110 active:scale-95 shadow-[0_10px_20px_rgba(244,63,94,0.3)] -translate-x-16"
        >
          Yes! 😍
        </button>

        <button 
          ref={noButtonRef}
          onMouseEnter={() => moveNoButton()}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px) rotate(${rotation}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
          className="absolute z-20 px-8 py-3 bg-white text-rose-400 font-bold text-lg rounded-xl shadow-lg border-2 border-rose-100 hover:border-rose-300 pointer-events-auto"
        >
          No 🤪
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
