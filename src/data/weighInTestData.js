// Test Weigh-In Data for Tournaments
// This data simulates realistic tournament weigh-in entries for testing the live leaderboard

export const WEIGH_IN_TEST_DATA = {
  // Darien Nearshore Tournament - 2 days
  'nearshore-darien-oct-2025': [
    // Day 1 - Sea Hunter (reg-darien-001)
    {
      id: 'weigh-darien-001-001',
      tournamentDay: 1,
      timestamp: '2025-10-18T08:30:00Z',
      anglerId: 'captain',
      category: 'redfish',
      species: 'Red Drum',
      length: '28.5',
      weight: '',
      isReleased: false
    },
    {
      id: 'weigh-darien-001-002',
      tournamentDay: 1,
      timestamp: '2025-10-18T09:15:00Z',
      anglerId: 'crew-0',
      category: 'trout',
      species: 'Spotted Seatrout',
      length: '20.0',
      weight: '',
      isReleased: false
    },
    {
      id: 'weigh-darien-001-003',
      tournamentDay: 1,
      timestamp: '2025-10-18T10:45:00Z',
      anglerId: 'crew-1',
      category: 'flounder',
      species: 'Southern Flounder',
      length: '18.5',
      weight: '',
      isReleased: false
    },

    // Day 1 - Reel Deal (reg-darien-002)
    {
      id: 'weigh-darien-002-001',
      tournamentDay: 1,
      timestamp: '2025-10-18T07:45:00Z',
      anglerId: 'captain',
      category: 'mackerel',
      species: 'King Mackerel',
      length: '38.0',
      weight: '',
      isReleased: false
    },
    {
      id: 'weigh-darien-002-002',
      tournamentDay: 1,
      timestamp: '2025-10-18T11:20:00Z',
      anglerId: 'crew-2',
      category: 'redfish',
      species: 'Red Drum',
      length: '31.5',
      weight: '',
      isReleased: false
    },

    // Day 1 - Salty Dog (reg-darien-003)
    {
      id: 'weigh-darien-003-001',
      tournamentDay: 1,
      timestamp: '2025-10-18T09:30:00Z',
      anglerId: 'crew-0',
      category: 'trout',
      species: 'Spotted Seatrout',
      length: '24.5',
      weight: '',
      isReleased: false
    },
    {
      id: 'weigh-darien-003-002',
      tournamentDay: 1,
      timestamp: '2025-10-18T12:15:00Z',
      anglerId: 'captain',
      category: 'sheepshead',
      species: 'Sheepshead',
      length: '17.0',
      weight: '',
      isReleased: false
    },

    // Day 2 - Sea Hunter (reg-darien-001)
    {
      id: 'weigh-darien-001-004',
      tournamentDay: 2,
      timestamp: '2025-10-19T08:00:00Z',
      anglerId: 'crew-2',
      category: 'mackerel',
      species: 'King Mackerel',
      length: '42.0',
      weight: '',
      isReleased: false
    },
    {
      id: 'weigh-darien-001-005',
      tournamentDay: 2,
      timestamp: '2025-10-19T10:30:00Z',
      anglerId: 'captain',
      category: 'cobia',
      species: 'Cobia',
      length: '52.5',
      weight: '',
      isReleased: false
    },

    // Day 2 - Reel Deal (reg-darien-002)
    {
      id: 'weigh-darien-002-003',
      tournamentDay: 2,
      timestamp: '2025-10-19T09:45:00Z',
      anglerId: 'crew-1',
      category: 'snapper',
      species: 'Red Snapper',
      length: '26.0',
      weight: '',
      isReleased: false
    },
    {
      id: 'weigh-darien-002-004',
      tournamentDay: 2,
      timestamp: '2025-10-19T11:00:00Z',
      anglerId: 'captain',
      category: 'grouper',
      species: 'Red Grouper',
      length: '30.5',
      weight: '',
      isReleased: false
    },

    // Day 2 - Salty Dog (reg-darien-003)
    {
      id: 'weigh-darien-003-003',
      tournamentDay: 2,
      timestamp: '2025-10-19T07:30:00Z',
      anglerId: 'crew-1',
      category: 'tarpon',
      species: 'Tarpon',
      length: '48.0',
      weight: '',
      isReleased: true
    },
    {
      id: 'weigh-darien-003-004',
      tournamentDay: 2,
      timestamp: '2025-10-19T13:45:00Z',
      anglerId: 'crew-0',
      category: 'redfish',
      species: 'Red Drum',
      length: '29.0',
      weight: '',
      isReleased: false
    }
  ],

  // Grand Isle Offshore Tournament - 5 days
  'offshore-grand-isle-oct-2025': [
    // Day 1 - Offshore entries
    {
      id: 'weigh-grandisle-001-001',
      tournamentDay: 1,
      timestamp: '2025-10-15T14:30:00Z',
      anglerId: 'captain',
      category: 'tuna',
      species: 'Yellowfin Tuna',
      length: '',
      weight: '65.5',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-001-002',
      tournamentDay: 1,
      timestamp: '2025-10-15T15:45:00Z',
      anglerId: 'crew-0',
      category: 'wahoo',
      species: 'Wahoo',
      length: '',
      weight: '42.3',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-002-001',
      tournamentDay: 1,
      timestamp: '2025-10-15T16:15:00Z',
      anglerId: 'crew-1',
      category: 'dolphin',
      species: 'Mahi Mahi',
      length: '',
      weight: '28.7',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-003-001',
      tournamentDay: 1,
      timestamp: '2025-10-15T17:00:00Z',
      anglerId: 'captain',
      category: 'marlinblue',
      species: 'Blue Marlin',
      length: '',
      weight: '0',
      isReleased: true
    },

    // Day 2
    {
      id: 'weigh-grandisle-001-003',
      tournamentDay: 2,
      timestamp: '2025-10-16T13:20:00Z',
      anglerId: 'crew-2',
      category: 'amberjack',
      species: 'Greater Amberjack',
      length: '',
      weight: '58.2',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-002-002',
      tournamentDay: 2,
      timestamp: '2025-10-16T14:45:00Z',
      anglerId: 'captain',
      category: 'grouper',
      species: 'Red Grouper',
      length: '',
      weight: '18.5',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-004-001',
      tournamentDay: 2,
      timestamp: '2025-10-16T15:30:00Z',
      anglerId: 'crew-0',
      category: 'cobia',
      species: 'Cobia',
      length: '',
      weight: '35.8',
      isReleased: false
    },

    // Day 3
    {
      id: 'weigh-grandisle-001-004',
      tournamentDay: 3,
      timestamp: '2025-10-17T12:15:00Z',
      anglerId: 'crew-1',
      category: 'snapper',
      species: 'Red Snapper',
      length: '',
      weight: '12.3',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-005-001',
      tournamentDay: 3,
      timestamp: '2025-10-17T13:45:00Z',
      anglerId: 'captain',
      category: 'sailfish',
      species: 'Sailfish',
      length: '',
      weight: '0',
      isReleased: true
    },
    {
      id: 'weigh-grandisle-002-003',
      tournamentDay: 3,
      timestamp: '2025-10-17T14:20:00Z',
      anglerId: 'crew-2',
      category: 'mackerel',
      species: 'King Mackerel',
      length: '',
      weight: '28.4',
      isReleased: false
    },

    // Day 4
    {
      id: 'weigh-grandisle-003-002',
      tournamentDay: 4,
      timestamp: '2025-10-18T11:30:00Z',
      anglerId: 'crew-1',
      category: 'tuna',
      species: 'Blackfin Tuna',
      length: '',
      weight: '32.1',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-006-001',
      tournamentDay: 4,
      timestamp: '2025-10-18T12:45:00Z',
      anglerId: 'captain',
      category: 'wahoo',
      species: 'Wahoo',
      length: '',
      weight: '51.7',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-001-005',
      tournamentDay: 4,
      timestamp: '2025-10-18T13:15:00Z',
      anglerId: 'captain',
      category: 'swordfish',
      species: 'Swordfish',
      length: '',
      weight: '125.0',
      isReleased: false
    },

    // Day 5
    {
      id: 'weigh-grandisle-004-002',
      tournamentDay: 5,
      timestamp: '2025-10-19T10:00:00Z',
      anglerId: 'crew-2',
      category: 'dolphin',
      species: 'Mahi Mahi',
      length: '',
      weight: '41.2',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-002-004',
      tournamentDay: 5,
      timestamp: '2025-10-19T11:30:00Z',
      anglerId: 'crew-0',
      category: 'amberjack',
      species: 'Greater Amberjack',
      length: '',
      weight: '47.8',
      isReleased: false
    },
    {
      id: 'weigh-grandisle-005-002',
      tournamentDay: 5,
      timestamp: '2025-10-19T12:20:00Z',
      anglerId: 'crew-1',
      category: 'marlinwhite',
      species: 'White Marlin',
      length: '',
      weight: '0',
      isReleased: true
    }
  ]
}

