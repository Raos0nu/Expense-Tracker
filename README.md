# Expense Tracker - MEAN Stack Application

A full-stack expense tracking application built with MongoDB, Express.js, Angular, and Node.js (MEAN stack).

## Features

- ✨ Add, edit, and delete expenses
- 📊 View total expenses and transaction counts
- 🏷️ Categorize expenses (Food, Transportation, Entertainment, Bills, Shopping, Health, Other)
- 📈 Category-wise expense statistics
- 🎨 Modern and responsive UI
- 💾 MongoDB database for data persistence

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **Angular** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming library

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [Angular CLI](https://angular.io/cli) (v16 or higher)

## Installation

### 1. Clone the repository or navigate to the project directory

```bash
cd "D:\Projects\Expenses tracker"
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 4. Configure Environment Variables

The `.env` file is already created with default values:
- `PORT=3000` - Backend server port
- `MONGODB_URI=mongodb://localhost:27017/expense-tracker` - MongoDB connection string

You can modify these values if needed.

### 5. Start MongoDB

Make sure MongoDB is running on your system. If you have MongoDB installed locally, start it with:

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend Server:**
```bash
npm run dev
```
The backend will run on `http://localhost:3000`

**Terminal 2 - Start Angular Frontend:**
```bash
cd client
npm start
```
The frontend will run on `http://localhost:4200`

### Option 2: Run Backend Only (for development)

```bash
npm start
```

Then manually start the Angular app:
```bash
cd client
ng serve
```

## API Endpoints

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get single expense |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/expenses/stats/total` | Get total expenses |
| GET | `/api/expenses/stats/category` | Get expenses by category |

### Example Request Body (POST/PUT)

```json
{
  "title": "Grocery Shopping",
  "amount": 75.50,
  "category": "Food",
  "date": "2024-10-22",
  "description": "Weekly groceries from supermarket"
}
```

## Project Structure

```
expense-tracker/
├── client/                    # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Angular components
│   │   │   │   ├── dashboard/
│   │   │   │   ├── expense-form/
│   │   │   │   └── expense-list/
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── services/     # Angular services
│   │   │   ├── app.component.*
│   │   │   ├── app.module.ts
│   │   │   └── app-routing.module.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── config/                    # Backend configuration
│   └── database.js           # MongoDB connection
├── models/                    # Mongoose models
│   └── Expense.js
├── routes/                    # Express routes
│   └── expenses.js
├── .gitignore
├── package.json
├── README.md
└── server.js                 # Express server entry point
```

## Usage Guide

### Adding an Expense

1. Click the "Add New Expense" button
2. Fill in the expense details:
   - Title (required)
   - Amount (required)
   - Category (required)
   - Date (required)
   - Description (optional)
3. Click "Add Expense"

### Editing an Expense

1. Find the expense in the list
2. Click the "Edit" button
3. Modify the details
4. Click "Update Expense"

### Deleting an Expense

1. Find the expense in the list
2. Click the "Delete" button
3. Confirm the deletion

### Viewing Statistics

- **Total Expenses**: Displayed at the top showing the sum of all expenses
- **Total Transactions**: Shows the number of expense entries
- **Category Breakdown**: View expenses grouped by category with totals

## Customization

### Adding New Categories

Edit the category array in:
1. **Backend**: `models/Expense.js` - Update the `enum` array
2. **Frontend**: `client/src/app/components/expense-form/expense-form.component.ts` - Update the `categories` array

### Changing Colors

Modify the color scheme in:
- `client/src/styles.css` - Global styles
- Component-specific CSS files for individual components

### Changing API Port

Update the `PORT` in `.env` file and the API URL in:
`client/src/app/services/expense.service.ts`

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- Verify MongoDB is accessible on the specified port

### Port Already in Use

- Change the `PORT` in `.env` file
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
  - macOS/Linux: `lsof -ti:3000 | xargs kill -9`

### Angular CLI Not Found

Install Angular CLI globally:
```bash
npm install -g @angular/cli
```

## Future Enhancements

- 📱 User authentication and authorization
- 📊 Advanced charts and visualizations
- 📅 Date range filtering
- 💱 Multi-currency support
- 📤 Export to CSV/PDF
- 🔍 Search and filter functionality
- 📱 Mobile-responsive improvements

## License

ISC

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## Support

For issues and questions, please create an issue in the repository.

