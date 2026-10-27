import React from "react";
import { X } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  type: "terms" | "privacy";
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  const isTerms = type === "terms";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#242526] rounded-lg shadow-2xl border border-[#dadde1] dark:border-[#3a3b3c] max-h-[85vh] flex flex-col text-[#1c1e21] dark:text-[#e4e6eb]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#dadde1] dark:border-[#3a3b3c]">
          <h2 className="text-xl font-bold text-[#1c1e21] dark:text-[#e4e6eb]">
            {isTerms ? "Terms of Service" : "Privacy Policy"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#606770] hover:text-[#1c1e21] dark:text-[#b0b3b8] dark:hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4 text-[13px] leading-relaxed text-[#65676b] dark:text-[#b0b3b8]">
          {isTerms ? (
            <>
              <section className="space-y-1">
                <h3 className="font-bold text-sm text-[#1c1e21] dark:text-[#e4e6eb]">
                  1. Our Services
                </h3>
                <p>
                  ConnectBook provides a global communication platform to help people connect, build communities, and share content securely across borders. By creating an account, you agree to these Terms.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-sm text-[#1c1e21] dark:text-[#e4e6eb]">
                  2. Your Commitments
                </h3>
                <p>
                  To maintain a safe and respectful community, you agree to provide accurate registration information, protect your credentials, and refrain from abusive or unlawful activities.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-sm text-[#1c1e21] dark:text-[#e4e6eb]">
                  3. International Numbering & Communications
                </h3>
                <p>
                  Phone number verification follows international ITU telecommunications standards (E.164). For accounts in Ethiopia, national numbering conforms to Ethiopian Communications Authority specifications (+251).
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-1">
                <h3 className="font-bold text-sm text-[#1c1e21] dark:text-[#e4e6eb]">
                  1. Information We Collect
                </h3>
                <p>
                  We collect information you provide when creating an account, including name, contact phone number, email address, date of birth, and regional location.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-sm text-[#1c1e21] dark:text-[#e4e6eb]">
                  2. How We Protect Your Data
                </h3>
                <p>
                  Your privacy is our priority. Credentials and passwords are encrypted and never stored in insecure browser storage. Contact details are masked to preserve member privacy.
                </p>
              </section>

              <section className="space-y-1">
                <h3 className="font-bold text-sm text-[#1c1e21] dark:text-[#e4e6eb]">
                  3. Location & Device Information
                </h3>
                <p>
                  Location detection is optional and strictly user-authorized. Approximate region data is used solely to configure your regional dialing code and local community recommendations.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-3 border-t border-[#dadde1] dark:border-[#3a3b3c] bg-[#f0f2f5] dark:bg-[#18191a]">
          <button
            onClick={onClose}
            className="h-9 px-5 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-sm rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
