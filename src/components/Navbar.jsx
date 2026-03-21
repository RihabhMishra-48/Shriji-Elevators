import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ]

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${isScrolled ? 'py-4 glass-dark' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          onClick={(e) => scrollToSection(e, 'home')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter cursor-pointer"
        >
          <span className="text-white">SHRIJI</span>
          <span className="text-accent ml-2">ELEVATORS</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:+911234567890" 
            className="flex items-center gap-2 bg-accent text-primary px-5 py-2 rounded-full font-bold hover:bg-accent-dark transition-all animate-glow"
          >
            <Phone size={18} />
            CALL NOW
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-dark py-6 flex flex-col items-center space-y-4 md:hidden border-t border-accent/20"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.id}`}
                className="text-lg font-medium hover:text-accent transition-colors"
                onClick={(e) => scrollToSection(e, link.id)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:+911234567890" 
              className="bg-accent text-primary px-8 py-3 rounded-full font-bold w-[200px] text-center"
            >
              CALL NOW
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
