import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private apiUrl = environment.apiUrl.replace('/expenses', '/fund');

  constructor(private http: HttpClient) { }

  getInitialFund(): Observable<{ initialFund: number }> {
    return this.http.get<{ initialFund: number }>(this.apiUrl);
  }

  updateInitialFund(initialFund: number): Observable<{ initialFund: number }> {
    return this.http.put<{ initialFund: number }>(this.apiUrl, { initialFund });
  }
}

