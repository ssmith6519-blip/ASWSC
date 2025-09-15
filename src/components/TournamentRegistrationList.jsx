import React, { useState } from 'react'
import { useRegistrations } from '../hooks/useRegistrations'
import { useTournaments } from '../hooks/useTournaments'
import { 
  Users, 
  Ship, 
  Search, 
  Filter, 
  Calendar, 
  Mail, 
  Phone, 
  User,
  Crown,
  Eye,
  X,
  Download,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'

const TournamentRegistrationList = ({ tournamentId, onClose }) => {
  const { getTournamentParticipants, getRegistrationsByTournament, getRegistrationStats } = useRegistrations()
  const { getTournamentById } = useTournaments()
  const [viewMode, setViewMode] = useState('boats') // boats, anglers, registrations
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRegistration, setSelectedRegistration] = useState(null)

  const tournament = getTournamentById(tournamentId)
  const participants = getTournamentParticipants(tournamentId)
  const registrations = getRegistrationsByTournament(tournamentId)
  const stats = getRegistrationStats(tournamentId)

  if (!tournament) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tournament Not Found</h3>
      </div>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'cancelled':
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = searchQuery === '' || 
      reg.captain.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.captain.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.boatInfo.boatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.anglers.some(angler => 
        angler.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        angler.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const filteredBoats = participants.boats.filter(boat =>
    searchQuery === '' ||
    boat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    boat.captain.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAnglers = participants.anglers.filter(angler =>
    searchQuery === '' ||
    angler.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    angler.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    angler.boatName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Boats</p>
            <p className="text-2xl font-bold text-ocean-600">{participants.totalBoats}</p>
          </div>
          <Ship className="h-8 w-8 text-ocean-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Anglers</p>
            <p className="text-2xl font-bold text-green-600">{participants.totalAnglers}</p>
          </div>
          <Users className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toFixed(0)}</p>
          </div>
          <Download className="h-8 w-8 text-green-500" />
        </div>
      </div>
    </div>
  )

  const renderBoatsList = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Registered Boats ({participants.totalBoats})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boat Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Captain</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Crew Size</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Registration Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBoats.map((boat, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Ship className="h-5 w-5 text-ocean-500 mr-3" />
                    <span className="font-medium text-gray-900">{boat.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Crown className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-gray-900">{boat.captain.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ocean-100 text-ocean-800">
                    {boat.crew.length + 1} anglers
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                  {new Date(boat.registrationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => {
                      const registration = registrations.find(r => r.id === boat.registrationId)
                      setSelectedRegistration(registration)
                    }}
                    className="text-ocean-600 hover:text-ocean-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderAnglersList = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Registered Anglers ({participants.totalAnglers})</h3>
        <p className="text-sm text-gray-600 mt-1">
          {participants.memberAnglers} members • {participants.guestAnglers} guests
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boat</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Division</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAnglers.map((angler, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {angler.firstName} {angler.lastName}
                      </div>
                      {angler.isGuest && (
                        <div className="text-xs text-orange-600">Guest Angler</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {angler.boatName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    angler.division === 'mens' ? 'bg-blue-100 text-blue-800' :
                    angler.division === 'womens' ? 'bg-pink-100 text-pink-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {angler.division === 'mens' ? 'Men\'s' : angler.division === 'womens' ? 'Women\'s' : 'Youth'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {angler.isCaptain ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Crown className="h-3 w-3 mr-1" />
                      Captain
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">Angler</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {angler.isGuest ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Guest
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Member
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderRegistrationsList = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">All Registrations ({registrations.length})</h3>
      </div>
      <div className="space-y-4 p-4">
        {filteredRegistrations.map((registration) => (
          <div key={registration.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(registration.status)}
                  <h4 className="font-semibold text-gray-900">{registration.boatInfo.boatName}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">Captain:</p>
                    <p>{registration.captain.firstName} {registration.captain.lastName}</p>
                    <p className="flex items-center mt-1">
                      <Mail className="h-3 w-3 mr-1" />
                      {registration.captain.email}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Boat Details:</p>
                    <p>{registration.boatInfo.boatMake} {registration.boatInfo.boatModel}</p>
                    <p>{registration.boatInfo.boatLength}' • {registration.boatInfo.boatYear}</p>
                  </div>
                  <div>
                    <p className="font-medium">Registration:</p>
                    <p>{new Date(registration.registrationDate).toLocaleDateString()}</p>
                    <p className="flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {registration.anglers.length} anglers
                    </p>
                  </div>
                </div>

                {registration.payment && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Payment:</span>
                      <span className={`font-medium ${
                        registration.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        ${registration.payment.totalAmount?.toFixed(2)} • {registration.paymentStatus}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedRegistration(registration)}
                className="ml-4 text-ocean-600 hover:text-ocean-900"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className="bg-gray-50 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 border-ocean-200 animate-in slide-in-from-top-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-ocean-600 to-ocean-700 text-white border-b">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Ship className="h-8 w-8 text-ocean-100" />
              <h2 className="text-2xl font-bold">Tournament Registrations</h2>
            </div>
            <h3 className="text-lg text-ocean-100">{tournament.name}</h3>
            <p className="text-ocean-200 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'Date TBD'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-ocean-200 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 p-4 bg-white border-b">
          <button
            onClick={() => setViewMode('boats')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'boats'
                ? 'bg-ocean-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Ship className="h-4 w-4" />
            <span>Boats ({participants.totalBoats})</span>
          </button>
          <button
            onClick={() => setViewMode('anglers')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'anglers'
                ? 'bg-ocean-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Anglers ({participants.totalAnglers})</span>
          </button>
          <button
            onClick={() => setViewMode('registrations')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'registrations'
                ? 'bg-ocean-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>All Registrations ({registrations.length})</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 bg-white border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search boats, captains, or anglers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
              />
            </div>
            {viewMode === 'registrations' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 280px)' }}>
          {renderStatsCards()}
          
          {viewMode === 'boats' && renderBoatsList()}
          {viewMode === 'anglers' && renderAnglersList()}
          {viewMode === 'registrations' && renderRegistrationsList()}
        </div>
      </div>

      {/* Registration Detail Modal */}
      {selectedRegistration && (
        <RegistrationDetailModal
          registration={selectedRegistration}
          onClose={() => setSelectedRegistration(null)}
        />
      )}
    </div>
  )
}

// Registration Detail Modal Component
const RegistrationDetailModal = ({ registration, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-xl font-bold text-gray-900">Registration Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
        <div className="space-y-6">
          {/* Boat Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Boat Information</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Name:</span> {registration.boatInfo.boatName}</div>
                <div><span className="font-medium">Length:</span> {registration.boatInfo.boatLength}'</div>
                <div><span className="font-medium">Make:</span> {registration.boatInfo.boatMake}</div>
                <div><span className="font-medium">Model:</span> {registration.boatInfo.boatModel}</div>
              </div>
            </div>
          </div>

          {/* Captain Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Captain Information</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="text-sm">
                <div><span className="font-medium">Name:</span> {registration.captain.firstName} {registration.captain.lastName}</div>
                <div><span className="font-medium">Email:</span> {registration.captain.email}</div>
                <div><span className="font-medium">Phone:</span> {registration.captain.phone}</div>
              </div>
            </div>
          </div>

          {/* Anglers */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Crew ({registration.anglers.length})</h4>
            <div className="space-y-2">
              {registration.anglers.map((angler, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium">{angler.firstName} {angler.lastName}</div>
                      <div className="text-gray-600">{angler.division} • {angler.shirtSize}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {angler.isCaptain && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Crown className="h-3 w-3 mr-1" />
                          Captain
                        </span>
                      )}
                      {angler.isGuest && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Guest
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          {registration.payment && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Entry Fee:</span> ${registration.payment.entryFee?.toFixed(2)}</div>
                  <div><span className="font-medium">Processing Fee:</span> ${registration.payment.processingFee?.toFixed(2)}</div>
                  <div><span className="font-medium">Total:</span> ${registration.payment.totalAmount?.toFixed(2)}</div>
                  <div><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      registration.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {registration.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default TournamentRegistrationList
