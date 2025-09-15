import { useState, useEffect } from 'react'
import { 
  tournamentRegistrations, 
  createEmptyRegistration, 
  validateRegistration,
  calculateRegistrationFees,
  REGISTRATION_STATUS,
  PAYMENT_STATUS
} from '../data/registrationData'

const STORAGE_KEY = 'aswsc_tournament_registrations'

export const useRegistrations = () => {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load registrations from localStorage or use initial data
  useEffect(() => {
    try {
      // Force reload from fresh data to ensure new registrations are included
      console.log('Loading fresh registration data...')
      setRegistrations(tournamentRegistrations)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tournamentRegistrations))
    } catch (err) {
      console.error('Error loading registrations:', err)
      setRegistrations(tournamentRegistrations)
      setError('Error loading registration data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save registrations to localStorage
  const saveRegistrations = (updatedRegistrations) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRegistrations))
      setRegistrations(updatedRegistrations)
      setError(null)
    } catch (err) {
      console.error('Error saving registrations:', err)
      setError('Error saving registration data')
    }
  }

  // Create a new registration
  const createRegistration = async (tournamentId, registrationData) => {
    try {
      const validation = validateRegistration(registrationData)
      if (!validation.isValid) {
        return { success: false, errors: validation.errors }
      }

      const newRegistration = {
        ...registrationData,
        id: `reg-${Date.now()}`,
        registrationDate: new Date().toISOString(),
        status: REGISTRATION_STATUS.PENDING,
        paymentStatus: PAYMENT_STATUS.PENDING
      }

      const updatedRegistrations = [...registrations, newRegistration]
      saveRegistrations(updatedRegistrations)
      
      return { success: true, registration: newRegistration }
    } catch (err) {
      console.error('Error creating registration:', err)
      return { success: false, error: 'Failed to create registration' }
    }
  }

  // Update an existing registration
  const updateRegistration = async (id, registrationData) => {
    try {
      const validation = validateRegistration(registrationData)
      if (!validation.isValid) {
        return { success: false, errors: validation.errors }
      }

      const updatedRegistrations = registrations.map(registration =>
        registration.id === id ? { ...registrationData, id } : registration
      )
      
      saveRegistrations(updatedRegistrations)
      
      return { success: true, registration: { ...registrationData, id } }
    } catch (err) {
      console.error('Error updating registration:', err)
      return { success: false, error: 'Failed to update registration' }
    }
  }

  // Process payment for registration
  const processPayment = async (registrationId, paymentData) => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate payment success/failure (90% success rate for demo)
      const paymentSuccessful = Math.random() > 0.1

      const updatedRegistrations = registrations.map(registration => {
        if (registration.id === registrationId) {
          return {
            ...registration,
            status: paymentSuccessful ? REGISTRATION_STATUS.CONFIRMED : REGISTRATION_STATUS.PENDING,
            paymentStatus: paymentSuccessful ? PAYMENT_STATUS.COMPLETED : PAYMENT_STATUS.FAILED,
            payment: {
              ...registration.payment,
              ...paymentData,
              paymentDate: new Date().toISOString(),
              transactionId: `txn_${Date.now()}`,
              paymentMethod: 'credit_card'
            }
          }
        }
        return registration
      })

      saveRegistrations(updatedRegistrations)

      return {
        success: paymentSuccessful,
        message: paymentSuccessful 
          ? 'Payment processed successfully!' 
          : 'Payment failed. Please try again.',
        transactionId: paymentSuccessful ? `txn_${Date.now()}` : null
      }
    } catch (err) {
      console.error('Error processing payment:', err)
      return { success: false, error: 'Payment processing failed' }
    }
  }

  // Cancel a registration
  const cancelRegistration = async (id) => {
    try {
      const updatedRegistrations = registrations.map(registration =>
        registration.id === id 
          ? { ...registration, status: REGISTRATION_STATUS.CANCELLED }
          : registration
      )
      
      saveRegistrations(updatedRegistrations)
      
      return { success: true }
    } catch (err) {
      console.error('Error cancelling registration:', err)
      return { success: false, error: 'Failed to cancel registration' }
    }
  }

  // Get registrations by tournament
  const getRegistrationsByTournament = (tournamentId) => {
    return registrations.filter(reg => reg.tournamentId === tournamentId)
  }

  // Get registration by ID
  const getRegistrationById = (id) => {
    return registrations.find(reg => reg.id === id)
  }

  // Get tournament participant lists
  const getTournamentParticipants = (tournamentId) => {
    const tournamentRegistrations = getRegistrationsByTournament(tournamentId)
    const confirmedRegistrations = tournamentRegistrations.filter(
      reg => reg.status === REGISTRATION_STATUS.CONFIRMED
    )

    const boats = confirmedRegistrations.map(reg => ({
      registrationId: reg.id,
      name: reg.boatInfo.boatName,
      length: reg.boatInfo.boatLength,
      make: reg.boatInfo.boatMake,
      model: reg.boatInfo.boatModel,
      year: reg.boatInfo.boatYear,
      captain: {
        name: `${reg.captain.firstName} ${reg.captain.lastName}`,
        email: reg.captain.email,
        phone: reg.captain.phone,
        zipTieColor: reg.anglers.find(angler => angler.isCaptain)?.zipTieColor,
        memberId: reg.captain.memberId,
        isClubMember: !!reg.captain.memberId
      },
      crew: reg.anglers.filter(angler => !angler.isCaptain).map(angler => ({
        name: `${angler.firstName} ${angler.lastName}`,
        email: angler.email,
        phone: angler.phone,
        zipTieColor: angler.zipTieColor,
        memberId: angler.memberId,
        isClubMember: !!angler.memberId,
        isGuest: angler.isGuest
      })),
      registrationDate: reg.registrationDate,
      paymentStatus: reg.paymentStatus
    }))

    const anglers = confirmedRegistrations.flatMap(reg =>
      reg.anglers.map(angler => ({
        registrationId: reg.id,
        boatName: reg.boatInfo.boatName,
        firstName: angler.firstName,
        lastName: angler.lastName,
        division: angler.division,
        isCaptain: angler.isCaptain,
        isGuest: angler.isGuest || false,
        memberId: angler.memberId
      }))
    )

    return {
      boats,
      anglers,
      totalBoats: boats.length,
      totalAnglers: anglers.length,
      memberAnglers: anglers.filter(a => !a.isGuest).length,
      guestAnglers: anglers.filter(a => a.isGuest).length
    }
  }

  // Get registration statistics
  const getRegistrationStats = (tournamentId = null) => {
    const targetRegistrations = tournamentId 
      ? getRegistrationsByTournament(tournamentId)
      : registrations

    const confirmedRegistrations = targetRegistrations.filter(r => r.status === REGISTRATION_STATUS.CONFIRMED)
    
    const total = targetRegistrations.length
    const confirmed = confirmedRegistrations.length
    const pending = targetRegistrations.filter(r => r.status === REGISTRATION_STATUS.PENDING).length
    const cancelled = targetRegistrations.filter(r => r.status === REGISTRATION_STATUS.CANCELLED).length
    
    // Calculate boat and angler counts from confirmed registrations
    const totalBoats = confirmedRegistrations.length
    const totalAnglers = confirmedRegistrations.reduce((sum, reg) => sum + (reg.anglers?.length || 0), 0)
    
    const totalRevenue = targetRegistrations
      .filter(r => r.paymentStatus === PAYMENT_STATUS.COMPLETED)
      .reduce((sum, reg) => sum + (reg.payment?.totalAmount || 0), 0)

    return {
      total,
      confirmed,
      pending,
      cancelled,
      totalBoats,
      totalAnglers,
      totalRevenue
    }
  }

  // Search registrations
  const searchRegistrations = (query, tournamentId = null) => {
    let filtered = tournamentId 
      ? getRegistrationsByTournament(tournamentId)
      : registrations

    if (query) {
      const searchQuery = query.toLowerCase()
      filtered = filtered.filter(reg =>
        reg.captain.firstName.toLowerCase().includes(searchQuery) ||
        reg.captain.lastName.toLowerCase().includes(searchQuery) ||
        reg.captain.email.toLowerCase().includes(searchQuery) ||
        reg.boatInfo.boatName.toLowerCase().includes(searchQuery) ||
        reg.anglers.some(angler => 
          angler.firstName.toLowerCase().includes(searchQuery) ||
          angler.lastName.toLowerCase().includes(searchQuery)
        )
      )
    }

    return filtered
  }

  return {
    registrations,
    loading,
    error,
    createRegistration,
    updateRegistration,
    processPayment,
    cancelRegistration,
    getRegistrationsByTournament,
    getRegistrationById,
    getTournamentParticipants,
    getRegistrationStats,
    searchRegistrations,
    createEmptyRegistration,
    calculateRegistrationFees
  }
}
