import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, ArrowLeft, ShieldCheck } from 'lucide-react'

const AdminLogin = ({ onLogin, onBack }) => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userId === 'admin' && password === 'shriji@123') {
      onLogin()
    } else {
      setError('Invalid Credentials. Please try again.')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#050E1F] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="parallax-bg" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-dark p-10 rounded-[2.5rem] border border-accent/20 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-accent/30">
            <Lock className="text-accent" size={36} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Admin <span className="text-accent">Login</span></h2>
          <p className="text-white/40 text-sm mt-2">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-widest mb-2">User ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input 
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-accent focus:outline-none transition-colors text-white"
                placeholder="Enter ID"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-accent focus:outline-none transition-colors text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm font-bold text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            className="w-full bg-accent text-primary p-5 rounded-2xl font-bold text-lg hover:bg-accent-dark transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-accent/20"
          >
            VERIFY & ENTER
          </button>
        </form>

        <button 
          onClick={onBack}
          className="w-full mt-6 text-white/40 text-sm font-bold hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          BACK TO HOME
        </button>
      </motion.div>
    </div>
  )
}

export default AdminLogin
