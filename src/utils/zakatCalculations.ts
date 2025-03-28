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

// Configurable values for admins
export const PreciousMetalPrices = {
  // USD
  USD: {
    goldPricePerGram: 75.50,
    silverPricePerGram: 0.95,
    fitrAmountPerPerson: 10
  },
  
  // EUR
  EUR: {
    goldPricePerGram: 70.25,
    silverPricePerGram: 0.88,
    fitrAmountPerPerson: 9
  },
  
  // XOF (CFA Franc)
  XOF: {
    goldPricePerGram: 47000,
    silverPricePerGram: 580,
    fitrAmountPerPerson: 6000
  },
  
  // Weight of nisab in gold (87.48 grams)
  nisabGoldWeight: 87.48,
  
  // Weight of nisab in silver (612.36 grams)
  nisabSilverWeight: 612.36,
  
  // Zakat rate (2.5%)
  zakatRate: 0.025
};

/**
 * Get the price per gram for a specific precious metal based on the selected currency
 * @param metal The precious metal (gold or silver)
 * @param currency The selected currency
 * @returns The price per gram of the selected metal in the selected currency
 */
export const getPreciousMetalPricePerGram = (
  metal: 'gold' | 'silver', 
  currency: 'USD' | 'EUR' | 'XOF' = 'USD'
): number => {
  if (metal === 'gold') {
    return PreciousMetalPrices[currency].goldPricePerGram;
  }
  return PreciousMetalPrices[currency].silverPricePerGram;
};

// Calculate Nisab threshold based on the lower of gold and silver values
export const calculateNisabThreshold = (currency: 'USD' | 'EUR' | 'XOF' = 'USD'): number => {
  const goldNisab = PreciousMetalPrices[currency].goldPricePerGram * PreciousMetalPrices.nisabGoldWeight;
  const silverNisab = PreciousMetalPrices[currency].silverPricePerGram * PreciousMetalPrices.nisabSilverWeight;
  
  // Islamic principle is to use the lower of the two values to make Zakat more accessible
  return Math.min(goldNisab, silverNisab);
};

export const calculateZakat = (values: ZakatValues, currency: 'USD' | 'EUR' | 'XOF' = 'USD'): ZakatResults => {
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
 * 
 * Zakat al-Fitr (also known as Sadaqat al-Fitr or Fitrana) is a charitable donation that 
 * every Muslim is required to pay at the end of Ramadan, before the Eid prayer. It serves 
 * to purify the fasting person from any indecent act or speech committed during Ramadan and 
 * to help the poor and needy celebrate Eid.
 * 
 * Key points about Zakat al-Fitr:
 * 1. It is obligatory upon every Muslim who has food in excess of their needs.
 * 2. It must be paid for oneself and for all dependents.
 * 3. Traditionally paid in food (a Sa'a, approx 2.5-3kg of staple food).
 * 4. Can be paid in monetary equivalent in many modern contexts.
 * 5. Must be paid before the Eid prayer to be considered valid Zakat al-Fitr.
 * 
 * @param values - Object containing family members count and payment method (food or money)
 * @returns Object with calculated Zakat al-Fitr amount based on input values
 */
export const calculateZakatFitr = (values: ZakatFitrValues, currency: 'USD' | 'EUR' | 'XOF' = 'USD'): ZakatFitrResults => {
  // Calculate total Zakat al-Fitr
  let totalAmount = 0;
  
  if (values.paymentMethod === 'food') {
    // 1 Sa'a of food per person (in units of Sa'a)
    totalAmount = values.familyMembers;
  } else {
    // Money equivalent based on the configured amount per person
    totalAmount = values.familyMembers * PreciousMetalPrices[currency].fitrAmountPerPerson;
  }
  
  return {
    familyMembers: values.familyMembers,
    paymentMethod: values.paymentMethod,
    totalAmount
  };
};
