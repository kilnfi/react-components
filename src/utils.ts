export const formatPrice = (
  price: number,
  currency: string = 'USD',
): string => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

export const formatNumber = (
  number: number,
  maximumFractionDigits: number = 2,
): string => {
  return new Intl.NumberFormat('en-EN', {
    maximumFractionDigits: maximumFractionDigits,
  }).format(number);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-EN', { dateStyle: 'medium' }).format(date);
};

// Convert Ethereum gwei to ETH
export const gweiToEth = (gwei: number): number => {
  return gwei / 10 ** 9;
};
