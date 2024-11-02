import Link from 'next/link';
import React from 'react';

function BudgetItem({ budget }) {
  return (
    <Link
    href={'/dashboard/expenses/' + budget?.id}>
    <div
      className='p-5 border border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg bg-white'
    >
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className='flex gap-2 items-center'>
          <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
          <div>
            <h2 className='font-medium'>{budget?.name}</h2>
            <h2 className='text-sm text-gray-500'>{budget?.totalItem} Item</h2>
          </div>
        </div>
        <h2 className='font-bold text-green-600 text-lg'>${budget?.amount}</h2>
      </div>

      <div className='mt-5'>
        <div className='flex justify-between mb-3 items-center'>
          <h2 className='text-xs text-slate-400'>${budget?.totalSpend ? budget.totalSpend : 0} Spend</h2>
          <h2 className='text-xs text-slate-400'>${budget.amount - budget.totalSpend} Remaining</h2>
        </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'>
          <div className='w-[40%] bg-green-600 h-2 rounded-full'></div>
        </div>
      </div>
      </div>
    </Link>
    
  );
}

export default BudgetItem;