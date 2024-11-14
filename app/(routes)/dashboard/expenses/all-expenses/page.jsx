"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/db/dbConfig';
import { Expenses } from '@/db/schema';
import ExpenseListTable from '../_components/ExpenseListTable';


function AllExpenses() {
  const [expensesList, setExpensesList] = useState([]);

  // Function to fetch expenses data from the database
  const fetchExpenses = async () => {
    try {
      const result = await db.select().from(Expenses);
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch expenses on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Expenses</h1>
      {/* Pass the expensesList and refreshData function to ExpenseListTable */}
      <ExpenseListTable expensesList={expensesList} refreshData={fetchExpenses} />
    </div>
  );
}

export default AllExpenses;
