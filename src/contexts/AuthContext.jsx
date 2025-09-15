import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Admin credentials (in a real app, this would be handled by a backend)
  const ADMIN_CREDENTIALS = {
    username: 'admin@aswsc.org',
    password: 'aswsc2024',
    role: 'admin',
    name: 'ASWSC Administrator'
  }

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('aswsc_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('aswsc_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const userData = {
          username: ADMIN_CREDENTIALS.username,
          role: ADMIN_CREDENTIALS.role,
          name: ADMIN_CREDENTIALS.name,
          loginTime: new Date().toISOString()
        }
        
        setUser(userData)
        localStorage.setItem('aswsc_user', JSON.stringify(userData))
        return { success: true, user: userData }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('aswsc_user')
  }

  const isAdmin = () => {
    return user && user.role === 'admin'
  }

  const isTournamentDirector = (tournament) => {
    if (!user || !tournament) return false
    // Check if user is the tournament director
    return tournament.tournamentDirector && 
           user.username === tournament.tournamentDirector.email
  }

  const canManageWeighIn = (tournament) => {
    return isAdmin() || isTournamentDirector(tournament)
  }

  const value = {
    user,
    login,
    logout,
    isAdmin,
    isTournamentDirector,
    canManageWeighIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
