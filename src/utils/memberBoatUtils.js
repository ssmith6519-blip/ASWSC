import { MEMBER_STATUS } from '../data/membersData'

// Get all boats from members in good standing
export const getAvailableBoats = (members) => {
  const boats = []
  
  members.forEach(member => {
    // Only include boats from current members or lifetime members
    if (member.status === MEMBER_STATUS.CURRENT || member.status === MEMBER_STATUS.LIFETIME) {
      // Add primary boat if exists
      if (member.primaryBoat && member.primaryBoat.name) {
        boats.push({
          id: `${member.id}-primary`,
          memberId: member.id,
          memberName: `${member.memberName.first} ${member.memberName.last}`,
          boatName: member.primaryBoat.name,
          boatMake: member.primaryBoat.make || '',
          boatModel: member.primaryBoat.model || '',
          boatYear: member.primaryBoat.year || '',
          boatLength: member.primaryBoat.length || '',
          isPrimary: true,
          displayName: `${member.primaryBoat.name} (${member.memberName.first} ${member.memberName.last})`,
          fullBoatInfo: `${member.primaryBoat.make || ''} ${member.primaryBoat.model || ''} ${member.primaryBoat.year || ''}`.trim()
        })
      }
      
      // Add secondary boat if exists
      if (member.secondaryBoat && member.secondaryBoat.name) {
        boats.push({
          id: `${member.id}-secondary`,
          memberId: member.id,
          memberName: `${member.memberName.first} ${member.memberName.last}`,
          boatName: member.secondaryBoat.name,
          boatMake: member.secondaryBoat.make || '',
          boatModel: member.secondaryBoat.model || '',
          boatYear: member.secondaryBoat.year || '',
          boatLength: member.secondaryBoat.length || '',
          isPrimary: false,
          displayName: `${member.secondaryBoat.name} (${member.memberName.first} ${member.memberName.last})`,
          fullBoatInfo: `${member.secondaryBoat.make || ''} ${member.secondaryBoat.model || ''} ${member.secondaryBoat.year || ''}`.trim()
        })
      }
    }
  })
  
  // Sort boats alphabetically by boat name
  return boats.sort((a, b) => a.boatName.localeCompare(b.boatName))
}

// Get member by ID and check if they're in good standing
export const getMemberInGoodStanding = (members, memberId) => {
  const member = members.find(m => m.id === parseInt(memberId))
  if (!member) return null
  
  return (member.status === MEMBER_STATUS.CURRENT || member.status === MEMBER_STATUS.LIFETIME) ? member : null
}

// Check if a member is eligible to register for tournaments
export const isMemberEligibleForTournament = (member) => {
  if (!member) return false
  return member.status === MEMBER_STATUS.CURRENT || member.status === MEMBER_STATUS.LIFETIME
}

// Get boat details by boat ID
export const getBoatById = (members, boatId) => {
  const boats = getAvailableBoats(members)
  return boats.find(boat => boat.id === boatId)
}

// Search boats by name or owner
export const searchBoats = (members, query) => {
  if (!query || query.length < 2) return []
  
  const boats = getAvailableBoats(members)
  const searchQuery = query.toLowerCase()
  
  return boats.filter(boat => 
    boat.boatName.toLowerCase().includes(searchQuery) ||
    boat.memberName.toLowerCase().includes(searchQuery) ||
    boat.displayName.toLowerCase().includes(searchQuery)
  ).slice(0, 10) // Limit results
}
