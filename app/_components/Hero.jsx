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
              className="mt-10 flex flex-col items-center justify-center gap-6"
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

              {/* New Features Section */}
              <motion.div 
                variants={containerVariants}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl"
              >
                {[
                  {
                    icon: "💰",
                    title: "Smart Savings",
                    description: "Smart insights help you save more without changing your lifestyle"
                  },
                  {
                    icon: "📊",
                    title: "Real-time Tracking",
                    description: "Watch your wealth grow with instant updates and visual analytics"
                  },
                  {
                    icon: "🎯",
                    title: "Goal Setting",
                    description: "Achieve your financial dreams with personalized milestone tracking"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative flex flex-col items-center p-6 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-800">
                      <span className="text-3xl mb-3">{feature.icon}</span>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400 text-center">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap justify-center items-center gap-4 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Bank-level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span>50,000+ Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>4.9/5 User Rating</span>
                </div>
              </motion.div>

              {/* Quick Start Message */}
              <motion.p
                variants={itemVariants}
                className="mt-6 text-sm text-gray-400 max-w-md text-center"
              >
                Get started in less than 2 minutes. No credit card required.
                <span className="block mt-1 text-gray-500">
                  Join thousands of users who are already mastering their finances.
                </span>
              </motion.p>
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