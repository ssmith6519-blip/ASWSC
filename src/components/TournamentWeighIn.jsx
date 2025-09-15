import React, { useState, useEffect } from 'react'
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
  AlertCircle,
  Fish,
  Scale,
  Ruler,
  Plus,
  Save,
  Trophy,
  Lock,
  Shield,
  Target
} from 'lucide-react'
import { useRegistrations } from '../hooks/useRegistrations'
import { useTournaments } from '../hooks/useTournaments'
import { useAuth } from '../contexts/AuthContext'
import { useScoringMatrices } from '../hooks/useScoringMatrices'
import { 
  calculateFishScore, 
  calculateAnglerScore, 
  calculateBoatScore 
} from '../data/scoringMatrices'

const TournamentWeighIn = ({ tournamentId, onClose }) => {
  const { getTournamentParticipants, getRegistrationsByTournament, getRegistrationStats } = useRegistrations()
  const { getTournamentById } = useTournaments()
  const { user, canManageWeighIn, isAdmin, isTournamentDirector } = useAuth()
  const { getScoringMatrix } = useScoringMatrices()
  const [selectedBoat, setSelectedBoat] = useState(null)
  const [weighInEntries, setWeighInEntries] = useState({}) // Store weigh-in data by boat ID
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDay, setSelectedDay] = useState(1) // Current tournament day
  const [activeView, setActiveView] = useState('leaderboard') // 'boats' or 'leaderboard'
  const [leaderboardTab, setLeaderboardTab] = useState('boats') // 'boats' or 'anglers'

  const tournament = getTournamentById(tournamentId)
  const participants = getTournamentParticipants(tournamentId)
  const registrations = getRegistrationsByTournament(tournamentId)
  const stats = getRegistrationStats(tournamentId)

  // Check if current user can manage weigh-in for this tournament
  const canEdit = canManageWeighIn(tournament)

  // Get fish categories from scoring matrix
  const scoringMatrix = getScoringMatrix(tournament?.division || 'nearshore')
  const fishCategories = Object.keys(scoringMatrix || {}).map(categoryId => ({
    id: categoryId,
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/([A-Z])/g, ' $1'),
    icon: categoryId === 'mackerel' ? '🐟' : 
          categoryId === 'snapper' ? '🐠' : 
          categoryId === 'grouper' ? '🐡' : 
          categoryId === 'cobia' ? '🐟' :
          categoryId === 'bluefish' ? '🐟' :
          categoryId === 'barracuda' ? '🐟' :
          categoryId === 'blackdrum' ? '🥁' :
          categoryId === 'bonefish' ? '🦴' :
          categoryId === 'flounder' ? '🐟' :
          categoryId === 'permit' ? '🐠' :
          categoryId === 'pompano' ? '🐠' :
          categoryId === 'redfish' ? '🔴' :
          categoryId === 'sheepshead' ? '🐑' :
          categoryId === 'snook' ? '🐟' :
          categoryId === 'stripedbass' ? '🐟' :
          categoryId === 'triggerfish' ? '🐠' :
          categoryId === 'tripletail' ? '🐟' :
          categoryId === 'trout' ? '🐟' :
          categoryId === 'tarpon' ? '🐠' :
          categoryId === 'kingfish' ? '🐟' :
          categoryId === 'wahoo' ? '🐟' :
          categoryId === 'mahi' ? '🐠' :
          categoryId === 'tuna' ? '🐟' :
          categoryId === 'billfish' ? '🗡️' :
          categoryId === 'shark' ? '🦈' :
          categoryId === 'amberjack' ? '🐟' :
          categoryId === 'dolphin' ? '🐠' :
          categoryId === 'porgy' ? '🐟' :
          categoryId === 'seabass' ? '🐟' :
          categoryId === 'seatrout' ? '🐟' :
          categoryId === 'marlinblue' ? '🗡️' :
          categoryId === 'marlinwhite' ? '🗡️' :
          categoryId === 'sailfish' ? '⛵' :
          categoryId === 'swordfish' ? '🗡️' :
          '🎣'
  }))

  // Zip tie colors for offshore tournaments
  const zipTieColors = [
    { id: 'red', name: 'Red', color: '#DC2626', textColor: 'text-red-600' },
    { id: 'blue', name: 'Blue', color: '#2563EB', textColor: 'text-blue-600' },
    { id: 'green', name: 'Green', color: '#16A34A', textColor: 'text-green-600' },
    { id: 'yellow', name: 'Yellow', color: '#CA8A04', textColor: 'text-yellow-600' },
    { id: 'orange', name: 'Orange', color: '#EA580C', textColor: 'text-orange-600' },
    { id: 'purple', name: 'Purple', color: '#9333EA', textColor: 'text-purple-600' },
    { id: 'pink', name: 'Pink', color: '#DB2777', textColor: 'text-pink-600' },
    { id: 'white', name: 'White', color: '#FFFFFF', textColor: 'text-gray-800', border: 'border-gray-300' },
    { id: 'black', name: 'Black', color: '#000000', textColor: 'text-gray-900' }
  ]

  // Check if this is an offshore tournament
  const isOffshoreTournament = tournament?.division === 'offshore'

  // Calculate tournament days
  const getTournamentDays = () => {
    if (!tournament?.startDate || !tournament?.endDate) return 1
    
    const startDate = new Date(tournament.startDate)
    const endDate = new Date(tournament.endDate)
    const diffTime = Math.abs(endDate - startDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // Absolute difference in days
    
    return Math.max(1, diffDays) // Minimum 1 day for same-day tournaments
  }

  const tournamentDays = getTournamentDays()
  const isMultiDay = tournamentDays > 1

  // Load weigh-in data from localStorage on component mount
  useEffect(() => {
    const storageKey = `aswsc_weigh_in_${tournamentId}`
    try {
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        console.log(`🔄 Loading weigh-in data for ${tournamentId}:`, parsedData)
        setWeighInEntries(parsedData)
      } else {
        console.log(`📭 No weigh-in data found for ${tournamentId}`)
      }
    } catch (error) {
      console.warn('Error loading weigh-in data from localStorage:', error)
    }
  }, [tournamentId])

  // Listen for weighInUpdated events (from test data loading)
  useEffect(() => {
    const handleWeighInUpdate = (event) => {
      const { tournamentId: eventTournamentId, weighInEntries: eventData } = event.detail
      if (eventTournamentId === tournamentId) {
        console.log(`🎣 Received weighInUpdated event for ${tournamentId}:`, eventData)
        // Only update if we actually have data (don't overwrite with empty data)
        if (eventData && Object.keys(eventData).length > 0) {
          setWeighInEntries(eventData)
        } else {
          console.log(`⚠️ Ignoring empty weighInUpdated event for ${tournamentId}`)
        }
      }
    }

    window.addEventListener('weighInUpdated', handleWeighInUpdate)
    return () => window.removeEventListener('weighInUpdated', handleWeighInUpdate)
  }, [tournamentId])

  // Save weigh-in data to localStorage whenever it changes (but don't overwrite with empty data)
  useEffect(() => {
    const storageKey = `aswsc_weigh_in_${tournamentId}`
    try {
      // Only save if we have actual data, or if we're explicitly clearing
      const hasData = weighInEntries && Object.keys(weighInEntries).length > 0
      const existingData = localStorage.getItem(storageKey)
      
      if (hasData || !existingData) {
        localStorage.setItem(storageKey, JSON.stringify(weighInEntries))
        console.log(`💾 Saving weigh-in data for ${tournamentId}:`, weighInEntries)
        
        // Dispatch custom event for annual standings to listen to
        window.dispatchEvent(new CustomEvent('weighInUpdated', {
          detail: { tournamentId, weighInEntries }
        }))
      } else {
        console.log(`⚠️ Skipping save of empty data for ${tournamentId} (preserving existing data)`)
      }
    } catch (error) {
      console.warn('Error saving weigh-in data to localStorage:', error)
    }
  }, [weighInEntries, tournamentId])

  if (!tournament) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tournament Not Found</h3>
      </div>
    )
  }

  const filteredBoats = participants.boats.filter(boat =>
    searchQuery === '' ||
    boat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    boat.captain.name.toLowerCase().includes(searchQuery.toLowerCase())
  )


  // Check if category limit is reached (4 fish per category per boat per day)
  const getCategoryCount = (boatId, category) => {
    const boatEntries = weighInEntries[boatId] || []
    return boatEntries.filter(entry => 
      entry.tournamentDay === selectedDay && 
      entry.category === category
    ).length
  }

  const canAddToCategory = (boatId, category) => {
    return getCategoryCount(boatId, category) < 4
  }

  // Calculate points for a fish entry
  const calculateEntryPoints = (entry) => {
    if (!entry.category || (!entry.weight && !entry.length)) return 0
    
    try {
      const scoringMatrix = getScoringMatrix(tournament?.division)
      return calculateFishScore(tournament, entry, scoringMatrix)
    } catch (err) {
      console.warn('Error calculating points:', err)
      return 0
    }
  }

  // Calculate total points for an angler on a specific day
  const calculateAnglerDayPoints = (anglerId, day) => {
    const allEntries = Object.values(weighInEntries).flat()
    const anglerEntries = allEntries.filter(entry => 
      entry.anglerId === anglerId && entry.tournamentDay === day
    )
    
    return anglerEntries.reduce((total, entry) => {
      return total + calculateEntryPoints(entry)
    }, 0)
  }

  // Calculate total points for a boat on a specific day
  const calculateBoatDayPoints = (boatId, day) => {
    const boatEntries = weighInEntries[boatId] || []
    const dayEntries = boatEntries.filter(entry => entry.tournamentDay === day)
    
    return dayEntries.reduce((total, entry) => {
      return total + calculateEntryPoints(entry)
    }, 0)
  }

  // Generate current leaderboard data
  const generateCurrentLeaderboard = () => {
    if (!participants?.boats) return { boatLeaderboard: [], anglerLeaderboard: [] }

    // Calculate boat standings
    const boatLeaderboard = participants.boats.map(boat => {
      const boatEntries = weighInEntries[boat.registrationId] || []
      const totalPoints = boatEntries.reduce((total, entry) => total + calculateEntryPoints(entry), 0)
      const dailyPoints = calculateBoatDayPoints(boat.registrationId, selectedDay)
      
      return {
        boat,
        totalPoints,
        dailyPoints,
        fishCount: boatEntries.length,
        dailyFishCount: boatEntries.filter(entry => entry.tournamentDay === selectedDay).length
      }
    }).sort((a, b) => b.totalPoints - a.totalPoints) // Sort by highest points first

    // Calculate angler standings
    const anglerLeaderboard = []
    participants.boats.forEach(boat => {
      const boatEntries = weighInEntries[boat.registrationId] || []
      
      // Add captain
      const captainEntries = boatEntries.filter(entry => entry.anglerId === 'captain')
      if (captainEntries.length > 0) {
        const captainPoints = captainEntries.reduce((total, entry) => total + calculateEntryPoints(entry), 0)
        anglerLeaderboard.push({
          angler: { ...boat.captain, role: 'Captain', isClubMember: boat.captain.isClubMember },
          boat: boat.name,
          totalPoints: captainPoints,
          fishCount: captainEntries.length
        })
      }
      
      // Add crew
      boat.crew.forEach((crew, index) => {
        const crewId = `crew-${index}`
        const crewEntries = boatEntries.filter(entry => entry.anglerId === crewId)
        if (crewEntries.length > 0) {
          const crewPoints = crewEntries.reduce((total, entry) => total + calculateEntryPoints(entry), 0)
          anglerLeaderboard.push({
            angler: { ...crew, role: 'Crew', isClubMember: crew.isClubMember },
            boat: boat.name,
            totalPoints: crewPoints,
            fishCount: crewEntries.length
          })
        }
      })
    })
    
    anglerLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints) // Sort by highest points first

    return { boatLeaderboard, anglerLeaderboard }
  }

  const updateWeighInEntry = (boatId, entryId, field, value) => {
    setWeighInEntries(prev => ({
      ...prev,
      [boatId]: prev[boatId]?.map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      ) || []
    }))
  }

  const removeWeighInEntry = (boatId, entryId) => {
    setWeighInEntries(prev => ({
      ...prev,
      [boatId]: prev[boatId]?.filter(entry => entry.id !== entryId) || []
    }))
  }

  // New Fish Form Component
  const NewFishForm = ({ selectedBoat, allAnglers, fishCategories, isOffshoreTournament, zipTieColors, getCategoryCount, canAddToCategory, onAddFish }) => {
    const [formData, setFormData] = useState({
      anglerId: '',
      category: '',
      species: '',
      weight: '',
      length: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      if (!formData.anglerId || !formData.category) {
        alert('Please select an angler and category')
        return
      }
      
      // Check category limit
      if (!canAddToCategory(selectedBoat.registrationId, formData.category)) {
        alert(`Cannot add more fish to ${fishCategories.find(c => c.id === formData.category)?.name} category. Limit is 4 fish per category per day.`)
        return
      }

      onAddFish(formData)
      
      // Reset form but keep angler selected for convenience
      setFormData(prev => ({
        anglerId: prev.anglerId, // Keep angler selected
        category: '',
        species: '',
        weight: '',
        length: ''
      }))
    }

    const updateFormData = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Angler Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Angler *</label>
            <select
              value={formData.anglerId}
              onChange={(e) => updateFormData('anglerId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Angler</option>
              {allAnglers.map(angler => {
                const memberIcon = angler.isClubMember ? '🏆' : '👥'
                const roleText = angler.role === 'Captain' ? ' (Captain)' : ''
                const zipTieText = isOffshoreTournament && angler.zipTieColor 
                  ? ` • ${zipTieColors.find(c => c.id === angler.zipTieColor)?.name || angler.zipTieColor}` 
                  : ''
                
                return (
                  <option key={angler.id} value={angler.id}>
                    {memberIcon} {angler.name}{roleText}{zipTieText}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Fish Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              {fishCategories.map(category => {
                const count = getCategoryCount(selectedBoat.registrationId, category.id)
                const isAtLimit = count >= 4
                return (
                  <option key={category.id} value={category.id} disabled={isAtLimit}>
                    {category.icon} {category.name} ({count}/4)
                    {isAtLimit ? ' - LIMIT REACHED' : ''}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Species */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
            <input
              type="text"
              value={formData.species}
              onChange={(e) => updateFormData('species', e.target.value)}
              placeholder="e.g., King Mackerel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => updateFormData('weight', e.target.value)}
                placeholder="0.0"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Length (in)</label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                step="0.1"
                value={formData.length}
                onChange={(e) => updateFormData('length', e.target.value)}
                placeholder="0.0"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Fish</span>
          </button>
        </div>
      </form>
    )
  }

  const renderBoatsList = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold text-gray-900">Select Boat for Weigh-In</h3>
        <p className="text-sm text-gray-600 mt-1">
          Choose a boat to record fish entries {isMultiDay ? `for Day ${selectedDay}` : ''}
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBoats.map((boat, index) => {
            const allBoatEntries = weighInEntries[boat.registrationId] || []
            const dailyEntries = allBoatEntries.filter(entry => entry.tournamentDay === selectedDay)
            const totalEntries = allBoatEntries.length
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Ship className="h-6 w-6 text-ocean-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{boat.name}</h4>
                      <p className="text-sm text-gray-600">
                        <Crown className="h-3 w-3 inline mr-1 text-yellow-500" />
                        {boat.captain.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-ocean-100 text-ocean-800">
                        {boat.crew.length + 1} anglers
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {isMultiDay ? `${dailyEntries.length} today` : `${dailyEntries.length} entries`}
                      </span>
                    </div>
                    
                    {/* Points Display */}
                    <div className="flex items-center justify-end space-x-2 mb-2">
                      {isMultiDay && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Trophy className="h-3 w-3 mr-1" />
                          Day {selectedDay}: {calculateBoatDayPoints(boat.registrationId, selectedDay)} pts
                        </span>
                      )}
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Target className="h-3 w-3 mr-1" />
                        Total: {(weighInEntries[boat.registrationId] || []).reduce((total, entry) => total + calculateEntryPoints(entry), 0)} pts
                      </span>
                    </div>
                    
                    {isMultiDay && totalEntries > 0 && (
                      <p className="text-xs text-gray-500">{totalEntries} total entries</p>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedBoat(boat)}
                  disabled={!canEdit}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    canEdit 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canEdit ? <Fish className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span>{canEdit ? 'Start Weigh-In' : 'View Entries'}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderWeighInForm = () => {
    if (!selectedBoat) return null

    const allBoatEntries = weighInEntries[selectedBoat.registrationId] || []
    // Filter entries by selected day
    const boatEntries = allBoatEntries.filter(entry => entry.tournamentDay === selectedDay)
    const allAnglers = [
      { 
        id: 'captain', 
        name: selectedBoat.captain.name, 
        role: 'Captain',
        zipTieColor: selectedBoat.captain.zipTieColor,
        memberId: selectedBoat.captain.memberId,
        isClubMember: selectedBoat.captain.isClubMember
      },
      ...selectedBoat.crew.map((crew, index) => ({ 
        id: `crew-${index}`, 
        name: crew.name, 
        role: 'Crew',
        zipTieColor: crew.zipTieColor,
        memberId: crew.memberId,
        isClubMember: crew.isClubMember,
        isGuest: crew.isGuest
      }))
    ]

    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b bg-ocean-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Ship className="h-6 w-6 text-ocean-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedBoat.name}</h3>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-gray-600">Captain: {selectedBoat.captain.name}</p>
                  {isMultiDay && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Day {selectedDay}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedBoat(null)}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
                <span>Back to Boats</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Limits Display */}
        <div className="p-4 border-b bg-gray-50">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Category Limits</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {fishCategories.map(category => {
              const count = getCategoryCount(selectedBoat.registrationId, category.id)
              const isAtLimit = count >= 4
              return (
                <div key={category.id} className={`p-3 rounded-lg border ${
                  isAtLimit ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${
                      isAtLimit ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {count}/4 fish
                    </span>
                    {isAtLimit && (
                      <span className="text-xs text-red-500 font-medium">LIMIT REACHED</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Always Available New Fish Form */}
        {canEdit && (
          <div className="p-4 border-b bg-blue-50">
            <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-600" />
              <span>Add New Fish</span>
            </h4>
            <NewFishForm 
              selectedBoat={selectedBoat}
              allAnglers={allAnglers}
              fishCategories={fishCategories}
              isOffshoreTournament={isOffshoreTournament}
              zipTieColors={zipTieColors}
              getCategoryCount={getCategoryCount}
              canAddToCategory={canAddToCategory}
              onAddFish={(fishData) => {
                const newEntry = {
                  id: Date.now() + Math.random(),
                  tournamentDay: selectedDay,
                  timestamp: new Date().toISOString(),
                  ...fishData
                }
                setWeighInEntries(prev => ({
                  ...prev,
                  [selectedBoat.registrationId]: [newEntry, ...(prev[selectedBoat.registrationId] || [])]
                }))
              }}
            />
          </div>
        )}

        {/* Weigh-In Entries */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-semibold text-gray-900">
              Weigh-In Entries ({boatEntries.length}
              {isMultiDay ? ` for Day ${selectedDay}` : ''})
            </h4>
            {boatEntries.length > 0 && canEdit && (
              <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                <Save className="h-4 w-4" />
                <span>Save All</span>
              </button>
            )}
          </div>

          {boatEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500 px-4">
              <Fish className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900 mb-2">No fish entries yet</p>
              <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Click "Add Fish" to record a fish entry for this boat
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Show all fish entries */}
              {boatEntries.map((entry, entryIndex) => {
                const angler = allAnglers.find(a => a.id === entry.anglerId)
                const categoryInfo = fishCategories.find(c => c.id === entry.category)
                
                return (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Fish className="h-5 w-5 text-ocean-500" />
                        <div>
                          <h5 className="font-semibold text-gray-900">Fish Entry #{entryIndex + 1}</h5>
                          <p className="text-xs text-gray-500">
                            Added {new Date(entry.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      {canEdit && (
                        <button
                          onClick={() => removeWeighInEntry(selectedBoat.registrationId, entry.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Angler Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Angler</label>
                        <select
                          value={entry.anglerId}
                          onChange={(e) => updateWeighInEntry(selectedBoat.registrationId, entry.id, 'anglerId', e.target.value)}
                          disabled={!canEdit}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                            canEdit 
                              ? 'focus:ring-2 focus:ring-ocean-500 focus:border-transparent' 
                              : 'bg-gray-100 cursor-not-allowed'
                          }`}
                        >
                          <option value="">Select Angler</option>
                          {allAnglers.map(angler => (
                            <option key={angler.id} value={angler.id}>
                              {angler.role === 'Captain' ? '👑 ' : '👤 '}{angler.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Fish Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={entry.category}
                          onChange={(e) => {
                            const newCategory = e.target.value
                            // Check if adding to this category would exceed limit
                            if (newCategory && entry.category !== newCategory && !canAddToCategory(selectedBoat.registrationId, newCategory)) {
                              alert(`Cannot add more fish to ${fishCategories.find(c => c.id === newCategory)?.name} category. Limit is 4 fish per category per day.`)
                              return
                            }
                            updateWeighInEntry(selectedBoat.registrationId, entry.id, 'category', newCategory)
                          }}
                          disabled={!canEdit}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                            canEdit 
                              ? 'focus:ring-2 focus:ring-ocean-500 focus:border-transparent' 
                              : 'bg-gray-100 cursor-not-allowed'
                          }`}
                        >
                          <option value="">Select Category</option>
                          {fishCategories.map(category => {
                            const count = getCategoryCount(selectedBoat.registrationId, category.id)
                            const isAtLimit = count >= 4 && entry.category !== category.id
                            return (
                              <option key={category.id} value={category.id} disabled={isAtLimit}>
                                {category.icon} {category.name} ({count}/4)
                                {isAtLimit ? ' - LIMIT REACHED' : ''}
                              </option>
                            )
                          })}
                        </select>
                      </div>

                      {/* Species */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                        <input
                          type="text"
                          value={entry.species}
                          onChange={(e) => updateWeighInEntry(selectedBoat.registrationId, entry.id, 'species', e.target.value)}
                          placeholder="e.g., King Mackerel"
                          disabled={!canEdit}
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                            canEdit 
                              ? 'focus:ring-2 focus:ring-ocean-500 focus:border-transparent' 
                              : 'bg-gray-100 cursor-not-allowed'
                          }`}
                        />
                      </div>

                      {/* Weight */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                        <div className="relative">
                          <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            value={entry.weight}
                            onChange={(e) => updateWeighInEntry(selectedBoat.registrationId, entry.id, 'weight', e.target.value)}
                            placeholder="0.0"
                            disabled={!canEdit}
                            className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md ${
                              canEdit 
                                ? 'focus:ring-2 focus:ring-ocean-500 focus:border-transparent' 
                                : 'bg-gray-100 cursor-not-allowed'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Length */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Length (in)</label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            value={entry.length}
                            onChange={(e) => updateWeighInEntry(selectedBoat.registrationId, entry.id, 'length', e.target.value)}
                            placeholder="0.0"
                            disabled={!canEdit}
                            className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md ${
                              canEdit 
                                ? 'focus:ring-2 focus:ring-ocean-500 focus:border-transparent' 
                                : 'bg-gray-100 cursor-not-allowed'
                            }`}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Show selected angler info */}
                    {angler && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap">
                          {angler.role === 'Captain' ? (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <User className="h-4 w-4 text-gray-500" />
                          )}
                          <span>Caught by: <strong>{angler.name}</strong> ({angler.role})</span>
                          
                          {/* Member Status Indicator */}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            angler.isClubMember 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {angler.isClubMember ? '🏆 Member' : '👥 Guest'}
                          </span>

                          {/* Zip Tie Color for Offshore Tournaments */}
                          {isOffshoreTournament && angler.zipTieColor && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <div 
                                className={`w-3 h-3 rounded-full mr-1 ${
                                  angler.zipTieColor === 'white' ? 'border border-gray-400' : ''
                                }`}
                                style={{ 
                                  backgroundColor: zipTieColors.find(c => c.id === angler.zipTieColor)?.color 
                                }}
                              ></div>
                              {zipTieColors.find(c => c.id === angler.zipTieColor)?.name} Tie
                            </span>
                          )}
                          
                          {categoryInfo && (
                            <span className="ml-4">
                              Category: <strong>{categoryInfo.icon} {categoryInfo.name}</strong>
                            </span>
                          )}

                          {/* Points Display */}
                          {(entry.weight || entry.length) && entry.category && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Trophy className="h-3 w-3 mr-1" />
                              {calculateEntryPoints(entry)} points
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderLeaderboard = () => {
    const { boatLeaderboard, anglerLeaderboard } = generateCurrentLeaderboard()
    
    return (
      <div className="space-y-6">
        {/* Tournament Summary */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Live Tournament Leaderboard</h3>
              <p className="text-green-100">
                {tournament.name} • {tournament.division === 'offshore' ? 'Weight-based' : 'Length-based'} Scoring
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {Object.values(weighInEntries).flat().length}
              </div>
              <div className="text-green-100 text-sm">Total Fish Entered</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLeaderboardTab('boats')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              leaderboardTab === 'boats'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Ship className="h-4 w-4 inline mr-2" />
            Boat Standings
          </button>
          <button
            onClick={() => setLeaderboardTab('anglers')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              leaderboardTab === 'anglers'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Angler Standings
          </button>
        </div>

        {/* Boat Leaderboard */}
        {leaderboardTab === 'boats' && (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900">Boat Standings</h4>
              <p className="text-sm text-gray-600">Ranked by total tournament points</p>
            </div>
            <div className="divide-y divide-gray-200">
              {boatLeaderboard.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No fish entries yet. Start weighing in to see the leaderboard!</p>
                </div>
              ) : (
                boatLeaderboard.map((entry, index) => (
                  <div key={entry.boat.registrationId} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{entry.boat.name}</h5>
                          <p className="text-sm text-gray-600">
                            <Crown className="h-3 w-3 inline mr-1 text-yellow-500" />
                            {entry.boat.captain.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{entry.totalPoints}</div>
                            <div className="text-xs text-gray-500">Total Points</div>
                          </div>
                          {isMultiDay && (
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">{entry.dailyPoints}</div>
                              <div className="text-xs text-gray-500">Day {selectedDay}</div>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-600">{entry.fishCount}</div>
                            <div className="text-xs text-gray-500">Fish</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Angler Leaderboard */}
        {leaderboardTab === 'anglers' && (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900">Angler Standings</h4>
              <p className="text-sm text-gray-600">Individual angler points (club members only eligible for annual standings)</p>
            </div>
            <div className="divide-y divide-gray-200">
              {anglerLeaderboard.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No individual entries yet. Start weighing in to see angler standings!</p>
                </div>
              ) : (
                anglerLeaderboard.map((entry, index) => (
                  <div key={`${entry.angler.name}-${entry.boat}`} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h5 className="font-semibold text-gray-900">{entry.angler.name}</h5>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              entry.angler.isClubMember 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {entry.angler.isClubMember ? '🏆 Member' : '👥 Guest'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {entry.angler.role === 'Captain' ? (
                              <Crown className="h-3 w-3 inline mr-1 text-yellow-500" />
                            ) : (
                              <User className="h-3 w-3 inline mr-1 text-gray-500" />
                            )}
                            {entry.angler.role} • {entry.boat}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{entry.totalPoints}</div>
                            <div className="text-xs text-gray-500">Points</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-600">{entry.fishCount}</div>
                            <div className="text-xs text-gray-500">Fish</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
      <div className="bg-gray-50 rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden border-2 border-ocean-200 animate-in slide-in-from-top-4 duration-300 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-700 text-white border-b">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Fish className="h-8 w-8 text-green-100" />
              <h2 className="text-2xl font-bold">Tournament Weigh-In</h2>
            </div>
            <h3 className="text-lg text-green-100">{tournament.name}</h3>
            <p className="text-green-200 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'Date TBD'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-green-200 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Permission Banner */}
        {!canEdit && (
          <div className="bg-yellow-50 border-b border-yellow-200 p-4">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Read-Only Access</p>
                <p className="text-xs text-yellow-700">
                  Only tournament directors and administrators can enter weigh-in data.
                  {user ? ` Logged in as: ${user.name}` : ' Please log in with appropriate permissions.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* User Info Banner for Authorized Users */}
        {canEdit && (
          <div className="bg-green-50 border-b border-green-200 p-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {isAdmin() ? 'Administrator Access' : 'Tournament Director Access'}
                </p>
                <p className="text-xs text-green-700">
                  You have permission to enter and modify weigh-in data. Logged in as: {user?.name}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Day Navigation - Only for multi-day tournaments */}
        {isMultiDay && (
          <div className="bg-white border-b">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg font-semibold text-gray-900">Tournament Days</h3>
              <div className="flex space-x-1">
                {Array.from({ length: tournamentDays }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDay === day
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Day {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveView('boats')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'boats'
                    ? 'bg-ocean-100 text-ocean-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Ship className="h-4 w-4 inline mr-2" />
                Boats & Weigh-In
              </button>
              <button
                onClick={() => setActiveView('leaderboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'leaderboard'
                    ? 'bg-ocean-100 text-ocean-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Trophy className="h-4 w-4 inline mr-2" />
                Live Leaderboard
              </button>
            </div>
            
            {/* Search Bar - Only show for boats view */}
            {activeView === 'boats' && (
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search boats or captains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
              </div>
            )}
            
            {activeView === 'boats' && isMultiDay && (
              <div className="text-sm text-gray-600">
                Viewing entries for <span className="font-semibold text-green-600">Day {selectedDay}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 280px)' }}>
          {activeView === 'leaderboard' ? (
            /* Leaderboard View - Full Width */
            <div className="max-w-6xl mx-auto">
              {renderLeaderboard()}
            </div>
          ) : selectedBoat ? (
            /* Weigh-In Form - Full Width */
            <div className="max-w-6xl mx-auto">
              {renderWeighInForm()}
            </div>
          ) : (
            /* Boats List - Full Width */
            <div className="max-w-4xl mx-auto">
              {renderBoatsList()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TournamentWeighIn
