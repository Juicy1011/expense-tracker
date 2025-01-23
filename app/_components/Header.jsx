"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion';

function Header() {
  const {user, isSignedIn} = useUser();
  
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="fixed w-full z-50 px-6 py-4 flex justify-between items-center bg-transparent backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center gap-2">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900" 
          alt="logo"
          width={140}
          height={80}
          className="brightness-110 contrast-125"
        />
      </Link>

      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-11 h-11 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-200"
              }
            }}
          />
        ) : (
          <Link href="/sign-in">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium 
              hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            >
              Get Started
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default Header