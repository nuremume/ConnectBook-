import React, { useState } from "react";
import { Compass, Loader2, Check } from "lucide-react";
import { Country } from "../data/countries";
import { detectCountryByBrowserLocation, detectCountryByIp, DetectionResult } from "../utils/countryDetection";

interface CountryDetectionProps {
  currentCountry: Country;
  onApplyDetectedCountry: (country: Country) => void;
}

export const CountryDetection: React.FC<CountryDetectionProps> = ({
  currentCountry,
  onApplyDetectedCountry,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDetect = async () => {
    setIsDetecting(true);
    setFeedback("Detecting...");

    try {
      // First try browser GPS (if granted)
      let res: DetectionResult = await detectCountryByBrowserLocation();
      if (!res.success) {
        // Fallback to IP
        res = await detectCountryByIp();
      }

      if (res.success && res.country) {
        onApplyDetectedCountry(res.country);
        setFeedback(`Detected ${res.country.name}`);
      } else {
        setFeedback("Please select manually");
      }
    } catch {
      setFeedback("Please select manually");
    } finally {
      setIsDetecting(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="flex items-center justify-end text-xs">
      <button
        type="button"
        onClick={handleDetect}
        disabled={isDetecting}
        className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-60"
      >
        {isDetecting ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : feedback ? (
          <Check className="w-3 h-3 text-emerald-600" />
        ) : (
          <Compass className="w-3 h-3" />
        )}
        <span>{feedback || "Auto-detect location"}</span>
      </button>
    </div>
  );
};
