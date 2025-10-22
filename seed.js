const mongoose = require('mongoose');
require('dotenv').config();
const Expense = require('./models/Expense');

// Sample expenses data
const sampleExpenses = [
  {
    title: "Grocery Shopping",
    amount: 125.50,
    category: "Food",
    date: new Date('2024-10-20'),
    description: "Weekly groceries from supermarket"
  },
  {
    title: "Gas Station",
    amount: 45.00,
    category: "Transportation",
    date: new Date('2024-10-19'),
    description: "Fuel for the car"
  },
  {
    title: "Movie Tickets",
    amount: 30.00,
    category: "Entertainment",
    date: new Date('2024-10-18'),
    description: "Movie night with friends"
  },
  {
    title: "Electricity Bill",
    amount: 89.50,
    category: "Bills",
    date: new Date('2024-10-15'),
    description: "Monthly electricity bill"
  },
  {
    title: "New Shoes",
    amount: 75.00,
    category: "Shopping",
    date: new Date('2024-10-14'),
    description: "Running shoes"
  },
  {
    title: "Doctor Visit",
    amount: 150.00,
    category: "Health",
    date: new Date('2024-10-12'),
    description: "Regular checkup"
  },
  {
    title: "Coffee Shop",
    amount: 12.50,
    category: "Food",
    date: new Date('2024-10-22'),
    description: "Morning coffee and pastry"
  },
  {
    title: "Uber Ride",
    amount: 18.00,
    category: "Transportation",
    date: new Date('2024-10-21'),
    description: "Ride to downtown"
  },
  {
    title: "Internet Bill",
    amount: 65.00,
    category: "Bills",
    date: new Date('2024-10-10'),
    description: "Monthly internet subscription"
  },
  {
    title: "Restaurant Dinner",
    amount: 85.00,
    category: "Food",
    date: new Date('2024-10-17'),
    description: "Dinner at Italian restaurant"
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing expenses
    await Expense.deleteMany({});
    console.log('Cleared existing expenses');

    // Insert sample expenses
    await Expense.insertMany(sampleExpenses);
    console.log(`✅ Successfully seeded ${sampleExpenses.length} sample expenses!`);

    // Display summary
    const total = sampleExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`\nTotal expenses: $${total.toFixed(2)}`);
    console.log('\nSample data has been added to your database.');
    console.log('You can now start the application and see the data!');

    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();


