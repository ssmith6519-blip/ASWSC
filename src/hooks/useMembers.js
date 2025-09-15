import { useState, useEffect } from 'react'
import { initialMembersData, createEmptyMember, validateMember } from '../data/membersData'

const STORAGE_KEY = 'aswsc_members_data'

export const useMembers = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load members from localStorage or use initial data
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem(STORAGE_KEY)
      if (savedMembers) {
        setMembers(JSON.parse(savedMembers))
      } else {
        setMembers(initialMembersData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMembersData))
      }
    } catch (err) {
      console.error('Error loading members:', err)
      setMembers(initialMembersData)
      setError('Error loading member data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save members to localStorage whenever members change
  const saveMembers = (updatedMembers) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers))
      setMembers(updatedMembers)
      setError(null)
    } catch (err) {
      console.error('Error saving members:', err)
      setError('Error saving member data')
    }
  }

  // Create a new member
  const createMember = (memberData) => {
    try {
      const validation = validateMember(memberData)
      if (!validation.isValid) {
        return { success: false, errors: validation.errors }
      }

      const newMember = {
        ...memberData,
        id: Date.now() // Simple ID generation for demo
      }

      const updatedMembers = [...members, newMember]
      saveMembers(updatedMembers)
      
      return { success: true, member: newMember }
    } catch (err) {
      console.error('Error creating member:', err)
      return { success: false, error: 'Failed to create member' }
    }
  }

  // Update an existing member
  const updateMember = (id, memberData) => {
    try {
      const validation = validateMember(memberData)
      if (!validation.isValid) {
        return { success: false, errors: validation.errors }
      }

      const updatedMembers = members.map(member =>
        member.id === id ? { ...memberData, id } : member
      )
      
      saveMembers(updatedMembers)
      
      return { success: true, member: { ...memberData, id } }
    } catch (err) {
      console.error('Error updating member:', err)
      return { success: false, error: 'Failed to update member' }
    }
  }

  // Delete a member
  const deleteMember = (id) => {
    try {
      const updatedMembers = members.filter(member => member.id !== id)
      saveMembers(updatedMembers)
      
      return { success: true }
    } catch (err) {
      console.error('Error deleting member:', err)
      return { success: false, error: 'Failed to delete member' }
    }
  }

  // Get a single member by ID
  const getMember = (id) => {
    return members.find(member => member.id === parseInt(id))
  }

  // Search and filter members
  const searchMembers = (query, statusFilter = null) => {
    let filtered = members

    if (statusFilter) {
      filtered = filtered.filter(member => member.status === statusFilter)
    }

    if (query) {
      const searchQuery = query.toLowerCase()
      filtered = filtered.filter(member =>
        member.memberName.first.toLowerCase().includes(searchQuery) ||
        member.memberName.last.toLowerCase().includes(searchQuery) ||
        member.memberName.middle.toLowerCase().includes(searchQuery) ||
        (member.spouse && member.spouse.first.toLowerCase().includes(searchQuery)) ||
        (member.spouse && member.spouse.last.toLowerCase().includes(searchQuery)) ||
        (member.primaryBoat && member.primaryBoat.name.toLowerCase().includes(searchQuery)) ||
        (member.secondaryBoat && member.secondaryBoat.name.toLowerCase().includes(searchQuery))
      )
    }

    return filtered
  }

  // Get members statistics
  const getStatistics = () => {
    const total = members.length
    const current = members.filter(m => m.status === 'Current').length
    const expired = members.filter(m => m.status === 'Expired').length
    const lifetime = members.filter(m => m.status === 'Lifetime').length
    const withBoats = members.filter(m => m.primaryBoat && m.primaryBoat.name).length
    const withSpouse = members.filter(m => m.spouse && m.spouse.first).length
    const withChildren = members.filter(m => m.children && m.children.length > 0).length

    return {
      total,
      current,
      expired,
      lifetime,
      withBoats,
      withSpouse,
      withChildren
    }
  }

  // Reset data to initial state
  const resetData = () => {
    saveMembers(initialMembersData)
  }

  return {
    members,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    getMember,
    searchMembers,
    getStatistics,
    resetData,
    createEmptyMember
  }
}
