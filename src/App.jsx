import React, { Suspense, useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import WhyChooseUs from './sections/WhyChooseUs'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ElevatorCanvas from './components/ElevatorCanvas'
import WhatsAppButton from './components/WhatsAppButton'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'

function App() {
  const checkIsAdmin = () => window.location.hash === '#admin' || window.location.pathname === '/admin'
  const [isAdmin, setIsAdmin] = useState(checkIsAdmin())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    const handleNavigation = () => {
      setIsAdmin(checkIsAdmin())
    }
    window.addEventListener('hashchange', handleNavigation)
    window.addEventListener('popstate', handleNavigation)
    return () => {
      window.removeEventListener('hashchange', handleNavigation)
      window.removeEventListener('popstate', handleNavigation)
    }
  }, [])

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050E1F] flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-bold text-accent mb-4 tracking-tighter"
          >
            SHRIJI ELEVATORS
          </motion.div>
          <div className="w-48 h-1 bg-primary rounded-full overflow-hidden mx-auto">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    )
  }

  if (isAdmin) {
    if (!isAuthenticated) {
      return (
        <AdminLogin 
          onLogin={() => setIsAuthenticated(true)} 
          onBack={() => { 
            window.location.hash = ''; 
            if (window.location.pathname === '/admin') window.history.pushState({}, '', '/');
            setIsAdmin(false); 
          }} 
        />
      )
    }
    console.log("Rendering Admin Dashboard")
    return (
      <AdminDashboard 
        onBack={() => { 
          window.location.hash = ''; 
          if (window.location.pathname === '/admin') window.history.pushState({}, '', '/');
          setIsAdmin(false); 
          setIsAuthenticated(false); 
        }} 
      />
    )
  }

  console.log("Rendering Main Site")
  return (
    <div className="relative bg-[#050E1F] text-white overflow-hidden">
      <div className="parallax-bg" />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />
      
      {/* 3D Canvas Background (Sticky) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <ElevatorCanvas scrollY={scrollYProgress} />
        </Suspense>
      </div>

      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyChooseUs />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
