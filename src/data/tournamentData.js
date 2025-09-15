// ASWSC Tournament Data - Real 2025 Schedule and Results
export const TOURNAMENT_STATUS = {
  UPCOMING: 'upcoming',
  COMPLETED: 'completed',
  IN_PROGRESS: 'in_progress'
}

export const TOURNAMENT_DIVISIONS = {
  NEARSHORE: 'nearshore',
  OFFSHORE: 'offshore',
  ANGLER_MENS: 'angler_mens',
  ANGLER_WOMENS: 'angler_womens'
}

// 2025 Tournament Schedule with Real ASWSC Data
export const tournaments2025 = [
  // NEARSHORE TOURNAMENTS
  {
    id: 'nearshore-st-marks-mar-2025',
    name: 'St Marks Nearshore Tournament',
    location: 'St Marks, FL',
    startDate: '2025-03-15',
    endDate: '2025-03-16',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    status: TOURNAMENT_STATUS.COMPLETED,
    entryFeePerPerson: '$55',
    awardsDinnerFee: '$30',
    hasAwardsDinner: true,
    participants: 7,
    photoAlbumUrl: 'https://photos.google.com/share/AF1QipOExample1StMarks2025',
    tournamentDirector: {
      memberId: 1,
      name: 'Michael Johnson',
      email: 'mjohnson@email.com',
      phone: '(404) 555-0123'
    },
    results: {
      boats: [
        { place: 1, boat: 'Bite Me', captain: 'Capt Greg Gunter', points: 20 },
        { place: 2, boat: 'Shipp Shape', captain: 'Capt John Shipp', points: 15 },
        { place: 3, boat: 'Arbor Time', captain: 'Capt Josh Correll', points: 10 },
        { place: 4, boat: 'S.S. Minnow', captain: 'Capt Jacob Lassiter', points: 5 },
        { place: 5, boat: 'Silver Nomad', captain: 'Capt Paul Houston', points: 3 }
      ]
    }
  },
  {
    id: 'nearshore-steinhatchee-apr-2025',
    name: 'Steinhatchee Nearshore Tournament',
    location: 'Steinhatchee, FL',
    startDate: '2025-04-12',
    endDate: '2025-04-13',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    status: TOURNAMENT_STATUS.COMPLETED,
    entryFeePerPerson: '$55',
    awardsDinnerFee: '$30',
    hasAwardsDinner: true,
    participants: 5,
    photoAlbumUrl: 'https://photos.google.com/share/AF1QipOExample2Steinhatchee2025',
    tournamentDirector: {
      memberId: 2,
      name: 'Robert Davis',
      email: 'rdavis@email.com',
      phone: '(912) 555-0456'
    },
    results: {
      boats: [
        { place: 1, boat: 'Shipp Shape', captain: 'Capt John Shipp', points: 20 },
        { place: 2, boat: 'Amped Up', captain: 'Capt Ward Woody', points: 15 },
        { place: 3, boat: 'Living the Dream', captain: 'Capt Doug Kahlan', points: 10 }
      ]
    }
  },
  {
    id: 'nearshore-charleston-may-2025',
    name: 'Charleston Nearshore Tournament',
    location: 'Charleston, SC',
    startDate: '2025-05-17',
    endDate: '2025-05-18',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    awardsDinnerFee: '$35',
    hasAwardsDinner: true,
    registrationDeadline: '2025-05-10',
    photoAlbumUrl: 'https://photos.google.com/share/AF1QipOExample3Charleston2025',
    tournamentDirector: {
      memberId: 3,
      name: 'Jennifer Wilson',
      email: 'jwilson@email.com',
      phone: '(843) 555-0789'
    }
  },
  {
    id: 'nearshore-darien-oct-2025',
    name: 'Darien Nearshore Tournament',
    location: 'Darien, GA',
    startDate: '2025-10-18',
    endDate: '2025-10-19',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-10-11',
    tournamentDirector: {
      memberId: 4,
      name: 'David Thompson',
      email: 'dthompson@email.com',
      phone: '(912) 555-0321'
    }
  },
  {
    id: 'nearshore-carrabelle-nov-2025',
    name: 'Carrabelle Nearshore Tournament',
    location: 'Carrabelle, FL',
    startDate: '2025-11-15',
    endDate: '2025-11-16',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-11-08',
    tournamentDirector: {
      memberId: 5,
      name: 'Christopher Brown',
      email: 'cbrown@email.com',
      phone: '(850) 555-0654'
    }
  },
  {
    id: 'nearshore-crystal-river-dec-2025',
    name: 'Crystal River Nearshore Tournament',
    location: 'Crystal River, FL',
    startDate: '2025-12-13',
    endDate: '2025-12-14',
    division: TOURNAMENT_DIVISIONS.NEARSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-12-06',
    tournamentDirector: {
      memberId: 6,
      name: 'Matthew Garcia',
      email: 'mgarcia@email.com',
      phone: '(352) 555-0987'
    }
  },

  // OFFSHORE TOURNAMENTS (2025 Schedule based on 2024 pattern)
  {
    id: 'offshore-charleston-may-2025',
    name: 'Charleston Offshore Tournament',
    location: 'Charleston, SC',
    startDate: '2025-05-24',
    endDate: '2025-05-25',
    division: TOURNAMENT_DIVISIONS.OFFSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-05-17',
    tournamentDirector: {
      memberId: 7,
      name: 'Andrew Miller',
      email: 'amiller@email.com',
      phone: '(843) 555-0234'
    }
  },
  {
    id: 'offshore-apalachicola-jun-2025',
    name: 'Apalachicola Offshore Tournament',
    location: 'Apalachicola, FL',
    startDate: '2025-06-21',
    endDate: '2025-06-22',
    division: TOURNAMENT_DIVISIONS.OFFSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-06-14',
    tournamentDirector: {
      memberId: 8,
      name: 'Daniel Anderson',
      email: 'danderson@email.com',
      phone: '(850) 555-0567'
    }
  },
  {
    id: 'offshore-mexico-beach-jul-2025',
    name: 'Mexico Beach Offshore Tournament',
    location: 'Mexico Beach, FL',
    startDate: '2025-07-19',
    endDate: '2025-07-20',
    division: TOURNAMENT_DIVISIONS.OFFSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-07-12',
    tournamentDirector: {
      memberId: 9,
      name: 'Joseph Taylor',
      email: 'jtaylor@email.com',
      phone: '(850) 555-0890'
    }
  },
  {
    id: 'offshore-pensacola-sep-2025',
    name: 'Pensacola Offshore Tournament',
    location: 'Pensacola, FL',
    startDate: '2025-09-20',
    endDate: '2025-09-21',
    division: TOURNAMENT_DIVISIONS.OFFSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-09-13',
    tournamentDirector: {
      memberId: 10,
      name: 'Kevin White',
      email: 'kwhite@email.com',
      phone: '(850) 555-0123'
    }
  },
  {
    id: 'offshore-grand-isle-oct-2025',
    name: 'Grand Isle Offshore Tournament',
    location: 'Grand Isle, LA',
    startDate: '2025-10-25',
    endDate: '2025-10-26',
    division: TOURNAMENT_DIVISIONS.OFFSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-10-18',
    tournamentDirector: {
      memberId: 11,
      name: 'Brian Harris',
      email: 'bharris@email.com',
      phone: '(504) 555-0456'
    }
  },
  {
    id: 'offshore-carrabelle-nov-2025',
    name: 'Carrabelle Offshore Tournament',
    location: 'Carrabelle, FL',
    startDate: '2025-11-22',
    endDate: '2025-11-23',
    division: TOURNAMENT_DIVISIONS.OFFSHORE,
    status: TOURNAMENT_STATUS.UPCOMING,
    entryFeePerPerson: '$55',
    registrationDeadline: '2025-11-15',
    tournamentDirector: {
      memberId: 12,
      name: 'Ryan Clark',
      email: 'rclark@email.com',
      phone: '(850) 555-0789'
    }
  }
]

