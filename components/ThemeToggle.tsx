'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-light-secondary dark:bg-dark-secondary border border-light-border dark:border-dark-border" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text bg-light-secondary/60 dark:bg-dark-secondary/60 hover:bg-light-secondary dark:hover:bg-dark-secondary border border-light-border dark:border-dark-border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      id="theme-toggle-btn"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform duration-200 rotate-0 hover:rotate-12" />
      ) : (
        <Moon className="w-4 h-4 text-purple-700 transition-transform duration-200 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
