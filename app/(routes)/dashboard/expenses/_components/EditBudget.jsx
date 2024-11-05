"use client";
import { Button } from '@/components/ui/button'
import { Icon, icons, PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { db } from '@/db/dbConfig';
import { Budgets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';


function EditBudget({budgetInfo = {  name: '', amount: '' } ,refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon  );
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(budgetInfo?.name);
    const [amount, setAmount] = useState(budgetInfo?.amount);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    const { user } = useUser();
   
    useEffect(()=>{
      if(budgetInfo){
        setEmojiIcon(budgetInfo?.icon)
        setAmount(budgetInfo?.amount)
        setName(budgetInfo?.name)
      }
     
    },[budgetInfo])

    const onUpdateBudget=async()=>{
      const result= await db.update(Budgets).set({
        name:name,
        amount:amount,
        icon:emojiIcon,
      }).where(eq(Budgets.id,budgetInfo.id))
      .returning();

      if(result){
        refreshData();
        toast("Budget Updated !")
      }
    }
  return (
    <div>
        
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <Button className="flex gap-2 bg-blue-400"><PenBox/>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute" style={{ marginTop: '-100px' }}>
                    <EmojiPicker onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }} />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Expenses"
                    defaultValue={budgetInfo.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5,000/="
                    defaultValue={budgetInfo.amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                disabled={!(name && amount)}
                onClick={onUpdateBudget}
                className="mt-5 w-full h-16 bg-blue-900 text-white transition-all duration-300 ease-in-out"
              >
                Update Budget
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget