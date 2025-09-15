import { useState, useEffect, useMemo } from 'react'
import { calculateAnnualStandings, getTopPerformers, getParticipationStats } from '../data/annualStandings'
import { useTournaments } from './useTournaments'
import { useRegistrations } from './useRegistrations'

/**
 * Custom hook for managing annual standings
 * Calculates and provides access to boat and angler standings across tournaments
 */
export const useAnnualStandings = (year = 2025) => {
  const { tournaments } = useTournaments()
  const { getAllWeighInEntries, getTournamentParticipants } = useRegistrations()
  const [weighInData, setWeighInData] = useState({})
  const [participantsData, setParticipantsData] = useState({})

  // Load weigh-in data from localStorage for all tournaments
  useEffect(() => {
    const loadWeighInData = () => {
      const allData = {}
      
      tournaments.forEach(tournament => {
        try {
          const storageKey = `aswsc_weigh_in_${tournament.id}`
          const savedData = localStorage.getItem(storageKey)
          if (savedData) {
            allData[tournament.id] = JSON.parse(savedData)
          }
        } catch (error) {
          console.warn(`Error loading weigh-in data for tournament ${tournament.id}:`, error)
        }
      })
      
      setWeighInData(allData)
    }

    loadWeighInData()

    // Listen for weigh-in updates
    const handleWeighInUpdate = (event) => {
      if (event.detail?.tournamentId) {
        loadWeighInData() // Reload all data when any tournament updates
      }
    }

    window.addEventListener('weighInUpdated', handleWeighInUpdate)
    return () => window.removeEventListener('weighInUpdated', handleWeighInUpdate)
  }, [tournaments])

  // Load participants data for all tournaments
  useEffect(() => {
    const allParticipants = {}
    
    tournaments.forEach(tournament => {
      const participants = getTournamentParticipants(tournament.id)
      if (participants) {
        allParticipants[tournament.id] = participants
      }
    })
    
    setParticipantsData(allParticipants)
  }, [tournaments, getTournamentParticipants])

  // Calculate current annual standings
  const currentStandings = useMemo(() => {
    const yearTournaments = tournaments.filter(t => {
      const tournamentYear = new Date(t.startDate).getFullYear()
      return tournamentYear === year
    })

    return calculateAnnualStandings(yearTournaments, weighInData, participantsData)
  }, [tournaments, weighInData, participantsData, year])

  // Get top performers
  const topPerformers = useMemo(() => {
    return getTopPerformers(currentStandings)
  }, [currentStandings])

  // Get participation statistics
  const participationStats = useMemo(() => {
    return getParticipationStats(currentStandings)
  }, [currentStandings])

  // Get standings for a specific division and category
  const getStandingsFor = (division, category = null, gender = null) => {
    if (category === 'boats') {
      return currentStandings.boats[division] || []
    } else if (category === 'anglers' && gender) {
      return currentStandings.anglers[division]?.[gender] || []
    }
    return []
  }

  // Get angler's tournament history
  const getAnglerHistory = (anglerName, memberId) => {
    const history = []
    
    Object.values(currentStandings.anglers).forEach(division => {
      Object.values(division).forEach(genderGroup => {
        const angler = genderGroup.find(a => 
          a.anglerName === anglerName && a.memberId === memberId
        )
        if (angler) {
          history.push(...angler.tournaments)
        }
      })
    })

    return history.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Get boat's tournament history
  const getBoatHistory = (boatName, captainName) => {
    const history = []
    
    Object.values(currentStandings.boats).forEach(divisionBoats => {
      const boat = divisionBoats.find(b => 
        b.boatName === boatName && b.captainName === captainName
      )
      if (boat) {
        history.push(...boat.tournaments)
      }
    })

    return history.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Get current leaders by category
  const getCurrentLeaders = () => {
    return {
      boatOfTheYear: {
        nearshore: currentStandings.boats.nearshore[0] || null,
        offshore: currentStandings.boats.offshore[0] || null
      },
      anglerOfTheYear: {
        nearshore: {
          men: currentStandings.anglers.nearshore.men[0] || null,
          women: currentStandings.anglers.nearshore.women[0] || null
        },
        offshore: {
          men: currentStandings.anglers.offshore.men[0] || null,
          women: currentStandings.anglers.offshore.women[0] || null
        }
      }
    }
  }

  // Force refresh of standings data
  const refreshStandings = () => {
    // Trigger re-calculation by updating a dependency
    setWeighInData(prev => ({ ...prev }))
  }

  return {
    // Data
    currentStandings,
    topPerformers,
    participationStats,
    
    // Functions
    getStandingsFor,
    getAnglerHistory,
    getBoatHistory,
    getCurrentLeaders,
    refreshStandings,
    
    // Status
    isLoading: Object.keys(weighInData).length === 0 && tournaments.length > 0,
    hasData: Object.keys(weighInData).length > 0
  }
}
