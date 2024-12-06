import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const nigerianBanks = [
  // Commercial Banks
  { id: "1", name: "Access Bank", code: "044", abbreviation: "ACCESS" },
  { id: "2", name: "Citibank Nigeria", code: "023", abbreviation: "CITIBANK" },
  { id: "3", name: "Ecobank Nigeria", code: "050", abbreviation: "ECOBANK" },
  { id: "4", name: "Fidelity Bank", code: "070", abbreviation: "FIDELITY" },
  { id: "5", name: "First Bank of Nigeria", code: "011", abbreviation: "FIRSTBANK" },
  { id: "6", name: "First City Monument Bank (FCMB)", code: "214", abbreviation: "FCMB" },
  { id: "7", name: "Globus Bank", code: "00103", abbreviation: "GLOBUS" },
  { id: "8", name: "Guaranty Trust Bank (GTBank)", code: "058", abbreviation: "GTBANK" },
  { id: "9", name: "Heritage Bank", code: "030", abbreviation: "HERITAGE" },
  { id: "10", name: "Keystone Bank", code: "082", abbreviation: "KEYSTONE" },
  { id: "11", name: "Polaris Bank", code: "076", abbreviation: "POLARIS" },
  { id: "12", name: "Providus Bank", code: "101", abbreviation: "PROVIDUS" },
  { id: "13", name: "Stanbic IBTC Bank", code: "221", abbreviation: "STANBIC" },
  { id: "14", name: "Standard Chartered Bank", code: "068", abbreviation: "STANDARD" },
  { id: "15", name: "Sterling Bank", code: "232", abbreviation: "STERLING" },
  { id: "16", name: "SunTrust Bank", code: "100", abbreviation: "SUNTRUST" },
  { id: "17", name: "Union Bank of Nigeria", code: "032", abbreviation: "UNION" },
  { id: "18", name: "United Bank for Africa (UBA)", code: "033", abbreviation: "UBA" },
  { id: "19", name: "Unity Bank", code: "215", abbreviation: "UNITY" },
  { id: "20", name: "Wema Bank", code: "035", abbreviation: "WEMA" },
  { id: "21", name: "Zenith Bank", code: "057", abbreviation: "ZENITH" },

  // Microfinance Banks
  { id: "22", name: "AB Microfinance Bank", code: "90115", abbreviation: "ABMFB" },
  { id: "23", name: "Accion Microfinance Bank", code: "90110", abbreviation: "ACCION" },
  { id: "24", name: "LAPO Microfinance Bank", code: "90113", abbreviation: "LAPO" },
  { id: "25", name: "NPF Microfinance Bank", code: "90128", abbreviation: "NPFMFB" },
  { id: "26", name: "Rehoboth Microfinance Bank", code: "90216", abbreviation: "REHOBOTH" },
  { id: "27", name: "Addosser Microfinance Bank", code: "90112", abbreviation: "ADDOSSER" },

  // Wallets and Fintechs
  { id: "28", name: "Opay", code: "102", abbreviation: "OPAY" },
  { id: "29", name: "PalmPay", code: "103", abbreviation: "PALMPAY" },
  { id: "30", name: "Kuda Bank", code: "104", abbreviation: "KUDA" },
  { id: "31", name: "Moniepoint", code: "105", abbreviation: "MONIEPOINT" },
  { id: "32", name: "Paga", code: "100002", abbreviation: "PAGA" },
  { id: "33", name: "Chipper Cash", code: "100003", abbreviation: "CHIPPER" }
];



export const isProduction = process.env.NODE_ENV === "production"
export const isLocal = process.env.NODE_ENV === 'development'

