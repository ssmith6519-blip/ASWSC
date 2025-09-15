/**
 * Annual Standings Data Management
 * Tracks boat and angler points across multiple tournaments for yearly rankings
 */

// Import the actual scoring function
import { calculateFishScore } from './scoringMatrices'

// Default annual standings structure
export const DEFAULT_ANNUAL_STANDINGS = {
  2025: {
    boats: {
      nearshore: [],
      offshore: []
    },
    anglers: {
      nearshore: {
        men: [],
        women: []
      },
      offshore: {
        men: [],
        women: []
      }
    }
  }
}

/**
 * Calculate annual standings from tournament results
 * @param {Array} tournaments - All tournaments for the year
 * @param {Object} allWeighInEntries - All weigh-in entries by tournament ID
 * @param {Object} allParticipants - All participants by tournament ID
 * @returns {Object} Annual standings by division and category
 */
export const calculateAnnualStandings = (tournaments, allWeighInEntries, allParticipants) => {
  const standings = {
    boats: {
      nearshore: {},
      offshore: {}
    },
    anglers: {
      nearshore: {
        men: {},
        women: {}
      },
      offshore: {
        men: {},
        women: {}
      }
    }
  }

  // Process each tournament
  tournaments.forEach(tournament => {
    if (tournament.status !== 'completed') return

    const tournamentEntries = allWeighInEntries[tournament.id] || {}
    const participants = allParticipants[tournament.id]
    
    if (!participants?.boats) return

    const division = tournament.division // 'nearshore' or 'offshore'

    // Process boat standings
    participants.boats.forEach(boat => {
      const boatEntries = tournamentEntries[boat.registrationId] || []
      const totalPoints = boatEntries.reduce((total, entry) => {
        return total + calculateFishScore(tournament, entry)
      }, 0)

      if (totalPoints > 0) {
        const boatKey = `${boat.name}-${boat.captain.name}`
        if (!standings.boats[division][boatKey]) {
          standings.boats[division][boatKey] = {
            boatName: boat.name,
            captainName: boat.captain.name,
            captainMemberId: boat.captain.memberId,
            isClubMember: boat.captain.isClubMember,
            tournaments: [],
            totalPoints: 0,
            tournamentCount: 0
          }
        }

        standings.boats[division][boatKey].tournaments.push({
          tournamentId: tournament.id,
          tournamentName: tournament.name,
          date: tournament.startDate,
          points: totalPoints,
          fishCount: boatEntries.length
        })
        standings.boats[division][boatKey].totalPoints += totalPoints
        standings.boats[division][boatKey].tournamentCount += 1
      }
    })

    // Process angler standings
    participants.boats.forEach(boat => {
      const boatEntries = tournamentEntries[boat.registrationId] || []

      // Process captain
      const captainEntries = boatEntries.filter(entry => entry.anglerId === 'captain')
      if (captainEntries.length > 0 && boat.captain.isClubMember) {
        const captainPoints = captainEntries.reduce((total, entry) => {
          return total + calculateFishScore(tournament, entry)
        }, 0)

        // Determine gender division (default to men for now, can be enhanced later)
        const genderDivision = boat.captain.gender || 'men'
        const anglerKey = `${boat.captain.name}-${boat.captain.memberId}`

        if (!standings.anglers[division][genderDivision][anglerKey]) {
          standings.anglers[division][genderDivision][anglerKey] = {
            anglerName: boat.captain.name,
            memberId: boat.captain.memberId,
            tournaments: [],
            totalPoints: 0,
            tournamentCount: 0
          }
        }

        standings.anglers[division][genderDivision][anglerKey].tournaments.push({
          tournamentId: tournament.id,
          tournamentName: tournament.name,
          date: tournament.startDate,
          points: captainPoints,
          fishCount: captainEntries.length,
          boatName: boat.name
        })
        standings.anglers[division][genderDivision][anglerKey].totalPoints += captainPoints
        standings.anglers[division][genderDivision][anglerKey].tournamentCount += 1
      }

      // Process crew members
      boat.crew.forEach((crew, index) => {
        const crewId = `crew-${index}`
        const crewEntries = boatEntries.filter(entry => entry.anglerId === crewId)
        
        if (crewEntries.length > 0 && crew.isClubMember) {
          const crewPoints = crewEntries.reduce((total, entry) => {
            return total + calculateFishScore(tournament, entry)
          }, 0)

          // Determine gender division (default to men for now)
          const genderDivision = crew.gender || 'men'
          const anglerKey = `${crew.name}-${crew.memberId}`

          if (!standings.anglers[division][genderDivision][anglerKey]) {
            standings.anglers[division][genderDivision][anglerKey] = {
              anglerName: crew.name,
              memberId: crew.memberId,
              tournaments: [],
              totalPoints: 0,
              tournamentCount: 0
            }
          }

          standings.anglers[division][genderDivision][anglerKey].tournaments.push({
            tournamentId: tournament.id,
            tournamentName: tournament.name,
            date: tournament.startDate,
            points: crewPoints,
            fishCount: crewEntries.length,
            boatName: boat.name
          })
          standings.anglers[division][genderDivision][anglerKey].totalPoints += crewPoints
          standings.anglers[division][genderDivision][anglerKey].tournamentCount += 1
        }
      })
    })
  })

  // Convert objects to sorted arrays
  const result = {
    boats: {
      nearshore: Object.values(standings.boats.nearshore)
        .sort((a, b) => b.totalPoints - a.totalPoints),
      offshore: Object.values(standings.boats.offshore)
        .sort((a, b) => b.totalPoints - a.totalPoints)
    },
    anglers: {
      nearshore: {
        men: Object.values(standings.anglers.nearshore.men)
          .sort((a, b) => b.totalPoints - a.totalPoints),
        women: Object.values(standings.anglers.nearshore.women)
          .sort((a, b) => b.totalPoints - a.totalPoints)
      },
      offshore: {
        men: Object.values(standings.anglers.offshore.men)
          .sort((a, b) => b.totalPoints - a.totalPoints),
        women: Object.values(standings.anglers.offshore.women)
          .sort((a, b) => b.totalPoints - a.totalPoints)
      }
    }
  }

  return result
}

