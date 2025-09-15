import React, { useState, useEffect } from 'react'
import { Menu, X, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Header = ({ activeSection, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAdmin, logout } = useAuth()

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'resources', label: 'Resources' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
    ...(isAdmin() ? [] : [{ id: 'admin', label: 'Admin' }]), // Hide admin link if already admin
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <img 
                src="/sailfish-logo.jpg" 
                alt="ASWSC Sailfish Logo" 
                className="h-8 w-8 lg:h-10 lg:w-10 object-contain object-center transition-transform duration-300 group-hover:scale-105"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg lg:text-xl transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-ocean-600`}>
                ASWSC
              </span>
              <span className={`text-xs lg:text-sm transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-gray-200'
              } group-hover:text-ocean-500`}>
                Atlanta Saltwater
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-ocean-500 ${
                  activeSection === item.id
                    ? isScrolled 
                      ? 'text-ocean-600' 
                      : 'text-white'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-ocean-600' 
                      : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300 ${
                    isScrolled ? 'bg-ocean-600' : 'bg-white'
                  }`} />
                )}
              </button>
            ))}
          </nav>

          {/* Admin Controls (Desktop) */}
          {isAdmin() && (
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-ocean-600 hover:bg-gray-100' 
                    : 'text-white hover:text-gray-200 hover:bg-white/10'
                }`}
                title="Admin Dashboard"
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </button>
              <button
                onClick={logout}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-red-600 hover:bg-gray-100' 
                    : 'text-white hover:text-red-200 hover:bg-white/10'
                }`}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:text-ocean-600 hover:bg-gray-100' 
                : 'text-white hover:text-gray-200 hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-ocean-600 bg-ocean-50'
                    : 'text-gray-700 hover:text-ocean-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Admin Controls (Mobile) */}
            {isAdmin() && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="flex items-center space-x-2 w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-ocean-600 hover:bg-gray-50 transition-colors duration-300"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-2 w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
