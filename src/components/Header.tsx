import React from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { SupportedLanguage } from "../data/translations";

interface HeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeView: "login" | "register" | "profile";
  onNavigate: (view: "login" | "register") => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  activeView,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate("login")}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              cb
            </div>
            <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 whitespace-nowrap">
              ConnectBook
            </span>
          </button>
        </div>

        {/* Right Controls: Language, Theme, Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <label htmlFor="lang-select" className="sr-only">
              Select Language
            </label>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                id="lang-select"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer text-slate-800 dark:text-slate-100"
              >
                <option value="en">English</option>
                <option value="am">አማርኛ</option>
                <option value="om">Afaan Oromoo</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Primary Action Button */}
          {activeView !== "profile" && (
            <button
              onClick={() => onNavigate(activeView === "login" ? "register" : "login")}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              {activeView === "login" ? "Sign Up" : "Log In"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
