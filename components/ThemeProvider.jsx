"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => { },
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("drivefleet-theme");
    const prefersDark =
      !saved && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("drivefleet-theme", next);
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
