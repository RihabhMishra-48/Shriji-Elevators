import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col justify-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center lg:text-left flex flex-col items-center lg:items-start"
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
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 w-full">
          <a
            href="#contact"
            className="w-full sm:w-auto bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-accent-dark transition-all shadow-xl shadow-accent/20 animate-glow"
          >
            GET A QUOTE
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-visualizer'))}
            className="w-full sm:w-auto glass-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-accent hover:text-primary transition-all flex items-center justify-center gap-2 border border-accent/20 group"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse group-hover:bg-primary" />
            VISUALISE WITH AI
          </button>
        </div>
        </motion.div>
      </div>

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
