export interface TelecomOperator {
  id: string;
  countryCode: string;
  countryName: string;
  operatorName: string;
  brandName?: string;
  category: "State-owned MNO" | "Private MNO" | "MVNO" | "Fixed & Mobile";
  mobilePrefixes?: string[];
  officialWebsite: string;
  source: string;
  lastReviewedDate: string;
  verificationStatus: "Officially Verified" | "Directory Record" | "Historical";
  networkTechnologies: string[];
  notes?: string;
}

/**
 * Curated Telecom Directory with verified operator details.
 * Contains primary national carriers where publicly verifiable data is confirmed.
 * Disclaimer: Calling code or prefix does NOT guarantee carrier identity due to
 * Mobile Number Portability (MNP) and dynamic pool allocations.
 */
export const TELECOM_OPERATORS: TelecomOperator[] = [
  // Ethiopia (ET) - Primary Focus
  {
    id: "et-ethiotelecom",
    countryCode: "ET",
    countryName: "Ethiopia",
    operatorName: "Ethio telecom",
    brandName: "Ethio telecom / telebirr",
    category: "State-owned MNO",
    mobilePrefixes: ["09", "91", "92", "93", "94", "95", "96", "97", "98"],
    officialWebsite: "https://www.ethiotelecom.et",
    source: "Ethiopian Communications Authority (ECA) & Official Corporate Portal",
    lastReviewedDate: "2024-10-15",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["2G", "3G", "4G LTE Advanced", "5G Commercial", "telebirr SuperApp"],
    notes: "Founded in 1894 as the Imperial Board of Telecommunications. Ethiopia's historic national telecom provider serving over 78M subscribers.",
  },
  {
    id: "et-safaricom",
    countryCode: "ET",
    countryName: "Ethiopia",
    operatorName: "Safaricom Telecommunications Ethiopia PLC",
    brandName: "Safaricom Ethiopia",
    category: "Private MNO",
    mobilePrefixes: ["07", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79"],
    officialWebsite: "https://www.safaricom.et",
    source: "Ethiopian Communications Authority (ECA) License Registry & Global Partnership for Ethiopia",
    lastReviewedDate: "2024-10-10",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["2G", "4G LTE", "5G Trial", "M-PESA Ethiopia"],
    notes: "Awarded unified nationwide license in 2021; launched commercial services in Dire Dawa and Addis Ababa in 2022. Fast expanding nationwide network.",
  },

  // Kenya (KE)
  {
    id: "ke-safaricom",
    countryCode: "KE",
    countryName: "Kenya",
    operatorName: "Safaricom PLC",
    brandName: "Safaricom",
    category: "Private MNO",
    mobilePrefixes: ["070", "071", "072", "079", "011"],
    officialWebsite: "https://www.safaricom.co.ke",
    source: "Communications Authority of Kenya (CA)",
    lastReviewedDate: "2024-09-01",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "5G", "M-PESA"],
  },
  {
    id: "ke-airtel",
    countryCode: "KE",
    countryName: "Kenya",
    operatorName: "Airtel Networks Kenya",
    brandName: "Airtel Kenya",
    category: "Private MNO",
    mobilePrefixes: ["073", "075", "078", "010"],
    officialWebsite: "https://www.airtel.kenya.com",
    source: "Communications Authority of Kenya (CA)",
    lastReviewedDate: "2024-09-01",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "5G", "Airtel Money"],
  },

  // Nigeria (NG)
  {
    id: "ng-mtn",
    countryCode: "NG",
    countryName: "Nigeria",
    operatorName: "MTN Nigeria Communications PLC",
    brandName: "MTN Nigeria",
    category: "Private MNO",
    mobilePrefixes: ["0803", "0806", "0703", "0706", "0813", "0816"],
    officialWebsite: "https://www.mtn.ng",
    source: "Nigerian Communications Commission (NCC)",
    lastReviewedDate: "2024-08-15",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "5G", "MoMo PSB"],
  },
  {
    id: "ng-airtel",
    countryCode: "NG",
    countryName: "Nigeria",
    operatorName: "Airtel Nigeria",
    brandName: "Airtel",
    category: "Private MNO",
    mobilePrefixes: ["0802", "0808", "0708", "0812"],
    officialWebsite: "https://www.airtel.com.ng",
    source: "Nigerian Communications Commission (NCC)",
    lastReviewedDate: "2024-08-15",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "5G", "Smartcash PSB"],
  },

  // United States (US)
  {
    id: "us-att",
    countryCode: "US",
    countryName: "United States",
    operatorName: "AT&T Inc.",
    brandName: "AT&T Wireless",
    category: "Private MNO",
    officialWebsite: "https://www.att.com",
    source: "Federal Communications Commission (FCC) Spectrum Registry",
    lastReviewedDate: "2024-07-20",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G", "5G+", "Fiber"],
  },
  {
    id: "us-verizon",
    countryCode: "US",
    countryName: "United States",
    operatorName: "Verizon Communications Inc.",
    brandName: "Verizon Wireless",
    category: "Private MNO",
    officialWebsite: "https://www.verizon.com",
    source: "FCC Universal Licensing System",
    lastReviewedDate: "2024-07-20",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G Ultra Wideband"],
  },
  {
    id: "us-tmobile",
    countryCode: "US",
    countryName: "United States",
    operatorName: "T-Mobile US, Inc.",
    brandName: "T-Mobile",
    category: "Private MNO",
    officialWebsite: "https://www.t-mobile.com",
    source: "FCC License Filings",
    lastReviewedDate: "2024-07-20",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G Extended Range", "5G Ultra Capacity"],
  },

  // United Kingdom (GB)
  {
    id: "gb-ee",
    countryCode: "GB",
    countryName: "United Kingdom",
    operatorName: "EE Limited (BT Group)",
    brandName: "EE",
    category: "Private MNO",
    officialWebsite: "https://ee.co.uk",
    source: "Ofcom Mobile Spectrum Registry",
    lastReviewedDate: "2024-06-15",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G"],
  },
  {
    id: "gb-vodafone",
    countryCode: "GB",
    countryName: "United Kingdom",
    operatorName: "Vodafone UK",
    brandName: "Vodafone",
    category: "Private MNO",
    officialWebsite: "https://www.vodafone.co.uk",
    source: "Ofcom Telecommunications Registry",
    lastReviewedDate: "2024-06-15",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G"],
  },

  // Germany (DE)
  {
    id: "de-telekom",
    countryCode: "DE",
    countryName: "Germany",
    operatorName: "Deutsche Telekom AG",
    brandName: "Telekom Deutschland",
    category: "Private MNO",
    officialWebsite: "https://www.telekom.de",
    source: "Bundesnetzagentur (BNetzA)",
    lastReviewedDate: "2024-05-10",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G Standalone"],
  },

  // South Africa (ZA)
  {
    id: "za-vodacom",
    countryCode: "ZA",
    countryName: "South Africa",
    operatorName: "Vodacom Group Limited",
    brandName: "Vodacom",
    category: "Private MNO",
    officialWebsite: "https://www.vodacom.co.za",
    source: "ICASA Spectrum Allocations",
    lastReviewedDate: "2024-05-01",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "5G"],
  },

  // Egypt (EG)
  {
    id: "eg-vodafone",
    countryCode: "EG",
    countryName: "Egypt",
    operatorName: "Vodafone Egypt Telecommunications S.A.E.",
    brandName: "Vodafone Egypt",
    category: "Private MNO",
    officialWebsite: "https://web.vodafone.com.eg",
    source: "National Telecommunications Regulatory Authority (NTRA)",
    lastReviewedDate: "2024-05-01",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "Vodafone Cash"],
  },

  // India (IN)
  {
    id: "in-jio",
    countryCode: "IN",
    countryName: "India",
    operatorName: "Reliance Jio Infocomm Limited",
    brandName: "Jio",
    category: "Private MNO",
    officialWebsite: "https://www.jio.com",
    source: "Telecom Regulatory Authority of India (TRAI)",
    lastReviewedDate: "2024-04-20",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G VoLTE", "5G True 5G"],
  },
  {
    id: "in-airtel",
    countryCode: "IN",
    countryName: "India",
    operatorName: "Bharti Airtel Limited",
    brandName: "Airtel India",
    category: "Private MNO",
    officialWebsite: "https://www.airtel.in",
    source: "TRAI Telecom Reports",
    lastReviewedDate: "2024-04-20",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G", "5G Plus", "Airtel Payments Bank"],
  },

  // Ghana (GH)
  {
    id: "gh-mtn",
    countryCode: "GH",
    countryName: "Ghana",
    operatorName: "Scancom PLC (MTN Ghana)",
    brandName: "MTN Ghana",
    category: "Private MNO",
    officialWebsite: "https://www.mtn.com.gh",
    source: "National Communications Authority (NCA Ghana)",
    lastReviewedDate: "2024-04-10",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["3G", "4G LTE", "MoMo Ghana"],
  },

  // United Arab Emirates (AE)
  {
    id: "ae-etisalat",
    countryCode: "AE",
    countryName: "United Arab Emirates",
    operatorName: "Emirates Telecommunications Group Company PJSC",
    brandName: "e& (etisalat and_)",
    category: "State-owned MNO",
    officialWebsite: "https://www.etisalat.ae",
    source: "Telecommunications and Digital Government Regulatory Authority (TDRA)",
    lastReviewedDate: "2024-04-05",
    verificationStatus: "Officially Verified",
    networkTechnologies: ["4G LTE", "5G High-Speed", "Fiber"],
  },
];

export const getOperatorsByCountry = (countryCode: string): TelecomOperator[] => {
  return TELECOM_OPERATORS.filter((op) => op.countryCode.toUpperCase() === countryCode.toUpperCase());
};
