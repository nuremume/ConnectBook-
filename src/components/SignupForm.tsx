import React, { useState } from "react";
import { X, HelpCircle, Eye, EyeOff } from "lucide-react";
import { Country, getEthiopia } from "../data/countries";
import { Translations } from "../data/translations";
import { CountrySelector } from "./CountrySelector";
import { CountryDetection } from "./CountryDetection";
import { InternationalPhoneInput } from "./InternationalPhoneInput";
import { LocationFields } from "./LocationFields";
import { PasswordStrength } from "./PasswordStrength";
import { PhoneValidationResult } from "../utils/phoneValidation";
import {
  evaluatePasswordStrength,
  validateEmail,
  validateName,
  validateDateOfBirth,
} from "../utils/validators";

export interface RegisteredUserSummary {
  firstName: string;
  lastName: string;
  email: string;
  phoneE164: string;
  phoneFormatted: string;
  country: Country;
  region: string;
  city: string;
  dateOfBirth: string;
  calculatedAge: number;
  gender: string;
  registeredAt: string;
}

interface SignupFormProps {
  t: Translations;
  onSuccessRegistration: (summary: RegisteredUserSummary) => void;
  onNavigateToLogin: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenTelecomDirectory: () => void;
  isModal?: boolean;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  t,
  onSuccessRegistration,
  onNavigateToLogin,
  onOpenTerms,
  onOpenPrivacy,
  onOpenTelecomDirectory,
  isModal = false,
}) => {
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(getEthiopia);
  const [phoneRaw, setPhoneRaw] = useState("");
  const [phoneValidation, setPhoneValidation] = useState<PhoneValidationResult | null>(null);

  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [dob, setDob] = useState("2000-01-01");
  const [gender, setGender] = useState<"female" | "male" | "custom" | "prefer_not_to_say">("female");
  const [customGender, setCustomGender] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Field Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = evaluatePasswordStrength(password);

  const handleCountryChange = (newCountry: Country) => {
    setSelectedCountry(newCountry);
    setRegion("");
    setCity("");
    setPostalCode("");
  };

  const handlePrefillSample = () => {
    setSelectedCountry(getEthiopia());
    setFirstName("Abebe");
    setLastName("Bikila");
    setEmail("abebe.bikila@connectbook.demo");
    setPhoneRaw("91 123 4567");
    setRegion("Addis Ababa");
    setCity("Bole");
    setDob("1998-05-18");
    setGender("male");
    setPassword("ConnectSafe#2026");
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const fnErr = validateName(firstName, "First name");
    if (fnErr) newErrors.firstName = fnErr;

    const lnErr = validateName(lastName, "Surname");
    if (lnErr) newErrors.lastName = lnErr;

    const emErr = validateEmail(email);
    if (emErr) newErrors.email = emErr;

    if (!phoneRaw.trim()) {
      newErrors.phone = "Mobile phone number is required";
    } else if (phoneValidation && !phoneValidation.isValid) {
      newErrors.phone = phoneValidation.errorReason || "Invalid phone number";
    }

    const dobCheck = validateDateOfBirth(dob);
    if (!dobCheck.isValid) {
      newErrors.dob = dobCheck.error || "Please select a valid birthday";
    }

    if (!password) {
      newErrors.password = "Enter a password of at least 8 characters";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const dobCheck = validateDateOfBirth(dob);
    const calculatedAge = dobCheck.age ?? 0;

    const summary: RegisteredUserSummary = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneE164: phoneValidation?.e164 || `${selectedCountry.dialCode}${phoneRaw.replace(/\D/g, "")}`,
      phoneFormatted: phoneValidation?.internationalFormatted || `${selectedCountry.dialCode} ${phoneRaw}`,
      country: selectedCountry,
      region: region.trim() || "National Jurisdiction",
      city: city.trim() || "City",
      dateOfBirth: dob,
      calculatedAge,
      gender: gender === "custom" ? customGender || "Custom" : gender,
      registeredAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessRegistration(summary);
    }, 450);
  };

  return (
    <div className="w-full max-w-[432px] mx-auto bg-white dark:bg-[#242526] rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] border border-[#dadde1] dark:border-[#3a3b3c] p-4 sm:p-5 transition-colors">
      {/* Facebook Sign Up Modal Header */}
      <div className="flex items-start justify-between pb-2">
        <div>
          <h2 className="text-2xl sm:text-[32px] font-bold text-[#1c1e21] dark:text-[#e4e6eb] leading-tight tracking-tight">
            Sign Up
          </h2>
          <p className="text-[#606770] dark:text-[#b0b3b8] text-[15px] mt-0.5">
            It&apos;s quick and easy.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToLogin}
          aria-label="Close"
          className="text-[#606770] hover:text-[#1c1e21] dark:text-[#b0b3b8] dark:hover:text-white p-1 rounded-full cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <hr className="border-[#dadde1] dark:border-[#3a3b3c] -mx-4 sm:-mx-5 my-3" />

      <form onSubmit={handleSubmit} className="space-y-3 pt-1">
        {/* Row 1: First name & Surname side by side */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <input
              id="signup-first-name"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              placeholder="First name"
              autoComplete="given-name"
              className={`w-full h-10 px-3 text-[15px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none transition-colors ${
                errors.firstName
                  ? "border-[#f02849] focus:border-[#f02849]"
                  : "border-[#ccd0d5] dark:border-[#4e4f50] focus:border-[#1877f2]"
              }`}
            />
            {errors.firstName && (
              <p className="text-[11px] text-[#f02849] mt-0.5 px-0.5 leading-tight">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              id="signup-last-name"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              placeholder="Surname"
              autoComplete="family-name"
              className={`w-full h-10 px-3 text-[15px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none transition-colors ${
                errors.lastName
                  ? "border-[#f02849] focus:border-[#f02849]"
                  : "border-[#ccd0d5] dark:border-[#4e4f50] focus:border-[#1877f2]"
              }`}
            />
            {errors.lastName && (
              <p className="text-[11px] text-[#f02849] mt-0.5 px-0.5 leading-tight">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row 2: Country Selector with Auto-detect */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-[12px] text-[#606770] dark:text-[#b0b3b8] font-normal flex items-center gap-1">
              <span>Country / Territory</span>
              <HelpCircle className="w-3.5 h-3.5 text-[#8a8d91]" />
            </label>
            <CountryDetection
              currentCountry={selectedCountry}
              onApplyDetectedCountry={handleCountryChange}
            />
          </div>

          <CountrySelector
            selectedCountry={selectedCountry}
            onSelectCountry={handleCountryChange}
            id="signup-country-selector"
          />
        </div>

        {/* Row 3: Mobile Number (International) */}
        <div>
          <InternationalPhoneInput
            country={selectedCountry}
            onCountryChange={handleCountryChange}
            value={phoneRaw}
            onChange={(val, res) => {
              setPhoneRaw(val);
              setPhoneValidation(res);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            error={errors.phone}
            onOpenTelecomDirectory={onOpenTelecomDirectory}
            required
          />
        </div>

        {/* Row 4: Email Address */}
        <div>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="Email address"
            autoComplete="email"
            className={`w-full h-10 px-3 text-[15px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none transition-colors ${
              errors.email
                ? "border-[#f02849] focus:border-[#f02849]"
                : "border-[#ccd0d5] dark:border-[#4e4f50] focus:border-[#1877f2]"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-[#f02849] mt-0.5 px-0.5 leading-tight">{errors.email}</p>
          )}
        </div>

        {/* Row 5: Regional States & Cities */}
        <LocationFields
          country={selectedCountry}
          region={region}
          onRegionChange={setRegion}
          city={city}
          onCityChange={setCity}
          postalCode={postalCode}
          onPostalCodeChange={setPostalCode}
        />

        {/* Row 6: New Password */}
        <div>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder="New password"
              autoComplete="new-password"
              className={`w-full h-10 pl-3 pr-10 text-[15px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border rounded-md text-[#1c1e21] dark:text-[#e4e6eb] placeholder:text-[#8a8d91] focus:bg-white dark:focus:bg-[#3a3b3c] focus:outline-none transition-colors ${
                errors.password
                  ? "border-[#f02849] focus:border-[#f02849]"
                  : "border-[#ccd0d5] dark:border-[#4e4f50] focus:border-[#1877f2]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8d91] hover:text-[#606770] dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-[#f02849] mt-0.5 px-0.5 leading-tight">{errors.password}</p>
          )}
          <PasswordStrength strength={passwordStrength} />
        </div>

        {/* Row 7: Date of Birth (Facebook exact label style) */}
        <div>
          <label
            htmlFor="signup-dob"
            className="text-[12px] text-[#606770] dark:text-[#b0b3b8] font-normal flex items-center gap-1 mb-1"
          >
            <span>Date of birth</span>
            <HelpCircle className="w-3.5 h-3.5 text-[#8a8d91]" />
          </label>
          <input
            id="signup-dob"
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
            }}
            className={`w-full h-10 px-3 text-[15px] bg-white dark:bg-[#3a3b3c] border rounded-md text-[#1c1e21] dark:text-[#e4e6eb] focus:outline-none ${
              errors.dob
                ? "border-[#f02849] focus:border-[#f02849]"
                : "border-[#ccd0d5] dark:border-[#4e4f50] focus:border-[#1877f2]"
            }`}
          />
          {errors.dob && (
            <p className="text-[11px] text-[#f02849] mt-0.5 px-0.5 leading-tight">{errors.dob}</p>
          )}
        </div>

        {/* Row 8: Gender (Facebook exact radio card grid) */}
        <div>
          <label className="text-[12px] text-[#606770] dark:text-[#b0b3b8] font-normal flex items-center gap-1 mb-1">
            <span>Gender</span>
            <HelpCircle className="w-3.5 h-3.5 text-[#8a8d91]" />
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "female", label: "Female" },
              { id: "male", label: "Male" },
              { id: "custom", label: "Custom" },
              { id: "prefer_not_to_say", label: "Other" },
            ].map((option) => (
              <label
                key={option.id}
                className={`h-9 px-3 border rounded-md flex items-center justify-between text-[15px] cursor-pointer bg-white dark:bg-[#3a3b3c] transition-colors ${
                  gender === option.id
                    ? "border-[#1877f2] text-[#1c1e21] dark:text-white"
                    : "border-[#ccd0d5] dark:border-[#4e4f50] text-[#1c1e21] dark:text-[#e4e6eb]"
                }`}
              >
                <span>{option.label}</span>
                <input
                  type="radio"
                  name="gender"
                  value={option.id}
                  checked={gender === option.id}
                  onChange={() => setGender(option.id as any)}
                  className="w-3.5 h-3.5 text-[#1877f2] focus:ring-0"
                />
              </label>
            ))}
          </div>

          {gender === "custom" && (
            <div className="mt-2">
              <input
                type="text"
                value={customGender}
                onChange={(e) => setCustomGender(e.target.value)}
                placeholder="Select your pronoun or identity"
                className="w-full h-9 px-3 text-[14px] bg-[#f5f6f7] dark:bg-[#3a3b3c] border border-[#ccd0d5] dark:border-[#4e4f50] rounded-md text-[#1c1e21] dark:text-[#e4e6eb] focus:outline-none focus:border-[#1877f2]"
              />
            </div>
          )}
        </div>

        {/* Legal Text (Facebook's exact wording) */}
        <div className="pt-1 text-[11px] text-[#777e88] dark:text-[#8a8d91] leading-[15px] space-y-2">
          <p>
            People who use our service may have uploaded your contact information to ConnectBook.{" "}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#385898] dark:text-[#2d88ff] hover:underline"
            >
              Learn more
            </button>
            .
          </p>

          <p>
            By clicking Sign Up, you agree to our{" "}
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[#385898] dark:text-[#2d88ff] hover:underline"
            >
              Terms
            </button>
            ,{" "}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#385898] dark:text-[#2d88ff] hover:underline"
            >
              Privacy Policy
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[#385898] dark:text-[#2d88ff] hover:underline"
            >
              Cookies Policy
            </button>
            . You may receive SMS notifications from us and can opt out at any time.
          </p>
        </div>

        {/* Centered Facebook Green Sign Up Button */}
        <div className="pt-2 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[194px] h-9 px-8 bg-[#00a400] hover:bg-[#008f00] text-white font-bold text-[18px] rounded-md transition-colors cursor-pointer shadow-xs disabled:opacity-70 mx-auto"
          >
            {isSubmitting ? <span>Signing Up...</span> : <span>Sign Up</span>}
          </button>
        </div>

        {/* Discreet sample autofill helper */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={handlePrefillSample}
            className="text-[11px] text-[#8a8d91] hover:text-[#606770] dark:hover:text-slate-300 transition-colors"
          >
            Fill sample data
          </button>
        </div>
      </form>
    </div>
  );
};
