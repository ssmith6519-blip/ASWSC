// ASWSC Tournament Scoring Matrices
// Based on official ASWSC scoring documents and tournament rules

// Nearshore Scoring Matrix - Length-based scoring (inches) - Official ASWSC Matrix
export const NEARSHORE_SCORING_MATRIX = {
  // Bluefish category
  bluefish: {
    category: 'bluefish',
    species: ['Bluefish'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 20.01, maxLength: null, points: 50 }, // >20" = 50 points
      { minLength: 0, maxLength: 20, points: 15 } // <=20" = 15 points
    ],
    releaseBonus: 0
  },

  // Barracuda category
  barracuda: {
    category: 'barracuda',
    species: ['Great Barracuda'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 24.01, maxLength: null, points: 50 }, // >24" = 50 points
      { minLength: 0, maxLength: 24, points: 15 } // <=24" = 15 points
    ],
    releaseBonus: 0
  },

  // Black Drum category
  blackdrum: {
    category: 'blackdrum',
    species: ['Black Drum'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 24.01, maxLength: null, points: 150 }, // >24" = 150 points
      { minLength: 14.01, maxLength: 24, points: 50 }, // >14"-24" = 50 points
      { minLength: 0, maxLength: 14, points: 15 } // <=14" = 15 points
    ],
    releaseBonus: 0
  },

  // Bonefish category
  bonefish: {
    category: 'bonefish',
    species: ['Bonefish'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 25.01, maxLength: null, points: 350 }, // >25" = 350 points
      { minLength: 20.01, maxLength: 25, points: 150 }, // >20-25" = 150 points
      { minLength: 0, maxLength: 20, points: 50 } // <=20" = 50 points
    ],
    releaseBonus: 0
  },

  // Cobia category
  cobia: {
    category: 'cobia',
    species: ['Cobia'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 50.01, maxLength: null, points: 350 }, // >50" = 350 points
      { minLength: 33.01, maxLength: 50, points: 150 }, // >33-50" = 150 points
      { minLength: 0, maxLength: 33, points: 50 } // <=33" = 50 points
    ],
    releaseBonus: 0
  },

  // Flounder category
  flounder: {
    category: 'flounder',
    species: ['Southern Flounder', 'Summer Flounder', 'Gulf Flounder'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 16.01, maxLength: null, points: 50 }, // >16" = 50 points
      { minLength: 0, maxLength: 16, points: 15 } // <=16" = 15 points
    ],
    releaseBonus: 0
  },

  // Grouper category
  grouper: {
    category: 'grouper',
    species: ['Red Grouper', 'Gag Grouper', 'Black Grouper', 'Scamp Grouper'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 28.01, maxLength: null, points: 150 }, // >28" = 150 points
      { minLength: 20.01, maxLength: 28, points: 50 }, // >20-28" = 50 points
      { minLength: 0, maxLength: 20, points: 15 } // <=20" = 15 points
    ],
    releaseBonus: 0
  },

  // King Mackerel category
  mackerel: {
    category: 'mackerel',
    species: ['King Mackerel', 'Spanish Mackerel'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 36.01, maxLength: null, points: 150 }, // >36" = 150 points
      { minLength: 24.01, maxLength: 36, points: 50 }, // >24-36" = 50 points
      { minLength: 0, maxLength: 24, points: 15 } // <=24" = 15 points
    ],
    releaseBonus: 0
  },

  // Permit category
  permit: {
    category: 'permit',
    species: ['Permit'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 35.01, maxLength: null, points: 350 }, // >35" = 350 points
      { minLength: 24.01, maxLength: 35, points: 150 }, // >24"-35" = 150 points
      { minLength: 0, maxLength: 24, points: 50 } // <=24" = 50 points
    ],
    releaseBonus: 0
  },

  // Pompano category
  pompano: {
    category: 'pompano',
    species: ['Florida Pompano'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 20.01, maxLength: null, points: 150 }, // >20" = 150 points
      { minLength: 0, maxLength: 20, points: 50 } // <=20" = 50 points
    ],
    releaseBonus: 0
  },

  // Redfish category
  redfish: {
    category: 'redfish',
    species: ['Red Drum', 'Redfish'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 36.01, maxLength: null, points: 150 }, // >36" = 150 points
      { minLength: 27.01, maxLength: 36, points: 75 }, // >27-36" = 75 points
      { minLength: 18.01, maxLength: 27, points: 50 }, // >18-27" = 50 points
      { minLength: 0, maxLength: 18, points: 15 } // <=18" = 15 points
    ],
    releaseBonus: 0
  },

  // Sheepshead category
  sheepshead: {
    category: 'sheepshead',
    species: ['Sheepshead'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 16.01, maxLength: null, points: 50 }, // >16" = 50 points
      { minLength: 0, maxLength: 16, points: 15 } // <=16" = 15 points
    ],
    releaseBonus: 0
  },

  // Snapper category
  snapper: {
    category: 'snapper',
    species: ['Red Snapper', 'Mangrove Snapper', 'Yellowtail Snapper', 'Mutton Snapper', 'Lane Snapper'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 24.01, maxLength: null, points: 75 }, // >24" = 75 points
      { minLength: 16.01, maxLength: 24, points: 50 }, // >16-24" = 50 points
      { minLength: 0, maxLength: 16, points: 15 } // <=16" = 15 points
    ],
    releaseBonus: 0
  },

  // Snook category
  snook: {
    category: 'snook',
    species: ['Common Snook'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 32.01, maxLength: null, points: 150 }, // >32" = 150 points
      { minLength: 24.01, maxLength: 32, points: 50 }, // >24-32" = 50 points
      { minLength: 0, maxLength: 24, points: 15 } // <=24" = 15 points
    ],
    releaseBonus: 0
  },

  // Striped Bass category
  stripedbass: {
    category: 'stripedbass',
    species: ['Striped Bass'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 38.01, maxLength: null, points: 350 }, // >38" = 350 points
      { minLength: 28.01, maxLength: 38, points: 150 }, // >28-38" = 150 points
      { minLength: 0, maxLength: 28, points: 50 } // <=28" = 50 points
    ],
    releaseBonus: 0
  },

  // Triggerfish category
  triggerfish: {
    category: 'triggerfish',
    species: ['Gray Triggerfish', 'Queen Triggerfish'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 15.01, maxLength: null, points: 50 }, // >15" = 50 points
      { minLength: 0, maxLength: 15, points: 15 } // <=15" = 15 points
    ],
    releaseBonus: 0
  },

  // Tripletail category
  tripletail: {
    category: 'tripletail',
    species: ['Tripletail'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 22.01, maxLength: null, points: 75 }, // >22" = 75 points
      { minLength: 18.01, maxLength: 22, points: 50 }, // >18-22" = 50 points
      { minLength: 0, maxLength: 18, points: 15 } // <=18" = 15 points
    ],
    releaseBonus: 0
  },

  // Trout category
  trout: {
    category: 'trout',
    species: ['Spotted Seatrout', 'Speckled Trout'],
    scoringType: 'length', // inches
    pointRanges: [
      { minLength: 22.01, maxLength: null, points: 150 }, // >22" = 150 points
      { minLength: 19.01, maxLength: 22, points: 75 }, // >19-22" = 75 points
      { minLength: 15.01, maxLength: 19, points: 50 }, // >15-19" = 50 points
      { minLength: 0, maxLength: 15, points: 15 } // <=15" = 15 points
    ],
    releaseBonus: 0
  },

  // Tarpon - Catch and Release Only (In water photo allowed)
  tarpon: {
    category: 'tarpon',
    species: ['Tarpon'],
    scoringType: 'release_only',
    pointRanges: [
      { minLength: 12, maxLength: null, points: 350 } // >=12" = 350 points (catch & release only)
    ],
    releaseBonus: 0 // Points are in the range, not bonus
  }
}

