# ConnectBook — Advanced International Social Registration Platform

> **Academic Project Submission**: Senior Frontend Architecture, Internationalization (i18n), and Accessible Reactive Web Systems.  
> **Framework & Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, `libphonenumber-js`, Lucide Icons.

---

## 1. Project Overview & Role

**ConnectBook** is a production-grade, privacy-first frontend social registration platform inspired by the familiar usability of global social networks (such as Facebook) while utilizing 100% original branding, clean typography, and zero-storage security architecture.

Developed specifically for a university laboratory defense, ConnectBook prioritizes:
- **Ethiopia-First Localization**: Full administrative coverage for all 14 Ethiopian regional states and chartered cities (+251), verified 9-digit national numbering scheme, and Ethio telecom & Safaricom directory records.
- **Strict 100-Country Database**: Exactly 100 curated, non-duplicate countries across all continents with ITU dial codes, flags, formatting placeholders, and currency metadata.
- **Smart Phone Parsing**: High-fidelity phone validation using `libphonenumber-js`, dynamic prefix preservation during country switching, and E.164 normalization.
- **Dual-Method Country Detection**: Lightweight non-blocking IP country suggestion paired with user-consented browser GPS reverse geocoding.
- **Accessible & Responsive Design**: Compliant with WCAG AA accessibility, keyboard navigation (Arrow keys, Home, End, Enter, Esc), high-contrast states, and mobile touch targets.

---

## 2. Setup & Startup Commands

To install and run ConnectBook locally:

