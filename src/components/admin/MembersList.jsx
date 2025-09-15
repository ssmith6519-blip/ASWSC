import React, { useState, useEffect } from 'react'
import { useMembers } from '../../hooks/useMembers'
import { formatMemberName, formatBoatInfo, getStatusColor } from '../../data/membersData'
import { Search, Edit, Trash2, Eye, Filter, Users, Calendar, X } from 'lucide-react'

const MembersList = ({ onEditMember, initialFilter, onClearFilter }) => {
  const { members, deleteMember, searchMembers } = useMembers()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'cards'

  // Apply initial filter from dashboard cards
  useEffect(() => {
    if (initialFilter) {
      switch (initialFilter.type) {
        case 'status':
          setStatusFilter(initialFilter.value)
          break
        case 'all':
          setStatusFilter('')
          setSearchQuery('')
          break
        default:
          // For custom filters like hasBoat, hasSpouse, hasChildren, we'll use search logic
          setStatusFilter('')
          break
      }
    }
  }, [initialFilter])

  const applyCustomFilter = (members, filter) => {
    if (!filter) return members

    switch (filter.type) {
      case 'hasBoat':
        return members.filter(member => member.primaryBoat && member.primaryBoat.name)
      case 'hasSpouse':
        return members.filter(member => member.spouse && member.spouse.first)
      case 'hasChildren':
        return members.filter(member => member.children && member.children.length > 0)
      case 'status':
        return members.filter(member => member.status === filter.value)
      case 'all':
      default:
        return members
    }
  }

  let filteredMembers = searchMembers(searchQuery, statusFilter || null)
  
  // Apply custom filter from dashboard cards
  if (initialFilter && !['status', 'all'].includes(initialFilter.type)) {
    filteredMembers = applyCustomFilter(filteredMembers, initialFilter)
  }

  const handleDelete = async (id) => {
    const result = deleteMember(id)
    if (result.success) {
      setShowDeleteConfirm(null)
    } else {
      alert('Failed to delete member: ' + result.error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getYearsSinceMember = (joiningDate) => {
    const years = new Date().getFullYear() - new Date(joiningDate).getFullYear()
    return years
  }

  const getFilterDisplayName = (filter) => {
    if (!filter) return 'All Members'
    
    switch (filter.type) {
      case 'status':
        return `${filter.value} Members`
      case 'hasBoat':
        return 'Members with Boats'
      case 'hasSpouse':
        return 'Members with Spouse'
      case 'hasChildren':
        return 'Members with Children'
      case 'all':
      default:
        return 'All Members'
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 appearance-none bg-white"
            >
              <option value="">All Status</option>
              <option value="Current">Current</option>
              <option value="Expired">Expired</option>
              <option value="Lifetime">Lifetime</option>
            </select>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-ocean-100 text-ocean-600' : 'text-gray-400'}`}
          >
            <Users className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded ${viewMode === 'cards' ? 'bg-ocean-100 text-ocean-600' : 'text-gray-400'}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {initialFilter && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Filtered by: {getFilterDisplayName(initialFilter)}
              </span>
            </div>
            <button
              onClick={() => {
                onClearFilter && onClearFilter()
                setSearchQuery('')
                setStatusFilter('')
              }}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <X className="h-4 w-4" />
              <span>Clear Filter</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredMembers.length} of {members.length} members
          {initialFilter && <span className="text-blue-600 ml-1">(filtered)</span>}
        </p>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Primary Boat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Family
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatMemberName(member.memberName)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Member for {getYearsSinceMember(member.joiningDate)} years
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(member.joiningDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatBoatInfo(member.primaryBoat)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        {member.spouse && member.spouse.first && (
                          <div>Spouse: {formatMemberName(member.spouse)}</div>
                        )}
                        {member.children && member.children.length > 0 && (
                          <div>{member.children.length} child{member.children.length !== 1 ? 'ren' : ''}</div>
                        )}
                        {(!member.spouse || !member.spouse.first) && (!member.children || member.children.length === 0) && (
                          <span className="text-gray-400">Single</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onEditMember(member)}
                          className="text-ocean-600 hover:text-ocean-900 p-1"
                          title="Edit Member"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(member.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Member"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {formatMemberName(member.memberName)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Member since {formatDate(member.joiningDate)}
                  </p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {member.spouse && member.spouse.first && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Spouse: {formatMemberName(member.spouse)}
                    </span>
                  </div>
                )}
                
                {member.children && member.children.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {member.children.length} child{member.children.length !== 1 ? 'ren' : ''}
                    </span>
                  </div>
                )}

                {member.primaryBoat && member.primaryBoat.name && (
                  <div className="text-sm text-gray-600">
                    <strong>Boat:</strong> {formatBoatInfo(member.primaryBoat)}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => onEditMember(member)}
                  className="btn-primary text-sm py-2 px-3 flex items-center space-x-1"
                >
                  <Edit className="h-3 w-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(member.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-3 rounded flex items-center space-x-1"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-500">
            {searchQuery || statusFilter
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first member.'}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Member</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this member? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersList
