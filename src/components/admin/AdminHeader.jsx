import React from 'react'
import { LogOut, User, Bell } from 'lucide-react'

const AdminHeader = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
          <span className="text-sm text-gray-500">
            Last login: {new Date(user.loginTime).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="bg-ocean-100 p-2 rounded-full">
                <User className="h-4 w-4 text-ocean-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-gray-500">{user.username}</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
