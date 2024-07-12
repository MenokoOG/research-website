# Research-Based Website Component Documentation

## Overview

This documentation provides an overview of the `App` component in a React application that showcases various research links related to GPU comparisons, host maps, and AI statistics on Vast.ai. The component also includes a dark mode feature and opens external links in new windows with specific dimensions and positions.

## Component Structure

- **Imports**: The component imports necessary React hooks, components, context, and CSS.
- **Links**: An array of link objects is defined, each containing `id`, `title`, `description`, and `url`.
- **App Component**: The main component that manages state, opens new windows, and renders the UI.
- **DarkModeProvider**: The app is wrapped in a `DarkModeProvider` to provide dark mode functionality.

## Code Breakdown

### Imports

```jsx
import React, { useCallback, useRef, useState, useEffect } from 'react';
import Card from './components/Card';
import { useDarkMode, DarkModeProvider } from './context/DarkModeContext';
import './index.css';
```

### Links Array

An array of objects representing different research links.

```jsx
const links = [
  {
    id: 'gpu-comparison',
    title: 'GPU Comparison',
    description: 'Compare various GPUs available on Vast.ai.',
    url: 'https://500.farm/vastai/charts/d/1jI4_Pc7z/vast-ai-gpu-comparison?orgId=1&refresh=1m'
  },
  {
    id: 'host-map',
    title: 'Host Map',
    description: 'View the map of various hosts on Vast.ai.',
    url: 'https://500.farm/vastai/charts/d/c6ZBUf57z/vast-ai-host-map?orgId=1&refresh=1m'
  },
  {
    id: 'stats',
    title: 'AI Stats',
    description: 'View various statistics on Vast.ai.',
    url: 'https://500.farm/vastai/charts/d/a6RgL05nk/vast-ai-stats?orgId=1&refresh=1m'
  },
  {
    id: 'stats-multiple',
    title: 'AI Stats Multiple',
    description: 'View multiple statistics on Vast.ai.',
    url: 'https://500.farm/vastai/charts/d/dc6f21ba-250f-47f2-b514-5ff8d17967a9/vast-ai-stats-multiple?orgId=1&refresh=1m'
  }
];
```

### App Component

#### State and Refs

- `darkMode` and `toggleDarkMode`: Provided by the `useDarkMode` context.
- `windowCount`: Tracks the number of windows opened.
- `windowsRef`: A reference to keep track of the opened windows.

```jsx
const App: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [windowCount, setWindowCount] = useState<number>(0);
  const windowsRef = useRef<Window[]>([]);
```

#### openWindow Function

A function to open new windows with specific dimensions and manage their focus/blur events.

```jsx
  const openWindow = useCallback((url: string) => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    const left = (windowCount * 50) % window.innerWidth;
    const top = (windowCount * 50) % window.innerHeight;

    const newWindow = window.open(
      url,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (newWindow) {
      windowsRef.current.push(newWindow);
      newWindow.focus();

      setWindowCount((prevCount) => prevCount + 1);

      const focusListener = () => {
        newWindow.document.body.style.opacity = '1';
      };

      const blurListener = () => {
        newWindow.document.body.style.opacity = '0.5';
      };

      newWindow.addEventListener('focus', focusListener);
      newWindow.addEventListener('blur', blurListener);

      newWindow.addEventListener('beforeunload', () => {
        newWindow.removeEventListener('focus', focusListener);
        newWindow.removeEventListener('blur', blurListener);
        windowsRef.current = windowsRef.current.filter(win => win !== newWindow);
      });
    }
  }, [windowCount]);
```

#### JSX

Renders the application UI with a dark mode toggle button and a grid of cards representing the links.

```jsx
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-primary">Research-Based Website</h1>
        <div className="flex items-center">
          <button
            className="bg-gradient-to-r from-purple-700 to-blue-500 text-white py-2 px-4 rounded transition-transform transform hover:scale-105 mr-4"
            onClick={toggleDarkMode}
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
      <div className="relative flex justify-center items-center min-h-screen">
        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <div key={link.id}>
              <Card link={link} onClick={openWindow} />
            </div>
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
```

## Usage

To use this component, ensure you have the following:

1. **Card Component**: A component to display individual cards.
2. **DarkModeContext**: A context to manage dark mode state.
3. **CSS File**: An `index.css` file for styling.

