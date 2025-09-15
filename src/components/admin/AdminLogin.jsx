import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Lock, User, AlertCircle, Waves, ArrowLeft, Home } from 'lucide-react'

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(credentials.username, credentials.password)
    
    if (!result.success) {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-900 via-ocean-700 to-ocean-500 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-10 animate-pulse">
          <Waves className="h-16 w-16 text-white" />
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-pulse delay-1000">
          <Waves className="h-12 w-12 text-white" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-10 animate-pulse delay-2000">
          <Waves className="h-20 w-20 text-white" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/sailfish-logo.jpg" 
                alt="ASWSC Sailfish Logo" 
                className="h-12 w-12 object-contain object-center"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ASWSC</h1>
              <p className="text-sand-200 text-sm">Atlanta Saltwater</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Admin Access</h2>
          <p className="text-ocean-200 text-sm">Member Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 transition-colors"
                  placeholder="admin@aswsc.org"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/90 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-400 focus:border-ocean-400 transition-colors"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sand-500 hover:bg-sand-600 disabled:bg-sand-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-sm font-medium text-white mb-2">Demo Credentials:</h3>
            <div className="text-xs text-ocean-200 space-y-1">
              <p><strong>Username:</strong> admin@aswsc.org</p>
              <p><strong>Password:</strong> aswsc2024</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-ocean-200 text-sm">
            © 2024 Atlanta Saltwater Sportsman's Club
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
