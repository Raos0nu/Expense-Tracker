import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Expense, CategoryStats } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { FundService } from '../../services/fund.service';
import { formatInr } from '../../utils/currency.util';
import { exportToCSV } from '../../utils/export.util';
import { ThemeService } from '../../utils/theme.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[] = [];
  allExpenses: Expense[] = [];
  categoryStats: CategoryStats[] = [];
  totalExpenses: number = 0;
  initialFund: number = 0;
  remainingBalance: number = 0;
  showForm: boolean = false;
  showFundForm: boolean = false;
  editingExpense: Expense | null = null;
  newInitialFund: number = 0;

  // Filters
  searchQuery: string = '';
  selectedCategory: string = '';
  dateRange: string = 'all';
  startDate: string = '';
  endDate: string = '';
  categories: string[] = ['Food', 'Transportation', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];
  isDarkMode: boolean = false;

  // Currency formatting function for template
  formatInr = formatInr;

  // Pie Chart Configuration
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#667eea',
        '#764ba2',
        '#f56565',
        '#48bb78',
        '#ed8936',
        '#4299e1',
        '#9f7aea'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#2d3748',
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${formatInr(value)}`;
          }
        }
      }
    }
  };

  // Bar Chart Configuration
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Expenses (₹)',
      data: [],
      backgroundColor: '#E62B1E',
      borderColor: '#c7251a',
      borderWidth: 2
    }]
  };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#2d3748',
          callback: (value) => formatInr(Number(value))
        },
        grid: {
          color: '#e2e8f0'
        }
      },
      x: {
        ticks: {
          color: '#2d3748'
        },
        grid: {
          color: '#e2e8f0'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Amount: ${formatInr(Number(context.parsed.y))}`;
          }
        }
      }
    }
  };

  constructor(
    private expenseService: ExpenseService,
    private fundService: FundService
  ) { }

  ngOnInit(): void {
    ThemeService.initTheme();
    this.isDarkMode = ThemeService.getTheme() === 'dark';
    this.loadExpenses();
    this.loadStats();
    this.loadInitialFund();
  }

  toggleDarkMode(): void {
    this.isDarkMode = ThemeService.toggleTheme() === 'dark';
  }

  applyFilters(): void {
    const filters: any = {};
    if (this.searchQuery) filters.search = this.searchQuery;
    if (this.selectedCategory) filters.category = this.selectedCategory;
    if (this.startDate) filters.startDate = this.startDate;
    if (this.endDate) filters.endDate = this.endDate;

    this.expenseService.getAllExpenses(filters).subscribe({
      next: (data) => {
        this.expenses = data;
        this.updateBarChart();
      },
      error: (error) => {
        console.error('Error loading expenses:', error);
      }
    });

    this.expenseService.getTotalExpenses(filters).subscribe({
      next: (data) => {
        this.totalExpenses = data.total;
        this.calculateRemainingBalance();
      }
    });

    this.expenseService.getCategoryStats(filters).subscribe({
      next: (data) => {
        this.categoryStats = data;
        this.updatePieChart();
      }
    });
  }

  applyDateRange(): void {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    switch (this.dateRange) {
      case 'today':
        this.startDate = today.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'week':
        this.startDate = startOfWeek.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'month':
        this.startDate = startOfMonth.toISOString().split('T')[0];
        this.endDate = today.toISOString().split('T')[0];
        break;
      case 'all':
        this.startDate = '';
        this.endDate = '';
        break;
    }
    this.applyFilters();
  }

  exportToCSV(): void {
    exportToCSV(this.expenses, `expenses-${new Date().toISOString().split('T')[0]}.csv`);
  }

  loadExpenses(): void {
    this.expenseService.getAllExpenses().subscribe({
      next: (data) => {
        this.allExpenses = data;
        this.expenses = data;
        this.updateBarChart();
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
        this.calculateRemainingBalance();
      },
      error: (error) => {
        console.error('Error loading total:', error);
      }
    });

    this.expenseService.getCategoryStats().subscribe({
      next: (data) => {
        this.categoryStats = data;
        this.updatePieChart();
        this.updateBarChart();
      },
      error: (error) => {
        console.error('Error loading category stats:', error);
      }
    });
  }

  updatePieChart(): void {
    this.pieChartData = {
      labels: this.categoryStats.map(stat => stat._id),
      datasets: [{
        data: this.categoryStats.map(stat => stat.total),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f56565',
          '#48bb78',
          '#ed8936',
          '#4299e1',
          '#9f7aea'
        ],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    };
  }

  updateBarChart(): void {
    // Group expenses by date
    const expensesByDate = new Map<string, number>();
    
    this.expenses.forEach(expense => {
      const date = new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const currentTotal = expensesByDate.get(date) || 0;
      expensesByDate.set(date, currentTotal + expense.amount);
    });

    // Get last 7 days or all dates if less than 7
    const sortedDates = Array.from(expensesByDate.keys()).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    }).slice(-7);

    this.barChartData = {
      labels: sortedDates,
      datasets: [{
        label: 'Expenses (₹)',
        data: sortedDates.map(date => expensesByDate.get(date) || 0),
        backgroundColor: '#667eea',
        borderColor: '#5568d3',
        borderWidth: 2
      }]
    };
  }

  loadInitialFund(): void {
    this.fundService.getInitialFund().subscribe({
      next: (data) => {
        this.initialFund = data.initialFund;
        this.calculateRemainingBalance();
      },
      error: (error) => {
        console.error('Error loading initial fund:', error);
      }
    });
  }

  calculateRemainingBalance(): void {
    this.remainingBalance = this.initialFund - this.totalExpenses;
  }

  onSetInitialFund(): void {
    this.newInitialFund = this.initialFund;
    this.showFundForm = true;
  }

  onSaveInitialFund(): void {
    if (this.newInitialFund >= 0) {
      this.fundService.updateInitialFund(this.newInitialFund).subscribe({
        next: (data) => {
          this.initialFund = data.initialFund;
          this.calculateRemainingBalance();
          this.showFundForm = false;
        },
        error: (error) => {
          console.error('Error updating initial fund:', error);
          alert('Error updating initial fund. Please try again.');
        }
      });
    }
  }

  onCancelFundForm(): void {
    this.showFundForm = false;
    this.newInitialFund = 0;
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
          this.calculateRemainingBalance();
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
    this.calculateRemainingBalance();
    // Charts will update automatically when data loads
  }

  onFormCancel(): void {
    this.showForm = false;
    this.editingExpense = null;
  }
}


