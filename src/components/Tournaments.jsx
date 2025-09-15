import React, { useState } from 'react'
import { Calendar, MapPin, Trophy, Users, Filter, ExternalLink, Award, Target, UserPlus, Eye, Ship, Camera, FileText, X, DollarSign, User, Phone, Mail, List } from 'lucide-react'
import { 
  TOURNAMENT_DIVISIONS, 
  TOURNAMENT_STATUS,
  getBlogByTournamentId,
  nearshoreBoatStandings2025,
  offshoreBoatStandings2024
} from '../data/tournamentData'
import { useTournaments } from '../hooks/useTournaments'
import TournamentRegistration from './TournamentRegistrationSimple'
import TournamentWeighIn from './TournamentWeighIn'
import AnnualStandings from './AnnualStandings'
import { useRegistrations } from '../hooks/useRegistrations'

const Tournaments = () => {
  const [activeTab, setActiveTab] = useState('schedule')
  const [divisionFilter, setDivisionFilter] = useState('all')
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showTournamentDetails, setShowTournamentDetails] = useState(false)
  const [selectedTournamentId, setSelectedTournamentId] = useState(null)
  const [showRegistrationList, setShowRegistrationList] = useState(null)
  
  const { tournaments, getTournamentById, refreshKey } = useTournaments()
  const { getRegistrationStats, getTournamentParticipants } = useRegistrations()


  const tabs = [
    { id: 'schedule', label: '2025 Schedule', icon: Calendar },
    { id: 'annual-standings', label: 'Annual Standings', icon: Trophy },
    { id: 'nearshore-standings', label: 'Nearshore Standings', icon: Award },
    { id: 'offshore-standings', label: 'Offshore Standings', icon: Target },
    { id: 'results', label: 'Tournament Results', icon: FileText }
  ]

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    if (!endDate || startDate === endDate) {
      return start
    }
    
    const endDateObj = createSafeDate(endDate)
    if (!endDateObj || isNaN(endDateObj.getTime())) return start

    const end = endDateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    // If consecutive days, show as range
    const startDay = startDateObj.getDate()
    const endDay = endDateObj.getDate()
    const startMonth = startDateObj.getMonth()
    const endMonth = endDateObj.getMonth()
    const startYear = startDateObj.getFullYear()
    const endYear = endDateObj.getFullYear()
    
    if (startMonth === endMonth && startYear === endYear && endDay === startDay + 1) {
      const startWeekday = startDateObj.toLocaleDateString('en-US', { weekday: 'long' })
      const endWeekday = endDateObj.toLocaleDateString('en-US', { weekday: 'long' })
      const monthYear = startDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      return `${startWeekday}-${endWeekday}, ${monthYear} ${startDay}-${endDay}`
    }
    
    return `${start} - ${end}`
  }

  const filteredTournaments = divisionFilter === 'all' 
    ? tournaments 
    : tournaments.filter(tournament => tournament.division === divisionFilter)

  // Registration handlers
  const handleRegisterClick = (tournamentId) => {
    setSelectedTournamentId(tournamentId)
    setShowRegistrationForm(true)
  }

  const handleViewRegistrationsClick = (tournamentId) => {
    setSelectedTournamentId(tournamentId)
    setShowRegistrationList(tournamentId)
  }

  const handleDetailsClick = (tournamentId) => {
    setSelectedTournamentId(tournamentId)
    setShowTournamentDetails(true)
  }

  const handleRegistrationSuccess = (data) => {
    setShowRegistrationForm(false)
    // Could show a success message here
    console.log('Registration successful:', data)
  }

  // Get registration data for each tournament
  const getRegistrationData = (tournamentId) => {
    const stats = getRegistrationStats(tournamentId)
    const participants = getTournamentParticipants(tournamentId)
    return { stats, participants }
  }

  const renderSchedule = () => (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setDivisionFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            divisionFilter === 'all'
              ? 'bg-ocean-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Tournaments
        </button>
        <button
          onClick={() => setDivisionFilter(TOURNAMENT_DIVISIONS.NEARSHORE)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            divisionFilter === TOURNAMENT_DIVISIONS.NEARSHORE
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Nearshore
        </button>
        <button
          onClick={() => setDivisionFilter(TOURNAMENT_DIVISIONS.OFFSHORE)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            divisionFilter === TOURNAMENT_DIVISIONS.OFFSHORE
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Offshore
        </button>
      </div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTournaments.map((tournament) => {
          const blog = getBlogByTournamentId(tournament.id)
          const registrationData = getRegistrationData(tournament.id)
          return (
            <div key={`${tournament.id}-${refreshKey}`} className="card p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getDivisionColor(tournament.division)}`}>
                      {tournament.division === TOURNAMENT_DIVISIONS.NEARSHORE ? 'Nearshore' : 'Offshore'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(tournament.status)}`}>
                      {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tournament.name}</h3>
                </div>
                <Trophy className="h-6 w-6 text-ocean-600" />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="h-4 w-4 text-ocean-500" />
                  <span className="text-sm">{formatDate(tournament.startDate || tournament.date, tournament.endDate)}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="h-4 w-4 text-ocean-500" />
                  <span className="text-sm">{tournament.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Users className="h-4 w-4 text-ocean-500" />
                  <span className="text-sm">
                    {registrationData.participants.totalBoats > 0 
                      ? `${registrationData.participants.totalBoats} boats • ${registrationData.participants.totalAnglers} anglers registered`
                      : 'No registrations yet'
                    }
                  </span>
                </div>
              </div>

              {(tournament.entryFeePerPerson || tournament.entryFee) && (
                <div className="bg-ocean-50 px-3 py-2 rounded-lg mb-4">
                  <span className="text-sm text-ocean-700">Entry Fee: <strong>{tournament.entryFeePerPerson || tournament.entryFee} per person</strong></span>
                </div>
              )}

              {tournament.status === TOURNAMENT_STATUS.COMPLETED && tournament.results && (
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Winners:</h4>
                  {tournament.results.boats.slice(0, 3).map((boat, index) => (
                    <div key={index} className="text-sm text-green-800">
                      {boat.place === 1 ? '🥇' : boat.place === 2 ? '🥈' : '🥉'} {boat.boat} - {boat.captain}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-2">
                {tournament.status === TOURNAMENT_STATUS.UPCOMING && (
                  <button 
                    onClick={() => handleRegisterClick(tournament.id)}
                    className="btn-primary flex-1 text-sm py-2 flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Register Now</span>
                  </button>
                )}
                {tournament.status === TOURNAMENT_STATUS.COMPLETED && blog && (
                  <button className="bg-green-600 hover:bg-green-700 text-white flex-1 text-sm py-2 px-3 rounded">
                    Read Recap
                  </button>
                )}
                {registrationData.participants.totalBoats > 0 && (
                  <button 
                    onClick={() => handleViewRegistrationsClick(tournament.id)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm py-2 px-3 rounded flex items-center space-x-2"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>View Leaderboard</span>
                  </button>
                )}
                {tournament.photoAlbumUrl && (
                  <a
                    href={tournament.photoAlbumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm py-2 px-3 rounded flex items-center space-x-2 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Photos</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {tournament.tipSheet && (
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
                    className="bg-green-100 hover:bg-green-200 text-green-700 text-sm py-2 px-3 rounded flex items-center space-x-2 transition-colors"
                    title={`View ${tournament.tipSheet.name}`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Info Sheet</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
                <button 
                  onClick={() => handleDetailsClick(tournament.id)}
                  className="border border-ocean-600 text-ocean-600 hover:bg-ocean-50 text-sm py-2 px-3 rounded"
                >
                  Details
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderNearshoreStandings = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">2025 Nearshore Boat of the Year</h3>
        <p className="text-gray-600">Current standings after April Steinhatchee Tournament</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Place</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Captain</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">St Marks</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Steinhatchee</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {nearshoreBoatStandings2025.map((boat) => (
                <tr key={boat.place} className={boat.place <= 3 ? 'bg-yellow-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {boat.place === 1 ? '🥇' : boat.place === 2 ? '🥈' : boat.place === 3 ? '🥉' : boat.place}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{boat.boat}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{boat.captain}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {boat.tournaments['ST MARKS MAR'] || '–'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {boat.tournaments['STEINHATCHEE APR'] || '–'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-ocean-600">
                    {boat.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderOffshoreStandings = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">2024 Offshore Boat of the Year - Final Results</h3>
        <p className="text-gray-600">Complete season standings</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Place</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boat</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Charleston</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Apalachicola</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mexico Bch</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pensacola</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {offshoreBoatStandings2024.map((boat) => (
                <tr key={boat.place} className={boat.place <= 3 ? 'bg-yellow-50' : ''}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {boat.place === 1 ? '🥇' : boat.place === 2 ? '🥈' : boat.place === 3 ? '🥉' : boat.place}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{boat.boat}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {boat.tournaments['May Charleston'] || '–'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {boat.tournaments['Jun Apalachicola'] || '–'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {boat.tournaments['Jul Mexico Bch'] || '–'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {boat.tournaments['Sep Pensacola'] || '–'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center font-bold text-blue-600">
                    {boat.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return renderSchedule()
      case 'annual-standings':
        return <AnnualStandings />
      case 'nearshore-standings':
        return renderNearshoreStandings()
      case 'offshore-standings':
        return renderOffshoreStandings()
      case 'results':
        return renderSchedule() // For now, show schedule with results
      default:
        return renderSchedule()
    }
  }

  return (
    <div className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-ocean-600">ASWSC</span> Tournaments
          </h2>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the thrill of competitive saltwater fishing with ASWSC's nearshore and offshore tournament series.
            From the grass flats to the deep blue, we fish the best waters along the Gulf Coast.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-ocean-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-ocean-50 hover:text-ocean-600'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Registration Modals */}
      {showRegistrationForm && selectedTournamentId && (
        <TournamentRegistration
          tournamentId={selectedTournamentId}
          onClose={() => {
            setShowRegistrationForm(false)
            setSelectedTournamentId(null)
          }}
          onSuccess={handleRegistrationSuccess}
        />
      )}

      {showRegistrationList && (
        <TournamentWeighIn
          tournamentId={showRegistrationList}
          onClose={() => {
            setShowRegistrationList(null)
          }}
        />
      )}

      {/* Tournament Details Modal */}
      {showTournamentDetails && selectedTournamentId && (
        <TournamentDetailsModal
          tournamentId={selectedTournamentId}
          onClose={() => {
            setShowTournamentDetails(false)
            setSelectedTournamentId(null)
          }}
          onShowRegistrationList={(tournamentId) => {
            setShowRegistrationList(tournamentId)
            setShowTournamentDetails(false) // Close tournament details modal
            setSelectedTournamentId(null)
          }}
        />
      )}

    </div>
  )
}

// Tournament Details Modal Component
const TournamentDetailsModal = ({ tournamentId, onClose, onShowRegistrationList }) => {
  const { getTournamentById } = useTournaments()
  const { getRegistrationStats, getTournamentParticipants } = useRegistrations()
  
  const tournament = getTournamentById(tournamentId)
  const registrationStats = getRegistrationStats(tournamentId)
  const participants = getTournamentParticipants(tournamentId)

  // Debug logging - can be removed in production
  console.log('Tournament ID:', tournamentId)
  console.log('Tournament director:', tournament?.tournamentDirector)
  console.log('Registration stats:', registrationStats)

  if (!tournament) {
    return null
  }

  const formatDate = (startDate, endDate) => {
    const createSafeDate = (dateStr) => {
      if (!dateStr) return null
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, day)
      }
      return new Date(dateStr)
    }

    const startDateObj = createSafeDate(startDate)
    if (!startDateObj || isNaN(startDateObj.getTime())) return 'Date TBD'

    const start = startDateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    if (!endDate || startDate === endDate) {
      return start
    }
    
    const endDateObj = createSafeDate(endDate)
    if (!endDateObj || isNaN(endDateObj.getTime())) return start

    const end = endDateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    return `${start} - ${end}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDivisionColor = (division) => {
    switch (division) {
      case 'nearshore':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'offshore':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-ocean-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tournament.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getDivisionColor(tournament.division)}`}>
                  {tournament.division === 'nearshore' ? 'Nearshore' : 'Offshore'}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(tournament.status)}`}>
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-ocean-500" />
                <div>
                  <p className="text-sm text-gray-600">Tournament Dates</p>
                  <p className="font-medium text-gray-900">{formatDate(tournament.startDate || tournament.date, tournament.endDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-ocean-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{tournament.location}</p>
                </div>
              </div>

              {tournament.entryFeePerPerson && (
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-ocean-500" />
                  <div>
                    <p className="text-sm text-gray-600">Entry Fee</p>
                    <p className="font-medium text-gray-900">{tournament.entryFeePerPerson} per person</p>
                  </div>
                </div>
              )}

              {tournament.registrationDeadline && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Registration Deadline</p>
                    <p className="font-medium text-gray-900">{new Date(tournament.registrationDeadline).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-ocean-500" />
                <div>
                  <p className="text-sm text-gray-600">Registration Status</p>
                  <p className="font-medium text-gray-900">
                    {registrationStats.totalBoats} boats • {registrationStats.totalAnglers} anglers registered
                  </p>
                  {registrationStats.totalBoats > 0 && (
                    <button
                      onClick={() => onShowRegistrationList(tournament.id)}
                      className="text-sm text-ocean-600 hover:text-ocean-800 flex items-center space-x-1 mt-1"
                    >
                      <List className="h-3 w-3" />
                      <span>Weigh In</span>
                    </button>
                  )}
                </div>
              </div>

              {tournament.tournamentDirector && (
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-ocean-500" />
                  <div>
                    <p className="text-sm text-gray-600">Tournament Director</p>
                    <p className="font-medium text-gray-900">{tournament.tournamentDirector.name}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <a
                        href={`mailto:${tournament.tournamentDirector.email}`}
                        className="text-sm text-ocean-600 hover:text-ocean-800 flex items-center space-x-1"
                      >
                        <Mail className="h-3 w-3" />
                        <span>{tournament.tournamentDirector.email}</span>
                      </a>
                      <a
                        href={`tel:${tournament.tournamentDirector.phone}`}
                        className="text-sm text-ocean-600 hover:text-ocean-800 flex items-center space-x-1"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{tournament.tournamentDirector.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {tournament.hasAwardsDinner && (
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-ocean-500" />
                  <div>
                    <p className="text-sm text-gray-600">Awards Dinner</p>
                    <p className="font-medium text-gray-900">{tournament.awardsDinnerFee || '$30'} per person</p>
                  </div>
                </div>
              )}

              {tournament.photoAlbumUrl && (
                <div className="flex items-center space-x-3">
                  <Camera className="h-5 w-5 text-ocean-500" />
                  <div>
                    <p className="text-sm text-gray-600">Photo Album</p>
                    <a
                      href={tournament.photoAlbumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ocean-600 hover:text-ocean-800 flex items-center space-x-1"
                    >
                      <span>View Photos</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              {tournament.tipSheet && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-ocean-500" />
                  <div>
                    <p className="text-sm text-gray-600">Tournament Information</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        
                        const dataUrl = tournament.tipSheet.url
                        if (dataUrl && dataUrl.startsWith('data:')) {
                          try {
                            const byteCharacters = atob(dataUrl.split(',')[1])
                            const byteNumbers = new Array(byteCharacters.length)
                            for (let i = 0; i < byteCharacters.length; i++) {
                              byteNumbers[i] = byteCharacters.charCodeAt(i)
                            }
                            const byteArray = new Uint8Array(byteNumbers)
                            const blob = new Blob([byteArray], { type: 'application/pdf' })
                            
                            const objectUrl = URL.createObjectURL(blob)
                            const newWindow = window.open(objectUrl, '_blank')
                            
                            setTimeout(() => {
                              URL.revokeObjectURL(objectUrl)
                            }, 1000)
                            
                            if (!newWindow) {
                              const link = document.createElement('a')
                              link.href = objectUrl
                              link.download = tournament.tipSheet.name || 'tournament-tip-sheet.pdf'
                              document.body.appendChild(link)
                              link.click()
                              document.body.removeChild(link)
                            }
                          } catch (error) {
                            console.error('Error opening PDF:', error)
                            alert('Error opening PDF file. Please try again.')
                          }
                        }
                      }}
                      className="font-medium text-ocean-600 hover:text-ocean-800 flex items-center space-x-1"
                    >
                      <span>View Info Sheet ({tournament.tipSheet.name})</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tournament Results */}
          {tournament.status === 'completed' && tournament.results && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Tournament Results</span>
              </h3>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">Top Finishers:</h4>
                <div className="space-y-2">
                  {tournament.results.boats.slice(0, 5).map((boat, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-green-800">
                          {boat.place === 1 ? '🥇' : boat.place === 2 ? '🥈' : boat.place === 3 ? '🥉' : `${boat.place}.`}
                        </span>
                        <span className="font-medium">{boat.boat}</span>
                        <span className="text-gray-600">- {boat.captain}</span>
                      </div>
                      {boat.points && (
                        <span className="font-medium text-green-800">{boat.points} pts</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Registered Participants */}
          {participants.boats.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-ocean-500" />
                <span>Registered Participants ({participants.boats.length} boats)</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {participants.boats.slice(0, 10).map((boat, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-900">{boat.name}</div>
                    <div className="text-sm text-gray-600">Captain: {boat.captain.name}</div>
                    <div className="text-sm text-gray-600">Crew: {boat.crew.map(c => c.name).join(', ')}</div>
                  </div>
                ))}
                {participants.boats.length > 10 && (
                  <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center text-gray-600">
                    <span>+ {participants.boats.length - 10} more boats</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}


export default Tournaments
