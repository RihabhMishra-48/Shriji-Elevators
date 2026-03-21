import React from 'react'
import { motion } from 'framer-motion'
import { Bolt, ShieldCheck, PenTool, Settings } from 'lucide-react'

const ServiceCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="glass p-8 rounded-3xl group hover:bg-accent/10 transition-all duration-500 border border-white/5 hover:border-accent/40"
  >
    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon className="text-accent" size={32} />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-white/60 leading-relaxed">
      {description}
    </p>
  </motion.div>
)

const Services = () => {
  const services = [
    {
      icon: Bolt,
      title: "Installation",
      description: "Expert installation of residential and commercial elevators with precision engineering and minimal disruption."
    },
    {
      icon: ShieldCheck,
      title: "Maintenance",
      description: "24/7 proactive maintenance programs to ensure your elevators operate safely and efficiently at all times."
    },
    {
      icon: PenTool,
      title: "Modernization",
      description: "Upgrading legacy systems with modern technology, improved safety features, and premium interior aesthetics."
    },
    {
      icon: Settings,
      title: "Custom Solutions",
      description: "Tailor-made designs for unique architectural requirements, luxury homes, and heavy-duty industrial needs."
    }
  ]

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-widest uppercase mb-4 block">WHAT WE DO</span>
          <h2 className="text-4xl md:text-6xl font-black">PREMIUM SERVICES</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