// Function to populate localStorage with test data
export const loadWeighInTestData = () => {
  Object.entries(WEIGH_IN_TEST_DATA).forEach(([tournamentId, entries]) => {
    const storageKey = `aswsc_weigh_in_${tournamentId}`
    
    // Group entries by boat registration ID (derived from weigh-in ID pattern)
    const entriesByBoat = {}
    
    entries.forEach(entry => {
      // Extract boat registration ID from weigh-in entry ID pattern
      // e.g., 'weigh-darien-001-001' -> 'reg-darien-001'
      const parts = entry.id.split('-')
      const boatRegId = `reg-${parts[1]}-${parts[2]}`
      
      if (!entriesByBoat[boatRegId]) {
        entriesByBoat[boatRegId] = []
      }
      
      entriesByBoat[boatRegId].push(entry)
    })
    
    localStorage.setItem(storageKey, JSON.stringify(entriesByBoat))
    console.log(`✅ Loaded test weigh-in data for ${tournamentId}:`, entriesByBoat)
    console.log(`📊 Storage key: ${storageKey}`)
    console.log(`🎣 Total boats with entries: ${Object.keys(entriesByBoat).length}`)
    console.log(`🐟 Total fish entries: ${Object.values(entriesByBoat).flat().length}`)
  })
  
  // Dispatch events to update any listening components
  Object.keys(WEIGH_IN_TEST_DATA).forEach(tournamentId => {
    const weighInData = JSON.parse(localStorage.getItem(`aswsc_weigh_in_${tournamentId}`))
    console.log(`🔄 Dispatching weighInUpdated event for ${tournamentId}`)
    window.dispatchEvent(new CustomEvent('weighInUpdated', {
      detail: { 
        tournamentId, 
        weighInEntries: weighInData
      }
    }))
  })
  
  console.log('🎯 Test data loading complete!')
}

// Function to clear test data
export const clearWeighInTestData = () => {
  Object.keys(WEIGH_IN_TEST_DATA).forEach(tournamentId => {
    const storageKey = `aswsc_weigh_in_${tournamentId}`
    localStorage.removeItem(storageKey)
  })
  console.log('Cleared all weigh-in test data')
}
