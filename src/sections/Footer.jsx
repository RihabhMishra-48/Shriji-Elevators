import React from 'react'

const Footer = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-primary/95 text-white py-20 px-6 md:px-12 border-t border-accent/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="col-span-1 lg:col-span-1">
          <div className="text-3xl font-black mb-6 tracking-tighter cursor-pointer" onClick={(e) => scrollToSection(e, 'home')}>
            SHRIJI <span className="text-accent">ELEVATORS</span>
          </div>
          <p className="text-white/50 leading-relaxed mb-8">
            Providing premium vertical transportation solutions with a focus on safety, 
            innovation, and luxury design. Elevating your experience, one floor at a time.
          </p>
          <div className="flex gap-4">
            {['Fb', 'Ig', 'Ln', 'Tw'].map(social => (
              <a key={social} href="#" className="w-10 h-10 glass flex items-center justify-center rounded-lg hover:text-accent transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-accent">Quick Links</h4>
          <ul className="space-y-4 text-white/60">
            <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-accent transition-colors">Home</a></li>
            <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-accent transition-colors">About Us</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-accent transition-colors">Our Services</a></li>
            <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-accent transition-colors">Portfolio</a></li>
            <li><a href="#admin" className="hover:text-accent transition-colors">Admin Portal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-accent">Services</h4>
          <ul className="space-y-4 text-white/60 focus-within:outline-none">
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-accent transition-colors block py-1">Residential Lifts</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-accent transition-colors block py-1">Commercial Elevators</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-accent transition-colors block py-1">Modernization</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-accent transition-colors block py-1">Maintenance</a></li>
            <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-accent transition-colors block py-1">Custom Designs</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} SHRIJI ELEVATORS. All Rights Reserved. Engineered by Premium Devs.</p>
      </div>
    </footer>
  )
}

export default Footer
