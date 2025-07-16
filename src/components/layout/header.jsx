import { Moon, Star, Sun, TrendingUp } from "lucide-react";
import React, { useContext } from "react";
import { ThemeContext, useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center   space-x-3">
            <div className="bg-blue-600 dark:bg-blue-500 p-2 rounded-lg">
              <TrendingUp color="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                CryptoTracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Crypto Tracking System
              </p>
            </div>
          </div>
          {/* Iconlar */}
          <div className="flex items-center space-x-4">
            {/* favoriler */}
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer">
              <Star className="size-5" />
              <span className="text-sm">1</span>
            </div>

            {/* Tema */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-500 transition cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="size-5 text-yellow-500 cursor-pointer" />
              ) : (
                <Moon className="size-5 text-gray-600 cursor-pointer" />
              )}
            </button>

            <div className="flex items-center space-x-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
