import React, { useState, useRef, useEffect } from 'react'
import { Search, User, UserPlus, ChevronDown, Check, AlertCircle, X, Crown } from 'lucide-react'

const ZIP_TIE_COLORS = [
  { id: 'black', name: 'Black', color: '#000000', reserved: true, role: 'Captain' },
  { id: 'white', name: 'White', color: '#FFFFFF', reserved: false },
  { id: 'yellow', name: 'Yellow', color: '#FDE047', reserved: false },
  { id: 'red', name: 'Red', color: '#EF4444', reserved: false },
  { id: 'blue', name: 'Blue', color: '#3B82F6', reserved: false },
  { id: 'orange', name: 'Orange', color: '#F97316', reserved: false },
  { id: 'green', name: 'Green', color: '#22C55E', reserved: false }
]

// Auto-assign zip tie colors in order
const getNextAvailableZipTieColor = (usedColors) => {
  const availableColors = ZIP_TIE_COLORS.filter(color => 
    !color.reserved && !usedColors.includes(color.id)
  )
  return availableColors.length > 0 ? availableColors[0].id : null
}

const CrewMemberSelector = ({ 
  members, 
  selectedMember, 
  onMemberSelect, 
  onGuestAdd,
  usedZipTieColors = [],
  assignedZipTieColor,
  onZipTieColorChange,
  isOffshore = false,
  isCaptain = false,
  error, 
  placeholder = "Select crew member or add guest..." 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showGuestForm, setShowGuestForm] = useState(false)
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [filteredMembers, setFilteredMembers] = useState(members)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const filtered = members.filter(member => {
      const fullName = `${member.memberName?.first || ''} ${member.memberName?.last || ''}`.toLowerCase()
      const email = member.email?.toLowerCase() || ''
      const query = searchQuery.toLowerCase()
      
      return fullName.includes(query) || email.includes(query)
    })
    setFilteredMembers(filtered)
  }, [members, searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setShowGuestForm(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMemberSelect = (member) => {
    const memberData = {
      memberId: member.id,
      firstName: member.memberName?.first || '',
      lastName: member.memberName?.last || '',
      email: member.email || '',
      phone: member.phone || '',
      isGuest: false,
      isCaptain
    }

    // Auto-assign zip tie color for offshore tournaments
    if (isOffshore && onZipTieColorChange) {
      const zipTieColor = isCaptain ? 'black' : getNextAvailableZipTieColor(usedZipTieColors)
      if (zipTieColor) {
        onZipTieColorChange(zipTieColor)
      }
    }

    onMemberSelect(memberData)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleGuestSubmit = () => {
    if (!guestInfo.firstName.trim() || !guestInfo.lastName.trim()) return

    const guestData = {
      memberId: null,
      firstName: guestInfo.firstName,
      lastName: guestInfo.lastName,
      email: guestInfo.email,
      phone: guestInfo.phone,
      isGuest: true,
      isCaptain
    }

    // Auto-assign zip tie color for offshore tournaments
    if (isOffshore && onZipTieColorChange) {
      const zipTieColor = isCaptain ? 'black' : getNextAvailableZipTieColor(usedZipTieColors)
      if (zipTieColor) {
        onZipTieColorChange(zipTieColor)
      }
    }

    onGuestAdd(guestData)
    setGuestInfo({ firstName: '', lastName: '', email: '', phone: '' })
    setShowGuestForm(false)
    setIsOpen(false)
  }

  const getAvailableZipTieColors = () => {
    if (isCaptain) {
      return [ZIP_TIE_COLORS[0]] // Only black for captain
    }
    return ZIP_TIE_COLORS.filter(color => 
      !color.reserved && !usedZipTieColors.includes(color.id)
    )
  }

  const getDisplayText = () => {
    if (selectedMember) {
      return `${selectedMember.firstName} ${selectedMember.lastName}${selectedMember.isGuest ? ' (Guest)' : ''}`
    }
    return placeholder
  }

  const selectedZipTieColor = ZIP_TIE_COLORS.find(color => color.id === assignedZipTieColor)

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Member Selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 text-left flex items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${selectedMember ? 'text-gray-900' : 'text-gray-500'}`}
      >
        <div className="flex items-center space-x-2">
          {isCaptain ? (
            <Crown className="h-4 w-4 text-yellow-500" />
          ) : (
            <User className="h-4 w-4 text-gray-400" />
          )}
          <span className="truncate">{getDisplayText()}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* Zip Tie Color Display for Offshore Tournaments */}
      {isOffshore && selectedMember && assignedZipTieColor && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fish Tagging Zip Tie Color {isCaptain ? '(Captain)' : '(Auto-assigned)'}
          </label>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
            <div
              className="w-6 h-6 rounded-full border-2 border-gray-300"
              style={{ 
                backgroundColor: selectedZipTieColor?.color,
                border: assignedZipTieColor === 'white' ? '2px solid #d1d5db' : `2px solid ${selectedZipTieColor?.color}`
              }}
            />
            <div>
              <span className="text-sm font-medium text-gray-900">{selectedZipTieColor?.name}</span>
              <p className="text-xs text-gray-600">For tagging caught fish during tournament</p>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {!showGuestForm ? (
            <>
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Add Guest Button */}
              <div className="p-2 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowGuestForm(true)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 rounded-lg text-ocean-600"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="font-medium">Add Guest Crew Member</span>
                </button>
              </div>

              {/* Members List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredMembers.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No members found</p>
                  </div>
                ) : (
                  filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleMemberSelect(member)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 ${
                        selectedMember?.memberId === member.id ? 'bg-ocean-50 border-ocean-200' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <User className="h-4 w-4 text-ocean-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">
                                {member.memberName?.first || ''} {member.memberName?.last || ''}
                              </p>
                              <p className="text-sm text-gray-600 truncate">
                                {member.email || 'No email on file'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.status || 'Unknown'} Member
                              </p>
                            </div>
                          </div>
                        </div>
                        {selectedMember?.memberId === member.id && (
                          <Check className="h-4 w-4 text-ocean-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Guest Form */
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Add Guest Crew Member</h4>
                <button
                  type="button"
                  onClick={() => setShowGuestForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={guestInfo.firstName}
                      onChange={(e) => setGuestInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-ocean-500"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={guestInfo.lastName}
                      onChange={(e) => setGuestInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-ocean-500"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-ocean-500"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-ocean-500"
                    placeholder="(404) 555-0123"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={handleGuestSubmit}
                    disabled={!guestInfo.firstName.trim() || !guestInfo.lastName.trim()}
                    className="flex-1 bg-ocean-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Guest
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGuestForm(false)}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CrewMemberSelector
