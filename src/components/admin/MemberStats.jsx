import React, { useState } from 'react'
import { useMembers } from '../../hooks/useMembers'
import { useEmailConfig } from '../../hooks/useEmailConfig'
import { Users, UserCheck, UserX, Crown, Anchor, Heart, Baby, Mail, AlertCircle, CheckCircle } from 'lucide-react'

const MemberStats = ({ onCardClick, onNavigate }) => {
  const { members, getStatistics } = useMembers()
  const { sendRenewalReminders, getConfigStatus } = useEmailConfig()
  const [message, setMessage] = useState(null)
  const [sendingReminders, setSendingReminders] = useState(false)
  
  const stats = getStatistics()
  const configStatus = getConfigStatus()

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  const statCards = [
    {
      title: 'Total Members',
      value: stats.total,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      filterType: 'all',
      filterValue: null
    },
    {
      title: 'Current Members',
      value: stats.current,
      icon: UserCheck,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      filterType: 'status',
      filterValue: 'Current'
    },
    {
      title: 'Expired Members',
      value: stats.expired,
      icon: UserX,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      filterType: 'status',
      filterValue: 'Expired'
    },
    {
      title: 'Lifetime Members',
      value: stats.lifetime,
      icon: Crown,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      filterType: 'status',
      filterValue: 'Lifetime'
    },
    {
      title: 'Members with Boats',
      value: stats.withBoats,
      icon: Anchor,
      color: 'bg-ocean-500',
      bgColor: 'bg-ocean-50',
      textColor: 'text-ocean-700',
      filterType: 'hasBoat',
      filterValue: true
    },
    {
      title: 'Members with Spouse',
      value: stats.withSpouse,
      icon: Heart,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      filterType: 'hasSpouse',
      filterValue: true
    },
    {
      title: 'Members with Children',
      value: stats.withChildren,
      icon: Baby,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      filterType: 'hasChildren',
      filterValue: true
    }
  ]

  const getPercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0
  }

  // Handle quick actions
  const handleAddMember = () => {
    if (onNavigate) onNavigate('add-member')
  }

  const handleViewMembers = () => {
    if (onNavigate) onNavigate('members')
  }

  const handleSendRenewalReminders = async () => {
    if (!configStatus.isConfigured) {
      showMessage('Please configure email settings first', 'error')
      if (onNavigate) onNavigate('email')
      return
    }

    setSendingReminders(true)
    
    // Get expired members
    const expiredMembers = members.filter(member => 
      member.membershipStatus === 'Expired' || 
      (member.membershipExpiry && new Date(member.membershipExpiry) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
    )

    if (expiredMembers.length === 0) {
      showMessage('No members need renewal reminders at this time', 'info')
      setSendingReminders(false)
      return
    }

    try {
      const result = await sendRenewalReminders(expiredMembers)
      if (result.success) {
        showMessage(result.message, 'success')
      } else {
        showMessage(result.error || 'Failed to send renewal reminders', 'error')
      }
    } catch (err) {
      showMessage('Error sending renewal reminders', 'error')
    }
    
    setSendingReminders(false)
  }

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          message.type === 'error' 
            ? 'bg-red-50 border border-red-200 text-red-800'
            : message.type === 'info'
            ? 'bg-blue-50 border border-blue-200 text-blue-800'
            : 'bg-green-50 border border-green-200 text-green-800'
        }`}>
          {message.type === 'error' ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <button
            key={index}
            onClick={() => onCardClick && onCardClick(stat.filterType, stat.filterValue)}
            className={`card p-6 ${stat.bgColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-left`}
            title={`Click to view ${stat.title.toLowerCase()}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stat.textColor} opacity-75`}>
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${stat.textColor} opacity-75 mt-1`}>
                  {getPercentage(stat.value, stats.total)}% of total
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Status Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Current</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.current}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.current, stats.total)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Expired</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.expired}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.expired, stats.total)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Lifetime</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.lifetime}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.lifetime, stats.total)}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Members with Boats</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.withBoats}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.withBoats, stats.total)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Members with Spouse</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.withSpouse}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.withSpouse, stats.total)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Members with Children</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.withChildren}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.withChildren, stats.total)}%)
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Single Members</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{stats.total - stats.withSpouse}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({getPercentage(stats.total - stats.withSpouse, stats.total)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          {!configStatus.isConfigured && (
            <div className="flex items-center space-x-2 text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Email not configured</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={handleAddMember}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors group"
          >
            <UserCheck className="h-6 w-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-green-900">Add New Member</div>
            <div className="text-sm text-green-700">Register a new club member</div>
          </button>
          
          <button 
            onClick={handleViewMembers}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors group"
          >
            <Users className="h-6 w-6 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-blue-900">View All Members</div>
            <div className="text-sm text-blue-700">Browse the member directory</div>
          </button>
          
          <button 
            onClick={handleSendRenewalReminders}
            disabled={sendingReminders}
            className={`p-4 rounded-lg text-left transition-colors group relative ${
              configStatus.isConfigured 
                ? 'bg-orange-50 hover:bg-orange-100' 
                : 'bg-gray-50 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <UserX className={`h-6 w-6 mb-2 transition-transform ${
                configStatus.isConfigured 
                  ? 'text-orange-600 group-hover:scale-110' 
                  : 'text-gray-400'
              } ${sendingReminders ? 'animate-pulse' : ''}`} />
              {configStatus.isConfigured && (
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4 text-orange-600" />
                  <span className="text-xs text-orange-600 font-medium">
                    {members.filter(m => m.membershipStatus === 'Expired').length}
                  </span>
                </div>
              )}
            </div>
            <div className={`font-medium ${
              configStatus.isConfigured ? 'text-orange-900' : 'text-gray-600'
            }`}>
              {sendingReminders ? 'Sending...' : 'Renewal Reminders'}
            </div>
            <div className={`text-sm ${
              configStatus.isConfigured ? 'text-orange-700' : 'text-gray-500'
            }`}>
              {configStatus.isConfigured 
                ? 'Send renewal notifications' 
                : 'Configure email settings first'
              }
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberStats
