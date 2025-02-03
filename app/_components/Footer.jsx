'use client'
import React, { useState } from 'react'
import { motion, useScroll, useInView } from 'framer-motion'
import Link from 'next/link'

function Footer() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hoveredItem, setHoveredItem] = useState(null)

  const footerLinks = {
    About: [
      { title: 'Developer', description: 'Meet the expert behind FIC', href: 'https://github.com/Juicy1011' },
      { title: 'Values', description: 'Discover what drives us forward', href: '/about#values' }
    ],
    Services: [
      { title: 'Expense Tracking', description: 'Smart tools for monitoring spending', href: '/services#tracking' },
      { title: 'Budget Planning', description: 'Personalized financial planning', href: '/services#planning' },
      { title: 'Investment Tips', description: 'Expert guidance for growth', href: '/services#investment' }
    ],
    Resources: [
      { title: 'Blog', description: 'Latest financial insights and tips', href: '/blog' },
      { title: 'Guides', description: 'Comprehensive financial education', href: '/guides' },
      { title: 'Calculator', description: 'Financial planning tools', href: '/calculator' }
    ],
    Contact: [
      { title: 'Support', description: '24/7 customer assistance', href: '/contact#support' },
      { title: 'Partnerships', description: 'Collaborate with us', href: '/contact#partnerships' },
      { title: 'Careers', description: 'Join our growing team', href: '/contact#careers' }
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.6,
        type: "spring",
        bounce: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6
      }
    }
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        animate={{
          opacity: isInView ? [0.1, 0.3, 0.1] : 0,
          scale: isInView ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
      />

      <motion.div 
        animate={{
          opacity: isInView ? [0.1, 0.3, 0.1] : 0,
          scale: isInView ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"
      />

      <div className="relative mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:justify-between">
          <motion.div 
            variants={itemVariants}
            className="flex justify-center text-teal-600 dark:text-teal-300 sm:justify-start"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900"  // Replace with your actual logo path
              alt="FIC Logo"
              className="h-12 w-auto"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-12 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-4 lg:gap-y-16"
          >
            {Object.entries(footerLinks).map(([category, items]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => setHoveredItem(category)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <h3 className="text-white font-semibold mb-2 cursor-pointer">
                  {category}
                </h3>

                <motion.div
                  initial="hidden"
                  animate={hoveredItem === category ? "visible" : "hidden"}
                  variants={dropdownVariants}
                  className="absolute z-50 bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 w-64 shadow-xl border border-gray-700/50"
                >
                  {items.map((item) => (
                    <Link 
                      key={item.title}
                      href={item.href}
                      className="block py-2 group"
                    >
                      <div className="text-gray-200 font-medium group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants} 
          className="mt-16 border-t border-gray-800 pt-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.p 
              variants={itemVariants}
              className="text-center text-sm text-gray-400 lg:text-left"
            >
              Copyright &copy; {new Date().getFullYear()} FinEd. All rights reserved.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6 lg:justify-end"
            >
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors">
                Privacy Policy
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer