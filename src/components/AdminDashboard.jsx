import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, ArrowLeft, Mail, User, MessageSquare, Clock } from 'lucide-react'

const AdminDashboard = ({ onBack }) => {
  const [inquiries, setInquiries] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shriji_inquiries') || '[]')
    setInquiries(data)
  }, [])

  const deleteInquiry = (id) => {
    const updated = inquiries.filter(item => item.id !== id)
    setInquiries(updated)
    localStorage.setItem('shriji_inquiries', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-[#050E1F] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-accent uppercase tracking-tighter">Admin Dashboard</h1>
            <p className="text-white/50">Manage your vertical transportation inquiries</p>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 glass px-6 py-3 rounded-xl hover:bg-white/10 transition-all font-bold"
          >
            <ArrowLeft size={20} />
            BACK TO SITE
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div className="glass p-20 rounded-[2rem] text-center">
            <MessageSquare size={48} className="mx-auto text-accent/20 mb-4" />
            <h3 className="text-xl font-bold text-white/40">No inquiries yet.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inquiry) => (
              <motion.div 
                key={inquiry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark p-8 rounded-3xl border border-accent/10 flex flex-col md:flex-row justify-between gap-8"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-accent font-bold">
                      <User size={18} />
                      {inquiry.name}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Mail size={16} />
                      {inquiry.email}
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Clock size={14} />
                      {new Date(inquiry.id).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl italic">
                    "{inquiry.message}"
                  </p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all group"
                  >
                    <Trash2 size={24} className="group-active:scale-90" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
