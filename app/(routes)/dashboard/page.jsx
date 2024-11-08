"use client";
import { UserButton, useUser } from '@clerk/nextjs'
import { Import } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/db/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/db/schema';

function page() {
  const [BudgetList, setBudgetList] = useState([]);
  const { user, isLoaded } = useUser();

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
  };

 
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
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='md:col-span-2'>
      Chart.
        </div>
        <div>
        Other Content.
        </div>
      </div>
    </div>
  </div>
  

  
  
  );
}

export default page