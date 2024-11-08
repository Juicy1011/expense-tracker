import { PiggyBank, ReceiptText, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CardInfo({ BudgetList = [] }) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    const [numBudgets, setNumBudgets] = useState(0);
    const [loading, setLoading] = useState(true);  // New loading state

    useEffect(() => {
       if (BudgetList && BudgetList.length > 0) {
           CalculateCardInfo();
       }
    }, [BudgetList]);

    const CalculateCardInfo = () => {
        setLoading(true);  // Start loading
        let totalBudget_ = 0;
        let totalSpend_ = 0;

        BudgetList.forEach(element => {
            totalBudget_ += Number(element.amount) || 0;
            totalSpend_ += Number(element.totalSpend || 0);
        });

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
        setNumBudgets(BudgetList.length);
        setLoading(false);  // Finish loading
    };

    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {loading ? (
                // Render skeletons while loading
                <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </>
            ) : (
                // Render actual data when not loading
                <>
                    <div className='p-7 border rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Budget</h2>
                            <h2 className='font-bold text-2xl'>${totalBudget.toLocaleString()}</h2>
                        </div>
                        <PiggyBank className='bg-blue-800 text-white p-3 h-12 w-12 rounded-full' />
                    </div>

                    <div className='p-7 border rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Total Spend</h2>
                            <h2 className='font-bold text-2xl'>${totalSpend.toLocaleString()}</h2>
                        </div>
                        <ReceiptText className='bg-blue-800 text-white p-3 h-12 w-12 rounded-full' />
                    </div>

                    <div className='p-7 border rounded-lg flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm'>Number of Budgets</h2>
                            <h2 className='font-bold text-2xl'>{numBudgets}</h2>
                        </div>
                        <Wallet className='bg-blue-800 text-white p-3 h-12 w-12 rounded-full' />
                    </div>
                </>
            )}
        </div>
    );
}

// Skeleton component
function SkeletonCard() {
    return (
        <div className='p-7 border rounded-lg flex items-center justify-between animate-pulse'>
            <div>
                <div className='h-5 bg-gray-300 rounded w-24 mb-2'></div>
                <div className='h-8 bg-gray-300 rounded w-32'></div>
            </div>
            <div className='bg-gray-300 h-12 w-12 rounded-full'></div>
        </div>
    );
}

export default CardInfo;
