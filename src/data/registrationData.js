// Tournament Registration Data Structure
export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  PAID: 'paid'
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
}

// Comprehensive tournament registrations - 6 boats per tournament, 4 people per boat (1 captain + 3 crew)
export const tournamentRegistrations = [
  // CHARLESTON NEARSHORE TOURNAMENT - 6 boats, 24 total anglers
  {
    id: 'reg-charleston-001',
    tournamentId: 'nearshore-charleston-may-2025',
    registrationDate: '2025-04-15T10:30:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Sea Hunter',
      boatLength: 28,
      boatMake: 'Grady-White',
      boatModel: 'Canyon 288',
      boatYear: 2022,
      hullNumber: 'GW123456789',
      captainLicense: 'SC-123456',
      insurance: { company: 'Progressive Marine', policyNumber: 'PM-789123', expirationDate: '2025-12-31' }
    },

    captain: {
      memberId: 1,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'mjohnson@email.com',
      phone: '(404) 555-0123',
      emergencyContact: { name: 'Sarah Johnson', phone: '(404) 555-0124', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 1, firstName: 'Michael', lastName: 'Johnson', email: 'mjohnson@email.com', phone: '(404) 555-0123', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Jake', lastName: 'Wilson', email: 'jwilson@email.com', phone: '(404) 555-0456', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: true, guestOf: 'Michael Johnson' },
      { memberId: null, firstName: 'Tom', lastName: 'Davis', email: 'tdavis@email.com', phone: '(404) 555-0789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'Michael Johnson' },
      { memberId: null, firstName: 'Brad', lastName: 'Miller', email: 'bmiller@email.com', phone: '(404) 555-0321', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Michael Johnson' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_charleston_001', paidAt: '2025-04-15T10:35:00Z' },
    additionalInfo: { specialRequests: '', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-charleston-002',
    tournamentId: 'nearshore-charleston-may-2025',
    registrationDate: '2025-04-16T14:20:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Reel Time',
      boatLength: 26,
      boatMake: 'Boston Whaler',
      boatModel: 'Outrage 270',
      boatYear: 2021,
      hullNumber: 'BW987654321',
      captainLicense: 'SC-789456',
      insurance: { company: 'BoatUS', policyNumber: 'BU-456789', expirationDate: '2025-11-30' }
    },

    captain: {
      memberId: 2,
      firstName: 'Robert',
      lastName: 'Davis',
      email: 'rdavis@email.com',
      phone: '(912) 555-0456',
      emergencyContact: { name: 'Linda Davis', phone: '(912) 555-0457', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 2, firstName: 'Robert', lastName: 'Davis', email: 'rdavis@email.com', phone: '(912) 555-0456', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Mark', lastName: 'Stevens', email: 'mstevens@email.com', phone: '(912) 555-0789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Robert Davis' },
      { memberId: null, firstName: 'Paul', lastName: 'Johnson', email: 'pjohnson@email.com', phone: '(912) 555-0234', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'Robert Davis' },
      { memberId: null, firstName: 'Scott', lastName: 'Williams', email: 'swilliams@email.com', phone: '(912) 555-0567', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: true, guestOf: 'Robert Davis' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_charleston_002', paidAt: '2025-04-16T14:25:00Z' },
    additionalInfo: { specialRequests: 'Early launch preferred', dietaryRestrictions: '', previousParticipation: false, howHeardAbout: 'friend_referral' }
  },

  {
    id: 'reg-charleston-003',
    tournamentId: 'nearshore-charleston-may-2025',
    registrationDate: '2025-04-18T09:15:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Fish Finder',
      boatLength: 24,
      boatMake: 'Sea Hunt',
      boatModel: 'Ultra 255',
      boatYear: 2020,
      hullNumber: 'SH456789123',
      captainLicense: 'SC-654321',
      insurance: { company: 'Geico Marine', policyNumber: 'GM-123789', expirationDate: '2025-12-15' }
    },

    captain: {
      memberId: 3,
      firstName: 'Jennifer',
      lastName: 'Wilson',
      email: 'jwilson@email.com',
      phone: '(843) 555-0789',
      emergencyContact: { name: 'David Wilson', phone: '(843) 555-0790', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 3, firstName: 'Jennifer', lastName: 'Wilson', email: 'jwilson@email.com', phone: '(843) 555-0789', isCaptain: true, division: 'womens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Sarah', lastName: 'Mitchell', email: 'smitchell@email.com', phone: '(843) 555-0321', isCaptain: false, division: 'womens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'S', isGuest: true, guestOf: 'Jennifer Wilson' },
      { memberId: null, firstName: 'Lisa', lastName: 'Brown', email: 'lbrown@email.com', phone: '(843) 555-0654', isCaptain: false, division: 'womens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: true, guestOf: 'Jennifer Wilson' },
      { memberId: null, firstName: 'Amy', lastName: 'Taylor', email: 'ataylor@email.com', phone: '(843) 555-0987', isCaptain: false, division: 'womens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Jennifer Wilson' }
    ],

    payment: { totalAmount: 360, entryFees: 220, awardsDinnerFees: 140, processingFee: 0, method: 'credit_card', transactionId: 'txn_charleston_003', paidAt: '2025-04-18T09:20:00Z' },
    additionalInfo: { specialRequests: 'Ladies crew - prefer morning start', dietaryRestrictions: 'Vegetarian options needed', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-charleston-004',
    tournamentId: 'nearshore-charleston-may-2025',
    registrationDate: '2025-04-20T16:45:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Southern Pride',
      boatLength: 30,
      boatMake: 'Contender',
      boatModel: '30ST',
      boatYear: 2023,
      hullNumber: 'CT789123456',
      captainLicense: 'SC-987654',
      insurance: { company: 'Allstate Marine', policyNumber: 'AM-654321', expirationDate: '2026-01-15' }
    },

    captain: {
      memberId: 4,
      firstName: 'David',
      lastName: 'Thompson',
      email: 'dthompson@email.com',
      phone: '(912) 555-0321',
      emergencyContact: { name: 'Lisa Thompson', phone: '(912) 555-0322', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 4, firstName: 'David', lastName: 'Thompson', email: 'dthompson@email.com', phone: '(912) 555-0321', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Chris', lastName: 'Anderson', email: 'canderson@email.com', phone: '(912) 555-0654', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: true, guestOf: 'David Thompson' },
      { memberId: null, firstName: 'Ryan', lastName: 'Clark', email: 'rclark@email.com', phone: '(912) 555-0987', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'David Thompson' },
      { memberId: null, firstName: 'Tyler', lastName: 'Moore', email: 'tmoore@email.com', phone: '(912) 555-0135', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'David Thompson' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_charleston_004', paidAt: '2025-04-20T16:50:00Z' },
    additionalInfo: { specialRequests: 'Experienced crew - can handle rough conditions', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-charleston-005',
    tournamentId: 'nearshore-charleston-may-2025',
    registrationDate: '2025-04-22T11:30:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Cast Away',
      boatLength: 25,
      boatMake: 'Sportsman',
      boatModel: 'Tournament 254',
      boatYear: 2019,
      hullNumber: 'SP321654987',
      captainLicense: 'SC-147258',
      insurance: { company: 'State Farm Marine', policyNumber: 'SF-987654', expirationDate: '2025-10-30' }
    },

    captain: {
      memberId: 5,
      firstName: 'Christopher',
      lastName: 'Brown',
      email: 'cbrown@email.com',
      phone: '(850) 555-0654',
      emergencyContact: { name: 'Amanda Brown', phone: '(850) 555-0655', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 5, firstName: 'Christopher', lastName: 'Brown', email: 'cbrown@email.com', phone: '(850) 555-0654', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Kevin', lastName: 'White', email: 'kwhite@email.com', phone: '(850) 555-0321', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'Christopher Brown' },
      { memberId: null, firstName: 'Jason', lastName: 'Lee', email: 'jlee@email.com', phone: '(850) 555-0468', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: true, guestOf: 'Christopher Brown' },
      { memberId: null, firstName: 'Brandon', lastName: 'Hall', email: 'bhall@email.com', phone: '(850) 555-0579', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Christopher Brown' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_charleston_005', paidAt: '2025-04-22T11:35:00Z' },
    additionalInfo: { specialRequests: '', dietaryRestrictions: 'No seafood', previousParticipation: false, howHeardAbout: 'website' }
  },

  {
    id: 'reg-charleston-006',
    tournamentId: 'nearshore-charleston-may-2025',
    registrationDate: '2025-04-25T08:15:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Hooked Up',
      boatLength: 27,
      boatMake: 'Pursuit',
      boatModel: 'C 266',
      boatYear: 2022,
      hullNumber: 'PU654987321',
      captainLicense: 'SC-369258',
      insurance: { company: 'Travelers Marine', policyNumber: 'TM-147852', expirationDate: '2025-12-31' }
    },

    captain: {
      memberId: 6,
      firstName: 'Matthew',
      lastName: 'Garcia',
      email: 'mgarcia@email.com',
      phone: '(352) 555-0987',
      emergencyContact: { name: 'Maria Garcia', phone: '(352) 555-0988', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 6, firstName: 'Matthew', lastName: 'Garcia', email: 'mgarcia@email.com', phone: '(352) 555-0987', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Carlos', lastName: 'Rodriguez', email: 'crodriguez@email.com', phone: '(352) 555-0123', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Matthew Garcia' },
      { memberId: null, firstName: 'Miguel', lastName: 'Santos', email: 'msantos@email.com', phone: '(352) 555-0456', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: true, guestOf: 'Matthew Garcia' },
      { memberId: null, firstName: 'Diego', lastName: 'Morales', email: 'dmorales@email.com', phone: '(352) 555-0789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'L', isGuest: true, guestOf: 'Matthew Garcia' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_charleston_006', paidAt: '2025-04-25T08:20:00Z' },
    additionalInfo: { specialRequests: 'Spanish speaking crew', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  // DARIEN NEARSHORE TOURNAMENT - 6 boats, 24 total anglers
  {
    id: 'reg-darien-001',
    tournamentId: 'nearshore-darien-oct-2025',
    registrationDate: '2025-09-15T14:20:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Reel Deal',
      boatLength: 26,
      boatMake: 'Sea Hunt',
      boatModel: 'Ultra 265',
      boatYear: 2021,
      hullNumber: 'SH987654321',
      captainLicense: 'GA-789456',
      insurance: { company: 'BoatUS', policyNumber: 'BU-456789', expirationDate: '2025-11-30' }
    },

    captain: {
      memberId: 4,
      firstName: 'David',
      lastName: 'Thompson',
      email: 'dthompson@email.com',
      phone: '(912) 555-0321',
      emergencyContact: { name: 'Lisa Thompson', phone: '(912) 555-0322', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 4, firstName: 'David', lastName: 'Thompson', email: 'dthompson@email.com', phone: '(912) 555-0321', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Mark', lastName: 'Stevens', email: 'mstevens@email.com', phone: '(912) 555-0456', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'XL', isGuest: true, guestOf: 'David Thompson' },
      { memberId: null, firstName: 'Jake', lastName: 'Wilson', email: 'jwilson@email.com', phone: '(912) 555-0789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'David Thompson' },
      { memberId: null, firstName: 'Connor', lastName: 'Smith', email: 'csmith@email.com', phone: '(912) 555-0234', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'David Thompson' }
    ],

    payment: { totalAmount: 310, entryFees: 220, awardsDinnerFees: 90, processingFee: 0, method: 'credit_card', transactionId: 'txn_darien_001', paidAt: '2025-09-15T14:25:00Z' },
    additionalInfo: { specialRequests: 'Prefer early launch time', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-darien-002',
    tournamentId: 'nearshore-darien-oct-2025',
    registrationDate: '2025-09-20T09:15:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Southern Comfort',
      boatLength: 24,
      boatMake: 'Sportsman',
      boatModel: 'Tournament 234',
      boatYear: 2020,
      hullNumber: 'SP456789123',
      captainLicense: 'GA-654321',
      insurance: { company: 'Geico Marine', policyNumber: 'GM-123789', expirationDate: '2025-12-15' }
    },

    captain: {
      memberId: 5,
      firstName: 'Christopher',
      lastName: 'Brown',
      email: 'cbrown@email.com',
      phone: '(850) 555-0654',
      emergencyContact: { name: 'Amanda Brown', phone: '(850) 555-0655', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 5, firstName: 'Christopher', lastName: 'Brown', email: 'cbrown@email.com', phone: '(850) 555-0654', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Ryan', lastName: 'Davis', email: 'rdavis@email.com', phone: '(850) 555-0987', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'XL', isGuest: true, guestOf: 'Christopher Brown' },
      { memberId: null, firstName: 'Austin', lastName: 'Parker', email: 'aparker@email.com', phone: '(850) 555-0345', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'Christopher Brown' },
      { memberId: null, firstName: 'Blake', lastName: 'Turner', email: 'bturner@email.com', phone: '(850) 555-0678', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'Christopher Brown' }
    ],

    payment: { totalAmount: 310, entryFees: 220, awardsDinnerFees: 90, processingFee: 0, method: 'credit_card', transactionId: 'txn_darien_002', paidAt: '2025-09-20T09:20:00Z' },
    additionalInfo: { specialRequests: '', dietaryRestrictions: 'No shellfish', previousParticipation: false, howHeardAbout: 'friend_referral' }
  },

  {
    id: 'reg-darien-003',
    tournamentId: 'nearshore-darien-oct-2025',
    registrationDate: '2025-09-22T15:30:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Georgia Peach',
      boatLength: 28,
      boatMake: 'Robalo',
      boatModel: 'R287',
      boatYear: 2022,
      hullNumber: 'RO789456123',
      captainLicense: 'GA-852963',
      insurance: { company: 'Progressive Marine', policyNumber: 'PM-963852', expirationDate: '2026-01-31' }
    },

    captain: {
      memberId: 8,
      firstName: 'Daniel',
      lastName: 'Anderson',
      email: 'danderson@email.com',
      phone: '(850) 555-0567',
      emergencyContact: { name: 'Rachel Anderson', phone: '(850) 555-0568', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 8, firstName: 'Daniel', lastName: 'Anderson', email: 'danderson@email.com', phone: '(850) 555-0567', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'XL', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Josh', lastName: 'Martin', email: 'jmartin@email.com', phone: '(850) 555-0234', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'Daniel Anderson' },
      { memberId: null, firstName: 'Ben', lastName: 'Taylor', email: 'btaylor@email.com', phone: '(850) 555-0678', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'M', isGuest: true, guestOf: 'Daniel Anderson' },
      { memberId: null, firstName: 'Ethan', lastName: 'Roberts', email: 'eroberts@email.com', phone: '(850) 555-0912', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'XL', isGuest: true, guestOf: 'Daniel Anderson' }
    ],

    payment: { totalAmount: 310, entryFees: 220, awardsDinnerFees: 90, processingFee: 0, method: 'credit_card', transactionId: 'txn_darien_003', paidAt: '2025-09-22T15:35:00Z' },
    additionalInfo: { specialRequests: 'Local knowledge of Darien waters', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-darien-004',
    tournamentId: 'nearshore-darien-oct-2025',
    registrationDate: '2025-09-25T10:45:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Tidal Wave',
      boatLength: 25,
      boatMake: 'Key West',
      boatModel: '244CC',
      boatYear: 2019,
      hullNumber: 'KW147258369',
      captainLicense: 'GA-741963',
      insurance: { company: 'Allstate Marine', policyNumber: 'AM-741852', expirationDate: '2025-11-15' }
    },

    captain: {
      memberId: 9,
      firstName: 'Joseph',
      lastName: 'Taylor',
      email: 'jtaylor@email.com',
      phone: '(850) 555-0890',
      emergencyContact: { name: 'Michelle Taylor', phone: '(850) 555-0891', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 9, firstName: 'Joseph', lastName: 'Taylor', email: 'jtaylor@email.com', phone: '(850) 555-0890', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Steve', lastName: 'Parker', email: 'sparker@email.com', phone: '(850) 555-0345', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'XL', isGuest: true, guestOf: 'Joseph Taylor' },
      { memberId: null, firstName: 'Nick', lastName: 'Roberts', email: 'nroberts@email.com', phone: '(850) 555-0678', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'M', isGuest: true, guestOf: 'Joseph Taylor' },
      { memberId: null, firstName: 'Logan', lastName: 'Hayes', email: 'lhayes@email.com', phone: '(850) 555-0135', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'Joseph Taylor' }
    ],

    payment: { totalAmount: 310, entryFees: 220, awardsDinnerFees: 90, processingFee: 0, method: 'credit_card', transactionId: 'txn_darien_004', paidAt: '2025-09-25T10:50:00Z' },
    additionalInfo: { specialRequests: 'Experienced inshore crew', dietaryRestrictions: 'Gluten-free options', previousParticipation: false, howHeardAbout: 'social_media' }
  },

  {
    id: 'reg-darien-005',
    tournamentId: 'nearshore-darien-oct-2025',
    registrationDate: '2025-09-28T12:20:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Marsh Runner',
      boatLength: 23,
      boatMake: 'Pathfinder',
      boatModel: '2300 HPS',
      boatYear: 2020,
      hullNumber: 'PF369258147',
      captainLicense: 'GA-159753',
      insurance: { company: 'State Farm Marine', policyNumber: 'SF-159753', expirationDate: '2025-12-31' }
    },

    captain: {
      memberId: 10,
      firstName: 'Kevin',
      lastName: 'White',
      email: 'kwhite@email.com',
      phone: '(850) 555-0123',
      emergencyContact: { name: 'Jennifer White', phone: '(850) 555-0124', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 10, firstName: 'Kevin', lastName: 'White', email: 'kwhite@email.com', phone: '(850) 555-0123', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Tommy', lastName: 'Green', email: 'tgreen@email.com', phone: '(850) 555-0456', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'XL', isGuest: true, guestOf: 'Kevin White' },
      { memberId: null, firstName: 'Hunter', lastName: 'Cox', email: 'hcox@email.com', phone: '(850) 555-0789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'Kevin White' },
      { memberId: null, firstName: 'Caleb', lastName: 'Ward', email: 'cward@email.com', phone: '(850) 555-0246', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'Kevin White' }
    ],

    payment: { totalAmount: 310, entryFees: 220, awardsDinnerFees: 90, processingFee: 0, method: 'credit_card', transactionId: 'txn_darien_005', paidAt: '2025-09-28T12:25:00Z' },
    additionalInfo: { specialRequests: 'Shallow water specialist', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-darien-006',
    tournamentId: 'nearshore-darien-oct-2025',
    registrationDate: '2025-10-01T16:10:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Low Country',
      boatLength: 26,
      boatMake: 'Mako',
      boatModel: '264 CC',
      boatYear: 2021,
      hullNumber: 'MK852741963',
      captainLicense: 'GA-357159',
      insurance: { company: 'USAA Marine', policyNumber: 'US-357159', expirationDate: '2026-03-15' }
    },

    captain: {
      memberId: 11,
      firstName: 'Brian',
      lastName: 'Harris',
      email: 'bharris@email.com',
      phone: '(504) 555-0456',
      emergencyContact: { name: 'Kelly Harris', phone: '(504) 555-0457', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 11, firstName: 'Brian', lastName: 'Harris', email: 'bharris@email.com', phone: '(504) 555-0456', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'XL', isGuest: false, guestOf: null },
      { memberId: null, firstName: 'Jason', lastName: 'Moore', email: 'jmoore@email.com', phone: '(504) 555-0789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'Brian Harris' },
      { memberId: null, firstName: 'Eric', lastName: 'Adams', email: 'eadams@email.com', phone: '(504) 555-0321', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: true, guestOf: 'Brian Harris' },
      { memberId: null, firstName: 'Cole', lastName: 'Bennett', email: 'cbennett@email.com', phone: '(504) 555-0654', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 30, shirtSize: 'L', isGuest: true, guestOf: 'Brian Harris' }
    ],

    payment: { totalAmount: 310, entryFees: 220, awardsDinnerFees: 90, processingFee: 0, method: 'credit_card', transactionId: 'txn_darien_006', paidAt: '2025-10-01T16:15:00Z' },
    additionalInfo: { specialRequests: 'Louisiana crew - love the Georgia coast', dietaryRestrictions: '', previousParticipation: false, howHeardAbout: 'friend_referral' }
  },

  // GRAND ISLE OFFSHORE TOURNAMENT - 6 boats, 24 total anglers (with zip tie colors)
  {
    id: 'reg-grand-isle-001',
    tournamentId: 'offshore-grand-isle-oct-2025',
    registrationDate: '2025-10-05T09:30:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Deep Blue',
      boatLength: 35,
      boatMake: 'Yellowfin',
      boatModel: '36 Offshore',
      boatYear: 2023,
      hullNumber: 'YF123456789',
      captainLicense: 'LA-987654',
      insurance: { company: 'Progressive Marine', policyNumber: 'PM-789123', expirationDate: '2026-03-31' }
    },

    captain: {
      memberId: 12,
      firstName: 'Captain',
      lastName: 'Rodriguez',
      email: 'crodriguez@email.com',
      phone: '(504) 555-1234',
      emergencyContact: { name: 'Maria Rodriguez', phone: '(504) 555-1235', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 12, firstName: 'Captain', lastName: 'Rodriguez', email: 'crodriguez@email.com', phone: '(504) 555-1234', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'black' },
      { memberId: 18, firstName: 'Marcus', lastName: 'Johnson', email: 'mjohnson2@email.com', phone: '(504) 555-2345', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null, zipTieColor: 'red' },
      { memberId: 19, firstName: 'Tony', lastName: 'Williams', email: 'twilliams@email.com', phone: '(504) 555-3456', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: false, guestOf: null, zipTieColor: 'blue' },
      { memberId: null, firstName: 'Jake', lastName: 'Martinez', email: 'jmartinez@email.com', phone: '(504) 555-4567', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Captain Rodriguez', zipTieColor: 'green' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_grand_isle_001', paidAt: '2025-10-05T09:35:00Z' },
    additionalInfo: { specialRequests: 'Experienced offshore crew', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-grand-isle-002',
    tournamentId: 'offshore-grand-isle-oct-2025',
    registrationDate: '2025-10-07T14:15:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Cajun Thunder',
      boatLength: 32,
      boatMake: 'Contender',
      boatModel: '32ST',
      boatYear: 2022,
      hullNumber: 'CT987654321',
      captainLicense: 'LA-654321',
      insurance: { company: 'BoatUS', policyNumber: 'BU-654789', expirationDate: '2025-12-31' }
    },

    captain: {
      memberId: 13,
      firstName: 'Pierre',
      lastName: 'Boudreaux',
      email: 'pboudreaux@email.com',
      phone: '(985) 555-5678',
      emergencyContact: { name: 'Celeste Boudreaux', phone: '(985) 555-5679', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 13, firstName: 'Pierre', lastName: 'Boudreaux', email: 'pboudreaux@email.com', phone: '(985) 555-5678', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null, zipTieColor: 'black' },
      { memberId: 20, firstName: 'Beau', lastName: 'Thibodaux', email: 'bthibodaux@email.com', phone: '(985) 555-6789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'orange' },
      { memberId: 21, firstName: 'Remy', lastName: 'Landry', email: 'rlandry@email.com', phone: '(985) 555-7890', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: false, guestOf: null, zipTieColor: 'yellow' },
      { memberId: 22, firstName: 'Trey', lastName: 'Hebert', email: 'thebert@email.com', phone: '(985) 555-8901', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'purple' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_grand_isle_002', paidAt: '2025-10-07T14:20:00Z' },
    additionalInfo: { specialRequests: 'Local Louisiana crew with offshore experience', dietaryRestrictions: 'Seafood allergies', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-grand-isle-003',
    tournamentId: 'offshore-grand-isle-oct-2025',
    registrationDate: '2025-10-10T11:45:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Gulf Warrior',
      boatLength: 38,
      boatMake: 'Freeman',
      boatModel: '37VH',
      boatYear: 2024,
      hullNumber: 'FR456789123',
      captainLicense: 'TX-789456',
      insurance: { company: 'Geico Marine', policyNumber: 'GM-456123', expirationDate: '2026-01-15' }
    },

    captain: {
      memberId: 14,
      firstName: 'Wade',
      lastName: 'Thompson',
      email: 'wthompson@email.com',
      phone: '(409) 555-9012',
      emergencyContact: { name: 'Sarah Thompson', phone: '(409) 555-9013', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 14, firstName: 'Wade', lastName: 'Thompson', email: 'wthompson@email.com', phone: '(409) 555-9012', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'black' },
      { memberId: 23, firstName: 'Cole', lastName: 'Anderson', email: 'canderson2@email.com', phone: '(409) 555-0123', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null, zipTieColor: 'white' },
      { memberId: 24, firstName: 'Hunter', lastName: 'Davis', email: 'hdavis@email.com', phone: '(409) 555-1234', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: false, guestOf: null, zipTieColor: 'pink' },
      { memberId: 25, firstName: 'Chase', lastName: 'Miller', email: 'cmiller@email.com', phone: '(409) 555-2345', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'red' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_grand_isle_003', paidAt: '2025-10-10T11:50:00Z' },
    additionalInfo: { specialRequests: 'Texas crew - first time at Grand Isle', dietaryRestrictions: '', previousParticipation: false, howHeardAbout: 'website' }
  },

  {
    id: 'reg-grand-isle-004',
    tournamentId: 'offshore-grand-isle-oct-2025',
    registrationDate: '2025-10-12T16:20:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Reel Addiction',
      boatLength: 30,
      boatMake: 'Pursuit',
      boatModel: 'OS 325',
      boatYear: 2021,
      hullNumber: 'PU789123456',
      captainLicense: 'FL-321654',
      insurance: { company: 'Allstate Marine', policyNumber: 'AM-789456', expirationDate: '2025-11-30' }
    },

    captain: {
      memberId: 15,
      firstName: 'Michael',
      lastName: 'Stevens',
      email: 'mstevens2@email.com',
      phone: '(850) 555-3456',
      emergencyContact: { name: 'Lisa Stevens', phone: '(850) 555-3457', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 15, firstName: 'Michael', lastName: 'Stevens', email: 'mstevens2@email.com', phone: '(850) 555-3456', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null, zipTieColor: 'black' },
      { memberId: null, firstName: 'Brandon', lastName: 'Clark', email: 'bclark@email.com', phone: '(850) 555-4567', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'L', isGuest: true, guestOf: 'Michael Stevens', zipTieColor: 'orange' },
      { memberId: 26, firstName: 'Tyler', lastName: 'Wright', email: 'twright@email.com', phone: '(850) 555-5678', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: false, guestOf: null, zipTieColor: 'yellow' },
      { memberId: 27, firstName: 'Jordan', lastName: 'Hall', email: 'jhall@email.com', phone: '(850) 555-6789', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'green' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_grand_isle_004', paidAt: '2025-10-12T16:25:00Z' },
    additionalInfo: { specialRequests: 'Florida panhandle crew', dietaryRestrictions: 'No shellfish', previousParticipation: true, howHeardAbout: 'club_member' }
  },

  {
    id: 'reg-grand-isle-005',
    tournamentId: 'offshore-grand-isle-oct-2025',
    registrationDate: '2025-10-15T08:30:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Southern Belle',
      boatLength: 34,
      boatMake: 'Invincible',
      boatModel: '33',
      boatYear: 2023,
      hullNumber: 'IN321654987',
      captainLicense: 'AL-456789',
      insurance: { company: 'State Farm Marine', policyNumber: 'SF-321654', expirationDate: '2026-02-28' }
    },

    captain: {
      memberId: 16,
      firstName: 'James',
      lastName: 'Wilson',
      email: 'jwilson2@email.com',
      phone: '(251) 555-7890',
      emergencyContact: { name: 'Amanda Wilson', phone: '(251) 555-7891', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 16, firstName: 'James', lastName: 'Wilson', email: 'jwilson2@email.com', phone: '(251) 555-7890', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'black' },
      { memberId: 28, firstName: 'Connor', lastName: 'Moore', email: 'cmoore@email.com', phone: '(251) 555-8901', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null, zipTieColor: 'white' },
      { memberId: 29, firstName: 'Austin', lastName: 'Taylor', email: 'ataylor2@email.com', phone: '(251) 555-9012', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'M', isGuest: false, guestOf: null, zipTieColor: 'blue' },
      { memberId: 30, firstName: 'Blake', lastName: 'Brown', email: 'bbrown@email.com', phone: '(251) 555-0123', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'purple' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_grand_isle_005', paidAt: '2025-10-15T08:35:00Z' },
    additionalInfo: { specialRequests: 'Alabama crew - experienced with Gulf waters', dietaryRestrictions: '', previousParticipation: true, howHeardAbout: 'friend_referral' }
  },

  {
    id: 'reg-grand-isle-006',
    tournamentId: 'offshore-grand-isle-oct-2025',
    registrationDate: '2025-10-18T13:45:00Z',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.COMPLETED,
    
    boatInfo: {
      boatName: 'Bayou Beast',
      boatLength: 36,
      boatMake: 'Midnight Express',
      boatModel: '37 Open',
      boatYear: 2022,
      hullNumber: 'ME654987321',
      captainLicense: 'LA-147258',
      insurance: { company: 'Travelers Marine', policyNumber: 'TM-654987', expirationDate: '2025-12-15' }
    },

    captain: {
      memberId: 17,
      firstName: 'Trent',
      lastName: 'Guidry',
      email: 'tguidry@email.com',
      phone: '(337) 555-1357',
      emergencyContact: { name: 'Nicole Guidry', phone: '(337) 555-1358', relationship: 'Spouse' }
    },

    anglers: [
      { memberId: 17, firstName: 'Trent', lastName: 'Guidry', email: 'tguidry@email.com', phone: '(337) 555-1357', isCaptain: true, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: false, guestOf: null, zipTieColor: 'black' },
      { memberId: 31, firstName: 'Dustin', lastName: 'Broussard', email: 'dbroussard@email.com', phone: '(337) 555-2468', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'XL', isGuest: false, guestOf: null, zipTieColor: 'pink' },
      { memberId: 32, firstName: 'Cody', lastName: 'Fontenot', email: 'cfontenot@email.com', phone: '(337) 555-3579', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: false, awardsDinnerFee: 0, shirtSize: 'M', isGuest: false, guestOf: null, zipTieColor: 'white' },
      { memberId: null, firstName: 'Bryce', lastName: 'Richard', email: 'brichard@email.com', phone: '(337) 555-4680', isCaptain: false, division: 'mens', entryFee: 55, awardsDinner: true, awardsDinnerFee: 35, shirtSize: 'L', isGuest: true, guestOf: 'Trent Guidry', zipTieColor: 'red' }
    ],

    payment: { totalAmount: 325, entryFees: 220, awardsDinnerFees: 105, processingFee: 0, method: 'credit_card', transactionId: 'txn_grand_isle_006', paidAt: '2025-10-18T13:50:00Z' },
    additionalInfo: { specialRequests: 'Acadiana crew - home waters advantage', dietaryRestrictions: 'Vegetarian options needed', previousParticipation: true, howHeardAbout: 'club_member' }
  }
]

// Tournament Registration Form Fields Template
export const registrationFormTemplate = {
  // Tournament Selection
  tournamentId: '',
  
  // Boat Information (Required)
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

  // Captain Information (Required)
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

  // Anglers (1-6 typically)
  anglers: [
    {
      memberId: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      isCaptain: true,
      division: 'mens', // mens, womens, youth
      entryFee: 55,
      awardsDinner: false,
      awardsDinnerFee: 0,
      shirtSize: 'L',
      isGuest: false,
      guestOf: null
    }
  ],

  // Additional Information
  additionalInfo: {
    specialRequests: '',
    dietaryRestrictions: '',
    previousParticipation: false,
    howHeardAbout: 'club_member'
  },

  // Agreement and Waivers
  agreements: {
    liabilityWaiver: false,
    rulesAgreement: false,
    photoRelease: false,
    emailOptIn: true
  }
}

// Tournament Application Tip Sheet Content
export const tournamentTipSheet = {
  title: "Tournament Registration Guidelines",
  sections: [
    {
      title: "Before You Register",
      tips: [
        "Ensure your ASWSC membership is current and in good standing",
        "Verify your boat insurance is valid and covers tournament fishing",
        "Check that all required safety equipment is aboard and functional",
        "Review tournament rules and regulations carefully",
        "Confirm your captain's license is current (if required for tournament location)"
      ]
    },
    {
      title: "Boat Requirements",
      tips: [
        "Minimum boat length may apply depending on tournament location",
        "All boats must have current registration and insurance",
        "Safety equipment: Life jackets, flares, horn, fire extinguisher",
        "VHF radio required for offshore tournaments",
        "GPS/fishfinder recommended but not required"
      ]
    },
    {
      title: "Registration Information",
      tips: [
        "Captain must be an ASWSC member in good standing",
        "Maximum of 6 anglers per boat (including captain)",
        "Guest anglers allowed but do not earn points toward club standings",
        "All anglers must sign liability waiver before tournament",
        "Emergency contact information required for all participants"
      ]
    },
    {
      title: "Payment and Fees",
      tips: [
        "Entry fees must be paid in full to complete registration",
        "Credit card payments include a small processing fee",
        "Refunds available up to 7 days before tournament (minus processing fee)",
        "Late registrations may incur additional fees",
        "Prize money distributed based on participation and tournament rules"
      ]
    },
    {
      title: "Tournament Day",
      tips: [
        "Arrive at captain's meeting 30 minutes early",
        "Bring printed copy of registration confirmation",
        "All safety equipment will be inspected before departure",
        "Follow all tournament rules and boundaries",
        "Monitor VHF channel 16 for safety communications"
      ]
    },
    {
      title: "Scoring and Points",
      tips: [
        "Points awarded based on tournament placement",
        "Only ASWSC members earn points toward annual standings",
        "Boat of the Year points awarded to boat/captain combination",
        "Angler of the Year points awarded to individual anglers",
        "Tie-breakers determined by tournament rules"
      ]
    }
  ]
}

// Utility functions for registration management
export const createEmptyRegistration = (tournamentId) => ({
  id: `reg-${Date.now()}`,
  tournamentId,
  registrationDate: new Date().toISOString(),
  status: REGISTRATION_STATUS.PENDING,
  paymentStatus: PAYMENT_STATUS.PENDING,
  ...registrationFormTemplate,
  tournamentId
})

export const validateRegistration = (registration) => {
  const errors = {}

  // Boat information validation
  if (!registration.boatInfo.boatName.trim()) {
    errors.boatName = 'Boat name is required'
  }
  
  if (!registration.boatInfo.boatLength || registration.boatInfo.boatLength < 16) {
    errors.boatLength = 'Minimum boat length is 16 feet'
  }

  // Captain information validation
  if (!registration.captain.firstName.trim()) {
    errors.captainFirstName = 'Captain first name is required'
  }
  
  if (!registration.captain.lastName.trim()) {
    errors.captainLastName = 'Captain last name is required'
  }
  
  if (!registration.captain.email.trim() || !isValidEmail(registration.captain.email)) {
    errors.captainEmail = 'Valid email address is required'
  }
  
  if (!registration.captain.phone.trim()) {
    errors.captainPhone = 'Phone number is required'
  }

  // Emergency contact validation
  if (!registration.captain.emergencyContact.name.trim()) {
    errors.emergencyContactName = 'Emergency contact name is required'
  }
  
  if (!registration.captain.emergencyContact.phone.trim()) {
    errors.emergencyContactPhone = 'Emergency contact phone is required'
  }

  // Angler validation
  if (registration.anglers.length === 0) {
    errors.anglers = 'At least one angler is required'
  }
  
  if (registration.anglers.length > 6) {
    errors.anglers = 'Maximum 6 anglers per boat'
  }

  // Agreement validation
  if (!registration.agreements.liabilityWaiver) {
    errors.liabilityWaiver = 'Liability waiver must be accepted'
  }
  
  if (!registration.agreements.rulesAgreement) {
    errors.rulesAgreement = 'Tournament rules must be accepted'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const calculateRegistrationFees = (tournament, anglerCount, awardsDinnerCount = 0) => {
  // Get per-person fee from tournament data
  const entryFeePerPerson = parseFloat((tournament.entryFeePerPerson || tournament.entryFee || '$55').replace('$', ''))
  const totalEntryFee = entryFeePerPerson * anglerCount
  
  // Awards dinner fee calculation
  let awardsDinnerFeePerPerson = 0
  let totalAwardsDinnerFee = 0
  
  if (tournament.hasAwardsDinner && awardsDinnerCount > 0) {
    awardsDinnerFeePerPerson = parseFloat((tournament.awardsDinnerFee || '$30').replace('$', ''))
    totalAwardsDinnerFee = awardsDinnerFeePerPerson * awardsDinnerCount
  }
  
  const subtotal = totalEntryFee + totalAwardsDinnerFee
  const processingFeeRate = 0.035 // 3.5% processing fee
  const processingFee = Math.round(subtotal * processingFeeRate * 100) / 100
  
  return {
    entryFeePerPerson,
    anglerCount,
    totalEntryFee,
    awardsDinnerFeePerPerson,
    awardsDinnerCount,
    totalAwardsDinnerFee,
    subtotal,
    processingFee,
    totalAmount: subtotal + processingFee
  }
}

export const getRegistrationsByTournament = (tournamentId) => {
  return tournamentRegistrations.filter(reg => reg.tournamentId === tournamentId)
}

export const getRegistrationById = (registrationId) => {
  return tournamentRegistrations.find(reg => reg.id === registrationId)
}