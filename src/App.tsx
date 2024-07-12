import React, { useCallback, useRef, useState, useEffect } from 'react';
import Card from './components/Card';
import { useDarkMode, DarkModeProvider } from './context/DarkModeContext';
import './index.css';

const links = [
  { id: 'gpu-comparison', title: 'GPU Comparison', description: 'Compare various GPUs available on Vast.ai.', url: 'https://500.farm/vastai/charts/d/1jI4_Pc7z/vast-ai-gpu-comparison?orgId=1&refresh=1m' },
  { id: 'host-map', title: 'Host Map', description: 'View the map of various hosts on Vast.ai.', url: 'https://500.farm/vastai/charts/d/c6ZBUf57z/vast-ai-host-map?orgId=1&refresh=1m' },
  { id: 'stats', title: 'AI Stats', description: 'View various statistics on Vast.ai.', url: 'https://500.farm/vastai/charts/d/a6RgL05nk/vast-ai-stats?orgId=1&refresh=1m' },
  { id: 'stats-multiple', title: 'AI Stats Multiple', description: 'View multiple statistics on Vast.ai.', url: 'https://500.farm/vastai/charts/d/dc6f21ba-250f-47f2-b514-5ff8d17967a9/vast-ai-stats-multiple?orgId=1&refresh=1m' }
];

const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [windowCount, setWindowCount] = useState<number>(0);
  const windowsRef = useRef<Window[]>([]);

  const openWindow = useCallback((url: string) => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    const left = (windowCount * 50) % window.innerWidth;
    const top = (windowCount * 50) % window.innerHeight;

    const newWindow = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

    if (newWindow) {
      windowsRef.current.push(newWindow);
      newWindow.focus();

      setWindowCount((prevCount) => prevCount + 1);

      const focusListener = () => newWindow.document.body.style.opacity = '1';
      const blurListener = () => newWindow.document.body.style.opacity = '0.5';

      newWindow.addEventListener('focus', focusListener);
      newWindow.addEventListener('blur', blurListener);
      newWindow.addEventListener('beforeunload', () => {
        newWindow.removeEventListener('focus', focusListener);
        newWindow.removeEventListener('blur', blurListener);
        windowsRef.current = windowsRef.current.filter(win => win !== newWindow);
      });
    }
  }, [windowCount]);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-primary">Research-Based Website</h1>
        <button
          className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-2 px-4 rounded transition-transform transform hover:scale-105"
          onClick={toggleDarkMode}
        >
          Toggle Dark Mode
        </button>
      </div>
      <div className="relative flex justify-center items-center min-h-screen">
        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <Card key={link.id} link={link} onClick={openWindow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default () => (
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
