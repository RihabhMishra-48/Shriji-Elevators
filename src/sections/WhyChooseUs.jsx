import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Heart, Award } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Safety First",
      text: "Rigorous safety checks and compliance with international standards."
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      text: "Advanced motors that consume 30% less power than traditional lifts."
    },
    {
      icon: Award,
      title: "Global Standards",
      text: "Certified quality management and world-class engineering team."
    },
    {
      icon: Heart,
      title: "Care & Support",
      text: "Dedicated 24/7 customer support and rapid response times."
    }
  ]

  return (
    <section id="why-choose-us" className="py-24 px-6 md:px-12 bg-primary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold tracking-widest uppercase mb-4 block">WHY CHOOSE US</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              ELEVATING THE <span className="text-accent">STANDARDS</span> OF MOBILITY
            </h2>
            <p className="text-white/60 text-lg mb-12">
              At SHRIJI ELEVATORS, we don't just build lifts; we build trust. Our systems are 
              engineered for longevity, performance, and unparalleled comfort.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <f.icon className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{f.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Blueprint image removed to keep the right side clear for the 3D elevator */}
          <div className="hidden lg:block pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
