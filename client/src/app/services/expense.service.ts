import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, CategoryStats } from '../models/expense.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('ExpenseService initialized with API URL:', this.apiUrl);
  }

  getAllExpenses(filters?: {
    startDate?: string;
    endDate?: string;
    category?: string;
    search?: string;
  }): Observable<Expense[]> {
    let params: any = {};
    if (filters) {
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
      if (filters.category) params.category = filters.category;
      if (filters.search) params.search = filters.search;
    }
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${this.apiUrl}?${queryString}` : this.apiUrl;
    return this.http.get<Expense[]>(url);
  }

  getExpenseById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  updateExpense(id: string, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTotalExpenses(filters?: {
    startDate?: string;
    endDate?: string;
  }): Observable<{ total: number }> {
    let params: any = {};
    if (filters) {
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
    }
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${this.apiUrl}/stats/total?${queryString}` : `${this.apiUrl}/stats/total`;
    return this.http.get<{ total: number }>(url);
  }

  getCategoryStats(filters?: {
    startDate?: string;
    endDate?: string;
  }): Observable<CategoryStats[]> {
    let params: any = {};
    if (filters) {
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
    }
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${this.apiUrl}/stats/category?${queryString}` : `${this.apiUrl}/stats/category`;
    return this.http.get<CategoryStats[]>(url);
  }

  getTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stats/trends`);
  }
}