/**
 * Get top performers for quick stats
 * @param {Object} standings - Annual standings object
 * @returns {Object} Top performers by category
 */
export const getTopPerformers = (standings) => {
  return {
    boats: {
      nearshore: standings.boats.nearshore.slice(0, 3),
      offshore: standings.boats.offshore.slice(0, 3)
    },
    anglers: {
      nearshore: {
        men: standings.anglers.nearshore.men.slice(0, 3),
        women: standings.anglers.nearshore.women.slice(0, 3)
      },
      offshore: {
        men: standings.anglers.offshore.men.slice(0, 3),
        women: standings.anglers.offshore.women.slice(0, 3)
      }
    }
  }
}

/**
 * Calculate participation stats
 * @param {Object} standings - Annual standings object
 * @returns {Object} Participation statistics
 */
export const getParticipationStats = (standings) => {
  const stats = {
    totalBoats: 0,
    totalAnglers: 0,
    activeDivisions: [],
    tournamentParticipation: {}
  }

  // Count boats
  stats.totalBoats = standings.boats.nearshore.length + standings.boats.offshore.length
  
  // Count anglers
  stats.totalAnglers = 
    standings.anglers.nearshore.men.length + 
    standings.anglers.nearshore.women.length +
    standings.anglers.offshore.men.length + 
    standings.anglers.offshore.women.length

  // Determine active divisions
  if (standings.boats.nearshore.length > 0) stats.activeDivisions.push('nearshore')
  if (standings.boats.offshore.length > 0) stats.activeDivisions.push('offshore')

  return stats
}
