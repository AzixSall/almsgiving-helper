
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
  fitrAmountPerPerson: 10
};

// Calculate Nisab threshold based on the lower of gold and silver values
export const calculateNisabThreshold = (): number => {
  const goldNisab = PreciousMetalPrices.goldPricePerGram * PreciousMetalPrices.nisabGoldWeight;
  const silverNisab = PreciousMetalPrices.silverPricePerGram * PreciousMetalPrices.nisabSilverWeight;
  
  // Islamic principle is to use the lower of the two values to make Zakat more accessible
  return Math.min(goldNisab, silverNisab);
};

export const calculateZakat = (values: ZakatValues): ZakatResults => {
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
  const nisabThreshold = calculateNisabThreshold();

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

export const calculateZakatFitr = (values: ZakatFitrValues): ZakatFitrResults => {
  // Calculate total Zakat al-Fitr
  let totalAmount = 0;
  
  if (values.paymentMethod === 'food') {
    // 1 Sa'a of food per person
    totalAmount = values.familyMembers;
  } else {
    // Money equivalent
    totalAmount = values.familyMembers * PreciousMetalPrices.fitrAmountPerPerson;
  }
  
  return {
    familyMembers: values.familyMembers,
    paymentMethod: values.paymentMethod,
    totalAmount
  };
};
