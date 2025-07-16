import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // kullanicinin system temaisni kullan
    const localTheme = localStorage.getItem("theme");
     
    if (localTheme) {
      return localTheme === "dark";
    }

    return window.matchMedia("(prefers-colos-scheme:dark").matches;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  

  return (
    <ThemeContext value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext>
  );
};

// custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === "undefined") throw new Error("Provider'i sarmala");

  return context;
};
