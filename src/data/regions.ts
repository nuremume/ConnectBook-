export interface RegionInfo {
  name: string;
  code?: string;
  type: "State" | "Region" | "Chartered City" | "Province" | "County" | "Territory";
  capital?: string;
  majorCities: string[];
}

export interface CountryRegions {
  countryCode: string;
  regionLabel: string; // e.g. "Region / Administrative State", "State", "Province", "County"
  cityLabel: string; // e.g. "City / Sub-city", "City"
  regions: RegionInfo[];
}

export const COUNTRY_REGIONS: Record<string, CountryRegions> = {
  ET: {
    countryCode: "ET",
    regionLabel: "Regional State / Chartered City",
    cityLabel: "City / Sub-city",
    regions: [
      {
        name: "Addis Ababa",
        code: "AA",
        type: "Chartered City",
        capital: "Addis Ababa",
        majorCities: [
          "Bole",
          "Kirkos",
          "Arada",
          "Yeka",
          "Nifas Silk-Lafto",
          "Gullele",
          "Lideta",
          "Akaki Kality",
          "Kolfe Keranio",
          "Addis Ketema",
          "Lemi Kura",
        ],
      },
      {
        name: "Oromia",
        code: "OR",
        type: "Region",
        capital: "Adama / Finfinnee",
        majorCities: [
          "Adama (Nazret)",
          "Bishoftu (Debre Zeyit)",
          "Jimma",
          "Shashemene",
          "Nekemte",
          "Asella",
          "Ambo",
          "Batu (Ziway)",
          "Burayu",
          "Sebeta",
        ],
      },
      {
        name: "Amhara",
        code: "AM",
        type: "Region",
        capital: "Bahir Dar",
        majorCities: [
          "Bahir Dar",
          "Gondar",
          "Dessie",
          "Debre Birhan",
          "Kombolcha",
          "Debre Markos",
          "Woldiya",
          "Kobo",
        ],
      },
      {
        name: "Sidama",
        code: "SI",
        type: "Region",
        capital: "Hawassa",
        majorCities: ["Hawassa", "Yirgalem", "Aleta Wondo", "Leku", "Wondo Genet"],
      },
      {
        name: "Tigray",
        code: "TG",
        type: "Region",
        capital: "Mekelle",
        majorCities: ["Mekelle", "Axum", "Adigrat", "Shire (Inda Selassie)", "Alamata", "Maychew"],
      },
      {
        name: "Somali",
        code: "SO",
        type: "Region",
        capital: "Jigjiga",
        majorCities: ["Jigjiga", "Degehabur", "Gode", "Kebri Dahar", "Shinile", "Dollo Ado"],
      },
      {
        name: "Afar",
        code: "AF",
        type: "Region",
        capital: "Semera",
        majorCities: ["Semera", "Asaita", "Awash", "Dubti", "Mille", "Chifra"],
      },
      {
        name: "Benishangul-Gumuz",
        code: "BG",
        type: "Region",
        capital: "Asosa",
        majorCities: ["Asosa", "Kamashi", "Gilgel Beles", "Menge", "Kurmuk"],
      },
      {
        name: "Gambela",
        code: "GA",
        type: "Region",
        capital: "Gambela",
        majorCities: ["Gambela", "Itang", "Abobo", "Gog", "Pugnido"],
      },
      {
        name: "Harari",
        code: "HA",
        type: "Region",
        capital: "Harar",
        majorCities: ["Harar Jugol (Old Town)", "Amir Nur", "Shenkor", "Abadir", "Hakim"],
      },
      {
        name: "Central Ethiopia",
        code: "CE",
        type: "Region",
        capital: "Hosanna",
        majorCities: ["Hosanna", "Butajira", "Halaba Kulito", "Worabe", "Durame"],
      },
      {
        name: "South Ethiopia",
        code: "SE",
        type: "Region",
        capital: "Wolaita Sodo / Arba Minch",
        majorCities: ["Arba Minch", "Wolaita Sodo", "Dilla", "Jinka", "Konso", "Sawla"],
      },
      {
        name: "Southwest Ethiopia Peoples' Region",
        code: "SWE",
        type: "Region",
        capital: "Bonga",
        majorCities: ["Bonga", "Mizan Teferi", "Tepi", "Tercha", "Aman"],
      },
      {
        name: "Dire Dawa",
        code: "DD",
        type: "Chartered City",
        capital: "Dire Dawa",
        majorCities: ["Dire Dawa City Center", "Sabian", "Gende Kore", "Legehare", "Melka Jebdu"],
      },
    ],
  },
  US: {
    countryCode: "US",
    regionLabel: "State",
    cityLabel: "City",
    regions: [
      { name: "California", code: "CA", type: "State", majorCities: ["Los Angeles", "San Francisco", "San Diego", "San Jose"] },
      { name: "New York", code: "NY", type: "State", majorCities: ["New York City", "Buffalo", "Rochester", "Albany"] },
      { name: "Texas", code: "TX", type: "State", majorCities: ["Houston", "Austin", "Dallas", "San Antonio"] },
      { name: "Washington", code: "WA", type: "State", majorCities: ["Seattle", "Bellevue", "Spokane", "Tacoma"] },
      { name: "Florida", code: "FL", type: "State", majorCities: ["Miami", "Orlando", "Tampa", "Jacksonville"] },
      { name: "Illinois", code: "IL", type: "State", majorCities: ["Chicago", "Aurora", "Naperville", "Springfield"] },
      { name: "Georgia", code: "GA", type: "State", majorCities: ["Atlanta", "Savannah", "Augusta", "Athens"] },
    ],
  },
  KE: {
    countryCode: "KE",
    regionLabel: "County",
    cityLabel: "Town / City",
    regions: [
      { name: "Nairobi", code: "47", type: "County", capital: "Nairobi", majorCities: ["Nairobi Central", "Westlands", "Kilimani", "Karen"] },
      { name: "Mombasa", code: "01", type: "County", capital: "Mombasa", majorCities: ["Mombasa Island", "Nyali", "Likoni", "Changamwe"] },
      { name: "Kisumu", code: "42", type: "County", capital: "Kisumu", majorCities: ["Kisumu City", "Kondele", "Maseno"] },
      { name: "Nakuru", code: "32", type: "County", capital: "Nakuru", majorCities: ["Nakuru Town", "Naivasha", "Gilgil"] },
      { name: "Kiambu", code: "22", type: "County", capital: "Kiambu", majorCities: ["Thika", "Ruiru", "Kikuyu", "Limuru"] },
      { name: "Uasin Gishu", code: "27", type: "County", capital: "Eldoret", majorCities: ["Eldoret", "Turbo", "Burnt Forest"] },
    ],
  },
  GB: {
    countryCode: "GB",
    regionLabel: "Nation / Region",
    cityLabel: "City / Borough",
    regions: [
      { name: "England", code: "ENG", type: "Region", majorCities: ["London", "Manchester", "Birmingham", "Leeds", "Bristol"] },
      { name: "Scotland", code: "SCT", type: "Region", majorCities: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"] },
      { name: "Wales", code: "WLS", type: "Region", majorCities: ["Cardiff", "Swansea", "Newport", "Bangor"] },
      { name: "Northern Ireland", code: "NIR", type: "Region", majorCities: ["Belfast", "Derry / Londonderry", "Lisburn"] },
    ],
  },
  NG: {
    countryCode: "NG",
    regionLabel: "State",
    cityLabel: "City / Local Govt",
    regions: [
      { name: "Lagos", code: "LA", type: "State", majorCities: ["Ikeja", "Lekki", "Victoria Island", "Surulere", "Yaba"] },
      { name: "Abuja (FCT)", code: "FC", type: "Territory", majorCities: ["Garki", "Wuse", "Maitama", "Asokoro", "Gwarinpa"] },
      { name: "Kano", code: "KN", type: "State", majorCities: ["Kano Municipal", "Fagge", "Dala", "Gwale"] },
      { name: "Rivers", code: "RI", type: "State", majorCities: ["Port Harcourt", "Obio-Akpor", "Bonny", "Eleme"] },
      { name: "Oyo", code: "OY", type: "State", majorCities: ["Ibadan", "Ogbomosho", "Oyo Town", "Iseyin"] },
    ],
  },
  DE: {
    countryCode: "DE",
    regionLabel: "Federal State (Bundesland)",
    cityLabel: "City",
    regions: [
      { name: "Bavaria (Bayern)", code: "BY", type: "State", majorCities: ["Munich", "Nuremberg", "Augsburg", "Regensburg"] },
      { name: "Berlin", code: "BE", type: "State", majorCities: ["Mitte", "Charlottenburg", "Kreuzberg", "Pankow"] },
      { name: "North Rhine-Westphalia", code: "NW", type: "State", majorCities: ["Cologne", "Düsseldorf", "Dortmund", "Essen"] },
      { name: "Baden-Württemberg", code: "BW", type: "State", majorCities: ["Stuttgart", "Karlsruhe", "Mannheim", "Heidelberg"] },
      { name: "Hesse", code: "HE", type: "State", majorCities: ["Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt"] },
    ],
  },
  CA: {
    countryCode: "CA",
    regionLabel: "Province / Territory",
    cityLabel: "City",
    regions: [
      { name: "Ontario", code: "ON", type: "Province", majorCities: ["Toronto", "Ottawa", "Mississauga", "Hamilton"] },
      { name: "Quebec", code: "QC", type: "Province", majorCities: ["Montreal", "Quebec City", "Laval", "Gatineau"] },
      { name: "British Columbia", code: "BC", type: "Province", majorCities: ["Vancouver", "Victoria", "Surrey", "Burnaby"] },
      { name: "Alberta", code: "AB", type: "Province", majorCities: ["Calgary", "Edmonton", "Red Deer", "Banff"] },
    ],
  },
};

export const getCountryRegions = (countryCode: string): CountryRegions | null => {
  return COUNTRY_REGIONS[countryCode.toUpperCase()] || null;
};
