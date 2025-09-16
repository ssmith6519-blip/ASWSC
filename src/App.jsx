import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Tournaments from './components/Tournaments'
import Resources from './components/Resources'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'

// Main App Content Component
const AppContent = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [currentView, setCurrentView] = useState('public') // 'public' or 'admin'
  const { user, loading, isAdmin } = useAuth()

  const scrollToSection = (sectionId) => {
    if (sectionId === 'admin') {
      if (isAdmin()) {
        setCurrentView('admin')
      } else {
        setShowAdminLogin(true)
      }
      return
    }
    
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const switchToPublicView = () => {
    setCurrentView('public')
    setActiveSection('home')
  }

  const switchToAdminView = () => {
    if (isAdmin()) {
      setCurrentView('admin')
    }
  }

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ocean-600"></div>
      </div>
    )
  }

  // Show admin dashboard if user is logged in as admin AND admin view is selected
  if (isAdmin() && currentView === 'admin') {
    return <AdminDashboard onSwitchToPublic={switchToPublicView} />
  }

  // Show admin login if requested and user is not admin
  if (showAdminLogin && !isAdmin()) {
    return <AdminLogin />
  }

  // Show main public website
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      
      <main>
        <section id="home">
          <Hero onNavigate={scrollToSection} />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="features">
          <Features />
        </section>
        
        <section id="tournaments">
          <Tournaments />
        </section>
        
        <section id="resources">
          <Resources />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer onNavigate={scrollToSection} />
    </div>
  )
}

// Main App Component with Auth Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
