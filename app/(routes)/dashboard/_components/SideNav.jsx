"use client";
import { useEffect } from 'react';
import { UserButton } from '@clerk/nextjs';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideNav() {
  const path = usePathname(); // Get the current pathname

  useEffect(() => {
    console.log(path); // Log the current path whenever it changes
  }, [path]); // Add path to the dependency array

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budget'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ];

  return (
    <div className='h-screen p-5 border shadow-sm'>
      <img
        src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900"
        alt="logo"
        width={160}
        height={100}
      />

      <div className='mt-5'>
        {menuList.map((menu) => (
          <h2 key={menu.id} className='flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-Blue2'>
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>

      <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
        <UserButton />
        Profile.
      </div>
    </div>
  );
}

export default SideNav;
