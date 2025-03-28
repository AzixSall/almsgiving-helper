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

// Calculate Nisab threshold (approximately)
// Note: In a real implementation, this would be fetched from an API as it changes based on current gold/silver prices
const calculateNisabThreshold = (): number => {
  // This is an approximation based on the value of 87.48 grams of gold
  // In a real world app, this would be dynamically updated based on current gold prices
  return 3500; // Example value in a common currency
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
  const zakatPayable = eligibleForZakat ? netZakatableAmount * 0.025 : 0;

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
    // Money equivalent (approximately $10 per person - this varies by region)
    // In a real implementation, this would be fetched from an API as it changes
    totalAmount = values.familyMembers * 10;
  }
  
  return {
    familyMembers: values.familyMembers,
    paymentMethod: values.paymentMethod,
    totalAmount
  };
};