```bash
# 1. Install all dependencies
npm install

# 2. Start the Vite development server (runs on port 3000)
npm run dev

# 3. Compile and verify TypeScript & asset bundling
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 3. Technology Stack & Key Dependencies

| Dependency | Version | Purpose |
| :--- | :--- | :--- |
| `react` & `react-dom` | `^19.0.1` | Declarative UI, state management, concurrent rendering |
| `vite` | `^8.3.0` | Next-generation frontend build tooling and HMR dev server |
| `libphonenumber-js` | `^1.11.x` | Industry-standard international phone number parsing, ITU validation, E.164 |
| `tailwindcss` | `^4.3.3` | Modern utility CSS with custom typography and dark mode |
| `lucide-react` | `^0.546.0` | Accessible functional iconography |
| `typescript` | `^7.0.2` | Compile-time safety and strict interface definitions |

---

## 4. International Country Database (Exactly 100 Countries)

The dataset (`src/data/countries.ts`) contains **exactly 100 unique country records** curated from the United Nations Population Division and ITU National Numbering Plans:
- **Index 0 (Featured)**: **Ethiopia (ET, +251, 🇪🇹)**
- **Global Coverage**:
  - **Africa (25)**: Ethiopia, Kenya, Nigeria, South Africa, Egypt, Ghana, Tanzania, Uganda, Rwanda, Morocco, Algeria, Tunisia, Sudan, Djibouti, Somalia, Eritrea, Senegal, Côte d'Ivoire, Cameroon, DR Congo, Angola, Zambia, Zimbabwe, Mozambique, Madagascar, Mauritius.
  - **Americas (15)**: United States, Canada, Brazil, Mexico, Argentina, Colombia, Chile, Peru, Ecuador, Uruguay, Costa Rica, Panama, Dominican Republic, etc.
  - **Europe (30)**: United Kingdom, Germany, France, Italy, Spain, Netherlands, Poland, Sweden, Switzerland, Belgium, Norway, Austria, Denmark, Finland, Ireland, Portugal, Greece, Czech Republic, Romania, Hungary, Ukraine, Croatia, Serbia, Slovakia, Bulgaria, Lithuania, Latvia, Estonia, Iceland, Luxembourg.
  - **Asia & Middle East (25)**: India, China, Japan, Turkey, Saudi Arabia, UAE, Indonesia, Pakistan, Bangladesh, Philippines, Vietnam, South Korea, Qatar, Kuwait, Oman, Bahrain, Jordan, Lebanon, Iraq, Israel, Kazakhstan, Uzbekistan, Azerbaijan, Georgia, Sri Lanka, Nepal.
  - **Oceania (2)**: Australia, New Zealand.

### Verification Formula:
```typescript
COUNTRIES.length === 100; // True
new Set(COUNTRIES.map(c => c.code)).size === 100; // True
COUNTRIES.find(c => c.code === "ET"); // Exists with +251
```

---

## 5. Ethiopia-First Implementation

1. **Dial Code**: `+251`
2. **Numbering Scheme**: 9 national digits (e.g. `91 234 5678` or `71 234 5678`). Leading `0` trunk prefix is automatically handled and converted to standard international `+2519...`.
3. **14 Official Regional States & Chartered Cities**:
   - Addis Ababa (Chartered City: Bole, Kirkos, Arada, Yeka, Nifas Silk-Lafto, Gullele, Lideta, Akaki Kality, Kolfe Keranio, Addis Ketema, Lemi Kura)
   - Oromia (Capital: Adama / Finfinnee; Major Cities: Bishoftu, Jimma, Shashemene, Nekemte, Asella, Ambo)
   - Amhara (Capital: Bahir Dar; Cities: Gondar, Dessie, Debre Birhan, Kombolcha)
   - Sidama (Capital: Hawassa; Cities: Yirgalem, Aleta Wondo)
   - Tigray (Capital: Mekelle; Cities: Axum, Adigrat, Shire)
   - Somali (Capital: Jigjiga; Cities: Degehabur, Gode, Kebri Dahar)
   - Afar (Capital: Semera; Cities: Asaita, Awash, Dubti)
   - Benishangul-Gumuz (Capital: Asosa; Cities: Kamashi, Gilgel Beles)
   - Gambela (Capital: Gambela; Cities: Itang, Abobo)
   - Harari (Capital: Harar; Cities: Harar Jugol, Amir Nur)
   - Central Ethiopia (Capital: Hosanna; Cities: Butajira, Halaba)
   - South Ethiopia (Capital: Wolaita Sodo / Arba Minch; Cities: Dilla, Jinka)
   - Southwest Ethiopia Peoples' Region (Capital: Bonga; Cities: Mizan Teferi, Tepi)
   - Dire Dawa (Chartered City: Sabian, Gende Kore, Melka Jebdu)
4. **Verified Mobile Operators**:
   - **Ethio telecom**: Series `09` (91-98), established 1894, 4G LTE-A / 5G, telebirr.
   - **Safaricom Ethiopia**: Series `07` (70-79), licensed 2021, nationwide 4G/5G, M-PESA.

---

## 6. Smart International Phone Input (`libphonenumber-js`)

The `InternationalPhoneInput` component provides:
- Seamless country selector with search and flag display.
- Prevention of duplicate calling codes when toggling countries.
- Dynamic input masking via `AsYouType`.
- Strict validation separating **valid** from **possible** and **invalid** numbers.
- Automated E.164 normalization (`+251911234567`).

---

## 7. Dual-Method Country Detection

1. **Method A (IP-based Geolocation)**:
   - Uses public country-level IP lookup with an immediate 3.5-second timeout.
   - Non-blocking: failures never interrupt registration.
2. **Method B (User-Initiated Browser GPS)**:
   - Triggered exclusively by clicking "Detect My Country (GPS)".
   - Queries `navigator.geolocation.getCurrentPosition()`.
   - Reverse-geocodes coordinates via OpenStreetMap Nominatim with Horn of Africa bounding fallbacks.
   - Fully handles Permission Denied, Timeout, and Position Unavailable gracefully.

---

## 8. Privacy & Zero-Storage Architecture

- **No Remote Database**: Complete client-side isolation.
- **Zero LocalStorage Retention**: Passwords and sensitive PII are never committed to `localStorage` or `sessionStorage`.
- **Ephemeral Avatars**: User avatar previews use browser `URL.createObjectURL` and are revoked on unmount.
- **No Third-Party Telemetry**: Zero marketing beacons, external analytics, or covert tracking scripts.

---

## 9. Academic React Concepts Defense (For Course Instructors)

1. **State & Controlled Inputs (`useState`)**:
   Every field is a controlled React component where UI values mirror internal state. Changes flow through declarative pure handlers.
2. **Component Decomposition & Props Passing**:
   Modular separation of concerns: presentation components (`BrandSection`), input primitives (`FormInput`), domain components (`CountrySelector`, `InternationalPhoneInput`, `LocationFields`), and composite containers (`LoginForm`, `SignupForm`).
3. **Advanced Hooks (`useMemo`, `useEffect`, `useRef`)**:
   - `useMemo`: Cached search filtering over the 100-country database.
   - `useEffect`: Dark mode class coordination and Object URL garbage collection.
   - `useRef`: Keyboard trap and dropdown scroll-into-view management.
4. **Declarative Validation & Conditional Rendering**:
   Pure validation outputs trigger conditional inline helpers, strength progress bars, and modal portals.

---

## 10. Future Production Backend Roadmap

When migrating to a live production environment:
1. **API Gateway**: Node.js / Express or NestJS with Helmet and Rate Limiting.
2. **Relational Database**: PostgreSQL with indexed E.164 phone numbers and unique constraints.
3. **Password Security**: Argon2id or bcrypt (cost factor $\ge 12$).
4. **SMS Gateway Verification**: Integration with Twilio Verify or Infobip for live OTP confirmation.
5. **Session Management**: OAuth 2.0 / OIDC with HttpOnly encrypted cookies.

---

## 11. Feature Testing & Verification Checklist

| # | Acceptance Criterion | Test Verification Method | Result |
| :---: | :--- | :--- | :---: |
| 1 | App boots with 0 compilation errors | Verified via `compile_applet` and dev server on port 3000 | **PASS** |
| 2 | Country database has exactly 100 nations | Unit check verifies `COUNTRIES.length === 100` | **PASS** |
| 3 | Ethiopia is included at index 0 (+251) | Quick-select button & default selection confirmed | **PASS** |
| 4 | Phone validation with `libphonenumber-js` | Formats Ethiopian 9-digit and international E.164 numbers | **PASS** |
| 5 | Country switch preserves national digits | Switching ET (+251) to KE (+254) retains national input | **PASS** |
| 6 | Location detection handles failure/permission | Graceful fallback without blocking submission | **PASS** |
| 7 | All 14 Ethiopian administrative areas loaded | Oromia, Amhara, Tigray, Sidama, Addis Ababa, etc. verified | **PASS** |
| 8 | Password strength feedback | Evaluates length, case, numbers, symbols with visual meter | **PASS** |
| 9 | Zero credentials saved to localStorage | Inspection of storage verifies zero password leakage | **PASS** |
| 10 | Dark mode & multi-language support | English, Amharic (አማርኛ), Afaan Oromoo, French, Arabic | **PASS** |

---

*ConnectBook © 2026. Built with precision for University Academic Demonstration.*
