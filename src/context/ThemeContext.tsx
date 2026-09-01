import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'night' | 'day';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isDay: boolean;
  isNight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('sharmag_theme');
    if (saved === 'day' || saved === 'night') return saved;
    return 'night'; // default to royal nocturnal luxury
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('sharmag_theme', newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'night' ? 'day' : 'night';
    setTheme(next);
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'day') {
      root.classList.remove('night');
      root.classList.add('day');
      body.classList.remove('night');
      body.classList.add('day');
    } else {
      root.classList.remove('day');
      root.classList.add('night');
      body.classList.remove('day');
      body.classList.add('night');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isDay: theme === 'day',
        isNight: theme === 'night',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
