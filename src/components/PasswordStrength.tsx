import React from "react";
import { PasswordStrength as PasswordStrengthType } from "../utils/validators";

interface PasswordStrengthProps {
  strength: PasswordStrengthType;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength }) => {
  if (strength.score === 0) return null;

  return (
    <div className="space-y-1 pt-0.5">
      {/* Sleek Minimal Strength Indicator */}
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-500 dark:text-slate-400">
          Security:{" "}
          <span
            className={
              strength.score >= 75
                ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                : strength.score >= 50
                ? "text-amber-600 dark:text-amber-400 font-semibold"
                : "text-rose-600 dark:text-rose-400 font-semibold"
            }
          >
            {strength.label}
          </span>
        </span>
        {strength.score < 50 && (
          <span className="text-slate-400 text-[10px]">Use 8+ chars with mix of letters & numbers</span>
        )}
      </div>

      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.colorClass}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
};
