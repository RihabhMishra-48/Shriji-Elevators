import React from 'react'
import { motion } from 'framer-motion'

const Projects = () => {
  const projects = [
    {
      title: "Royal Regency",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Corporate Tower",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Skyline Suites",
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Grand Plaza",
      category: "Malls",
      image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2070&auto=format&fit=crop"
    }
  ]

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-accent font-bold tracking-widest uppercase mb-4 block">OUR PORTFOLIO</span>
            <h2 className="text-4xl md:text-6xl font-black">RECENT PROJECTS</h2>
          </div>
          <p className="max-w-md text-white/50 text-lg">
            We've completed hundreds of projects across the country, from high-rise 
            commercial towers to luxury private villas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] group overflow-hidden rounded-3xl"
            >
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-accent font-bold tracking-widest text-xs uppercase mb-2">{p.category}</span>
                <h3 className="text-3xl font-bold">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
