import { useState, useEffect } from 'react'
import { tournaments2025, TOURNAMENT_STATUS, TOURNAMENT_DIVISIONS } from '../data/tournamentData'

const STORAGE_KEY = 'aswsc_tournaments'

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Load tournaments from localStorage or use initial data
  useEffect(() => {
    try {
      const savedTournaments = localStorage.getItem(STORAGE_KEY)
      if (savedTournaments) {
        // Load from localStorage if available
        console.log('Loading tournaments from localStorage...')
        const parsedTournaments = JSON.parse(savedTournaments)
        setTournaments(parsedTournaments)
      } else {
        // First time load - use initial data and save to localStorage
        console.log('Loading initial tournament data...')
        setTournaments(tournaments2025)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tournaments2025))
      }
    } catch (err) {
      console.error('Error loading tournaments:', err)
      // Fallback to initial data
      setTournaments(tournaments2025)
      setError('Error loading tournament data')
    } finally {
      setLoading(false)
    }

    // Listen for storage changes from other components/tabs
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const updatedTournaments = JSON.parse(e.newValue)
          setTournaments([...updatedTournaments])
        } catch (err) {
          console.error('Error parsing updated tournaments:', err)
        }
      }
    }

    // Listen for custom tournaments updated events
    const handleTournamentsUpdated = (e) => {
      setTournaments([...e.detail])
      setRefreshKey(prev => prev + 1) // Force component refresh
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('tournamentsUpdated', handleTournamentsUpdated)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('tournamentsUpdated', handleTournamentsUpdated)
    }
  }, [])

  // Save tournaments to localStorage
  const saveTournaments = (updatedTournaments) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTournaments))
      setTournaments([...updatedTournaments]) // Force new array reference for React re-render
      setRefreshKey(prev => prev + 1) // Force component refresh
      setError(null)
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('tournamentsUpdated', { 
        detail: [...updatedTournaments] 
      }))
    } catch (err) {
      console.error('Error saving tournaments:', err)
      setError('Error saving tournament data')
    }
  }

  // Create a new tournament
  const createTournament = async (tournamentData) => {
    try {
      const newTournament = {
        ...tournamentData,
        id: `${tournamentData.division}-${tournamentData.location.toLowerCase().replace(/\s+/g, '-')}-${new Date(tournamentData.startDate).getFullYear()}`,
        participants: 0,
        status: TOURNAMENT_STATUS.UPCOMING
      }

      const updatedTournaments = [...tournaments, newTournament]
      saveTournaments(updatedTournaments)
      
      return { success: true, tournament: newTournament }
    } catch (err) {
      console.error('Error creating tournament:', err)
      return { success: false, error: 'Failed to create tournament' }
    }
  }

  // Update an existing tournament
  const updateTournament = async (id, tournamentData) => {
    try {
      const updatedTournaments = tournaments.map(tournament =>
        tournament.id === id ? { ...tournament, ...tournamentData } : tournament
      )
      
      saveTournaments(updatedTournaments)
      
      return { success: true, tournament: updatedTournaments.find(t => t.id === id) }
    } catch (err) {
      console.error('Error updating tournament:', err)
      return { success: false, error: 'Failed to update tournament' }
    }
  }

  // Delete a tournament
  const deleteTournament = async (id) => {
    try {
      const updatedTournaments = tournaments.filter(tournament => tournament.id !== id)
      saveTournaments(updatedTournaments)
      
      return { success: true }
    } catch (err) {
      console.error('Error deleting tournament:', err)
      return { success: false, error: 'Failed to delete tournament' }
    }
  }

  // Update tournament photo album URL
  const updatePhotoAlbum = async (id, photoAlbumUrl) => {
    return updateTournament(id, { photoAlbumUrl })
  }

  // Update tournament tip sheet
  const updateTipSheet = async (id, tipSheet) => {
    return updateTournament(id, { tipSheet })
  }

  // Get tournament by ID
  const getTournamentById = (id) => {
    return tournaments.find(tournament => tournament.id === id)
  }

  // Get tournaments by status
  const getTournamentsByStatus = (status) => {
    return tournaments.filter(tournament => tournament.status === status)
  }

  // Get tournaments by division
  const getTournamentsByDivision = (division) => {
    return tournaments.filter(tournament => tournament.division === division)
  }

  // Search tournaments
  const searchTournaments = (query) => {
    if (!query) return tournaments

    const searchQuery = query.toLowerCase()
    return tournaments.filter(tournament =>
      tournament.name.toLowerCase().includes(searchQuery) ||
      tournament.location.toLowerCase().includes(searchQuery) ||
      tournament.division.toLowerCase().includes(searchQuery)
    )
  }

  // Get tournament statistics
  const getTournamentStats = () => {
    const total = tournaments.length
    const upcoming = tournaments.filter(t => t.status === TOURNAMENT_STATUS.UPCOMING).length
    const completed = tournaments.filter(t => t.status === TOURNAMENT_STATUS.COMPLETED).length
    const nearshore = tournaments.filter(t => t.division === TOURNAMENT_DIVISIONS.NEARSHORE).length
    const offshore = tournaments.filter(t => t.division === TOURNAMENT_DIVISIONS.OFFSHORE).length

    return {
      total,
      upcoming,
      completed,
      nearshore,
      offshore
    }
  }

  // Reset tournaments to original data
  const resetTournamentsToDefault = () => {
    try {
      console.log('Resetting tournaments to default data...')
      setTournaments(tournaments2025)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tournaments2025))
      setRefreshKey(prev => prev + 1)
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('tournamentsUpdated', { 
        detail: [...tournaments2025] 
      }))
      
      return { success: true }
    } catch (err) {
      console.error('Error resetting tournaments:', err)
      return { success: false, error: 'Failed to reset tournaments' }
    }
  }

  return {
    tournaments,
    loading,
    error,
    refreshKey, // Add refreshKey to return value
    createTournament,
    updateTournament,
    deleteTournament,
    updatePhotoAlbum,
    updateTipSheet,
    getTournamentById,
    getTournamentsByStatus,
    getTournamentsByDivision,
    searchTournaments,
    getTournamentStats,
    resetTournamentsToDefault
  }
}
