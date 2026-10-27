import React from "react";
import { MapPin, Building2 } from "lucide-react";
import { Country } from "../data/countries";
import { getCountryRegions } from "../data/regions";

interface LocationFieldsProps {
  country: Country;
  region: string;
  onRegionChange: (val: string) => void;
  city: string;
  onCityChange: (val: string) => void;
  postalCode?: string;
  onPostalCodeChange?: (val: string) => void;
}

export const LocationFields: React.FC<LocationFieldsProps> = ({
  country,
  region,
  onRegionChange,
  city,
  onCityChange,
  postalCode = "",
  onPostalCodeChange,
}) => {
  const regionConfig = getCountryRegions(country.code);

  const selectedRegionObj = regionConfig?.regions.find(
    (r) => r.name.toLowerCase() === region.toLowerCase()
  );

  return (
    <div className="space-y-3 pt-1">

      {/* Region & City Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Region Field */}
        <div>
          <label
            htmlFor="region-select"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            {regionConfig ? regionConfig.regionLabel : "State / Province / Region"}
            <span className="text-slate-400 font-normal ml-1">(Optional)</span>
          </label>

          {regionConfig && regionConfig.regions.length > 0 ? (
            <div className="relative">
              <select
                id="region-select"
                value={region}
                onChange={(e) => {
                  onRegionChange(e.target.value);
                  onCityChange("");
                }}
                className="w-full h-10 px-3 text-[14px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] rounded-md text-[#1c1e21] dark:text-[#e4e6eb] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none focus:border-[#1877f2]"
              >
                <option value="">Select {regionConfig.regionLabel}...</option>
                {regionConfig.regions.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name} ({r.type})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="region-select"
                type="text"
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                placeholder="Enter region or province"
                className="w-full h-10 pl-9 pr-3 text-[14px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none focus:border-[#1877f2]"
              />
            </div>
          )}
        </div>

        {/* City / Sub-city Field */}
        <div>
          <label
            htmlFor="city-input"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            {regionConfig ? regionConfig.cityLabel : "City / Town"}
            <span className="text-slate-400 font-normal ml-1">(Optional)</span>
          </label>

          {selectedRegionObj && selectedRegionObj.majorCities.length > 0 ? (
            <div className="relative">
              <select
                id="city-input"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full h-10 px-3 text-[14px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] rounded-md text-[#1c1e21] dark:text-[#e4e6eb] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none focus:border-[#1877f2]"
              >
                <option value="">Select {regionConfig?.cityLabel || "City"}...</option>
                {selectedRegionObj.majorCities.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="city-input"
                type="text"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                placeholder="Enter city or locality"
                className="w-full h-10 pl-9 pr-3 text-[14px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none focus:border-[#1877f2]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Optional Postal Code for countries where applicable (e.g. US, UK, DE, CA) */}
      {["US", "GB", "DE", "CA", "FR", "AU"].includes(country.code) && onPostalCodeChange && (
        <div className="max-w-xs">
          <label
            htmlFor="postal-code"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
          >
            Postal / ZIP Code <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="postal-code"
            type="text"
            value={postalCode}
            onChange={(e) => onPostalCodeChange(e.target.value)}
            placeholder="e.g. 90210 or SW1A 1AA"
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      )}
    </div>
  );
};
