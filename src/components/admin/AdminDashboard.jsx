import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useMembers } from '../../hooks/useMembers'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import MembersList from './MembersList'
import MemberForm from './MemberForm'
import MemberStats from './MemberStats'
import TournamentManagement from './TournamentManagement'
import ScoringMatrixManagement from './ScoringMatrixManagement'
import TestDataManagement from './TestDataManagement'
import FAQManagement from './FAQManagement'
import { Users, UserPlus, BarChart3, Settings, Trophy, Target, Database, HelpCircle } from 'lucide-react'

const AdminDashboard = ({ onSwitchToPublic }) => {
  const { user, logout } = useAuth()
  const { members, getStatistics } = useMembers()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedMember, setSelectedMember] = useState(null)
  const [memberFilter, setMemberFilter] = useState(null)

  const navigationItems = [
    {
      id: 'overview',
      name: 'Overview',
      icon: BarChart3,
      description: 'Dashboard overview and statistics'
    },
    {
      id: 'members',
      name: 'Members',
      icon: Users,
      description: 'View and manage all members'
    },
    {
      id: 'add-member',
      name: 'Add Member',
      icon: UserPlus,
      description: 'Add a new member to the club'
    },
    {
      id: 'tournaments',
      name: 'Tournaments',
      icon: Trophy,
      description: 'Create and manage tournaments'
    },
    {
      id: 'scoring',
      name: 'Scoring Matrix',
      icon: Target,
      description: 'Configure tournament scoring rules and point values'
    },
    {
      id: 'testdata',
      name: 'Test Data',
      icon: Database,
      description: 'Load test weigh-in data for tournaments'
    },
    {
      id: 'faq',
      name: 'FAQ Management',
      icon: HelpCircle,
      description: 'Manage frequently asked questions for the website'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      description: 'System settings and preferences'
    }
  ]

  const handleEditMember = (member) => {
    setSelectedMember(member)
    setActiveTab('add-member')
  }

  const handleAddNew = () => {
    setSelectedMember(null)
    setMemberFilter(null)
    setActiveTab('add-member')
  }

  const handleStatCardClick = (filterType, filterValue) => {
    setMemberFilter({ type: filterType, value: filterValue })
    setActiveTab('members')
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}. Here's an overview of your club membership.</p>
            </div>
            <MemberStats onCardClick={handleStatCardClick} />
          </div>
        )
      
      case 'members':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Members</h1>
                <p className="text-gray-600">Manage all club members and their information.</p>
              </div>
              <button
                onClick={handleAddNew}
                className="btn-primary flex items-center space-x-2"
              >
                <UserPlus className="h-5 w-5" />
                <span>Add Member</span>
              </button>
            </div>
            <MembersList 
              onEditMember={handleEditMember} 
              initialFilter={memberFilter}
              onClearFilter={() => setMemberFilter(null)}
            />
          </div>
        )
      
      case 'add-member':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedMember ? 'Edit Member' : 'Add New Member'}
              </h1>
              <p className="text-gray-600">
                {selectedMember 
                  ? 'Update member information and details.' 
                  : 'Add a new member to the ASWSC database.'
                }
              </p>
            </div>
            <MemberForm 
              member={selectedMember} 
              onSuccess={() => {
                setActiveTab('members')
                setSelectedMember(null)
              }}
              onCancel={() => {
                setActiveTab('members')
                setSelectedMember(null)
              }}
            />
          </div>
        )
      
      case 'tournaments':
        return <TournamentManagement />
      
      case 'scoring':
        return <ScoringMatrixManagement />
      
      case 'testdata':
        return <TestDataManagement />
      
      case 'faq':
        return <FAQManagement />
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">System settings and data management.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Export Data</h4>
                    <p className="text-sm text-gray-600 mb-3">Download member data as JSON or CSV file.</p>
                    <div className="flex space-x-2">
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
                        Export JSON
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
                        Export CSV
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Reset Data</h4>
                    <p className="text-sm text-gray-600 mb-3">Reset to sample data (this will delete all current data).</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
                      Reset to Sample Data
                    </button>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
                    <input 
                      type="text" 
                      value={user.name} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="email" 
                      value={user.username} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input 
                      type="text" 
                      value={user.role} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        navigationItems={navigationItems}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onSwitchToPublic={onSwitchToPublic}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} onLogout={logout} />
        
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
