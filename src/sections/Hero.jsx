import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className="text-accent font-bold tracking-[0.2em] mb-4 uppercase text-sm md:text-base">
          ELEVATING YOUR EXPERIENCE
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tighter">
          SHRIJI <br className="md:hidden" />
          <span className="text-accent underline underline-offset-8 decoration-accent/30">ELEVATORS</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-12 font-medium">
          Modern, reliable, and premium vertical transportation solutions for 
          tomorrow's architecture. Safe. Smooth. Superior.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-accent-dark transition-all shadow-xl shadow-accent/20 animate-glow"
          >
            GET A QUOTE
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto glass px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
          >
            OUR LEGACY
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-accent font-bold">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-accent" size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
