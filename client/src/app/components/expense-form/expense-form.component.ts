import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense: Expense | null = null;
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  expenseForm!: FormGroup;
  categories: string[] = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.isEditing = !!this.expense;
    this.initForm();
  }

  initForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.expenseForm = this.fb.group({
      title: [this.expense?.title || '', Validators.required],
      amount: [this.expense?.amount || 0, [Validators.required, Validators.min(0.01)]],
      category: [this.expense?.category || 'Other', Validators.required],
      date: [this.expense ? new Date(this.expense.date).toISOString().split('T')[0] : today, Validators.required],
      description: [this.expense?.description || '']
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const expenseData: Expense = this.expenseForm.value;

      if (this.isEditing && this.expense?._id) {
        this.expenseService.updateExpense(this.expense._id, expenseData).subscribe({
          next: () => {
            this.onSave.emit();
          },
          error: (error) => {
            console.error('Error updating expense:', error);
          }
        });
      } else {
        this.expenseService.createExpense(expenseData).subscribe({
          next: () => {
            this.onSave.emit();
          },
          error: (error) => {
            console.error('Error creating expense:', error);
          }
        });
      }
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }
}


