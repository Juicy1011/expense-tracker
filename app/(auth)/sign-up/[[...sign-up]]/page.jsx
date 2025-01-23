'use client'
import { SignUp } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Section - Image and Content */}
        <section className="relative flex h-32 items-end lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
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
            alt="Financial Growth"
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          {/* Content overlay */}
          <div className="relative hidden lg:block lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="backdrop-blur-sm bg-black/30 rounded-2xl p-8"
            >
              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-white">
                  Start Your Financial Journey Today
                </h2>
                <p className="mt-4 text-gray-300">
                  Join thousands of users who are already managing their finances smarter.
                </p>

                {/* Benefits List */}
                <div className="mt-8 space-y-4">
                  {[
                    { title: 'Smart Analytics', desc: 'Track your spending patterns' },
                    { title: 'Budget Planning', desc: 'Set and achieve financial goals' },
                    { title: 'Real-time Insights', desc: 'Make informed decisions' }
                  ].map((benefit) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                      className="flex items-start gap-3 text-white"
                    >
                      <svg
                        className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-white">{benefit.title}</h3>
                        <p className="text-sm text-gray-300">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Right Section - Sign Up Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl lg:max-w-3xl w-full"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <a href="/" className="flex items-center">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900"
                  alt="FIC Logo"
                  className="h-12 w-auto"
                />
              </a>
            </motion.div>

            {/* Sign Up Form */}
            <div className="rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'text-white text-2xl',
                    headerSubtitle: 'text-gray-400',
                    socialButtonsBlockButton: 'border-gray-700 bg-gray-800 hover:bg-gray-700 text-white',
                    formFieldInput: 'bg-gray-800/50 border-gray-700 text-white',
                    formFieldLabel: 'text-gray-300',
                    footer: 'text-gray-400',
                    formFieldInputShowPasswordButton: 'text-gray-400',
                    dividerLine: 'bg-gray-800',
                    dividerText: 'text-gray-500',
                    formFieldSuccessText: 'text-green-400',
                    formFieldErrorText: 'text-red-400',
                  }
                }}
                afterSignUpUrl="/dashboard"
              />
            </div>
          </motion.div>
        </main>
      </div>
    </section>
  )
}