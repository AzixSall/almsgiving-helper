
import { CurrencyType } from '@/contexts/LanguageContext';

export interface ZakatValues {
  cashAmount: number;
  goldValue: number;
  silverValue: number;
  otherInvestments: number;
  debtsOwed: number;
  businessAssets: number;
}

export interface ZakatResults {
  totalAssets: number;
  totalLiabilities: number;
  netZakatableAmount: number;
  zakatPayable: number;
  eligibleForZakat: boolean;
  nisabThreshold: number;
}

export interface ZakatFitrValues {
  familyMembers: number;
  paymentMethod: 'food' | 'money';
}

export interface ZakatFitrResults {
  familyMembers: number;
  paymentMethod: 'food' | 'money';
  totalAmount: number;
}

export interface PriceUpdate {
  goldPricePerGram: number;
  silverPricePerGram: number;
  fitrAmountPerPerson: number;
}

// Currency conversion rates (relative to USD)
const currencyRates = {
  USD: 1,
  EUR: 0.93,  // 1 USD = 0.93 EUR
  XOF: 610    // 1 USD = 610 XOF (approximate)
};

// Default precious metal prices - these would normally come from environment variables
// but for this demo we're hardcoding them here
const DEFAULT_PRICES = {
  USD: {
    goldPricePerGram: 75.50,
    silverPricePerGram: 0.95,
    fitrAmountPerPerson: 10
  },
  EUR: {
    goldPricePerGram: 70.22,
    silverPricePerGram: 0.88,
    fitrAmountPerPerson: 9.30
  },
  XOF: {
    goldPricePerGram: 46055,
    silverPricePerGram: 579.5,
    fitrAmountPerPerson: 6100
  }
};

// Load saved prices from localStorage if they exist, otherwise use defaults
const loadSavedPrices = (): { [key in CurrencyType]: PriceUpdate } => {
  const savedPrices = localStorage.getItem('zakatPrices');
  if (savedPrices) {
    try {
      return JSON.parse(savedPrices);
    } catch (e) {
      console.error("Failed to parse saved prices", e);
    }
  }
  return DEFAULT_PRICES;
};

// Configurable values for admins - base prices in USD
export const PreciousMetalPrices = {
  // Gold price per gram in USD (sample value - should be updated regularly)
  goldPricePerGram: 75.50,
  
  // Silver price per gram in USD (sample value - should be updated regularly)
  silverPricePerGram: 0.95,
  
  // Weight of nisab in gold (87.48 grams)
  nisabGoldWeight: 87.48,
  
  // Weight of nisab in silver (612.36 grams)
  nisabSilverWeight: 612.36,
  
  // Zakat rate (2.5%)
  zakatRate: 0.025,
  
  // Zakat al-Fitr amount per person in USD (can be adjusted based on local costs)
  fitrAmountPerPerson: 10,

  // Store prices in different currencies
  currencyPrices: loadSavedPrices()
};

// Function to update precious metal prices
export const updatePreciousMetalPrices = (prices: PriceUpdate, currency: CurrencyType) => {
  // Update the current currency prices
  PreciousMetalPrices.currencyPrices[currency] = {
    goldPricePerGram: prices.goldPricePerGram,
    silverPricePerGram: prices.silverPricePerGram,
    fitrAmountPerPerson: prices.fitrAmountPerPerson
  };

  // Update the main price values based on the currency
  PreciousMetalPrices.goldPricePerGram = prices.goldPricePerGram;
  PreciousMetalPrices.silverPricePerGram = prices.silverPricePerGram;
  PreciousMetalPrices.fitrAmountPerPerson = prices.fitrAmountPerPerson;

  // Update other currency values based on rates
  Object.keys(PreciousMetalPrices.currencyPrices).forEach((curr) => {
    if (curr !== currency) {
      const targetCurrency = curr as CurrencyType;
      const rate = currencyRates[currency] / currencyRates[targetCurrency];
      
      PreciousMetalPrices.currencyPrices[targetCurrency].goldPricePerGram = prices.goldPricePerGram / rate;
      PreciousMetalPrices.currencyPrices[targetCurrency].silverPricePerGram = prices.silverPricePerGram / rate;
      PreciousMetalPrices.currencyPrices[targetCurrency].fitrAmountPerPerson = prices.fitrAmountPerPerson / rate;
    }
  });

  // Save to localStorage
  localStorage.setItem('zakatPrices', JSON.stringify(PreciousMetalPrices.currencyPrices));
};

