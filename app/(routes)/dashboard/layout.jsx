"use client";
import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/db/dbConfig';
import { Budgets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

function DashboardLayout({ children }) {
  const { user, isSignedIn } = useUser();
  
  const [isLoading, setIsLoading] = useState(true); // Adding a loading state

  useEffect(() => {
    if (isSignedIn && user) {
      checkUserBudgets();
    }
  }, [user, isSignedIn]);

  const checkUserBudgets = async () => {
    try {
      const result = await db
        .select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)); // Adjust field as necessary

      console.log(result);
      if (result?.length === 0) {
        router.replace('/dashboard/budgets');
      }
    } catch (error) {
      console.error("Error fetching user budgets:", error);
    } finally {
      setIsLoading(false); // Stop loading after checking
    }
  };
  //if (isLoading) {
   // return <div>Loading...</div>; // Loading state while checking user budgets
  //}

  return (
    <div className="flex">
      <div className="fixed md:w-64 hidden md:block bg-WhiteSmoke">
        <SideNav />
      </div>
      <div className="flex-1 ml-0 md:ml-64 bg-WhiteSmoke">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
