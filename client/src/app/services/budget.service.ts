import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Budget {
  _id?: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = environment.apiUrl.replace('/expenses', '/budget');

  constructor(private http: HttpClient) { }

  getAllBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl);
  }

  getBudgetByCategory(category: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${category}`);
  }

  createOrUpdateBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget);
  }

  deleteBudget(category: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${category}`);
  }
}

