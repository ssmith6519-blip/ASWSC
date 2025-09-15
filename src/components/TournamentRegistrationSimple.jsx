import React, { useState } from 'react'
import { useMembers } from '../hooks/useMembers'
import { useRegistrations } from '../hooks/useRegistrations'
import { useTournaments } from '../hooks/useTournaments'
import { TOURNAMENT_DIVISIONS } from '../data/tournamentData'
import { getAvailableBoats, isMemberEligibleForTournament } from '../utils/memberBoatUtils'
import BoatSelector from './BoatSelector'
import CrewMemberSelector from './CrewMemberSelector'
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  X,
  DollarSign,
  Ship,
  User,
  Plus,
  Trash2,
  Crown,
  Trophy
} from 'lucide-react'

const TournamentRegistrationSimple = ({ tournamentId, onClose, onSuccess }) => {
  const { members } = useMembers()
  const { createRegistration, processPayment, calculateRegistrationFees } = useRegistrations()
  const { getTournamentById } = useTournaments()
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [selectedBoat, setSelectedBoat] = useState(null)
  const [crewMembers, setCrewMembers] = useState([])
  const [zipTieColors, setZipTieColors] = useState({})
  const [awardsDinnerCount, setAwardsDinnerCount] = useState(0)
  
  const tournament = getTournamentById(tournamentId)
  const availableBoats = getAvailableBoats(members)
  const isOffshore = tournament?.division === TOURNAMENT_DIVISIONS.OFFSHORE
  
  const [formData, setFormData] = useState({
    tournamentId,
    boatInfo: {
      boatName: '',
      boatLength: '28',
      boatMake: 'Grady-White',
      boatModel: 'Canyon 288',
      boatYear: '2022',
      hullNumber: 'GW123456789',
      captainLicense: 'FL-123456',
      insurance: {
        company: 'Progressive Marine',
        policyNumber: 'PM-789123',
        expirationDate: '2025-12-31'
      }
    },
    captain: {
      memberId: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: 'Spouse'
      }
    },
    anglers: [{
      memberId: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isCaptain: true,
      division: 'mens',
      shirtSize: 'L',
      isGuest: false
    }],
    additionalInfo: {
      specialRequests: '',
      dietaryRestrictions: '',
      previousParticipation: false,
      howHeardAbout: 'club_member'
    },
    agreements: {
      liabilityWaiver: false,
      rulesAgreement: false,
      photoRelease: false,
      emailOptIn: true
    }
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: '4242424242424242',
    expiryMonth: '12',
    expiryYear: '2025',
    cvv: '123',
    nameOnCard: '',
    billingAddress: {
      street: '123 Main St',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30309'
    }
  })

  if (!tournament) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tournament Not Found</h3>
            <p className="text-gray-600 mb-4">The selected tournament could not be found.</p>
            <button onClick={onClose} className="btn-primary">Close</button>
          </div>
        </div>
      </div>
    )
  }

  const fees = calculateRegistrationFees(tournament, formData.anglers.length, awardsDinnerCount)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value

    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: inputValue
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: inputValue }))
    }
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({ ...prev, [name]: value }))
  }

  const handleBoatSelect = (boat) => {
    setSelectedBoat(boat)
    
    // Find the boat owner member data
    const boatOwner = members.find(m => m.id === boat.memberId)
    
    // Initialize captain as first crew member
    const captain = {
      id: 'captain',
      memberId: boat.memberId,
      firstName: boatOwner?.memberName.first || '',
      lastName: boatOwner?.memberName.last || '',
      email: boatOwner?.email || '',
      phone: boatOwner?.phone || '',
      isCaptain: true,
      isGuest: false,
      division: 'mens',
      shirtSize: 'L'
    }
    
    setCrewMembers([captain])
    
    // Set captain zip tie color to black for offshore tournaments
    if (isOffshore) {
      setZipTieColors({ captain: 'black' })
    }
    
    setFormData(prev => ({
      ...prev,
      boatInfo: {
        ...prev.boatInfo,
        boatName: boat.boatName,
        boatMake: boat.boatMake,
        boatModel: boat.boatModel,
        boatYear: boat.boatYear,
        boatLength: boat.boatLength
      },
      captain: {
        ...prev.captain,
        memberId: boat.memberId,
        firstName: boatOwner?.memberName.first || '',
        lastName: boatOwner?.memberName.last || '',
        email: boatOwner?.email || '',
        phone: boatOwner?.phone || ''
      }
    }))
    
    // Clear boat selection error if one exists
    if (errors.boatSelection) {
      setErrors(prev => ({ ...prev, boatSelection: undefined }))
    }
  }

  const addCrewMember = () => {
    if (crewMembers.length < 6) {
      const newMemberId = `crew-${Date.now()}`
      setCrewMembers(prev => [...prev, {
        id: newMemberId,
        memberId: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isCaptain: false,
        isGuest: false,
        division: 'mens',
        shirtSize: 'L'
      }])
    }
  }

  const removeCrewMember = (memberId) => {
    setCrewMembers(prev => prev.filter(member => member.id !== memberId))
    setZipTieColors(prev => {
      const updated = { ...prev }
      delete updated[memberId]
      return updated
    })
  }

  const updateCrewMember = (memberId, memberData) => {
    setCrewMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, ...memberData } : member
    ))

    // Auto-assign zip tie color for offshore tournaments when crew member is added
    if (isOffshore && memberData.firstName && memberData.lastName && !zipTieColors[memberId]) {
      const usedColors = getUsedZipTieColors(memberId)
      const zipTieColor = memberData.isCaptain ? 'black' : getNextAvailableZipTieColor(usedColors)
      if (zipTieColor) {
        setZipTieColors(prev => ({
          ...prev,
          [memberId]: zipTieColor
        }))
      }
    }
  }

  const getNextAvailableZipTieColor = (usedColors) => {
    const availableColors = ['white', 'yellow', 'red', 'blue', 'orange', 'green']
    return availableColors.find(color => !usedColors.includes(color)) || null
  }

  const handleZipTieColorChange = (memberId, colorId) => {
    setZipTieColors(prev => ({
      ...prev,
      [memberId]: colorId
    }))
  }

  const getUsedZipTieColors = (excludeMemberId = null) => {
    return Object.entries(zipTieColors)
      .filter(([id]) => id !== excludeMemberId)
      .map(([, color]) => color)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!selectedBoat) newErrors.boatSelection = 'Please select a boat from the dropdown'
    if (!formData.captain.firstName.trim()) newErrors.captainFirstName = 'Captain first name required'
    if (!formData.captain.lastName.trim()) newErrors.captainLastName = 'Captain last name required'
    if (!formData.captain.email.trim()) newErrors.captainEmail = 'Captain email required'
    if (!formData.agreements.liabilityWaiver) newErrors.liabilityWaiver = 'Liability waiver must be accepted'
    if (!formData.agreements.rulesAgreement) newErrors.rulesAgreement = 'Rules agreement must be accepted'
    if (!paymentData.cardNumber.trim()) newErrors.cardNumber = 'Card number required'
    if (!paymentData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card required'
    
    // Validate crew members
    if (crewMembers.length === 0) {
      newErrors.crewMembers = 'At least the captain must be registered'
    }
    
    // Validate zip tie colors for offshore tournaments
    if (isOffshore) {
      const incompleteZipTies = crewMembers.filter(member => 
        member.firstName && member.lastName && !zipTieColors[member.id]
      )
      if (incompleteZipTies.length > 0) {
        newErrors.zipTieColors = 'Zip tie colors for fish tagging could not be automatically assigned. Please try re-selecting crew members.'
      }
    }
    
    // Check if selected boat owner is eligible
    if (selectedBoat) {
      const boatOwner = members.find(m => m.id === selectedBoat.memberId)
      if (!isMemberEligibleForTournament(boatOwner)) {
        newErrors.memberEligibility = 'Selected boat owner is not in good standing and cannot register for tournaments'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      // Convert crew members to anglers format with zip tie colors
      const anglers = crewMembers.map(member => ({
        memberId: member.memberId,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
        isCaptain: member.isCaptain,
        division: member.division || 'mens',
        shirtSize: member.shirtSize || 'L',
        isGuest: member.isGuest,
        zipTieColor: isOffshore ? zipTieColors[member.id] : null
      }))

      const updatedFormData = {
        ...formData,
        anglers,
        awardsDinner: {
          attending: awardsDinnerCount > 0,
          attendeeCount: awardsDinnerCount,
          feePerPerson: tournament.hasAwardsDinner ? parseFloat((tournament.awardsDinnerFee || '$30').replace('$', '')) : 0,
          totalFee: tournament.hasAwardsDinner ? awardsDinnerCount * parseFloat((tournament.awardsDinnerFee || '$30').replace('$', '')) : 0
        },
        additionalInfo: {
          ...formData.additionalInfo,
          isOffshore,
          zipTieAssignments: isOffshore ? zipTieColors : {}
        }
      }

      // Create registration
      const registrationResult = await createRegistration(tournamentId, updatedFormData)
      
      if (!registrationResult.success) {
        setErrors(registrationResult.errors || { general: registrationResult.error })
        setLoading(false)
        return
      }

      // Process payment
      const paymentResult = await processPayment(registrationResult.registration.id, {
        ...paymentData,
        ...fees
      })

      if (paymentResult.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess && onSuccess({
            registration: registrationResult.registration,
            payment: paymentResult
          })
        }, 2000)
      } else {
        setErrors({ payment: paymentResult.error || paymentResult.message })
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
          <p className="text-gray-600 mb-4">
            Your registration for {tournament.name} has been confirmed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Payment of ${fees.totalAmount.toFixed(2)} has been processed successfully.
          </p>
          <button onClick={onClose} className="btn-primary">Close</button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tournament Registration</h2>
            <p className="text-gray-600 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              {tournament.name} • {new Date(tournament.date).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <div className="space-y-6">
            {/* Tournament Info */}
            <div className="bg-ocean-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-ocean-600" />
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-ocean-600" />
                  <span>Entry Fee: {tournament.entryFee}</span>
                </div>
              </div>
            </div>

            {/* Boat Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Boat Selection</h3>
              <BoatSelector
                boats={availableBoats}
                selectedBoat={selectedBoat}
                onBoatSelect={handleBoatSelect}
                error={errors.boatSelection}
                placeholder="Select a boat from members in good standing..."
              />
              
              {selectedBoat && (
                <div className="mt-4 bg-ocean-50 rounded-lg p-4">
                  <h4 className="font-medium text-ocean-900 mb-2">Selected Boat Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-ocean-800">
                    <div><span className="font-medium">Name:</span> {selectedBoat.boatName}</div>
                    <div><span className="font-medium">Owner:</span> {selectedBoat.memberName}</div>
                    {selectedBoat.boatMake && (
                      <div><span className="font-medium">Make:</span> {selectedBoat.boatMake}</div>
                    )}
                    {selectedBoat.boatModel && (
                      <div><span className="font-medium">Model:</span> {selectedBoat.boatModel}</div>
                    )}
                    {selectedBoat.boatYear && (
                      <div><span className="font-medium">Year:</span> {selectedBoat.boatYear}</div>
                    )}
                    {selectedBoat.boatLength && (
                      <div><span className="font-medium">Length:</span> {selectedBoat.boatLength}'</div>
                    )}
                  </div>
                </div>
              )}

              {availableBoats.length === 0 && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-1">No Boats Available</h4>
                      <p className="text-sm text-yellow-700">
                        No boats are available for registration. Only members in good standing 
                        (Current or Lifetime status) with registered boats can participate in tournaments.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {errors.memberEligibility && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errors.memberEligibility}
                </div>
              )}
            </div>

            {/* Crew Management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Crew Members ({crewMembers.length}/6)</h3>
                  {isOffshore && (
                    <p className="text-sm text-gray-600 mt-1">
                      Zip tie colors automatically assigned for fish tagging
                    </p>
                  )}
                </div>
                {crewMembers.length < 6 && (
                  <button
                    type="button"
                    onClick={addCrewMember}
                    className="btn-primary text-sm py-2 px-4 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Crew</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {crewMembers.map((member, index) => (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {member.isCaptain ? (
                          <>
                            <Crown className="h-5 w-5 text-yellow-500" />
                            <h4 className="font-medium text-gray-900">Captain</h4>
                          </>
                        ) : (
                          <>
                            <User className="h-5 w-5 text-gray-500" />
                            <h4 className="font-medium text-gray-900">Crew Member {index}</h4>
                          </>
                        )}
                        {selectedBoat && member.isCaptain && (
                          <div className="text-xs text-ocean-600 bg-ocean-100 px-2 py-1 rounded">
                            Auto-filled from boat owner
                          </div>
                        )}
                      </div>
                      {!member.isCaptain && (
                        <button
                          type="button"
                          onClick={() => removeCrewMember(member.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <CrewMemberSelector
                      members={members}
                      selectedMember={member.firstName && member.lastName ? member : null}
                      onMemberSelect={(memberData) => updateCrewMember(member.id, memberData)}
                      onGuestAdd={(guestData) => updateCrewMember(member.id, guestData)}
                      usedZipTieColors={getUsedZipTieColors(member.id)}
                      assignedZipTieColor={zipTieColors[member.id]}
                      onZipTieColorChange={(colorId) => handleZipTieColorChange(member.id, colorId)}
                      isOffshore={isOffshore}
                      isCaptain={member.isCaptain}
                      placeholder={member.isCaptain ? "Captain (auto-filled from boat owner)" : "Select crew member or add guest..."}
                    />
                  </div>
                ))}
              </div>

              {errors.crewMembers && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errors.crewMembers}
                </div>
              )}

              {errors.zipTieColors && (
                <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errors.zipTieColors}
                </div>
              )}
            </div>

            {/* Waivers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Agreements</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="liabilityWaiver"
                    name="agreements.liabilityWaiver"
                    checked={formData.agreements.liabilityWaiver}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                  />
                  <label htmlFor="liabilityWaiver" className="ml-3 text-sm text-gray-900">
                    <span className="font-medium">Liability Waiver *</span>
                    <p className="mt-1 text-gray-600">
                      I acknowledge tournament risks and hold ASWSC harmless from claims.
                    </p>
                  </label>
                </div>
                {errors.liabilityWaiver && <p className="text-red-500 text-xs ml-7">{errors.liabilityWaiver}</p>}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="rulesAgreement"
                    name="agreements.rulesAgreement"
                    checked={formData.agreements.rulesAgreement}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rulesAgreement" className="ml-3 text-sm text-gray-900">
                    <span className="font-medium">Tournament Rules Agreement *</span>
                    <p className="mt-1 text-gray-600">
                      I agree to abide by all ASWSC tournament rules and regulations.
                    </p>
                  </label>
                </div>
                {errors.rulesAgreement && <p className="text-red-500 text-xs ml-7">{errors.rulesAgreement}</p>}
              </div>
            </div>

            {/* Awards Dinner */}
            {tournament.hasAwardsDinner && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Awards Dinner</h3>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <Trophy className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Join us for the Awards Dinner!
                      </p>
                      <p className="text-sm text-blue-800">
                        Celebrate the tournament results with fellow anglers. 
                        Fee: <strong>{tournament.awardsDinnerFee} per person</strong>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Awards Dinner Attendees
                  </label>
                  <select
                    value={awardsDinnerCount}
                    onChange={(e) => setAwardsDinnerCount(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  >
                    <option value={0}>None - Skip Awards Dinner</option>
                    <option value={1}>1 person</option>
                    <option value={2}>2 people</option>
                    <option value={3}>3 people</option>
                    <option value={4}>4 people</option>
                    <option value={5}>5 people</option>
                    <option value={6}>6 people</option>
                    <option value={7}>7 people</option>
                    <option value={8}>8 people</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select how many people from your group will attend the awards dinner
                  </p>
                </div>
              </div>
            )}

            {/* Payment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
              
              {/* Fee Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Entry Fee Per Person:</span>
                    <span>${fees.entryFeePerPerson?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Anglers:</span>
                    <span>{fees.anglerCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Entry Fee:</span>
                    <span>${fees.totalEntryFee?.toFixed(2) || '0.00'}</span>
                  </div>
                  {fees.totalAwardsDinnerFee > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span>Awards Dinner ({fees.awardsDinnerCount} × ${fees.awardsDinnerFeePerPerson?.toFixed(2)}):</span>
                        <span>${fees.totalAwardsDinnerFee?.toFixed(2) || '0.00'}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>${fees.subtotal?.toFixed(2) || '0.00'}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span>Processing Fee (3.5%):</span>
                    <span>${fees.processingFee?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>${fees.totalAmount?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                      errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="4242 4242 4242 4242"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={paymentData.nameOnCard}
                    onChange={handlePaymentChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                      errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Smith"
                  />
                  {errors.nameOnCard && <p className="text-red-500 text-xs mt-1">{errors.nameOnCard}</p>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      name="expiryMonth"
                      value={paymentData.expiryMonth}
                      onChange={handlePaymentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                      placeholder="12/25"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                      placeholder="123"
                      maxLength="4"
                    />
                  </div>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> This is a test payment system. Registration will be processed successfully.
                </p>
              </div>
            </div>

            {errors.general && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.general}
              </div>
            )}

            {errors.payment && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {errors.payment}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary px-6 py-2 disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                <span>Pay ${fees.totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TournamentRegistrationSimple