// Offshore Scoring Matrix - Weight-based scoring (pounds)
export const OFFSHORE_SCORING_MATRIX = {
  // Amberjack & Almaco category
  amberjack: {
    category: 'amberjack',
    species: ['Greater Amberjack', 'Almaco Jack'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 50, maxWeight: null, points: 350 }, // 50+ lbs = 350 points
      { minWeight: 25, maxWeight: 49.9, points: 150 }, // 25-49.9 lbs = 150 points
      { minWeight: 15, maxWeight: 24.9, points: 50 }, // 15-24.9 lbs = 50 points
      { minWeight: 0, maxWeight: 14.9, points: 15 } // < 15 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Cobia category
  cobia: {
    category: 'cobia',
    species: ['Cobia'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 50, maxWeight: null, points: 350 }, // 50+ lbs = 350 points
      { minWeight: 25, maxWeight: 49.9, points: 150 }, // 25-49.9 lbs = 150 points
      { minWeight: 0, maxWeight: 24.9, points: 50 } // < 25 lbs = 50 points
    ],
    releaseBonus: 0
  },

  // Dolphin (Mahi) category
  dolphin: {
    category: 'dolphin',
    species: ['Mahi Mahi', 'Dolphin'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 35, maxWeight: null, points: 350 }, // 35+ lbs = 350 points
      { minWeight: 20, maxWeight: 34.9, points: 150 }, // 20-34.9 lbs = 150 points
      { minWeight: 10, maxWeight: 19.9, points: 50 }, // 10-19.9 lbs = 50 points
      { minWeight: 0, maxWeight: 9.9, points: 15 } // < 10 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Flounder category
  flounder: {
    category: 'flounder',
    species: ['Southern Flounder', 'Summer Flounder', 'Gulf Flounder'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 15 } // Legal Size = 15 points
    ],
    releaseBonus: 0
  },

  // Grouper category
  grouper: {
    category: 'grouper',
    species: ['Red Grouper', 'Gag Grouper', 'Black Grouper', 'Scamp Grouper', 'Warsaw Grouper', 'Snowy Grouper', 'Tiger Grouper', 'Yellowedge Grouper', 'Yellowfin Grouper', 'Yellowmouth Grouper', 'Marbled Grouper', 'Misty Grouper', 'Coney', 'Graysby', 'Red Hind', 'Rock Hind', 'Speckled Hind'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 30, maxWeight: null, points: 350 }, // 30+ lbs = 350 points
      { minWeight: 15, maxWeight: 29.9, points: 150 }, // 15-29.9 lbs = 150 points
      { minWeight: 5, maxWeight: 14.9, points: 50 }, // 5-14.9 lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Mackerel category
  mackerel: {
    category: 'mackerel',
    species: ['King Mackerel', 'Spanish Mackerel', 'Cero Mackerel'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 35, maxWeight: null, points: 350 }, // 35+ lbs = 350 points
      { minWeight: 20, maxWeight: 34.9, points: 150 }, // 20-34.9 lbs = 150 points
      { minWeight: 10, maxWeight: 19.9, points: 50 }, // 10-19.9 lbs = 50 points
      { minWeight: 0, maxWeight: 9.9, points: 15 } // < 10 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Pompano category
  pompano: {
    category: 'pompano',
    species: ['Florida Pompano', 'African Pompano'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 25, maxWeight: null, points: 200 }, // 25+ lbs = 200 points
      { minWeight: 10, maxWeight: 24.9, points: 100 }, // 10-24.9 lbs = 100 points
      { minWeight: 5, maxWeight: 9.9, points: 50 }, // 5.0-9.9 lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Red Porgy & Sheepshead category
  porgy: {
    category: 'porgy',
    species: ['Red Porgy', 'Sheepshead'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 5, maxWeight: null, points: 25 }, // 5+ lbs = 25 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Redfish category
  redfish: {
    category: 'redfish',
    species: ['Red Drum', 'Redfish'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 25, maxWeight: null, points: 200 }, // 25+ lbs = 200 points
      { minWeight: 10, maxWeight: 24.9, points: 100 }, // 10-24.9 lbs = 100 points
      { minWeight: 5, maxWeight: 9.9, points: 50 }, // 5.0-9.9 lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Sea Basses category
  seabass: {
    category: 'seabass',
    species: ['Black Sea Bass', 'Longtail Bass', 'Striped Bass'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 10, maxWeight: null, points: 150 }, // 10+ lbs = 150 points
      { minWeight: 5, maxWeight: 9.9, points: 50 }, // 5.0-9.9 lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Sea Trout category
  seatrout: {
    category: 'seatrout',
    species: ['Spotted Seatrout'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 6, maxWeight: null, points: 150 }, // 6+ lbs = 150 points
      { minWeight: 3, maxWeight: 5.9, points: 50 }, // 3-5.9 lbs = 50 points
      { minWeight: 0, maxWeight: 2.9, points: 15 } // < 3 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Snapper category
  snapper: {
    category: 'snapper',
    species: ['Red Snapper', 'Mangrove Snapper', 'Yellowtail Snapper', 'Mutton Snapper', 'Lane Snapper', 'Vermillion Snapper', 'Blackfin Snapper', 'Cubera Snapper', 'Dog Snapper', 'Gray Snapper', 'Mahogany Snapper', 'Queen Snapper', 'Schoolmaster Snapper', 'Silk Snapper', 'Wenchman Snapper'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 25, maxWeight: null, points: 350 }, // 25+ lbs = 350 points
      { minWeight: 15, maxWeight: 24.9, points: 150 }, // 15-24.9 lbs = 150 points
      { minWeight: 5, maxWeight: 14.9, points: 50 }, // 5-14.9 lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Snook category
  snook: {
    category: 'snook',
    species: ['Common Snook'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 25, maxWeight: null, points: 350 }, // 25+ lbs = 350 points
      { minWeight: 10, maxWeight: 24.9, points: 150 }, // 10-24.9 lbs = 150 points
      { minWeight: 0, maxWeight: 9.9, points: 50 } // < 10 lbs = 50 points
    ],
    releaseBonus: 0
  },

  // Tilefish category
  tilefish: {
    category: 'tilefish',
    species: ['Anchor Tilefish', 'Blueline Tilefish', 'Goldface Tilefish', 'Golden Tilefish', 'Sand Tilefish'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 20, maxWeight: null, points: 350 }, // 20+ lbs = 350 points
      { minWeight: 10, maxWeight: 19.9, points: 150 }, // 10-19.9 lbs = 150 points
      { minWeight: 5, maxWeight: 9.9, points: 50 }, // 5-9.9 lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Triggerfish category
  triggerfish: {
    category: 'triggerfish',
    species: ['Gray Triggerfish', 'Queen Triggerfish', 'Ocean Triggerfish'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 5, maxWeight: null, points: 50 }, // 5+ lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Tripletail category
  tripletail: {
    category: 'tripletail',
    species: ['Tripletail'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 5, maxWeight: null, points: 50 }, // 5+ lbs = 50 points
      { minWeight: 0, maxWeight: 4.9, points: 15 } // < 5 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Tuna category
  tuna: {
    category: 'tuna',
    species: ['Yellowfin Tuna', 'Blackfin Tuna', 'Bigeye Tuna', 'Bluefin Tuna', 'Albacore Tuna', 'Skipjack Tuna'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 50, maxWeight: null, points: 350 }, // 50+ lbs = 350 points
      { minWeight: 25, maxWeight: 49.9, points: 150 }, // 25-49.9 lbs = 150 points
      { minWeight: 0, maxWeight: 24.9, points: 50 } // < 25 lbs = 50 points
    ],
    releaseBonus: 0
  },

  // Wahoo category
  wahoo: {
    category: 'wahoo',
    species: ['Wahoo'],
    scoringType: 'weight', // pounds
    pointRanges: [
      { minWeight: 35, maxWeight: null, points: 350 }, // 35+ lbs = 350 points
      { minWeight: 20, maxWeight: 34.9, points: 150 }, // 20-34.9 lbs = 150 points
      { minWeight: 10, maxWeight: 19.9, points: 50 }, // 10-19.9 lbs = 50 points
      { minWeight: 0, maxWeight: 9.9, points: 15 } // < 10 lbs = 15 points
    ],
    releaseBonus: 0
  },

  // Catch or Release - Swordfish
  swordfish: {
    category: 'swordfish',
    species: ['Swordfish'],
    scoringType: 'catch_or_release',
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 500 } // Any size = 500 points (catch or release)
    ],
    releaseBonus: 0
  },

  // Release Only Species
  marlinblue: {
    category: 'marlinblue',
    species: ['Blue Marlin'],
    scoringType: 'release_only',
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 900 } // Release = 900 points
    ],
    releaseBonus: 0
  },

  marlinwhite: {
    category: 'marlinwhite',
    species: ['White Marlin'],
    scoringType: 'release_only',
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 500 } // Release = 500 points
    ],
    releaseBonus: 0
  },

  sailfish: {
    category: 'sailfish',
    species: ['Sailfish'],
    scoringType: 'release_only',
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 400 } // Release = 400 points
    ],
    releaseBonus: 0
  },

  tarpon: {
    category: 'tarpon',
    species: ['Tarpon'],
    scoringType: 'release_only',
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 150 } // Release = 150 points
    ],
    releaseBonus: 0
  },

  bonefish: {
    category: 'bonefish',
    species: ['Bonefish'],
    scoringType: 'release_only',
    pointRanges: [
      { minWeight: 0, maxWeight: null, points: 50 } // Release = 50 points
    ],
    releaseBonus: 0
  }
}

