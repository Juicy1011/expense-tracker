import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/db/dbConfig';
import { Budgets, Expenses } from '@/db/schema';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddExpense({ budgetId, user, refreshData }) { // Destructure budgetId and user from props
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const addNewExpense = async () => {
        try {
            const parsedAmount = parseFloat(amount); // Convert amount to a number

            // Check if parsedAmount is a valid number
            if (isNaN(parsedAmount)) {
                toast.error("Please enter a valid amount.");
                return;
            }

            const result = await db.insert(Expenses).values({
                name: name,
                amount: parsedAmount, // Use the parsed amount
                budgetId: Number(budgetId), // Convert budgetId to a number
                createdBy: moment().format('DD/MM/yyy') // show exact moment
            }).returning({ insertedId: Budgets.id }); // Fetch from Expenses table

            console.log(result);

            if (result) {
              refreshData();
                toast.success("New Expense Added!");
            }
        } catch (error) {
            console.error("Error adding new expense:", error);
            toast.error("Failed to add expense.");
        }
    };

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                    placeholder="e.g. Shopping"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Amount</h2>
                <Input
                    type="number" // Ensures that only number inputs are accepted
                    placeholder="e.g. 1000"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button 
                disabled={!(name && amount)} // Disable button if name or amount is empty
                onClick={addNewExpense} // Corrected function call
                className="mt-3 w-full bg-blue-900 text-white transition-all duration-300 ease-in-out"
            >
                Add New Expense
            </Button>
        </div>
    );
}

export default AddExpense;