// Reset prices to defaults (as if from env file)
export const resetToDefaultPrices = (currency: CurrencyType) => {
  // Reset to default values
  localStorage.removeItem('zakatPrices');
  PreciousMetalPrices.currencyPrices = {...DEFAULT_PRICES};
  
  // Set current prices based on currency
  const currentPrices = PreciousMetalPrices.currencyPrices[currency];
  PreciousMetalPrices.goldPricePerGram = currentPrices.goldPricePerGram;
  PreciousMetalPrices.silverPricePerGram = currentPrices.silverPricePerGram;
  PreciousMetalPrices.fitrAmountPerPerson = currentPrices.fitrAmountPerPerson;
};

// Get current prices based on selected currency
export const getCurrentPrices = (currency: CurrencyType) => {
  return PreciousMetalPrices.currencyPrices[currency];
};

// Calculate Nisab threshold based on the lower of gold and silver values in the current currency
export const calculateNisabThreshold = (currency: CurrencyType = 'USD'): number => {
  const prices = getCurrentPrices(currency);
  const goldNisab = prices.goldPricePerGram * PreciousMetalPrices.nisabGoldWeight;
  const silverNisab = prices.silverPricePerGram * PreciousMetalPrices.nisabSilverWeight;
  
  // Islamic principle is to use the lower of the two values to make Zakat more accessible
  return Math.min(goldNisab, silverNisab);
};

export const calculateZakat = (values: ZakatValues, currency: CurrencyType = 'USD'): ZakatResults => {
  // Calculate total assets
  const totalAssets = 
    (values.cashAmount || 0) + 
    (values.goldValue || 0) + 
    (values.silverValue || 0) + 
    (values.otherInvestments || 0) + 
    (values.businessAssets || 0);

  // Calculate total liabilities
  const totalLiabilities = values.debtsOwed || 0;

  // Calculate net zakatable amount
  const netZakatableAmount = totalAssets - totalLiabilities;

  // Calculate nisab threshold
  const nisabThreshold = calculateNisabThreshold(currency);

  // Determine if the person is eligible to pay zakat
  const eligibleForZakat = netZakatableAmount >= nisabThreshold;

  // Calculate zakat payable (2.5% of net zakatable amount if eligible)
  const zakatPayable = eligibleForZakat ? netZakatableAmount * PreciousMetalPrices.zakatRate : 0;

  return {
    totalAssets,
    totalLiabilities,
    netZakatableAmount,
    zakatPayable,
    eligibleForZakat,
    nisabThreshold
  };
};

/**
 * Calculates Zakat al-Fitr based on the number of family members and payment method
 */
export const calculateZakatFitr = (values: ZakatFitrValues, currency: CurrencyType = 'USD'): ZakatFitrResults => {
  // Calculate total Zakat al-Fitr
  let totalAmount = 0;
  const prices = getCurrentPrices(currency);
  
  if (values.paymentMethod === 'food') {
    // 1 Sa'a of food per person (in units of Sa'a)
    totalAmount = values.familyMembers;
  } else {
    // Money equivalent based on the configured amount per person
    totalAmount = values.familyMembers * prices.fitrAmountPerPerson;
  }
  
  return {
    familyMembers: values.familyMembers,
    paymentMethod: values.paymentMethod,
    totalAmount
  };
};

// Initialize the system by setting current prices based on the current currency
export const initializePrices = (currency: CurrencyType) => {
  const prices = getCurrentPrices(currency);
  PreciousMetalPrices.goldPricePerGram = prices.goldPricePerGram;
  PreciousMetalPrices.silverPricePerGram = prices.silverPricePerGram;
  PreciousMetalPrices.fitrAmountPerPerson = prices.fitrAmountPerPerson;
};