/**
 * Calculate points for a fish entry based on tournament division and scoring matrix
 * @param {Object} tournament - Tournament object with division info
 * @param {Object} fishEntry - Fish entry with category, weight, length, isReleased
 * @param {Object} customScoringMatrix - Optional custom scoring matrix
 * @returns {number} Points awarded for the fish
 */
export const calculateFishScore = (tournament, fishEntry, customScoringMatrix = null) => {
  const { division } = tournament
  const { category, weight, length, isReleased = false } = fishEntry
  
  let scoringMatrix
  if (customScoringMatrix) {
    scoringMatrix = customScoringMatrix
  } else {
    try {
      const storageKey = division === 'offshore' ? 'aswsc_offshore_scoring_matrix' : 'aswsc_nearshore_scoring_matrix'
      const savedMatrix = localStorage.getItem(storageKey)
      if (savedMatrix) {
        scoringMatrix = JSON.parse(savedMatrix)
      } else {
        scoringMatrix = division === 'offshore' ? OFFSHORE_SCORING_MATRIX : NEARSHORE_SCORING_MATRIX
      }
    } catch (err) {
      console.warn('Error loading scoring matrix from storage, using defaults:', err)
      scoringMatrix = division === 'offshore' ? OFFSHORE_SCORING_MATRIX : NEARSHORE_SCORING_MATRIX
    }
  }
  
  const categoryRules = scoringMatrix[category]
  if (!categoryRules) {
    console.warn(`No scoring rules found for category: ${category}`)
    return 0
  }

  let basePoints = 0
  
  // Handle release-only categories
  if (categoryRules.scoringType === 'release_only') {
    if (categoryRules.pointRanges && categoryRules.pointRanges.length > 0) {
      return isReleased ? categoryRules.pointRanges[0].points : 0
    }
    return isReleased ? categoryRules.releaseBonus : 0
  }

  // Handle catch-or-release categories (like Swordfish)
  if (categoryRules.scoringType === 'catch_or_release') {
    if (categoryRules.pointRanges && categoryRules.pointRanges.length > 0) {
      return categoryRules.pointRanges[0].points // Same points whether kept or released
    }
    return 0
  }

  // Handle weight-based scoring (offshore)
  if (categoryRules.scoringType === 'weight' && weight) {
    const weightValue = parseFloat(weight)
    const range = categoryRules.pointRanges.find(range => {
      const minWeight = range.minWeight
      const maxWeight = range.maxWeight
      return weightValue >= minWeight && (maxWeight === null || weightValue <= maxWeight)
    })
    basePoints = range ? range.points : 0
  } 
  // Handle length-based scoring (nearshore)
  else if (categoryRules.scoringType === 'length' && length) {
    const lengthValue = parseFloat(length)
    const range = categoryRules.pointRanges.find(range => {
      const minLength = range.minLength
      const maxLength = range.maxLength
      return lengthValue >= minLength && (maxLength === null || lengthValue <= maxLength)
    })
    basePoints = range ? range.points : 0
  }

  // Add release bonus if fish was released
  const releasePoints = isReleased ? categoryRules.releaseBonus : 0
  
  return basePoints + releasePoints
}

/**
 * Calculate total points for an angler across all their fish entries
 * @param {Array} fishEntries - Array of fish entries for the angler
 * @param {Object} tournament - Tournament object
 * @returns {number} Total points for the angler
 */
export const calculateAnglerScore = (fishEntries, tournament) => {
  return fishEntries.reduce((total, entry) => {
    return total + calculateFishScore(tournament, entry)
  }, 0)
}

/**
 * Calculate total points for a boat across all anglers and fish entries
 * @param {Array} boatEntries - Array of all fish entries for the boat
 * @param {Object} tournament - Tournament object
 * @returns {number} Total points for the boat
 */
export const calculateBoatScore = (boatEntries, tournament) => {
  return boatEntries.reduce((total, entry) => {
    return total + calculateFishScore(tournament, entry)
  }, 0)
}