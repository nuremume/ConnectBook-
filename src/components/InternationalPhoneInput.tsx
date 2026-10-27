import React, { useState, useEffect } from "react";
import { Check, AlertCircle, X } from "lucide-react";
import { Country, COUNTRIES } from "../data/countries";
import { validatePhoneNumber, PhoneValidationResult, cleanNumberForCountrySwitch } from "../utils/phoneValidation";

interface InternationalPhoneInputProps {
  country: Country;
  onCountryChange: (newCountry: Country) => void;
  value: string;
  onChange: (val: string, validation: PhoneValidationResult) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  onOpenTelecomDirectory?: () => void;
}

export const InternationalPhoneInput: React.FC<InternationalPhoneInputProps> = ({
  country,
  onCountryChange,
  value,
  onChange,
  required = true,
  disabled = false,
  error = null,
  onOpenTelecomDirectory,
}) => {
  const [validation, setValidation] = useState<PhoneValidationResult>(() =>
    validatePhoneNumber(value, country.code)
  );

  // Validate whenever value or country changes
  useEffect(() => {
    const res = validatePhoneNumber(value, country.code);
    setValidation(res);
  }, [value, country.code]);

  // Handle number input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const res = validatePhoneNumber(inputVal, country.code);
    setValidation(res);
    onChange(inputVal, res);
  };

  // Handle country switch without duplicating prefixes
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIso = e.target.value;
    const nextCountry = COUNTRIES.find((c) => c.code === selectedIso);
    if (nextCountry) {
      const cleaned = cleanNumberForCountrySwitch(value, country.dialCode, nextCountry.dialCode);
      onCountryChange(nextCountry);
      const res = validatePhoneNumber(cleaned, nextCountry.code);
      setValidation(res);
      onChange(cleaned, res);
    }
  };

  const handleClear = () => {
    const res = validatePhoneNumber("", country.code);
    setValidation(res);
    onChange("", res);
  };

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor="phone-national-input"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          International Mobile Number {required && <span className="text-rose-500">*</span>}
        </label>
        {validation.statusType === "valid" && (
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> E.164: {validation.e164}
          </span>
        )}
      </div>

      {/* Input Group: Country Selector Prefix + National Digits */}
      <div
        className={`flex items-center h-10 rounded-md border bg-[#f5f6f7] dark:bg-[#3a3b3c] focus-within:bg-white dark:focus-within:bg-[#3a3b3c] transition-colors ${
          error || (value && !validation.isValid && validation.statusType === "invalid")
            ? "border-[#f02849]"
            : validation.isValid
            ? "border-[#42b72a]"
            : "border-[#ccd0d5] dark:border-[#4e4f50] focus-within:border-[#1877f2]"
        }`}
      >
        {/* Country Flag & Dial Code Select */}
        <div className="relative flex items-center pl-2.5 pr-1.5 py-1 border-r border-[#ccd0d5] dark:border-[#4e4f50] shrink-0">
          <span className="text-lg mr-2 select-none" aria-hidden="true">
            {country.flag}
          </span>
          <select
            value={country.code}
            onChange={handleCountrySelect}
            disabled={disabled}
            aria-label="Country Dial Code"
            className="bg-transparent border-none text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-4 appearance-none"
          >
            {/* Curated list with Ethiopia highlighted */}
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="text-slate-900 bg-white dark:bg-slate-800">
                {c.flag} {c.dialCode} ({c.name})
              </option>
            ))}
          </select>
          <span className="absolute right-1 pointer-events-none text-[10px] text-slate-400">▼</span>
        </div>

        {/* National Number Input */}
        <div className="relative flex-1 flex items-center">
          <input
            id="phone-national-input"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={`e.g. ${country.phonePlaceholder}`}
            className="w-full px-3 py-2.5 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-sans"
          />

          {/* Clear button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear phone input"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Validation Status Icon */}
          <div className="pr-3 flex items-center">
            {validation.isValid ? (
              <div
                title="Valid phone number format according to ITU metadata"
                className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400"
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            ) : value ? (
              <div
                title={validation.errorReason || "Incomplete phone number"}
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  validation.statusType === "possible"
                    ? "bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400"
                    : "bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400"
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Clean Error Message Only */}
      {(error || (value && !validation.isValid)) && (
        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error || validation.errorReason}</span>
        </p>
      )}
    </div>
  );
};
