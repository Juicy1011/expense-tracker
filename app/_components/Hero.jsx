'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  }

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900 to-black"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Glow Effects */}
      <div className="absolute left-[50%] top-0 -z-10 -translate-x-[50%] transform">
        <motion.div
          animate={{
            opacity: [0.4, 0.5, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="h-[310px] w-[620px] bg-indigo-500/30 blur-[100px]"
        />
      </div>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-2xl text-center"
          >
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -left-4 top-0 h-72 w-72 bg-purple-900/30 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -right-4 top-0 h-72 w-72 bg-blue-900/30 blur-[120px] rounded-full"
            />

            <motion.div
              variants={itemVariants}
              className="relative z-10"
            >
              <span className="mb-8 inline-flex animate-background-shine cursor-default items-center justify-center rounded-lg border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 py-1 text-sm font-medium text-gray-400 transition-colors">
                <span className="mr-2">✨</span> Smart Money Management
              </span>

              <h1 className="mt-8 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                Master Your Finances with Intelligent Tracking
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Take control of your financial future with our comprehensive expense tracking and budgeting tools. Start your journey to financial freedom today.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants} 
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <a
                href="/sign-in"
                className="group relative rounded-full px-6 py-3 text-sm font-semibold text-white leading-6"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90 transition-opacity group-hover:opacity-100"></span>
                <span className="relative flex items-center gap-2">
                  Get started free 
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </span>
              </a>

            
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8"
            >
              {[
                { label: "Active Users", value: "50K+" },
                { label: "Money Tracked", value: "$2M+" },
                { label: "Success Rate", value: "99%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-y-3 rounded-3xl bg-gray-900/50 px-6 py-8 text-center ring-1 ring-gray-800"
                >
                  <dt className="text-sm leading-6 text-gray-400">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Hero