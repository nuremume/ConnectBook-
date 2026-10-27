import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, Star, X } from "lucide-react";
import { Country, COUNTRIES } from "../data/countries";

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  id?: string;
  label?: string;
  error?: string | null;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
  id = "country-selector",
  label = "Country / Territory",
  error = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Filter countries by name, code, or dial code
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return COUNTRIES;

    // Remove leading plus if user typed "+251"
    const queryNoPlus = query.replace(/^\+/, "");

    return COUNTRIES.filter((c) => {
      const matchName = c.name.toLowerCase().includes(query);
      const matchIso = c.code.toLowerCase().includes(query);
      const matchDial = c.dialCode.includes(query) || c.dialCode.replace("+", "").includes(queryNoPlus);
      return matchName || matchIso || matchDial;
    });
  }, [searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setFocusedIndex(0);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && listRef.current && filteredCountries.length > 0) {
      const activeEl = listRef.current.children[focusedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [focusedIndex, isOpen, filteredCountries.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < filteredCountries.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredCountries.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCountries[focusedIndex]) {
          onSelectCountry(filteredCountries[focusedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(Math.max(0, filteredCountries.length - 1));
        break;
    }
  };

  const ethiopiaCountry = COUNTRIES.find((c) => c.code === "ET");

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
        >
          {label} <span className="text-rose-500">*</span>
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Selected country: ${selectedCountry.name}, Dialing code: ${selectedCountry.dialCode}`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full h-10 px-3 bg-[#f5f6f7] dark:bg-[#3a3b3c] border rounded-md text-left text-[14px] flex items-center justify-between transition-colors focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none ${
          error
            ? "border-[#f02849]"
            : isOpen
            ? "border-[#1877f2] bg-white ring-1 ring-[#1877f2]"
            : "border-[#ccd0d5] dark:border-[#4e4f50] hover:border-[#8a8d91]"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-lg leading-none select-none" aria-hidden="true">
            {selectedCountry.flag}
          </span>
          <span className="font-normal text-[#1c1e21] dark:text-[#e4e6eb] truncate text-[14px]">
            {selectedCountry.name}
          </span>
          <span className="text-xs font-mono text-[#606770] dark:text-[#b0b3b8]">
            {selectedCountry.dialCode}
          </span>
          {selectedCountry.code === "ET" && (
            <span className="text-[10px] font-bold text-[#1877f2] bg-blue-50 dark:bg-blue-950 px-1 py-0.2 rounded">
              +251
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#8a8d91] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#1877f2]" : ""
          }`}
        />
      </button>

      {/* Error state */}
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-96 flex flex-col">
          {/* Quick Ethiopia Highlight Banner */}
          {ethiopiaCountry && (
            <div className="p-2 bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-950/40 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span className="font-semibold">Featured Destination:</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectCountry(ethiopiaCountry);
                  setIsOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <span>🇪🇹 Ethiopia</span>
                <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">+251</span>
              </button>
            </div>
          )}

          {/* Search Box */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search 100 countries by name, +code, or ISO..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between px-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Showing {filteredCountries.length} of {COUNTRIES.length} countries</span>
              <span>Use ↑ ↓ Enter</span>
            </div>
          </div>

          {/* Countries List */}
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className="overflow-y-auto max-h-64 divide-y divide-slate-100 dark:divide-slate-800/60 p-1"
          >
            {filteredCountries.length === 0 ? (
              <li className="py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
                <p className="font-medium">No countries matched &quot;{searchQuery}&quot;</p>
                <p className="mt-1 text-[11px]">Try searching by dial code (e.g. +251, +1, +44) or ISO code.</p>
              </li>
            ) : (
              filteredCountries.map((country, idx) => {
                const isSelected = country.code === selectedCountry.code;
                const isFocused = idx === focusedIndex;

                return (
                  <li
                    key={country.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelectCountry(country);
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                      isFocused
                        ? "bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-100"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    } ${isSelected ? "font-semibold bg-blue-50/50 dark:bg-blue-950/30" : ""}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base select-none" aria-hidden="true">
                        {country.flag}
                      </span>
                      <span className="truncate">{country.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                        {country.code}
                      </span>
                      {country.code === "ET" && (
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1 rounded">
                          ET +251
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-mono font-medium text-slate-600 dark:text-slate-300">
                        {country.dialCode}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
