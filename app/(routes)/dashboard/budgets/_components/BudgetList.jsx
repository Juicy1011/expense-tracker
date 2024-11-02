"use client";
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/db/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/db/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

function BudgetList() {
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
    <div className="mt-7">
      <div className="flex flex-wrap gap-8 bg-white p-5 rounded-md shadow-lg">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <CreateBudget refreshData={() => getBudgetList()} />
        </div>

        {BudgetList?.length > 0 ? (
          BudgetList.map((budget, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3">
              <BudgetItem budget={budget} />
            </div>
          ))
        ) : (
          // Placeholder loading skeletons
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 bg-slate-200 rounded-lg h-[150px] animate-pulse"
            ></div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;
