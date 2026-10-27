import React, { useState, useEffect } from "react";
import { BrandSection } from "./components/BrandSection";
import { LoginForm } from "./components/LoginForm";
import { SignupForm, RegisteredUserSummary } from "./components/SignupForm";
import { ProfileSummary } from "./components/ProfileSummary";
import { ForgotPasswordModal } from "./components/ForgotPasswordModal";
import { TelecomDirectoryModal } from "./components/TelecomDirectoryModal";
import { TermsModal } from "./components/TermsModal";
import { Notification, ToastMessage } from "./components/Notification";
import { SupportedLanguage, TRANSLATIONS } from "./data/translations";
import { Moon, Sun, Plus } from "lucide-react";

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState<"login" | "profile">("login");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("en");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // User Session State (In-Memory Only, Zero localStorage retention)
  const [registeredUser, setRegisteredUser] = useState<RegisteredUserSummary | null>(null);

  // Modals State
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isTelecomOpen, setIsTelecomOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [termsModalType, setTermsModalType] = useState<"terms" | "privacy">("terms");

  // Notifications State
  const [notifications, setNotifications] = useState<ToastMessage[]>([]);

  const addNotification = (type: "success" | "error" | "info", message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, message }]);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Sync Dark Mode class with root document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Active translation dictionary
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Handlers
  const handleSuccessRegistration = (summary: RegisteredUserSummary) => {
    setRegisteredUser(summary);
    setIsSignupOpen(false);
    setActiveView("profile");
    addNotification(
      "success",
      `Welcome to ConnectBook, ${summary.firstName}! Profile verified in E.164 format.`
    );
  };

  const handleSuccessLogin = (userData: { identifier: string; displayName: string }) => {
    if (!registeredUser) {
      setRegisteredUser({
        firstName: userData.displayName.split(" ")[0] || "Demo",
        lastName: userData.displayName.split(" ")[1] || "Member",
        email: userData.identifier.includes("@") ? userData.identifier : "demo.user@connectbook.org",
        phoneE164: userData.identifier.includes("+") ? userData.identifier : "+251911234567",
        phoneFormatted: userData.identifier.includes("+") ? userData.identifier : "+251 91 123 4567",
        country: {
          name: "Ethiopia",
          code: "ET",
          dialCode: "+251",
          flag: "🇪🇹",
          phonePlaceholder: "91 234 5678",
          phoneLength: "9 digits",
          currency: "ETB (Ethiopian Birr)",
          timeZone: "UTC+03:00 (EAT)",
          locale: "am-ET",
          dateFormat: "DD/MM/YYYY",
          isEthiopia: true,
        },
        region: "Addis Ababa",
        city: "Bole",
        dateOfBirth: "1998-09-12",
        calculatedAge: 28,
        gender: "Prefer not to say",
        registeredAt: new Date().toISOString(),
      });
    }
    setActiveView("profile");
    addNotification("success", `Signed in successfully as ${userData.displayName}`);
  };

  const handleLogout = () => {
    setActiveView("login");
    addNotification("info", "You have signed out of ConnectBook.");
  };

  const handleOpenTerms = () => {
    setTermsModalType("terms");
    setIsTermsOpen(true);
  };

  const handleOpenPrivacy = () => {
    setTermsModalType("privacy");
    setIsTermsOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] text-[#1c1e21] dark:text-[#e4e6eb] flex flex-col font-sans transition-colors duration-200">
      {/* If Authenticated, show Facebook Profile Page */}
      {activeView === "profile" && registeredUser ? (
        <main className="flex-1 w-full">
          <ProfileSummary
            summary={registeredUser}
            onLogout={handleLogout}
            onEditRegistration={() => setIsSignupOpen(true)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        </main>
      ) : (
        /* Classic Facebook Desktop 2-Column Login Experience */
        <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-10 sm:py-20 lg:py-28">
          <div className="w-full max-w-[980px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: ConnectBook Wordmark & Slogan */}
            <div className="lg:col-span-7 pt-4 lg:pt-14 text-center lg:text-left">
              <BrandSection
                t={t}
                onOpenTelecom={() => setIsTelecomOpen(true)}
              />
            </div>

            {/* Right Column: Facebook Classic Login Card */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <LoginForm
                t={t}
                onSuccessLogin={handleSuccessLogin}
                onNavigateToSignup={() => setIsSignupOpen(true)}
                onOpenForgotPassword={() => setIsForgotOpen(true)}
              />
            </div>
          </div>
        </main>
      )}

      {/* Facebook Sign Up Modal (Opened as a modal over the login screen) */}
      {isSignupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-white/80 dark:bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="my-auto">
            <SignupForm
              t={t}
              onSuccessRegistration={handleSuccessRegistration}
              onNavigateToLogin={() => setIsSignupOpen(false)}
              onOpenTerms={handleOpenTerms}
              onOpenPrivacy={handleOpenPrivacy}
              onOpenTelecomDirectory={() => setIsTelecomOpen(true)}
              isModal={true}
            />
          </div>
        </div>
      )}

      {/* Facebook Classic Multi-Language & Links Footer */}
      <footer className="w-full bg-white dark:bg-[#242526] text-[#737373] dark:text-[#8a8d91] pt-6 pb-8 border-t border-[#dadde1] dark:border-[#3a3b3c] mt-auto">
        <div className="max-w-[980px] mx-auto px-4">
          {/* Top Row: Languages Bar */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#737373] dark:text-[#8a8d91]">
            <button
              onClick={() => setCurrentLang("en")}
              className={`hover:underline cursor-pointer ${
                currentLang === "en" ? "font-bold text-[#1c1e21] dark:text-[#e4e6eb]" : ""
              }`}
            >
              English (US)
            </button>
            <button
              onClick={() => setCurrentLang("am")}
              className={`hover:underline cursor-pointer ${
                currentLang === "am" ? "font-bold text-[#1c1e21] dark:text-[#e4e6eb]" : ""
              }`}
            >
              አማርኛ
            </button>
            <button
              onClick={() => setCurrentLang("om")}
              className={`hover:underline cursor-pointer ${
                currentLang === "om" ? "font-bold text-[#1c1e21] dark:text-[#e4e6eb]" : ""
              }`}
            >
              Afaan Oromoo
            </button>
            <button
              onClick={() => setCurrentLang("fr")}
              className={`hover:underline cursor-pointer ${
                currentLang === "fr" ? "font-bold text-[#1c1e21] dark:text-[#e4e6eb]" : ""
              }`}
            >
              Français (France)
            </button>
            <button
              onClick={() => setCurrentLang("ar")}
              className={`hover:underline cursor-pointer ${
                currentLang === "ar" ? "font-bold text-[#1c1e21] dark:text-[#e4e6eb]" : ""
              }`}
            >
              العربية
            </button>
            <span>Español</span>
            <span>Português (Brasil)</span>
            <span>Italiano</span>
            <span>Deutsch</span>
            <span>中文(简体)</span>
            <span>日本語</span>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="w-5 h-5 flex items-center justify-center bg-[#f5f6f7] dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] text-[#4b4f56] dark:text-[#e4e6eb] rounded-xs hover:bg-[#ebedf0] cursor-pointer"
              title="More languages"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <hr className="border-[#dadde1] dark:border-[#3a3b3c] my-2.5" />

          {/* Facebook Exact Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#737373] dark:text-[#8a8d91]">
            <button onClick={() => setIsSignupOpen(true)} className="hover:underline cursor-pointer">
              Sign Up
            </button>
            <button onClick={() => setActiveView("login")} className="hover:underline cursor-pointer">
              Log In
            </button>
            <button onClick={() => setIsTelecomOpen(true)} className="hover:underline cursor-pointer">
              Telecom Directory
            </button>
            <a href="#" className="hover:underline">Messenger</a>
            <a href="#" className="hover:underline">ConnectBook Lite</a>
            <a href="#" className="hover:underline">Video</a>
            <a href="#" className="hover:underline">Places</a>
            <a href="#" className="hover:underline">Games</a>
            <a href="#" className="hover:underline">Marketplace</a>
            <a href="#" className="hover:underline">Meta Pay</a>
            <button onClick={handleOpenPrivacy} className="hover:underline cursor-pointer">
              Privacy Policy
            </button>
            <a href="#" className="hover:underline">Privacy Centre</a>
            <a href="#" className="hover:underline">Groups</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Create ad</a>
            <button onClick={() => setIsSignupOpen(true)} className="hover:underline cursor-pointer">
              Create Page
            </button>
            <a href="#" className="hover:underline">Developers</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">Ad choices</a>
            <button onClick={handleOpenTerms} className="hover:underline cursor-pointer">
              Terms
            </button>
            <a href="#" className="hover:underline">Help</a>
          </div>

          {/* Bottom Line: Copyright & Dark Mode Toggle */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#737373] dark:text-[#8a8d91]">
            <span>ConnectBook © 2026</span>

            <button
              onClick={toggleDarkMode}
              className="p-1 rounded-md text-[#737373] dark:text-[#8a8d91] hover:text-[#1c1e21] dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isDarkMode ? "Light mode" : "Dark mode"}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />

      <TelecomDirectoryModal
        isOpen={isTelecomOpen}
        onClose={() => setIsTelecomOpen(false)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        type={termsModalType}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Floating Notifications */}
      <Notification
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}
