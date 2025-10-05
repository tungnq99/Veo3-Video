
import React from 'react';
import { Mode } from '../types';
import { Sparkles, Image } from './icons';

interface ModeSelectorProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  const buttonBaseClasses = "relative z-10 flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 w-44";

  return (
    <div className="flex justify-center mb-8">
      <div className="relative flex items-center bg-black/20 p-1 rounded-xl">
        <span
          className="absolute top-1 bottom-1 h-auto w-44 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(${mode === Mode.TEXT ? '0%' : '100%'})` }}
        />
        <button
          onClick={() => setMode(Mode.TEXT)}
          className={`${buttonBaseClasses} ${mode === Mode.TEXT ? 'text-white' : 'text-indigo-200 hover:text-white'}`}
        >
          <Sparkles className="w-5 h-5" />
          Text to Video
        </button>
        <button
          onClick={() => setMode(Mode.IMAGE)}
          className={`${buttonBaseClasses} ${mode === Mode.IMAGE ? 'text-white' : 'text-indigo-200 hover:text-white'}`}
        >
          <Image className="w-5 h-5" />
          Image to Video
        </button>
      </div>
    </div>
  );
};

export default ModeSelector;