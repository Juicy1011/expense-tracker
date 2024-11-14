"use client";
import React from 'react';
import { UserButton } from '@clerk/nextjs';

function DashboardHeader({ pageTitle }) {
  return (
    // Main header container with responsive padding and flex layout
    <div className="p-3 md:p-5 shadow-sm border-b bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Flex container for logo and user profile */}
        <div className="flex items-center gap-4">
          {/* Logo or branding section, aligned to the left */}
          <div className="text-xl font-bold flex-grow">
            {pageTitle}
          </div>

          {/* User profile section, aligned to the right */}
          <div className="flex items-center justify-end">
            {/* UserButton component from Clerk */}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
