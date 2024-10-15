"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs';
import { Import } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function Header() {

  const {user, isSignedIn}=useUser();
  return (
    <div className="p-5 flex justify-between items-center shadow-sm bg-gray-900 text-white">
        <img src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900" alt="logo"
       width={160}
       height={100} ></img>

        {isSignedIn?
        <UserButton/> :
        <Link href={'/sign-in'}>
        <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Get Started</Button>
        </Link>
      }
       
    </div>
  )
}

export default Header