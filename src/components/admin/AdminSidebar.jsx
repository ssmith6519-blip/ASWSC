import React from 'react'
import { Home } from 'lucide-react'

const AdminSidebar = ({ navigationItems, activeTab, onNavigate, onSwitchToPublic }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img 
              src="/sailfish-logo.jpg" 
              alt="ASWSC Sailfish Logo" 
              className="h-8 w-8 object-contain object-center"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold">ASWSC Admin</h1>
            <p className="text-xs text-gray-400">Member Management</p>
          </div>
        </div>
      </div>

      {/* Back to Main Site */}
      <div className="px-4 py-4 border-b border-gray-800">
        <button 
          onClick={onSwitchToPublic}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm w-full text-left"
        >
          <Home className="h-4 w-4" />
          <span>← Back to Main Site</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-ocean-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          ASWSC Admin Panel v1.0
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
