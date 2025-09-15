import React from 'react'
import { useMembers } from '../../hooks/useMembers'
import { Users, UserCheck, UserX, Crown, Anchor, Heart, Baby } from 'lucide-react'

const MemberStats = ({ onCardClick }) => {
  const { getStatistics } = useMembers()
  const stats = getStatistics()

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

  return (
    <div className="space-y-6">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
            <UserCheck className="h-6 w-6 text-green-600 mb-2" />
            <div className="font-medium text-green-900">Add New Member</div>
            <div className="text-sm text-green-700">Register a new club member</div>
          </button>
          
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
            <Users className="h-6 w-6 text-blue-600 mb-2" />
            <div className="font-medium text-blue-900">View All Members</div>
            <div className="text-sm text-blue-700">Browse the member directory</div>
          </button>
          
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
            <UserX className="h-6 w-6 text-orange-600 mb-2" />
            <div className="font-medium text-orange-900">Renewal Reminders</div>
            <div className="text-sm text-orange-700">Send renewal notifications</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberStats
