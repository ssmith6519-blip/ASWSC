import React, { useState, useEffect } from 'react'
import { useMembers } from '../hooks/useMembers'
import { useRegistrations } from '../hooks/useRegistrations'
import { tournamentTipSheet } from '../data/registrationData'
import { getTournamentById } from '../data/tournamentData'
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Trash2,
  Search,
  X,
  Info,
  DollarSign,
  Boat,
  User,
  Shield,
  FileText
} from 'lucide-react'

const TournamentRegistration = ({ tournamentId, onClose, onSuccess }) => {
  const { members } = useMembers()
  const { createRegistration, processPayment, calculateRegistrationFees } = useRegistrations()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [showTipSheet, setShowTipSheet] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  
  const tournament = getTournamentById(tournamentId)
  
  const [formData, setFormData] = useState({
    tournamentId,
    boatInfo: {
      boatName: '',
      boatLength: '',
      boatMake: '',
      boatModel: '',
      boatYear: '',
      hullNumber: '',
      captainLicense: '',
      insurance: {
        company: '',
        policyNumber: '',
        expirationDate: ''
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
        relationship: ''
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
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  })

  const steps = [
    { id: 1, title: 'Tournament Info', icon: Info },
    { id: 2, title: 'Boat Details', icon: Boat },
    { id: 3, title: 'Captain & Crew', icon: Users },
    { id: 4, title: 'Waivers', icon: Shield },
    { id: 5, title: 'Payment', icon: CreditCard }
  ]

  const fees = calculateRegistrationFees(tournament, formData.anglers.length)

  // Member search functionality
  const searchMembers = (query) => {
    if (!query || query.length < 2) return []
    
    return members.filter(member => {
      const fullName = `${member.memberName.first} ${member.memberName.last}`.toLowerCase()
      const email = member.email?.toLowerCase() || ''
      return fullName.includes(query.toLowerCase()) || email.includes(query.toLowerCase())
    }).slice(0, 10) // Limit results
  }

  const selectMember = (member, type, index = null) => {
    if (type === 'captain') {
      setFormData(prev => ({
        ...prev,
        captain: {
          ...prev.captain,
          memberId: member.id,
          firstName: member.memberName.first,
          lastName: member.memberName.last,
          email: member.email || '',
          phone: member.phone || ''
        }
      }))
    } else if (type === 'angler' && index !== null) {
      const updatedAnglers = [...formData.anglers]
      updatedAnglers[index] = {
        ...updatedAnglers[index],
        memberId: member.id,
        firstName: member.memberName.first,
        lastName: member.memberName.last,
        email: member.email || '',
        phone: member.phone || ''
      }
      setFormData(prev => ({ ...prev, anglers: updatedAnglers }))
    }
  }

  const addAngler = () => {
    if (formData.anglers.length < 6) {
      setFormData(prev => ({
        ...prev,
        anglers: [
          ...prev.anglers,
          {
            memberId: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isCaptain: false,
            division: 'mens',
            shirtSize: 'L',
            isGuest: false
          }
        ]
      }))
    }
  }

  const removeAngler = (index) => {
    if (formData.anglers.length > 1) {
      setFormData(prev => ({
        ...prev,
        anglers: prev.anglers.filter((_, i) => i !== index)
      }))
    }
  }

  const handleInputChange = (e, section = null, index = null) => {
    const { name, value, type, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value

    if (section === 'angler' && index !== null) {
      const updatedAnglers = [...formData.anglers]
      updatedAnglers[index] = { ...updatedAnglers[index], [name]: inputValue }
      setFormData(prev => ({ ...prev, anglers: updatedAnglers }))
    } else if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: inputValue
        }
      }))
    } else if (name.includes('.')) {
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
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setPaymentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setPaymentData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateStep = (step) => {
    const stepErrors = {}
    
    switch (step) {
      case 2: // Boat Details
        if (!formData.boatInfo.boatName.trim()) stepErrors.boatName = 'Boat name required'
        if (!formData.boatInfo.boatLength) stepErrors.boatLength = 'Boat length required'
        break
      case 3: // Captain & Crew
        if (!formData.captain.firstName.trim()) stepErrors.captainFirstName = 'Captain first name required'
        if (!formData.captain.lastName.trim()) stepErrors.captainLastName = 'Captain last name required'
        if (!formData.captain.email.trim()) stepErrors.captainEmail = 'Captain email required'
        break
      case 4: // Waivers
        if (!formData.agreements.liabilityWaiver) stepErrors.liabilityWaiver = 'Liability waiver must be accepted'
        if (!formData.agreements.rulesAgreement) stepErrors.rulesAgreement = 'Rules agreement must be accepted'
        break
      case 5: // Payment
        if (!paymentData.cardNumber.trim()) stepErrors.cardNumber = 'Card number required'
        if (!paymentData.nameOnCard.trim()) stepErrors.nameOnCard = 'Name on card required'
        break
    }
    
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setLoading(true)
    try {
      // Create registration
      const registrationResult = await createRegistration(tournamentId, formData)
      
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
        onSuccess && onSuccess({
          registration: registrationResult.registration,
          payment: paymentResult
        })
      } else {
        setErrors({ payment: paymentResult.error || paymentResult.message })
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (!tournament) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tournament Not Found</h3>
        <p className="text-gray-600">The selected tournament could not be found.</p>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Tournament Info */}
            <div className="bg-ocean-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-ocean-900 mb-4">{tournament.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-ocean-600" />
                  <span>{new Date(tournament.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-ocean-600" />
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-ocean-600" />
                  <span>Entry Fee: {tournament.entryFee}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-ocean-600" />
                  <span>{tournament.division === 'nearshore' ? 'Nearshore' : 'Offshore'} Division</span>
                </div>
              </div>
            </div>

            {/* Tip Sheet Toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowTipSheet(true)}
                className="inline-flex items-center space-x-2 text-ocean-600 hover:text-ocean-700"
              >
                <FileText className="h-4 w-4" />
                <span>View Registration Guidelines & Tips</span>
              </button>
            </div>

            {/* Fee Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Registration Fees</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Entry Fee:</span>
                  <span>${fees.entryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>${fees.processingFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${fees.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Boat Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boat Name *
                </label>
                <input
                  type="text"
                  name="boatName"
                  value={formData.boatInfo.boatName}
                  onChange={(e) => handleInputChange(e, 'boatInfo')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                    errors.boatName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter boat name"
                />
                {errors.boatName && <p className="text-red-500 text-xs mt-1">{errors.boatName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Boat Length (feet) *
                </label>
                <input
                  type="number"
                  name="boatLength"
                  value={formData.boatInfo.boatLength}
                  onChange={(e) => handleInputChange(e, 'boatInfo')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                    errors.boatLength ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="28"
                  min="16"
                />
                {errors.boatLength && <p className="text-red-500 text-xs mt-1">{errors.boatLength}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <input
                  type="text"
                  name="boatMake"
                  value={formData.boatInfo.boatMake}
                  onChange={(e) => handleInputChange(e, 'boatInfo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="Grady-White"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  name="boatModel"
                  value={formData.boatInfo.boatModel}
                  onChange={(e) => handleInputChange(e, 'boatInfo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="Canyon 288"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="boatYear"
                  value={formData.boatInfo.boatYear}
                  onChange={(e) => handleInputChange(e, 'boatInfo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="2022"
                  min="1980"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hull Number</label>
                <input
                  type="text"
                  name="hullNumber"
                  value={formData.boatInfo.hullNumber}
                  onChange={(e) => handleInputChange(e, 'boatInfo')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  placeholder="ABC12345D678"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.boatInfo.insurance.company}
                    onChange={(e) => handleInputChange(e, 'boatInfo.insurance')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    placeholder="Progressive Marine"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.boatInfo.insurance.policyNumber}
                    onChange={(e) => handleInputChange(e, 'boatInfo.insurance')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    placeholder="PM-123456"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="date"
                    name="expirationDate"
                    value={formData.boatInfo.insurance.expirationDate}
                    onChange={(e) => handleInputChange(e, 'boatInfo.insurance')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      // Additional cases for steps 3, 4, 5 would continue here...
      default:
        return <div>Step {currentStep} content</div>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Tournament Registration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-ocean-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-ocean-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {step.id < steps.length && (
                  <div className={`w-12 h-0.5 ml-4 ${
                    currentStep > step.id ? 'bg-ocean-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {renderStepContent()}

          {errors.general && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.general}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="btn-primary px-6 py-2"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary px-6 py-2 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay $${fees.totalAmount.toFixed(2)}`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tip Sheet Modal */}
      {showTipSheet && (
        <TipSheetModal onClose={() => setShowTipSheet(false)} />
      )}
    </div>
  )
}

// Tip Sheet Modal Component
const TipSheetModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-xl font-bold text-gray-900">{tournamentTipSheet.title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
        <div className="space-y-6">
          {tournamentTipSheet.sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default TournamentRegistration
