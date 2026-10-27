import { Country, getCountryByCode } from "../data/countries";

export interface DetectionResult {
  success: boolean;
  country: Country | null;
  method: "ip" | "browser-gps" | null;
  message: string;
  error?: string;
  details?: {
    latitude?: number;
    longitude?: number;
    cityName?: string;
  };
}

/**
 * Method A: IP-based Country Suggestion (Lightweight, non-blocking)
 * Uses public IP lookup with 3-second abort timeout.
 */
export const detectCountryByIp = async (): Promise<DetectionResult> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    // Attempt fast lookup using ipwho.is (CORS-friendly, public HTTPS, no auth key required)
    const res = await fetch("https://ipwho.is/?fields=success,country_code,country,city,message", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`IP service HTTP error ${res.status}`);
    }

    const data = await res.json();
    if (data && data.success && data.country_code) {
      const matched = getCountryByCode(data.country_code);
      if (matched) {
        return {
          success: true,
          country: matched,
          method: "ip",
          message: `Detected country from network IP: ${matched.name}`,
          details: { cityName: data.city },
        };
      }
    }

    return {
      success: false,
      country: null,
      method: "ip",
      message: "IP geolocation did not match a supported country in our curated list.",
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errorMsg = err instanceof Error ? err.message : "IP service unavailable";
    return {
      success: false,
      country: null,
      method: "ip",
      message: "Network IP detection was skipped or timed out. Please select your country manually.",
      error: errorMsg,
    };
  }
};

/**
 * Method B: Browser Geolocation + Reverse Geocoding (User-initiated)
 * Requires user permission via navigator.geolocation.
 */
export const detectCountryByBrowserLocation = async (): Promise<DetectionResult> => {
  if (!navigator.geolocation) {
    return {
      success: false,
      country: null,
      method: "browser-gps",
      message: "Browser Geolocation API is not supported on this device.",
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Perform reverse geocoding via OpenStreetMap Nominatim
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const res = await fetch(url, {
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error(`Reverse geocoder HTTP error ${res.status}`);
          }

          const data = await res.json();
          const countryCode = data?.address?.country_code?.toUpperCase();

          if (countryCode) {
            const matched = getCountryByCode(countryCode);
            if (matched) {
              return resolve({
                success: true,
                country: matched,
                method: "browser-gps",
                message: `Identified location: ${matched.name} (${data.address.city || data.address.town || data.address.state || "Region"})`,
                details: {
                  latitude,
                  longitude,
                  cityName: data.address.city || data.address.town,
                },
              });
            }
          }

          // Rough coordinate heuristic fallback for Horn of Africa / Ethiopia
          // Latitude ~ 3°N to 15°N, Longitude ~ 33°E to 48°E
          if (latitude >= 3 && latitude <= 15 && longitude >= 33 && longitude <= 48) {
            const et = getCountryByCode("ET");
            if (et) {
              return resolve({
                success: true,
                country: et,
                method: "browser-gps",
                message: "GPS coordinates locate within the Federal Democratic Republic of Ethiopia.",
                details: { latitude, longitude },
              });
            }
          }

          resolve({
            success: false,
            country: null,
            method: "browser-gps",
            message: "Coordinates resolved to a country outside the curated 100-country database.",
            details: { latitude, longitude },
          });
        } catch (reverseErr) {
          clearTimeout(timeoutId);
          // Fallback coordinate check for Ethiopia Horn of Africa
          if (latitude >= 3 && latitude <= 15 && longitude >= 33 && longitude <= 48) {
            const et = getCountryByCode("ET");
            return resolve({
              success: true,
              country: et || null,
              method: "browser-gps",
              message: "Coordinates approximate geographic bounds of Ethiopia.",
              details: { latitude, longitude },
            });
          }

          resolve({
            success: false,
            country: null,
            method: "browser-gps",
            message: "Received GPS coordinates, but reverse geocoding lookup timed out.",
            details: { latitude, longitude },
            error: reverseErr instanceof Error ? reverseErr.message : "Lookup failed",
          });
        }
      },
      (error: GeolocationPositionError) => {
        let msg = "Location request failed.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "Location permission was denied. You can still choose your country from the list.";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "Location information is unavailable on your current device/network.";
            break;
          case error.TIMEOUT:
            msg = "Location request timed out. Please select your country manually.";
            break;
        }
        resolve({
          success: false,
          country: null,
          method: "browser-gps",
          message: msg,
          error: error.message,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 60000,
      }
    );
  });
};
