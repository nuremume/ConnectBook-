import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string | null;
  helperText?: string;
  icon?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = "text",
  error = null,
  helperText,
  icon,
  required,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const effectiveType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full space-y-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      </div>

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={effectiveType}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className={`w-full py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
            icon ? "pl-9" : "pl-3.5"
          } ${isPasswordType ? "pr-10" : "pr-3.5"} ${
            error
              ? "border-rose-400 dark:border-rose-800 bg-rose-50/20"
              : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 shadow-sm"
          } ${className}`}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
