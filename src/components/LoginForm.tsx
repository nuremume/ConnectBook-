import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Translations } from "../data/translations";

interface LoginFormProps {
  t: Translations;
  onSuccessLogin: (userData: { identifier: string; displayName: string }) => void;
  onNavigateToSignup: () => void;
  onOpenForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  t,
  onSuccessLogin,
  onNavigateToSignup,
  onOpenForgotPassword,
}) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickFill, setShowQuickFill] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!identifier.trim()) {
      newErrors.identifier = "The email address or mobile number you entered isn't connected to an account.";
    }
    if (!password.trim()) {
      newErrors.password = "The password you've entered is incorrect.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const displayName = identifier.includes("@")
        ? identifier.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
        : "ConnectBook Member";

      onSuccessLogin({
        identifier: identifier.trim(),
        displayName,
      });
    }, 400);
  };

  const handleQuickFill = (type: "et" | "intl") => {
    if (type === "et") {
      setIdentifier("+251911234567");
      setPassword("ConnectBook#2026");
    } else {
      setIdentifier("alex.morgan@connectbook.com");
      setPassword("ConnectBook#2026");
    }
    setErrors({});
    setShowQuickFill(false);
  };

  return (
    <div className="w-full max-w-[396px] mx-auto">
      {/* Facebook Classic White Login Card */}
      <div className="bg-white dark:bg-[#242526] rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] p-4 sm:p-5 border border-transparent dark:border-[#393a3b] transition-colors">
        {errors.general && (
          <div className="mb-3 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-md text-xs text-red-600 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email or Phone Input */}
          <div>
            <input
              id="login-identifier"
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }));
              }}
              placeholder="Email address or phone number"
              autoComplete="username"
              className={`w-full h-[52px] text-[17px] px-4 rounded-md border text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] dark:placeholder:text-[#8a8d91] bg-white dark:bg-[#3a3b3c] focus:outline-none transition-colors ${
                errors.identifier
                  ? "border-[#f02849] focus:border-[#f02849] focus:ring-1 focus:ring-[#f02849]"
                  : "border-[#dddfe2] dark:border-[#4e4f50] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]"
              }`}
            />
            {errors.identifier && (
              <p className="mt-1 text-xs text-[#f02849] font-normal leading-tight px-1">
                {errors.identifier}
              </p>
            )}
          </div>

          {/* Password Input with Show/Hide */}
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Password"
              autoComplete="current-password"
              className={`w-full h-[52px] text-[17px] pl-4 pr-11 rounded-md border text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] dark:placeholder:text-[#8a8d91] bg-white dark:bg-[#3a3b3c] focus:outline-none transition-colors ${
                errors.password
                  ? "border-[#f02849] focus:border-[#f02849] focus:ring-1 focus:ring-[#f02849]"
                  : "border-[#dddfe2] dark:border-[#4e4f50] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8d91] hover:text-[#606770] dark:hover:text-slate-300 transition-colors p-1"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-[#f02849] font-normal leading-tight px-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Facebook Blue Log In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-xl rounded-md transition-colors cursor-pointer shadow-none flex items-center justify-center disabled:opacity-70"
          >
            {isLoading ? <span>Logging in...</span> : <span>Log In</span>}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center pt-1 pb-0.5">
            <button
              type="button"
              onClick={onOpenForgotPassword}
              className="text-[#1877f2] dark:text-[#2d88ff] hover:underline text-sm font-normal cursor-pointer"
            >
              Forgotten password?
            </button>
          </div>

          {/* Facebook Hairline Divider */}
          <hr className="border-[#dadde1] dark:border-[#3a3b3c] my-4" />

          {/* Facebook Green Create New Account Button */}
          <div className="text-center pt-1 pb-1">
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="inline-flex items-center justify-center h-12 px-4 bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-[17px] rounded-md transition-colors cursor-pointer"
            >
              Create new account
            </button>
          </div>
        </form>
      </div>

      {/* Facebook Under-Card Text */}
      <p className="text-sm text-[#1c1e21] dark:text-[#b0b3b8] text-center mt-7">
        <button
          type="button"
          onClick={onNavigateToSignup}
          className="font-bold text-[#1c1e21] dark:text-[#e4e6eb] hover:underline cursor-pointer"
        >
          Create a Page
        </button>{" "}
        for a celebrity, brand or business.
      </p>

      {/* Discreet sample credentials toggle */}
      <div className="mt-4 text-center">
        {!showQuickFill ? (
          <button
            type="button"
            onClick={() => setShowQuickFill(true)}
            className="text-[11px] text-[#8a8d91] hover:text-[#606770] dark:hover:text-slate-300 transition-colors"
          >
            Test demo credentials
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 p-1.5 px-3 bg-white dark:bg-[#242526] rounded-md shadow-xs border border-[#dadde1] dark:border-[#3a3b3c] text-xs">
            <span className="text-[11px] text-[#606770]">Fill sample:</span>
            <button
              type="button"
              onClick={() => handleQuickFill("et")}
              className="text-[11px] font-semibold text-[#1877f2] hover:underline cursor-pointer"
            >
              🇪🇹 Ethiopia (+251)
            </button>
            <span className="text-[#dadde1]">·</span>
            <button
              type="button"
              onClick={() => handleQuickFill("intl")}
              className="text-[11px] font-semibold text-[#1877f2] hover:underline cursor-pointer"
            >
              🌍 Global
            </button>
            <span className="text-[#dadde1]">·</span>
            <button
              type="button"
              onClick={() => setShowQuickFill(false)}
              className="text-[11px] text-[#8a8d91] hover:text-[#606770] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
