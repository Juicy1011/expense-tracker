"use client";

{/*THIS IS THE DASHBOARD PAGE*/}


import { UserButton, useUser } from '@clerk/nextjs'
import { Import } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/db/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/db/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import { index } from 'drizzle-orm/mysql-core';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function page() {
  const [BudgetList, setBudgetList] = useState([]);
  const { user, isLoaded } = useUser();
  const [expensesList, setExpensesList]=useState([]);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getBudgetList();
    }
  }, [user, isLoaded]);

  // Fetch budgets and expenses data
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))
      ;

    setBudgetList(result);
    getAllExpenses();
  };

  {/*use to get all expenses on dashboard*/}
 const getAllExpenses=async()=>{
  const result= await db.select({
    id:Expenses.id,
    name:Expenses.name,
    amount:Expenses.amount,
    createdBy:Expenses.createdBy
  }).from(Budgets)
  .rightJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
  .where(eq(Budgets.createdBy , user?.primaryEmailAddress.emailAddress))
  .orderBy(desc(Expenses.id))
  setExpensesList(result);
  console.log(result);
 }

  return (
    <div className="space-y-5"> {/* Wrapper div */}
    <div className="p-6 bg-white text-black rounded-lg shadow-md">
      <h2 className="font-extrabold text-4xl flex items-center gap-3">
        <span>👋</span>
        Hi, {user?.fullName}!
      </h2>
      <p className="mt-2 text-lg">
        Welcome back! Let’s get things done today.
      </p>
    </div>

    {/* CardInfo Component with distinct styling */}
    <div className="mt-5 p-4 bg-gray-100 text-gray-800 rounded-md shadow-sm">
      <CardInfo BudgetList={BudgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          {/*This is the bar chart info */}
      <BarChartDashboard
      BudgetList={BudgetList}
      />
           <ExpenseListTable 
    expensesList={expensesList}
    refreshData={()=>getBudgetList()}
    />
  

        </div>
        <div className="grid gap-5">
        <h2 className='font-bold text-lg'>Latest Budgets</h2>
        {BudgetList.map((budget ,index)=>(
          <BudgetItem budget={budget} key={index} />

          
        )
        )}
       
        </div>
      </div>
    </div>
  </div>
  

  
  
  );
}

export default page