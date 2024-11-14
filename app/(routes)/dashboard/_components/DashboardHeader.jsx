"use client";
import React from 'react';
import { UserButton } from '@clerk/nextjs';

function DashboardHeader({pageTitle}) {
  return (
    // Main header container with responsive padding and flex layout
    <div className="p-3 md:p-5 shadow-sm border-b bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Flex container for logo and user profile */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo or branding section */}
          <div className="text-xl font-bold">
            {pageTitle}
          </div>

          {/* User profile section */}
          <div className="flex justify-center gap-4">
            {/* UserButton component from Clerk */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
