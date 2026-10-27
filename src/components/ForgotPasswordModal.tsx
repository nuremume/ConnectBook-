import React, { useState } from "react";
import { X, Search } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [recoveryInput, setRecoveryInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryInput.trim()) {
      setError("Please enter your email address or mobile phone number.");
      return;
    }
    setError(null);
    setIsSubmitted(true);
  };

  const handleResetDialog = () => {
    setRecoveryInput("");
    setIsSubmitted(false);
    setCode("");
    setError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-[500px] bg-white dark:bg-[#242526] rounded-lg shadow-2xl border border-[#dadde1] dark:border-[#3a3b3c] overflow-hidden text-[#1c1e21] dark:text-[#e4e6eb]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#dadde1] dark:border-[#3a3b3c]">
          <h3 className="text-xl font-bold text-[#1c1e21] dark:text-[#e4e6eb]">
            Find Your Account
          </h3>
          <button
            onClick={handleResetDialog}
            aria-label="Close"
            className="text-[#606770] hover:text-[#1c1e21] dark:text-[#b0b3b8] dark:hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-4 space-y-4">
            <p className="text-[15px] text-[#1c1e21] dark:text-[#e4e6eb] leading-normal">
              We sent a 6-digit confirmation code to <strong>{recoveryInput}</strong>.
            </p>

            <div>
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full h-11 px-3 text-[17px] tracking-widest text-center font-mono bg-white dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] rounded-md focus:outline-none focus:border-[#1877f2]"
              />
            </div>

            <p className="text-xs text-[#65676b] dark:text-[#b0b3b8]">
              Didn&apos;t get a code? <button type="button" onClick={() => setIsSubmitted(false)} className="text-[#1877f2] hover:underline cursor-pointer">Try another way</button>
            </p>

            <div className="pt-2 flex justify-end gap-2 border-t border-[#dadde1] dark:border-[#3a3b3c] -mx-4 -mb-4 p-4 bg-[#f0f2f5] dark:bg-[#18191a]">
              <button
                type="button"
                onClick={handleResetDialog}
                className="h-9 px-4 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] text-[#050505] dark:text-[#e4e6eb] font-semibold text-sm rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetDialog}
                className="h-9 px-5 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-sm rounded-md cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="p-4 space-y-3">
              <p className="text-[15px] text-[#1c1e21] dark:text-[#e4e6eb] leading-normal">
                Please enter your email address or mobile number to search for your account.
              </p>

              <div>
                <input
                  type="text"
                  value={recoveryInput}
                  onChange={(e) => {
                    setRecoveryInput(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Email address or mobile number"
                  className={`w-full h-12 px-4 text-[16px] bg-white dark:bg-[#3a3b3c] border rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:outline-none ${
                    error
                      ? "border-[#f02849] focus:border-[#f02849]"
                      : "border-[#ccd0d5] dark:border-[#4e4f50] focus:border-[#1877f2]"
                  }`}
                />
                {error && <p className="text-xs text-[#f02849] mt-1">{error}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#dadde1] dark:border-[#3a3b3c] p-3 bg-[#f0f2f5] dark:bg-[#18191a]">
              <button
                type="button"
                onClick={handleResetDialog}
                className="h-9 px-4 bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-[#d8dadf] dark:hover:bg-[#4e4f50] text-[#050505] dark:text-[#e4e6eb] font-semibold text-sm rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 px-5 bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold text-sm rounded-md cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
