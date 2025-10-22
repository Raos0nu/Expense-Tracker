import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent {
  @Input() expenses: Expense[] = [];
  @Output() onEdit = new EventEmitter<Expense>();
  @Output() onDelete = new EventEmitter<string>();

  editExpense(expense: Expense): void {
    this.onEdit.emit(expense);
  }

  deleteExpense(id: string | undefined): void {
    if (id) {
      this.onDelete.emit(id);
    }
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Food': '#f56565',
      'Transportation': '#ed8936',
      'Entertainment': '#ecc94b',
      'Bills': '#48bb78',
      'Shopping': '#38b2ac',
      'Health': '#4299e1',
      'Other': '#9f7aea'
    };
    return colors[category] || '#a0aec0';
  }
}

