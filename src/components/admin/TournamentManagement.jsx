import React, { useState } from 'react'
import { useTournaments } from '../../hooks/useTournaments'
import { TOURNAMENT_STATUS, TOURNAMENT_DIVISIONS } from '../../data/tournamentData'
import { useMembers } from '../../hooks/useMembers'
import PDFUpload from '../common/PDFUpload'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  Camera,
  ExternalLink,
  Search,
  Filter,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react'

const TournamentManagement = () => {
  const { 
    tournaments, 
    loading, 
    error, 
    refreshKey,
    createTournament, 
    updateTournament, 
    deleteTournament,
    updatePhotoAlbum,
    updateTipSheet,
    getTournamentStats,
    searchTournaments,
    resetTournamentsToDefault 
  } = useTournaments()
  
  const { members } = useMembers()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [divisionFilter, setDivisionFilter] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTournament, setEditingTournament] = useState(null)
  const [editingPhotoUrl, setEditingPhotoUrl] = useState(null)
  const [editingTipSheet, setEditingTipSheet] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    entryFeePerPerson: '$55',
    hasAwardsDinner: false,
    awardsDinnerFee: '$30',
    registrationDeadline: '',
    photoAlbumUrl: '',
    tipSheet: null,
    tournamentDirector: {
      memberId: '',
      name: '',
      email: '',
      phone: ''
    }
  })
  const [photoUrlInput, setPhotoUrlInput] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  const stats = getTournamentStats()
  
  // Filter tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = searchQuery === '' || 
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter
    const matchesDivision = divisionFilter === 'all' || tournament.division === divisionFilter
    
    return matchesSearch && matchesStatus && matchesDivision
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTournamentDirectorChange = (memberId) => {
    const selectedMember = members.find(member => member.id === parseInt(memberId))
    if (selectedMember) {
      setFormData(prev => ({
        ...prev,
        tournamentDirector: {
          memberId: selectedMember.id,
          name: `${selectedMember.memberName.first} ${selectedMember.memberName.last}`,
          email: selectedMember.email,
          phone: selectedMember.phone
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        tournamentDirector: {
          memberId: '',
          name: '',
          email: '',
          phone: ''
        }
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      division: TOURNAMENT_DIVISIONS.NEARSHORE,
      entryFeePerPerson: '$55',
      hasAwardsDinner: false,
      awardsDinnerFee: '$30',
      registrationDeadline: '',
      photoAlbumUrl: '',
      tipSheet: null,
      tournamentDirector: {
        memberId: '',
        name: '',
        email: '',
        phone: ''
      }
    })
    setShowCreateForm(false)
    setEditingTournament(null)
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const result = await createTournament(formData)
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Tournament created successfully!' })
        resetForm()
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create tournament' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while creating the tournament' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const result = await updateTournament(editingTournament.id, formData)
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Tournament updated successfully!' })
        resetForm()
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update tournament' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating the tournament' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (tournamentId) => {
    if (!window.confirm('Are you sure you want to delete this tournament?')) return
    
    const result = await deleteTournament(tournamentId)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Tournament deleted successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to delete tournament' })
    }
  }

  const handlePhotoUrlUpdate = async (tournamentId) => {
    const result = await updatePhotoAlbum(tournamentId, photoUrlInput)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Photo album URL updated successfully!' })
      setEditingPhotoUrl(null)
      setPhotoUrlInput('')
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update photo album URL' })
    }
  }

  const handleTipSheetUpload = async (tournamentId, tipSheetData) => {
    const result = await updateTipSheet(tournamentId, tipSheetData)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Tournament tip sheet uploaded successfully!' })
      setEditingTipSheet(null)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to upload tip sheet' })
    }
  }

  const handleTipSheetRemove = async (tournamentId) => {
    const result = await updateTipSheet(tournamentId, null)
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Tournament tip sheet removed successfully!' })
      setEditingTipSheet(null)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to remove tip sheet' })
    }
  }

  const startEdit = (tournament) => {
    // Helper function to format date for HTML date input (YYYY-MM-DD)
    const formatDateForInput = (dateStr) => {
      if (!dateStr) return ''
      
      // If it's already in YYYY-MM-DD format, return as is
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dateStr
      }
      
      // Try to parse other formats and convert to YYYY-MM-DD
      try {
        // Use UTC parsing to avoid timezone issues
        let date
        if (dateStr.includes('/')) {
          // Handle MM/DD/YYYY format
          const parts = dateStr.split('/')
          if (parts.length === 3) {
            const month = parseInt(parts[0], 10) - 1 // Month is 0-indexed
            const day = parseInt(parts[1], 10)
            const year = parseInt(parts[2], 10)
            date = new Date(year, month, day)
          } else {
            date = new Date(dateStr)
          }
        } else {
          date = new Date(dateStr)
        }
        
        if (isNaN(date.getTime())) return ''
        
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      } catch (err) {
        console.error('Error parsing date:', dateStr, err)
        return ''
      }
    }

    const formattedData = {
      name: tournament.name,
      location: tournament.location,
      startDate: formatDateForInput(tournament.startDate || tournament.date),
      endDate: formatDateForInput(tournament.endDate),
      division: tournament.division,
      entryFeePerPerson: tournament.entryFeePerPerson || tournament.entryFee || '$55',
      hasAwardsDinner: tournament.hasAwardsDinner || false,
      awardsDinnerFee: tournament.awardsDinnerFee || '$30',
      registrationDeadline: formatDateForInput(tournament.registrationDeadline),
      photoAlbumUrl: tournament.photoAlbumUrl || '',
      tipSheet: tournament.tipSheet || null,
      tournamentDirector: tournament.tournamentDirector || {
        memberId: '',
        name: '',
        email: '',
        phone: ''
      }
    }
    
    setFormData(formattedData)
    setEditingTournament(tournament)
  }

  const startPhotoEdit = (tournament) => {
    setEditingPhotoUrl(tournament.id)
    setPhotoUrlInput(tournament.photoAlbumUrl || '')
  }

  const formatDate = (startDate, endDate) => {
    // Helper function to create date without timezone issues
    const createSafeDate = (dateStr) => {
      if (!dateStr) return null
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // For YYYY-MM-DD format, create date in local timezone
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day) // month is 0-indexed
      }
      return new Date(dateStr)
    }

    const startDateObj = createSafeDate(startDate)
    if (!startDateObj || isNaN(startDateObj.getTime())) return 'Invalid Date'

    const start = startDateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    
    if (!endDate || startDate === endDate) {
      return start
    }
    
    const endDateObj = createSafeDate(endDate)
    if (!endDateObj || isNaN(endDateObj.getTime())) return start

    const end = endDateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
    
    // If same month and year, just show "Oct 15-29, 2025"
    const startParts = start.split(' ')
    const endParts = end.split(' ')
    
    if (startParts[0] === endParts[0] && startParts[2] === endParts[2]) {
      return `${startParts[0]} ${startParts[1].replace(',', '')}-${endParts[1]}`
    }
    
    return `${start} - ${end}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case TOURNAMENT_STATUS.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-200'
      case TOURNAMENT_STATUS.UPCOMING:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case TOURNAMENT_STATUS.IN_PROGRESS:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDivisionColor = (division) => {
    switch (division) {
      case TOURNAMENT_DIVISIONS.NEARSHORE:
        return 'bg-green-50 text-green-700 border-green-200'
      case TOURNAMENT_DIVISIONS.OFFSHORE:
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="text-lg">Loading tournaments...</div>
    </div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tournament Management</h2>
          <p className="text-gray-600 mt-1">Create and manage ASWSC tournaments</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Tournament</span>
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-100 border-green-400 text-green-700' 
            : 'bg-red-100 border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {message.text}
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Trophy className="h-8 w-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">{stats.upcoming}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nearshore</p>
              <p className="text-2xl font-bold text-green-600">{stats.nearshore}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Offshore</p>
              <p className="text-2xl font-bold text-blue-600">{stats.offshore}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
          >
            <option value="all">All Status</option>
            <option value={TOURNAMENT_STATUS.UPCOMING}>Upcoming</option>
            <option value={TOURNAMENT_STATUS.COMPLETED}>Completed</option>
            <option value={TOURNAMENT_STATUS.IN_PROGRESS}>In Progress</option>
          </select>
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
          >
            <option value="all">All Divisions</option>
            <option value={TOURNAMENT_DIVISIONS.NEARSHORE}>Nearshore</option>
            <option value={TOURNAMENT_DIVISIONS.OFFSHORE}>Offshore</option>
          </select>
        </div>
      </div>

      {/* Tournament List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Tournaments ({filteredTournaments.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTournaments.map((tournament) => (
            <div key={`${tournament.id}-${refreshKey}`} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{tournament.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getDivisionColor(tournament.division)}`}>
                      {tournament.division === TOURNAMENT_DIVISIONS.NEARSHORE ? 'Nearshore' : 'Offshore'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(tournament.status)}`}>
                      {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(tournament.startDate || tournament.date, tournament.endDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4" />
                      <span>{tournament.entryFeePerPerson || tournament.entryFee || 'TBD'} per person</span>
                    </div>
                  </div>

                  {/* Photo Album URL Management */}
                  <div className="mb-3">
                    {editingPhotoUrl === tournament.id ? (
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4 text-blue-500" />
                        <input
                          type="url"
                          value={photoUrlInput}
                          onChange={(e) => setPhotoUrlInput(e.target.value)}
                          placeholder="https://photos.google.com/share/..."
                          className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-ocean-500 text-sm"
                        />
                        <button
                          onClick={() => handlePhotoUrlUpdate(tournament.id)}
                          className="btn-primary text-xs py-1 px-3"
                        >
                          <Save className="h-3 w-3 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPhotoUrl(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4 text-gray-400" />
                        {tournament.photoAlbumUrl ? (
                          <a
                            href={tournament.photoAlbumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                          >
                            <span>Photo Album</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-gray-500 text-sm">No photo album</span>
                        )}
                        <button
                          onClick={() => startPhotoEdit(tournament)}
                          className="text-ocean-600 hover:text-ocean-800 text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tournament Tip Sheet Management */}
                  <div className="mb-3">
                    {editingTipSheet === tournament.id ? (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">Upload Tournament Tip Sheet</span>
                        </div>
                        <PDFUpload
                          onFileSelect={(fileData) => handleTipSheetUpload(tournament.id, fileData)}
                          currentFile={tournament.tipSheet}
                          onRemove={tournament.tipSheet ? () => handleTipSheetRemove(tournament.id) : null}
                          label=""
                          description="Upload a PDF with tournament details, start times, weigh-in locations, etc."
                          maxSizeMB={5}
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={() => setEditingTipSheet(null)}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        {tournament.tipSheet ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              
                              const dataUrl = tournament.tipSheet.url
                              if (dataUrl && dataUrl.startsWith('data:')) {
                                try {
                                  // Convert data URL to blob
                                  const byteCharacters = atob(dataUrl.split(',')[1])
                                  const byteNumbers = new Array(byteCharacters.length)
                                  for (let i = 0; i < byteCharacters.length; i++) {
                                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                                  }
                                  const byteArray = new Uint8Array(byteNumbers)
                                  const blob = new Blob([byteArray], { type: 'application/pdf' })
                                  
                                  // Create object URL and open in new window
                                  const objectUrl = URL.createObjectURL(blob)
                                  const newWindow = window.open(objectUrl, '_blank')
                                  
                                  // Clean up the object URL after a delay
                                  setTimeout(() => {
                                    URL.revokeObjectURL(objectUrl)
                                  }, 1000)
                                  
                                  if (!newWindow) {
                                    // If popup blocked, try download instead
                                    const link = document.createElement('a')
                                    link.href = objectUrl
                                    link.download = tournament.tipSheet.name || 'tournament-tip-sheet.pdf'
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                  }
                                } catch (error) {
                                  console.error('Error opening PDF:', error)
                                  alert('Error opening PDF file. Please try again or re-upload the tip sheet.')
                                }
                              } else {
                                alert('PDF file is not available. Please re-upload the tip sheet.')
                              }
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
                          >
                            <span>Tournament Tip Sheet ({tournament.tipSheet.name})</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        ) : (
                          <span className="text-gray-500 text-sm">No tip sheet uploaded</span>
                        )}
                        <button
                          onClick={() => setEditingTipSheet(tournament.id)}
                          className="text-ocean-600 hover:text-ocean-800 text-sm"
                        >
                          {tournament.tipSheet ? 'Change' : 'Upload'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEdit(tournament)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(tournament.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Tournament Modal */}
      {(showCreateForm || editingTournament) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-900">
                {editingTournament ? 'Edit Tournament' : 'Create New Tournament'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={editingTournament ? handleEditSubmit : handleCreateSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    placeholder="St Marks Nearshore Tournament"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    placeholder="St Marks, FL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    min={formData.startDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Division *
                  </label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  >
                    <option value={TOURNAMENT_DIVISIONS.NEARSHORE}>Nearshore</option>
                    <option value={TOURNAMENT_DIVISIONS.OFFSHORE}>Offshore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entry Fee Per Person
                  </label>
                  <input
                    type="text"
                    name="entryFeePerPerson"
                    value={formData.entryFeePerPerson}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    placeholder="$55"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="hasAwardsDinner"
                      name="hasAwardsDinner"
                      checked={formData.hasAwardsDinner}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasAwardsDinner: e.target.checked }))}
                      className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasAwardsDinner" className="text-sm font-medium text-gray-700">
                      Tournament has Awards Dinner
                    </label>
                  </div>
                  {formData.hasAwardsDinner && (
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Awards Dinner Fee Per Person
                      </label>
                      <input
                        type="text"
                        name="awardsDinnerFee"
                        value={formData.awardsDinnerFee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                        placeholder="$30"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration Deadline
                  </label>
                  <input
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tournament Director *
                  </label>
                  <select
                    value={formData.tournamentDirector.memberId}
                    onChange={(e) => handleTournamentDirectorChange(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  >
                    <option value="">Select Tournament Director</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.memberName.first} {member.memberName.last} - {member.email}
                      </option>
                    ))}
                  </select>
                  {formData.tournamentDirector.name && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">
                        <strong>Selected Director:</strong> {formData.tournamentDirector.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Email:</strong> {formData.tournamentDirector.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Phone:</strong> {formData.tournamentDirector.phone}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Photos Album URL
                </label>
                <input
                  type="url"
                  name="photoAlbumUrl"
                  value={formData.photoAlbumUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="https://photos.google.com/share/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Link to Google Photos album for tournament photos
                </p>
              </div>

              <div>
                <PDFUpload
                  onFileSelect={(fileData) => setFormData(prev => ({ ...prev, tipSheet: fileData }))}
                  currentFile={formData.tipSheet}
                  onRemove={() => setFormData(prev => ({ ...prev, tipSheet: null }))}
                  label="Tournament Tip Sheet"
                  description="Upload a PDF with tournament details, start times, weigh-in locations, rules, etc."
                  maxSizeMB={5}
                />
              </div>
              </div>

              {/* Fixed Footer with Buttons */}
              <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50 flex-shrink-0">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary px-6 py-2 disabled:opacity-50 flex items-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingTournament ? 'Update Tournament' : 'Create Tournament'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default TournamentManagement
