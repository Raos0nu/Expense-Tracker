export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: Date | string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryStats {
  _id: string;
  total: number;
  count: number;
}


