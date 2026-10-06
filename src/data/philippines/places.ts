export type IslandGroup = "LUZON" | "VISAYAS" | "MINDANAO";

export interface PlaceData {
  capital: string;
  region: string;
  islandGroup: IslandGroup;
}

export const PLACES: Record<string, PlaceData> = {
  // CAR
  "1400100000": {
    capital: "Bangued",
    region: "CAR",
    islandGroup: "LUZON",
  },
  "1401100000": {
    capital: "La Trinidad",
    region: "CAR",
    islandGroup: "LUZON",
  },
  "1402700000": {
    capital: "Lagawe",
    region: "CAR",
    islandGroup: "LUZON",
  },
  "1403200000": {
    capital: "Tabuk City",
    region: "CAR",
    islandGroup: "LUZON",
  },
  "1404400000": {
    capital: "Bontoc",
    region: "CAR",
    islandGroup: "LUZON",
  },
  "1408100000": {
    capital: "Kabugao",
    region: "CAR",
    islandGroup: "LUZON",
  },

  // Metro Manila
  "1300000000": {
    capital: "Manila",
    region: "NCR",
    islandGroup: "LUZON",
  },

  // Region I — Ilocos Region
  "0102800000": {
    capital: "Laoag City",
    region: "Ilocos",
    islandGroup: "LUZON",
  },
  "0102900000": {
    capital: "Vigan City",
    region: "Ilocos",
    islandGroup: "LUZON",
  },
  "0103300000": {
    capital: "San Fernando City",
    region: "Ilocos",
    islandGroup: "LUZON",
  },
  "0105500000": {
    capital: "Lingayen",
    region: "Ilocos",
    islandGroup: "LUZON",
  },

  // Region II — Cagayan Valley
  "0200900000": {
    capital: "Basco",
    region: "Cagayan Valley",
    islandGroup: "LUZON",
  },
  "0201500000": {
    capital: "Tuguegarao City",
    region: "Cagayan Valley",
    islandGroup: "LUZON",
  },
  "0203100000": {
    capital: "Ilagan",
    region: "Cagayan Valley",
    islandGroup: "LUZON",
  },
  "0205000000": {
    capital: "Bayombong",
    region: "Cagayan Valley",
    islandGroup: "LUZON",
  },
  "0205700000": {
    capital: "Cabarroguis",
    region: "Cagayan Valley",
    islandGroup: "LUZON",
  },

  // Region III — Central Luzon
  "0300800000": {
    capital: "Balanga City",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },
  "0301400000": {
    capital: "Malolos City",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },
  "0304900000": {
    capital: "Palayan City",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },
  "0305400000": {
    capital: "San Fernando City",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },
  "0306900000": {
    capital: "Tarlac City",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },
  "0307100000": {
    capital: "Iba",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },
  "0307700000": {
    capital: "Baler",
    region: "Central Luzon",
    islandGroup: "LUZON",
  },

  // Region IV-A — CALABARZON
  "0401000000": {
    capital: "Batangas City",
    region: "CALABARZON",
    islandGroup: "LUZON",
  },
  "0402100000": {
    capital: "Trece Martires City",
    region: "CALABARZON",
    islandGroup: "LUZON",
  },
  "0403400000": {
    capital: "Santa Cruz",
    region: "CALABARZON",
    islandGroup: "LUZON",
  },
  "0405600000": {
    capital: "Lucena City",
    region: "CALABARZON",
    islandGroup: "LUZON",
  },
  "0405800000": {
    capital: "Antipolo City",
    region: "CALABARZON",
    islandGroup: "LUZON",
  },

  // Region IV-B — MIMAROPA
  "1704000000": {
    capital: "Boac",
    region: "MIMAROPA",
    islandGroup: "LUZON",
  },
  "1705100000": {
    capital: "Mamburao",
    region: "MIMAROPA",
    islandGroup: "LUZON",
  },
  "1705200000": {
    capital: "Calapan City",
    region: "MIMAROPA",
    islandGroup: "LUZON",
  },
  "1705300000": {
    capital: "Puerto Princesa City",
    region: "MIMAROPA",
    islandGroup: "LUZON",
  },
  "1705900000": {
    capital: "Romblon",
    region: "MIMAROPA",
    islandGroup: "LUZON",
  },

  // Region V — Bicol Region
  "0500500000": {
    capital: "Legazpi City",
    region: "Bicol",
    islandGroup: "LUZON",
  },
  "0501600000": {
    capital: "Daet",
    region: "Bicol",
    islandGroup: "LUZON",
  },
  "0501700000": {
    capital: "Pili",
    region: "Bicol",
    islandGroup: "LUZON",
  },
  "0502000000": {
    capital: "Virac",
    region: "Bicol",
    islandGroup: "LUZON",
  },
  "0504100000": {
    capital: "Masbate City",
    region: "Bicol",
    islandGroup: "LUZON",
  },
  "0506200000": {
    capital: "Sorsogon City",
    region: "Bicol",
    islandGroup: "LUZON",
  },

  // Region VI — Western Visayas
  "0600400000": {
    capital: "Kalibo",
    region: "Western Visayas",
    islandGroup: "VISAYAS",
  },
  "0600600000": {
    capital: "San Jose de Buenavista",
    region: "Western Visayas",
    islandGroup: "VISAYAS",
  },
  "0601900000": {
    capital: "Roxas City",
    region: "Western Visayas",
    islandGroup: "VISAYAS",
  },
  "0603000000": {
    capital: "Iloilo City",
    region: "Western Visayas",
    islandGroup: "VISAYAS",
  },
  "0607900000": {
    capital: "Jordan",
    region: "Western Visayas",
    islandGroup: "VISAYAS",
  },

  // Negros Island Region
  "0604500000": {
    capital: "Bacolod City",
    region: "Negros Island",
    islandGroup: "VISAYAS",
  },
  "0704600000": {
    capital: "Dumaguete City",
    region: "Negros Island",
    islandGroup: "VISAYAS",
  },
  "0706100000": {
    capital: "Siquijor",
    region: "Negros Island",
    islandGroup: "VISAYAS",
  },

  // Region VII — Central Visayas
  "0701200000": {
    capital: "Tagbilaran City",
    region: "Central Visayas",
    islandGroup: "VISAYAS",
  },
  "0702200000": {
    capital: "Cebu City",
    region: "Central Visayas",
    islandGroup: "VISAYAS",
  },

  // Region VIII — Eastern Visayas
  "0802600000": {
    capital: "Borongan City",
    region: "Eastern Visayas",
    islandGroup: "VISAYAS",
  },
  "0803700000": {
    capital: "Tacloban City",
    region: "Eastern Visayas",
    islandGroup: "VISAYAS",
  },
  "0804800000": {
    capital: "Catarman",
    region: "Eastern Visayas",
    islandGroup: "VISAYAS",
  },
  "0806000000": {
    capital: "Catbalogan City",
    region: "Eastern Visayas",
    islandGroup: "VISAYAS",
  },
  "0806400000": {
    capital: "Maasin City",
    region: "Eastern Visayas",
    islandGroup: "VISAYAS",
  },
  "0807800000": {
    capital: "Naval",
    region: "Eastern Visayas",
    islandGroup: "VISAYAS",
  },

  // Region IX — Zamboanga Peninsula
  "1906600000": {
    capital: "Jolo",
    region: "Zamboanga Peninsula",
    islandGroup: "MINDANAO",
  },
  "0907200000": {
    capital: "Dipolog City",
    region: "Zamboanga Peninsula",
    islandGroup: "MINDANAO",
  },
  "0907300000": {
    capital: "Pagadian City",
    region: "Zamboanga Peninsula",
    islandGroup: "MINDANAO",
  },
  "0908300000": {
    capital: "Ipil",
    region: "Zamboanga Peninsula",
    islandGroup: "MINDANAO",
  },

  // Region X — Northern Mindanao
  "1001300000": {
    capital: "Malaybalay City",
    region: "Northern Mindanao",
    islandGroup: "MINDANAO",
  },
  "1001800000": {
    capital: "Mambajao",
    region: "Northern Mindanao",
    islandGroup: "MINDANAO",
  },
  "1003500000": {
    capital: "Tubod",
    region: "Northern Mindanao",
    islandGroup: "MINDANAO",
  },
  "1004200000": {
    capital: "Oroquieta City",
    region: "Northern Mindanao",
    islandGroup: "MINDANAO",
  },
  "1004300000": {
    capital: "Cagayan de Oro City",
    region: "Northern Mindanao",
    islandGroup: "MINDANAO",
  },

  // Region XI — Davao Region
  "1102300000": {
    capital: "Tagum City",
    region: "Davao",
    islandGroup: "MINDANAO",
  },
  "1102400000": {
    capital: "Davao",
    islandGroup: "MINDANAO",
    region: "Davao",
  },
  "1102500000": {
    capital: "Mati City",
    region: "Davao",
    islandGroup: "MINDANAO",
  },
  "1108200000": {
    capital: "Nabunturan",
    region: "Davao",
    islandGroup: "MINDANAO",
  },
  "1108600000": {
    capital: "Malita",
    region: "Davao",
    islandGroup: "MINDANAO",
  },

  // Region XII — SOCCSKSARGEN
  "1204700000": {
    capital: "Kidapawan City",
    region: "SOCCSKSARGEN",
    islandGroup: "MINDANAO",
  },
  "1206300000": {
    capital: "Koronadal City",
    region: "SOCCSKSARGEN",
    islandGroup: "MINDANAO",
  },
  "1206500000": {
    capital: "Isulan",
    region: "SOCCSKSARGEN",
    islandGroup: "MINDANAO",
  },
  "1208000000": {
    capital: "Alabel",
    region: "SOCCSKSARGEN",
    islandGroup: "MINDANAO",
  },

  // Region XIII — Caraga
  "1600200000": {
    capital: "Cabadbaran City",
    region: "Caraga",
    islandGroup: "MINDANAO",
  },
  "1600300000": {
    capital: "Prosperidad",
    region: "Caraga",
    islandGroup: "MINDANAO",
  },
  "1606700000": {
    capital: "Surigao City",
    region: "Caraga",
    islandGroup: "MINDANAO",
  },
  "1606800000": {
    capital: "Tandag City",
    region: "Caraga",
    islandGroup: "MINDANAO",
  },
  "1608500000": {
    capital: "San Jose",
    region: "Caraga",
    islandGroup: "MINDANAO",
  },

  // BARMM
  "1900700000": {
    capital: "Isabela City",
    region: "BARMM",
    islandGroup: "MINDANAO",
  },
  "1903600000": {
    capital: "Marawi City",
    region: "BARMM",
    islandGroup: "MINDANAO",
  },
  "1907000000": {
    capital: "Bongao",
    region: "BARMM",
    islandGroup: "MINDANAO",
  },
  "1908700000": {
    capital: "Datu Odin Sinsuat",
    region: "BARMM",
    islandGroup: "MINDANAO",
  },
  "1908800000": {
    capital: "Buluan",
    region: "BARMM",
    islandGroup: "MINDANAO",
  },
};
