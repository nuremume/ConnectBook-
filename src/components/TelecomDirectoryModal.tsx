import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  Radio,
  ExternalLink,
  ShieldAlert,
  CheckCircle,
  Building,
  Info,
  Calendar,
  Globe,
} from "lucide-react";
import { TELECOM_OPERATORS, TelecomOperator } from "../data/telecomOperators";

interface TelecomDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountryCode?: string;
}

export const TelecomDirectoryModal: React.FC<TelecomDirectoryModalProps> = ({
  isOpen,
  onClose,
  initialCountryCode = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialCountryCode);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "ET" | "verified">("all");

  const filteredOperators = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return TELECOM_OPERATORS.filter((op) => {
      // Filter tab check
      if (selectedFilter === "ET" && op.countryCode !== "ET") return false;
      if (selectedFilter === "verified" && op.verificationStatus !== "Officially Verified") return false;

      if (!query) return true;
      const matchName = op.operatorName.toLowerCase().includes(query);
      const matchBrand = op.brandName?.toLowerCase().includes(query) ?? false;
      const matchCountry = op.countryName.toLowerCase().includes(query) || op.countryCode.toLowerCase().includes(query);
      const matchPrefix = op.mobilePrefixes?.some((p) => p.includes(query)) ?? false;

      return matchName || matchBrand || matchCountry || matchPrefix;
    });
  }, [searchTerm, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="telecom-directory-title"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 id="telecom-directory-title" className="text-xl font-bold text-slate-900 dark:text-white">
                International Telecom Operator Directory
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Grounded telecom registry featuring Ethio telecom, Safaricom, and verified international carriers
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Technical Disclaimer Box */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl text-xs text-amber-900 dark:text-amber-200 mb-4 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <p className="font-bold">Important Technical Notice & Privacy Boundary:</p>
            <p className="mt-0.5 text-[11px] text-amber-800 dark:text-amber-300">
              A country calling code or prefix does not confirm live carrier identity due to Mobile Number Portability (MNP) and regulatory numbering block reallocations. This directory is an informational reference and cannot access private subscriber records or perform live carrier lookups.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by operator, country, or series prefix..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => setSelectedFilter("ET")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedFilter === "ET"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              🇪🇹 Ethiopia Only
            </button>
            <button
              onClick={() => setSelectedFilter("verified")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedFilter === "verified"
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              Verified MNOs
            </button>
          </div>
        </div>

        {/* Operators List */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800 pr-1 space-y-3">
          {filteredOperators.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
              <Building className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                No operator record found for &quot;{searchTerm}&quot;
              </p>
              <p className="mt-1 text-[11px] max-w-sm mx-auto">
                In strict adherence to project standards, unverified telecom records are omitted rather than fabricated.
              </p>
            </div>
          ) : (
            filteredOperators.map((operator) => (
              <div
                key={operator.id}
                className={`p-4 rounded-2xl border transition-all ${
                  operator.countryCode === "ET"
                    ? "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60"
                    : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {operator.operatorName}
                      </span>
                      {operator.brandName && (
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          ({operator.brandName})
                        </span>
                      )}
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {operator.countryCode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {operator.countryName} · {operator.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="w-3 h-3" />
                      <span>{operator.verificationStatus}</span>
                    </span>
                  </div>
                </div>

                {operator.notes && (
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-normal">
                    {operator.notes}
                  </p>
                )}

                {/* Technical Specs: Prefixes & Technologies */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  {operator.mobilePrefixes && operator.mobilePrefixes.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Allocated Series: </span>
                      <span className="font-mono text-slate-600 dark:text-slate-400">
                        {operator.mobilePrefixes.join(", ")}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Network Tech: </span>
                    <span>{operator.networkTechnologies.join(" · ")}</span>
                  </div>
                </div>

                {/* Source & Website */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>Source: {operator.source} (Reviewed: {operator.lastReviewedDate})</span>
                  </div>

                  <a
                    href={operator.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
