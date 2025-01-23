'use client'
import { SignIn } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section */}
        <section className="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Animated gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"
          />

          {/* Background image with parallax effect */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            alt="Financial Dashboard"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* Content overlay */}
          <div className="relative hidden lg:block lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Logo */}
              <a className="block text-white" href="/">
                <span className="sr-only">Home</span>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900" // Replace with your actual logo
                  alt="FIC Logo"
                  className="h-12 w-auto"
                />
              </a>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-12"
              >
                <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    FIC
                  </span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-black">
                  Take control of your financial future with our comprehensive expense tracking and budgeting tools.
                </p>
              </motion.div>

              {/* Feature List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-8 space-y-2"
              >
                {['Smart Expense Tracking', 'Intelligent Budgeting', 'Real-time Insights'].map((feature, index) => (
                  <div key={feature} className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Right Section - Sign In Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl lg:max-w-3xl"
          >
            {/* Custom wrapper for Clerk's SignIn component */}
            <div className="rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'text-white',
                    headerSubtitle: 'text-gray-400',
                    socialButtonsBlockButton: 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-white',
                    formFieldInput: 'bg-gray-800/50 border-gray-700 text-white',
                    formFieldLabel: 'text-gray-300',
                    footer: 'text-gray-400'
                  }
                }}
                afterSignInUrl="/dashboard" 
              />
            </div>
          </motion.div>
        </main>
      </div>
    </section>
  )
}
