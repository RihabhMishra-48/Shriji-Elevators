import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-accent font-bold tracking-widest uppercase mb-4 block">OUR LEGACY</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Leading the Way in <span className="text-accent">Innovative</span> Lift Solutions
          </h2>
          <div className="space-y-6 text-white/70 text-lg">
            <p>
              Founded with a vision to redefine vertical transportation, SHRIJI ELEVATORS has grown into 
              a leader in high-performance elevator technology. We combine safety, efficiency, and 
              premium design to create experiences that transcend the ordinary.
            </p>
            <p>
              Our MISSION is to provide seamless mobility solutions that integrate perfectly into 
              the architecture of modern living.
            </p>
            <p>
              Our VISION is to be the most trusted name in the elevator industry, known for our 
              unwavering commitment to quality and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-sm tracking-widest text-white/50 uppercase">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm tracking-widest text-white/50 uppercase">Projects Done</div>
            </div>
          </div>
        </motion.div>

        {/* Right column empty to make space for 3D elevator layout */}
        <div className="hidden lg:block pointer-events-none" />
      </div>
    </section>
  )
}

export default About
