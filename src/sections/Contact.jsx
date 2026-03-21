import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save to localStorage
    const newInquiry = {
      ...formState,
      id: Date.now(),
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString()
    }
    
    const existingInquiries = JSON.parse(localStorage.getItem('shriji_inquiries') || '[]')
    localStorage.setItem('shriji_inquiries', JSON.stringify([newInquiry, ...existingInquiries]))
    
    setIsSent(true)
    setTimeout(() => setIsSent(false), 3000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold tracking-widest uppercase mb-4 block">GET IN TOUCH</span>
            <h2 className="text-4xl md:text-6xl font-black mb-8">CONTACT US</h2>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 glass flex items-center justify-center rounded-2xl text-accent border-accent/20">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">Our Headquarters</h4>
                  <p className="text-white/60 leading-relaxed max-w-[250px]">
                    323 sector 4 Chaitanya phase 2 vrindavan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 glass flex items-center justify-center rounded-2xl text-accent border-accent/20">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">Call Support</h4>
                  <p className="text-white/60">+91 84455 73997</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 glass flex items-center justify-center rounded-2xl text-accent border-accent/20">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 uppercase tracking-wide">Email Us</h4>
                  <p className="text-white/60 text-lg">shrijielevators@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-dark p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 -z-10 blur-3xl" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-accent uppercase tracking-widest mb-2">FullName</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent focus:outline-none transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-accent uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent focus:outline-none transition-colors text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-accent uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  required
                  rows="4"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-accent focus:outline-none transition-colors text-white resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-accent text-primary p-5 rounded-xl font-bold text-lg hover:bg-accent-dark transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {isSent ? "MESSAGE SENT!" : "SEND MESSAGE"}
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
