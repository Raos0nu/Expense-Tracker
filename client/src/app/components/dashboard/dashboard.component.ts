import { Component, OnInit } from '@angular/core';
import { Expense, CategoryStats } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  categoryStats: CategoryStats[] = [];
  totalExpenses: number = 0;
  showForm: boolean = false;
  editingExpense: Expense | null = null;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.loadStats();
  }

  loadExpenses(): void {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
      }
    });
  }

  loadStats(): void {
    this.expenseService.getTotalExpenses().subscribe({
      next: (data) => {
        this.totalExpenses = data.total;
      },
      error: (error) => {
        console.error('Error loading total:', error);
      }
    });

    this.expenseService.getCategoryStats().subscribe({
      next: (data) => {
        this.categoryStats = data;
      },
      error: (error) => {
        console.error('Error loading category stats:', error);
      }
    });
  }

  onAddExpense(): void {
    this.editingExpense = null;
    this.showForm = true;
  }

  onEditExpense(expense: Expense): void {
    this.editingExpense = expense;
    this.showForm = true;
  }

  onDeleteExpense(id: string): void {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.loadExpenses();
          this.loadStats();
        },
        error: (error) => {
          console.error('Error deleting expense:', error);
        }
      });
    }
  }

  onExpenseSaved(): void {
    this.showForm = false;
    this.editingExpense = null;
    this.loadExpenses();
    this.loadStats();
  }

  onFormCancel(): void {
    this.showForm = false;
    this.editingExpense = null;
  }
}


