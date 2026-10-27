import {
  parsePhoneNumberFromString,
  AsYouType,
  CountryCode,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";

export interface PhoneValidationResult {
  rawInput: string;
  nationalDigits: string;
  e164: string;
  internationalFormatted: string;
  nationalFormatted: string;
  isValid: boolean;
  isPossible: boolean;
  errorReason: string | null;
  statusType: "valid" | "possible" | "invalid" | "empty";
  carrierHint?: {
    operatorName: string;
    note: string;
  } | null;
}

/**
 * Validates and formats international phone numbers using libphonenumber-js metadata.
 * Provides specialized heuristics for Ethiopia (+251) mobile numbering (Ethio telecom 9x, Safaricom 7x)
 * while preserving international standards across all 100 countries.
 */
export const validatePhoneNumber = (
  numberInput: string,
  countryIsoCode: string
): PhoneValidationResult => {
  const trimmed = (numberInput || "").trim();
  const isoUpper = (countryIsoCode || "ET").toUpperCase() as CountryCode;

  if (!trimmed) {
    return {
      rawInput: "",
      nationalDigits: "",
      e164: "",
      internationalFormatted: "",
      nationalFormatted: "",
      isValid: false,
      isPossible: false,
      errorReason: "Phone number is required",
      statusType: "empty",
      carrierHint: null,
    };
  }

  // Remove unwanted non-digit characters except leading plus
  // If user pasted full international number with +dialCode, detect it
  const asYouType = new AsYouType(isoUpper);
  const formattedAsYouType = asYouType.input(trimmed);

  let parsed = parsePhoneNumberFromString(trimmed, isoUpper);

  // If input started with 0 (national trunk prefix like in Ethiopia "09..." or UK "07..."),
  // libphonenumber parses it with the country code
  const nationalDigitsOnly = trimmed.replace(/\D/g, "");

  // Detect carrier hints for Ethiopia specifically
  let carrierHint: PhoneValidationResult["carrierHint"] = null;
  if (isoUpper === "ET") {
    const strippedNational = nationalDigitsOnly.startsWith("0")
      ? nationalDigitsOnly.slice(1)
      : nationalDigitsOnly.startsWith("251")
      ? nationalDigitsOnly.slice(3)
      : nationalDigitsOnly;

    if (strippedNational.startsWith("9")) {
      carrierHint = {
        operatorName: "Ethio telecom",
        note: "Series 9x: Traditionally allocated to Ethio telecom network block (informative only, MNP rules apply).",
      };
    } else if (strippedNational.startsWith("7")) {
      carrierHint = {
        operatorName: "Safaricom Ethiopia",
        note: "Series 7x: Commercial allocation to Safaricom Telecommunications Ethiopia (informative only).",
      };
    }
  }

  if (parsed && parsed.isValid()) {
    return {
      rawInput: trimmed,
      nationalDigits: parsed.nationalNumber,
      e164: parsed.number, // E.164 format (+251912345678)
      internationalFormatted: parsed.formatInternational(),
      nationalFormatted: parsed.formatNational(),
      isValid: true,
      isPossible: true,
      errorReason: null,
      statusType: "valid",
      carrierHint,
    };
  }

  // Check if it's at least possible according to country metadata
  const possible = isPossiblePhoneNumber(trimmed, isoUpper);

  let errorReason = "Invalid phone number format for selected country";
  if (isoUpper === "ET") {
    const stripped = nationalDigitsOnly.startsWith("0")
      ? nationalDigitsOnly.slice(1)
      : nationalDigitsOnly;

    if (stripped.length < 9) {
      errorReason = `Too short (${stripped.length}/9 digits). Ethiopian mobile numbers require 9 digits (e.g. 91 234 5678).`;
    } else if (stripped.length > 9) {
      errorReason = `Too long (${stripped.length}/9 digits). Ethiopian mobile numbers have 9 national digits.`;
    } else if (!stripped.startsWith("9") && !stripped.startsWith("7")) {
      errorReason = "Ethiopian mobile numbers start with digit 9 (Ethio telecom) or 7 (Safaricom).";
    }
  } else {
    if (nationalDigitsOnly.length < 5) {
      errorReason = "Phone number is too short";
    } else if (possible) {
      errorReason = "Number length is possible, but check the prefix or missing digits.";
    } else {
      errorReason = "Invalid number format for this country's ITU allocation.";
    }
  }

  return {
    rawInput: trimmed,
    nationalDigits: parsed?.nationalNumber || nationalDigitsOnly,
    e164: parsed?.number || "",
    internationalFormatted: formattedAsYouType || trimmed,
    nationalFormatted: trimmed,
    isValid: false,
    isPossible: possible,
    errorReason,
    statusType: possible ? "possible" : "invalid",
    carrierHint,
  };
};

/**
 * Strips calling codes if user switches country to prevent duplicate prefix accumulation
 */
export const cleanNumberForCountrySwitch = (
  currentNumber: string,
  oldDialCode: string,
  newDialCode: string
): string => {
  let cleaned = currentNumber.trim();
  const oldPrefixNoPlus = oldDialCode.replace("+", "");
  const newPrefixNoPlus = newDialCode.replace("+", "");

  // If user typed +oldDialCode..., remove it
  if (cleaned.startsWith(oldDialCode)) {
    cleaned = cleaned.slice(oldDialCode.length).trim();
  } else if (cleaned.startsWith(oldPrefixNoPlus)) {
    cleaned = cleaned.slice(oldPrefixNoPlus.length).trim();
  }

  // Remove leading 0 if switching from/to certain countries
  return cleaned;
};
