import { db } from '@/db/dbConfig'
import { Expenses } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { index } from 'drizzle-orm/mysql-core'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expensesList,refreshData}) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast.success("Expense Deleted!");
       refreshData(); // Call the function to refresh the expenses list after deletion
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };
  return (
    <div className='mt-3  rounded-lg shadow-md overflow-hidden'>
       <h2 className='font-bold text-lg mt-3'>Latest Expenses</h2>
        <div className='grid grid-cols-4 bg-slate-200 p-4'>
        <h2 className='font-semibold'>Name</h2>
        <h2 className='font-semibold'>Amount</h2>
        <h2 className='font-semibold'>Created at</h2>
        <h2 className='font-semibold'>Action</h2>
        </div>

        {expensesList.length > 0 ? (
    expensesList.map((expense, index) => (
      <div
        key={index}
        className='grid grid-cols-4 bg-white text-gray-800 p-4 border-b transition duration-300 ease-in-out hover:bg-gray-100'
      >
        <h2 className='truncate'>{expense.name}</h2>
        <h2 className='font-medium'>${expense.amount}</h2>
        <h2>{expense.createdBy}</h2>
        <h2 className='flex justify-center items-center'>
          <Trash className='text-red-600 cursor-pointer hover:text-red-800 transition duration-200'
          onClick={()=>deleteExpense(expense)}
          />
        </h2>
      </div>
    ))
  ) : (
    <div className='p-4 text-center text-gray-600'>No expenses found.</div>
  )}
            </div> 
          
        )}
    
  


export default ExpenseListTable