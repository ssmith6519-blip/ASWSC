// Member database structure and mock data
export const MEMBER_STATUS = {
  CURRENT: 'Current',
  EXPIRED: 'Expired',
  LIFETIME: 'Lifetime'
}

// Sample member data
export const initialMembersData = [
  {
    id: 1,
    memberName: {
      last: 'Johnson',
      first: 'Michael',
      middle: 'Robert'
    },
    email: 'mjohnson@email.com',
    phone: '(404) 555-0123',
    joiningDate: '2018-03-15',
    lastRenewalDate: '2024-01-15',
    status: MEMBER_STATUS.CURRENT,
    spouse: {
      last: 'Johnson',
      first: 'Sarah',
      middle: 'Elizabeth'
    },
    children: [
      { firstName: 'Emma', birthYear: 2010, birthMonth: 7 },
      { firstName: 'Jake', birthYear: 2012, birthMonth: 3 }
    ],
    primaryBoat: {
      name: 'Sea Hunter',
      make: 'Boston Whaler',
      model: 'Outrage 280',
      year: 2020
    },
    secondaryBoat: {
      name: 'Weekend Warrior',
      make: 'Sea Ray',
      model: 'Sundancer 260',
      year: 2015
    }
  },
  {
    id: 2,
    memberName: {
      last: 'Davis',
      first: 'Robert',
      middle: 'William'
    },
    email: 'rdavis@email.com',
    phone: '(770) 555-0456',
    joiningDate: '2015-06-20',
    lastRenewalDate: '2024-02-01',
    status: MEMBER_STATUS.CURRENT,
    spouse: {
      last: 'Davis',
      first: 'Jennifer',
      middle: 'Lynn'
    },
    children: [
      { firstName: 'Tyler', birthYear: 2008, birthMonth: 11 },
      { firstName: 'Madison', birthYear: 2011, birthMonth: 5 },
      { firstName: 'Connor', birthYear: 2014, birthMonth: 9 }
    ],
    primaryBoat: {
      name: 'Reel Deal',
      make: 'Grady-White',
      model: 'Canyon 306',
      year: 2019
    },
    secondaryBoat: null
  },
  {
    id: 3,
    memberName: {
      last: 'Wilson',
      first: 'James',
      middle: 'Anthony'
    },
    email: 'jwilson@email.com',
    phone: '(678) 555-0789',
    joiningDate: '1995-01-10',
    lastRenewalDate: '1995-01-10',
    status: MEMBER_STATUS.LIFETIME,
    spouse: {
      last: 'Wilson',
      first: 'Patricia',
      middle: 'Anne'
    },
    children: [
      { firstName: 'Ashley', birthYear: 1992, birthMonth: 4 },
      { firstName: 'Brandon', birthYear: 1995, birthMonth: 8 }
    ],
    primaryBoat: {
      name: 'Old Salt',
      make: 'Hatteras',
      model: 'GT59',
      year: 2021
    },
    secondaryBoat: {
      name: 'Bay Runner',
      make: 'Robalo',
      model: 'R242',
      year: 2018
    }
  },
  {
    id: 4,
    memberName: {
      last: 'Brown',
      first: 'Lisa',
      middle: 'Marie'
    },
    email: 'lbrown@email.com',
    phone: '(470) 555-0321',
    joiningDate: '2020-09-12',
    lastRenewalDate: '2023-01-15',
    status: MEMBER_STATUS.EXPIRED,
    spouse: null,
    children: [],
    primaryBoat: {
      name: 'Solo Sailor',
      make: 'Pursuit',
      model: 'OS 255',
      year: 2017
    },
    secondaryBoat: null
  },
  {
    id: 5,
    memberName: {
      last: 'Thompson',
      first: 'David',
      middle: 'Charles'
    },
    email: 'dthompson@email.com',
    phone: '(404) 555-0654',
    joiningDate: '2019-07-25',
    lastRenewalDate: '2024-03-01',
    status: MEMBER_STATUS.CURRENT,
    spouse: {
      last: 'Thompson',
      first: 'Michelle',
      middle: 'Rose'
    },
    children: [
      { firstName: 'Sophia', birthYear: 2015, birthMonth: 12 },
      { firstName: 'Lucas', birthYear: 2017, birthMonth: 6 }
    ],
    primaryBoat: {
      name: 'Family Time',
      make: 'Scout',
      model: '275 LXF',
      year: 2022
    },
    secondaryBoat: {
      name: 'Quick Strike',
      make: 'Yellowfin',
      model: '24 Bay',
      year: 2019
    }
  }
]

// Utility functions for member data management
export const createEmptyMember = () => ({
  id: Date.now(), // Simple ID generation for demo
  memberName: {
    last: '',
    first: '',
    middle: ''
  },
  email: '',
  phone: '',
  joiningDate: '',
  lastRenewalDate: '',
  status: MEMBER_STATUS.CURRENT,
  spouse: {
    last: '',
    first: '',
    middle: ''
  },
  children: [],
  primaryBoat: {
    name: '',
    make: '',
    model: '',
    year: ''
  },
  secondaryBoat: {
    name: '',
    make: '',
    model: '',
    year: ''
  }
})

export const validateMember = (member) => {
  const errors = {}
  
  if (!member.memberName.first.trim()) {
    errors.firstName = 'First name is required'
  }
  
  if (!member.memberName.last.trim()) {
    errors.lastName = 'Last name is required'
  }
  
  if (!member.joiningDate) {
    errors.joiningDate = 'Joining date is required'
  }
  
  if (!member.lastRenewalDate) {
    errors.lastRenewalDate = 'Last renewal date is required'
  }
  
  if (!member.status) {
    errors.status = 'Status is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const formatMemberName = (memberName) => {
  const { last, first, middle } = memberName
  return middle ? `${last}, ${first} ${middle}` : `${last}, ${first}`
}

export const formatBoatInfo = (boat) => {
  if (!boat || !boat.name) return 'No boat registered'
  return `${boat.name} (${boat.year} ${boat.make} ${boat.model})`
}

export const getStatusColor = (status) => {
  switch (status) {
    case MEMBER_STATUS.CURRENT:
      return 'bg-green-100 text-green-800 border-green-200'
    case MEMBER_STATUS.EXPIRED:
      return 'bg-red-100 text-red-800 border-red-200'
    case MEMBER_STATUS.LIFETIME:
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
