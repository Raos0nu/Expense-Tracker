import { Expense } from '../models/expense.model';
import { formatInr } from './currency.util';

export function exportToCSV(expenses: Expense[], filename: string = 'expenses.csv'): void {
  const headers = ['Title', 'Amount (₹)', 'Category', 'Date', 'Description'];
  const rows = expenses.map(expense => [
    expense.title,
    expense.amount.toString(),
    expense.category,
    new Date(expense.date).toLocaleDateString(),
    expense.description || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