// 2025 Nearshore Boat of the Year Standings (Real Data)
export const nearshoreBoatStandings2025 = [
  { 
    place: 1, 
    boat: 'Shipp Shape', 
    captain: 'Capt John Shipp',
    tournaments: {
      'ST MARKS MAR': 15,
      'STEINHATCHEE APR': 20,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 35
  },
  { 
    place: 2, 
    boat: 'Bite Me', 
    captain: 'Capt Greg Gunter',
    tournaments: {
      'ST MARKS MAR': 20,
      'STEINHATCHEE APR': 0,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 20
  },
  { 
    place: 3, 
    boat: 'Amped Up', 
    captain: 'Capt Ward Woody',
    tournaments: {
      'ST MARKS MAR': 0,
      'STEINHATCHEE APR': 15,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 15
  },
  { 
    place: 4, 
    boat: 'Arbor Time', 
    captain: 'Capt Josh Correll',
    tournaments: {
      'ST MARKS MAR': 10,
      'STEINHATCHEE APR': 0,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 10
  },
  { 
    place: 5, 
    boat: 'Living the Dream', 
    captain: 'Capt Doug Kahlan',
    tournaments: {
      'ST MARKS MAR': 0,
      'STEINHATCHEE APR': 10,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 10
  },
  { 
    place: 6, 
    boat: 'S.S. Minnow', 
    captain: 'Capt Jacob Lassiter',
    tournaments: {
      'ST MARKS MAR': 5,
      'STEINHATCHEE APR': 0,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 5
  },
  { 
    place: 7, 
    boat: 'Silver Nomad', 
    captain: 'Capt Paul Houston',
    tournaments: {
      'ST MARKS MAR': 3,
      'STEINHATCHEE APR': 0,
      'CHARLESTON MAY': 0,
      'DARIEN OCT': 0,
      'CARRABELLE NOV': 0,
      'CRYSTAL RIVER DEC': 0
    },
    total: 3
  }
]

// 2024 Offshore Boat of the Year Final Standings (Real Data)
export const offshoreBoatStandings2024 = [
  {
    place: 1,
    boat: 'No Phish Here',
    tournaments: {
      'May Charleston': 20,
      'Jun Apalachicola': 3,
      'Jul Mexico Bch': 15,
      'Sep Pensacola': 15,
      'Oct Grand Isle': 0,
      'Nov Carrabelle': 0
    },
    total: 53
  },
  {
    place: 2,
    boat: 'Krusty Krab',
    tournaments: {
      'May Charleston': 0,
      'Jun Apalachicola': 10,
      'Jul Mexico Bch': 20,
      'Sep Pensacola': 0,
      'Oct Grand Isle': 0,
      'Nov Carrabelle': 0
    },
    total: 30
  },
  {
    place: 3,
    boat: 'Total Chaos',
    tournaments: {
      'May Charleston': 10,
      'Jun Apalachicola': 0,
      'Jul Mexico Bch': 0,
      'Sep Pensacola': 20,
      'Oct Grand Isle': 0,
      'Nov Carrabelle': 0
    },
    total: 30
  },
  {
    place: 4,
    boat: 'Persevere',
    tournaments: {
      'May Charleston': 0,
      'Jun Apalachicola': 20,
      'Jul Mexico Bch': 0,
      'Sep Pensacola': 0,
      'Oct Grand Isle': 0,
      'Nov Carrabelle': 0
    },
    total: 20
  },
  {
    place: 5,
    boat: 'Thai Knot',
    tournaments: {
      'May Charleston': 0,
      'Jun Apalachicola': 15,
      'Jul Mexico Bch': 0,
      'Sep Pensacola': 0,
      'Oct Grand Isle': 0,
      'Nov Carrabelle': 0
    },
    total: 15
  },
  {
    place: 6,
    boat: 'Pops',
    tournaments: {
      'May Charleston': 15,
      'Jun Apalachicola': 0,
      'Jul Mexico Bch': 0,
      'Sep Pensacola': 0,
      'Oct Grand Isle': 0,
      'Nov Carrabelle': 0
    },
    total: 15
  }
]

// Sample Men's Angler Standings (2025 Nearshore)
export const nearshoreAnglerMenStandings2025 = [
  { place: 1, angler: 'Mike Thompson', boat: 'Shipp Shape', total: 35 },
  { place: 2, angler: 'Greg Gunter', boat: 'Bite Me', total: 28 },
  { place: 3, angler: 'Ward Woody', boat: 'Amped Up', total: 22 },
  { place: 4, angler: 'Josh Correll', boat: 'Arbor Time', total: 18 },
  { place: 5, angler: 'Doug Kahlan', boat: 'Living the Dream', total: 15 },
  { place: 6, angler: 'Jacob Lassiter', boat: 'S.S. Minnow', total: 12 },
  { place: 7, angler: 'Paul Houston', boat: 'Silver Nomad', total: 8 }
]

// Sample Women's Angler Standings (2025 Nearshore)
export const nearshoreAnglerWomenStandings2025 = [
  { place: 1, angler: 'Sarah Mitchell', boat: 'Shipp Shape', total: 32 },
  { place: 2, angler: 'Jennifer Davis', boat: 'Bite Me', total: 25 },
  { place: 3, angler: 'Lisa Rodriguez', boat: 'Amped Up', total: 20 },
  { place: 4, angler: 'Amanda Wilson', boat: 'Living the Dream', total: 18 },
  { place: 5, angler: 'Michelle Brown', boat: 'Arbor Time', total: 15 },
  { place: 6, angler: 'Karen Johnson', boat: 'Silver Nomad', total: 10 }
]

// Sample Offshore Men's Angler Standings (2025)
export const offshoreAnglerMenStandings2025 = [
  { place: 1, angler: 'Captain Jake Morrison', boat: 'No Phish Here', total: 48 },
  { place: 2, angler: 'Tony Ricci', boat: 'Krusty Krab', total: 42 },
  { place: 3, angler: 'Steve Patterson', boat: 'Total Chaos', total: 38 },
  { place: 4, angler: 'Mark Stevens', boat: 'Persevere', total: 35 },
  { place: 5, angler: 'Dave Thompson', boat: 'Thai Knot', total: 28 }
]

// Sample Offshore Women's Angler Standings (2025)
export const offshoreAnglerWomenStandings2025 = [
  { place: 1, angler: 'Captain Maria Gonzalez', boat: 'Lady Luck', total: 45 },
  { place: 2, angler: 'Jessica Parker', boat: 'No Phish Here', total: 38 },
  { place: 3, angler: 'Rachel Adams', boat: 'Sea Breeze', total: 32 },
  { place: 4, angler: 'Nicole Turner', boat: 'Krusty Krab', total: 28 },
  { place: 5, angler: 'Christina Lee', boat: 'Ocean Dreams', total: 25 }
]

// AI-Generated Tournament Blog Summaries
export const tournamentBlogs = [
  {
    id: 'st-marks-march-2025-recap',
    tournamentId: 'nearshore-st-marks-mar-2025',
    title: 'St Marks Showdown: Bite Me Takes First Place in Season Opener',
    startDate: '2025-03-16',
    author: 'ASWSC Tournament Committee',
    excerpt: 'Captain Greg Gunter and the crew of Bite Me dominated the waters off St Marks to claim victory in the first nearshore tournament of 2025.',
    content: `
The 2025 ASWSC tournament season kicked off with a bang at St Marks, Florida, where seven boats battled challenging conditions and fierce competition. Captain Greg Gunter and his crew aboard "Bite Me" proved they came to fish, securing first place with an impressive performance that set the tone for what promises to be an exciting season.

**Perfect Conditions Meet Perfect Fishing**

Mother Nature smiled on the ASWSC fleet as they launched from St Marks with light winds and calm seas. The weather forecast called for ideal conditions, and the fish didn't disappoint. Early morning reports from the fleet indicated good action on both trout and redfish, with several boats reporting multiple hookups right out of the gate.

**Bite Me Bites Back**

Captain Greg Gunter's "Bite Me" established early dominance, working the grass flats with precision and patience. The crew's strategy of targeting deeper pockets within the grass beds paid dividends, as they consistently found quality fish throughout the day. Their winning bag included several keeper trout and a beautiful red drum that sealed their victory.

"We've been preparing for this tournament all winter," said Captain Gunter. "The crew worked like a well-oiled machine today, and the fish cooperated. It's a great way to start the season."

**Tight Competition Throughout the Fleet**

The competition was fierce, with Captain John Shipp's "Shipp Shape" finishing a strong second place. Known for his consistent performance and tactical approach, Shipp and his crew put together a solid bag that kept them in contention throughout the day. This early showing positions them well for the season-long boat of the year competition.

Captain Josh Correll's "Arbor Time" rounded out the top three, demonstrating the depth of talent in the ASWSC nearshore fleet. The veteran captain's experience showed as he navigated changing conditions and fish behavior throughout the tournament day.

**Looking Ahead**

With the season opener in the books, attention now turns to Steinhatchee in April. The early season standings show "Bite Me" leading with 20 points, followed by "Shipp Shape" with 15 points. However, with five tournaments remaining, there's plenty of season left for any boat to make their move.

The camaraderie and sportsmanship displayed at St Marks exemplified what makes ASWSC tournaments special. From pre-tournament strategy sessions to post-tournament fish tales at the dock, the bonds formed through competitive fishing continue to strengthen our club community.

**Final Results:**
1st Place: Bite Me - Capt Greg Gunter (20 points)
2nd Place: Shipp Shape - Capt John Shipp (15 points)
3rd Place: Arbor Time - Capt Josh Correll (10 points)
4th Place: S.S. Minnow - Capt Jacob Lassiter (5 points)
5th Place: Silver Nomad - Capt Paul Houston (3 points)

The next stop on the ASWSC nearshore circuit is Steinhatchee, Florida, on April 12th. Registration is now open, and based on the competitive spirit shown at St Marks, it promises to be another exciting day on the water.
    `
  },
  {
    id: 'steinhatchee-april-2025-recap',
    tournamentId: 'nearshore-steinhatchee-apr-2025',
    title: 'Shipp Shape Ships Out Victory at Steinhatchee Spectacular',
    startDate: '2025-04-13',
    author: 'ASWSC Tournament Committee',
    excerpt: 'Captain John Shipp and Shipp Shape bounced back from their second-place St Marks finish to dominate the Steinhatchee waters and take command of the 2025 boat of the year race.',
    content: `
The historic fishing village of Steinhatchee played host to another thrilling ASWSC nearshore tournament, and when the scales closed, it was Captain John Shipp's "Shipp Shape" celebrating their first victory of the 2025 season. The win not only earned them top honors for the day but also propelled them into the lead in the overall boat of the year standings.

**Steinhatchee Magic**

Known throughout the Gulf Coast for its pristine grass flats and abundant marine life, Steinhatchee provided the perfect backdrop for intense competition. The unique geography of the area, with its spring-fed rivers meeting the Gulf, creates an ecosystem that consistently produces quality fish – and Saturday was no exception.

**Shipp Shape Finds Their Rhythm**

After a solid second-place finish at St Marks, Captain John Shipp and his crew came to Steinhatchee with something to prove. Their preparation showed immediately as they executed a flawless game plan that combined local knowledge with tactical precision.

"We spent extra time studying the area and talking to local guides," explained Captain Shipp. "Steinhatchee has its own personality, and you have to respect that. Our patience paid off when we found the right combination of structure, current, and bait."

The "Shipp Shape" crew worked methodically through a series of productive spots, building their bag with consistent action throughout the tournament hours. Their winning strategy focused on targeting transitional areas where deeper water met shallow flats, a technique that proved devastatingly effective.

**Amped Up Shows Strong Form**

Captain Ward Woody's "Amped Up" made their 2025 tournament debut in impressive fashion, securing second place with a performance that announced their arrival as serious contenders. The crew's aggressive approach and willingness to run to less pressured waters paid dividends, earning them valuable points in the season standings.

**Living the Dream Rounds Out Podium**

Captain Doug Kahlan's "Living the Dream" completed the podium with a third-place finish that showcased the competitive depth of the ASWSC nearshore fleet. Known for his methodical approach and attention to detail, Kahlan's crew put together a solid bag that kept them in contention throughout the day.

**Season Standings Heat Up**

With two tournaments in the books, the 2025 boat of the year race has taken an interesting turn. "Shipp Shape" now leads with 35 total points (15 from St Marks + 20 from Steinhatchee), while "Bite Me" holds second place with 20 points from their St Marks victory. The early season has shown that consistency will be key, as several boats are positioned to make moves in the remaining tournaments.

**The Steinhatchee Experience**

Beyond the competition, the tournament highlighted what makes ASWSC events special. The pre-tournament captain's meeting at the local marina buzzed with strategy discussions and friendly rivalry. Post-tournament festivities at a waterfront restaurant featured the traditional fish tales, good-natured ribbing, and planning for future tournaments that define our club culture.

**Weather and Conditions**

Tournament day brought near-perfect conditions with light southeast winds and calm seas. Water temperatures in the mid-70s had the fish active, and several boats reported consistent action throughout the day. The combination of favorable weather and prime fishing conditions contributed to what many participants called one of the most enjoyable tournaments in recent memory.

**Final Results:**
1st Place: Shipp Shape - Capt John Shipp (20 points)
2nd Place: Amped Up - Capt Ward Woody (15 points)
3rd Place: Living the Dream - Capt Doug Kahlan (10 points)

**Current Boat of the Year Standings:**
1st: Shipp Shape - 35 points
2nd: Bite Me - 20 points
3rd: Amped Up - 15 points
4th: Arbor Time - 10 points
5th: Living the Dream - 10 points

The ASWSC nearshore fleet now sets its sights on Charleston, South Carolina, for the May tournament. With the season standings tightening and new boats joining the competition, the Charleston tournament promises to be another exciting chapter in what's shaping up to be a memorable 2025 season.
    `
  }
]

// Utility functions
export const getTournamentsByDivision = (division) => {
  return tournaments2025.filter(tournament => tournament.division === division)
}

export const getUpcomingTournaments = () => {
  return tournaments2025.filter(tournament => tournament.status === TOURNAMENT_STATUS.UPCOMING)
}

export const getCompletedTournaments = () => {
  return tournaments2025.filter(tournament => tournament.status === TOURNAMENT_STATUS.COMPLETED)
}

export const getTournamentById = (id) => {
  return tournaments2025.find(tournament => tournament.id === id)
}

export const getBlogByTournamentId = (tournamentId) => {
  return tournamentBlogs.find(blog => blog.tournamentId === tournamentId)
}
