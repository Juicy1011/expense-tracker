"use client";
import { db } from '@/db/dbConfig';
import { Budgets, Expenses } from '@/db/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';

function ExpensesScreen() {
  const { user } = useUser();
  const { id } = useParams(); // Extracts ID directly from URL
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList]=useState([]);

  useEffect(() => {
    if (user && id) { // Ensure both user and id are available
      console.log('User:', user);
      console.log('ID:', id); // Log to confirm the ID is retrieved
      getBudgetInfo();
      getExpensesList();
    }
  }, [user, id]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id)) // Use extracted ID here
      .groupBy(Budgets.id);

    console.log('Fetched Budget Info:', result); // Log the fetched budget info
    setBudgetInfo(result[0]); // Assuming result is an array
    getExpensesList();
  };



//create latest expenses
  const getExpensesList=async ()=>{
    const result= await db.select().from(Expenses)
    .where(eq(Expenses.budgetId, id))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  }


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>
        )}
        <AddExpense budgetId={id} 
        user={user}
        refreshData={()=>
          getBudgetInfo()
        
        }
        />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList}
        refreshData={()=>getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
