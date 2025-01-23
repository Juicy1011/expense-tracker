'use client'
import React from 'react'
import { motion, useScroll, useInView } from 'framer-motion'
import Link from 'next/link'

function Footer() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 }) // Changed once to false

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
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
    hidden: { 
      opacity: 0, 
      y: 20 
    },
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
        <div className="lg:flex lg:items-center lg:justify-between">
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

          <motion.ul
            variants={containerVariants}
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12"
          >
            {['About', 'Services', 'Projects', 'Contact'].map((item, index) => (
              <motion.li 
                key={item}
                variants={itemVariants}
                custom={index}
              >
                <Link 
                  href={`/${item.toLowerCase()}`}
                  className="relative text-gray-400 transition-colors duration-300 hover:text-gray-200 group"
                >
                  {item}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={itemVariants} 
          className="mt-16 border-t border-gray-800 pt-8"
        >
          <motion.p 
            variants={itemVariants}
            className="text-center text-sm leading-relaxed text-gray-500 lg:text-right"
          >
            Copyright &copy; {new Date().getFullYear()}. FIC. 
            <br className="sm:hidden" />
            <span className="mt-2 sm:mt-0">All rights reserved.</span>
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer