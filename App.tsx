
import React, { useState } from 'react';
import { Mode } from './types';
import { useVideoGenerator } from './hooks/useVideoGenerator';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import InputPanel from './components/InputPanel';
import PreviewPanel from './components/PreviewPanel';
import Examples from './components/Examples';

export default function App() {
  const [mode, setMode] = useState<Mode>(Mode.TEXT);
  const videoGeneratorState = useVideoGenerator();

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    // Optional: Reset state when changing modes
    // videoGeneratorState.setPrompt('');
    // videoGeneratorState.removeImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-sans animated-gradient">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <ModeSelector mode={mode} setMode={handleModeChange} />

        <main className="mt-8 grid md:grid-cols-2 gap-8">
          <InputPanel
            mode={mode}
            {...videoGeneratorState}
          />
          <PreviewPanel {...videoGeneratorState} />
        </main>

        <Examples mode={mode} setPrompt={videoGeneratorState.setPrompt} />
      </div>
    </div>
  );
}