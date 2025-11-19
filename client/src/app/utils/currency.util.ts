// Currency formatting utility for INR
export function formatInr(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

