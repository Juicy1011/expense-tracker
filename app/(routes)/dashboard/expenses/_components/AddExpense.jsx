import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/db/dbConfig';
import { Budgets, Expenses } from '@/db/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [budgetInfo, setBudgetInfo] = useState({ total: 0, used: 0 });

    // Fetch budget information and current total expenses
    useEffect(() => {
        const fetchBudgetInfo = async () => {
            try {
                // Get budget amount
                const budget = await db.query.Budgets.findFirst({
                    where: (budgets, { eq }) => eq(budgets.id, Number(budgetId))
                });

                // Get sum of all expenses for this budget
                const expenses = await db.query.Expenses.findMany({
                    where: (expenses, { eq }) => eq(expenses.budgetId, Number(budgetId))
                });

                const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
                const totalBudget = Number(budget?.amount) || 0;

                setBudgetInfo({
                    total: totalBudget,
                    used: totalExpenses
                });
            } catch (error) {
                console.error("Error fetching budget info:", error);
                toast.error("Failed to load budget information");
            }
        };

        fetchBudgetInfo();
    }, [budgetId]);

    const formatCurrency = (value) => {
        const numberValue = Number(value);
        return isNaN(numberValue) ? '0.00' : numberValue.toFixed(2);
    };

    const addNewExpense = async () => {
        try {
            setLoading(true);
            const parsedAmount = parseFloat(amount);

            // Validate amount is a number
            if (isNaN(parsedAmount)) {
                toast.error("Please enter a valid amount.");
                setLoading(false);
                return;
            }

            // Check if new expense would exceed budget
            const remainingBudget = budgetInfo.total - budgetInfo.used;
            if (parsedAmount > remainingBudget) {
                toast.error(`This expense exceeds your remaining budget of $${formatCurrency(remainingBudget)}`);
                setLoading(false);
                return;
            }

            const result = await db.insert(Expenses).values({
                name: name,
                amount: parsedAmount,
                budgetId: Number(budgetId),
                createdBy: moment().format('DD/MM/YYYY')
            }).returning({ insertedId: Budgets.id });

            setAmount('');
            setName('');

            if (result) {
                refreshData();
                toast.success("New Expense Added!");
            }
        } catch (error) {
            console.error("Error adding new expense:", error);
            toast.error("Failed to add expense.");
        } finally {
            setLoading(false);
        }
    };

    // Calculate remaining budget
    const remainingBudget = Number(budgetInfo.total) - Number(budgetInfo.used);

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            
            {/* Budget Status */}
            <div className="mt-2 mb-4 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Total Budget:</span>
                    <span>${formatCurrency(budgetInfo.total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Remaining:</span>
                    <span className={remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}>
                        ${formatCurrency(remainingBudget)}
                    </span>
                </div>
            </div>

            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Shopping"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    type="number"
                    placeholder="e.g. 1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={remainingBudget}
                />
            </div>
            <Button
                disabled={!(name && amount) || loading || parseFloat(amount) > remainingBudget}
                onClick={addNewExpense}
                className="mt-3 w-full bg-blue-900 text-white transition-all duration-300 ease-in-out"
            >
                {loading ? 
                    <Loader className="animate-spin" /> : 
                    "Add New Expense"
                }
            </Button>
        </div>
    );
}

export default AddExpense;