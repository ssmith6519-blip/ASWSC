import { useState, useEffect } from 'react'
import { 
  NEARSHORE_SCORING_MATRIX, 
  OFFSHORE_SCORING_MATRIX 
} from '../data/scoringMatrices'

const STORAGE_KEY_NEARSHORE = 'aswsc_nearshore_scoring_matrix'
const STORAGE_KEY_OFFSHORE = 'aswsc_offshore_scoring_matrix'

export const useScoringMatrices = () => {
  const [nearshoreScoringMatrix, setNearshoreScoringMatrix] = useState({})
  const [offshoreScoringMatrix, setOffshoreScoringMatrix] = useState({})
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  // Load scoring matrices from localStorage or use defaults
  useEffect(() => {
    try {
      // Force load the updated nearshore matrix (clear old cached data)
      console.log('Loading updated nearshore scoring matrix...')
      setNearshoreScoringMatrix(NEARSHORE_SCORING_MATRIX)
      localStorage.setItem(STORAGE_KEY_NEARSHORE, JSON.stringify(NEARSHORE_SCORING_MATRIX))

      // Force load the updated offshore matrix (clear old cached data)
      console.log('Loading updated offshore scoring matrix...')
      setOffshoreScoringMatrix(OFFSHORE_SCORING_MATRIX)
      localStorage.setItem(STORAGE_KEY_OFFSHORE, JSON.stringify(OFFSHORE_SCORING_MATRIX))

      // Listen for storage changes from other tabs
      const handleStorageChange = (e) => {
        if (e.key === STORAGE_KEY_NEARSHORE && e.newValue) {
          setNearshoreScoringMatrix(JSON.parse(e.newValue))
          setRefreshKey(prev => prev + 1)
        } else if (e.key === STORAGE_KEY_OFFSHORE && e.newValue) {
          setOffshoreScoringMatrix(JSON.parse(e.newValue))
          setRefreshKey(prev => prev + 1)
        }
      }

      // Listen for custom events from other components
      const handleMatrixUpdate = (e) => {
        const { type, matrix } = e.detail
        if (type === 'nearshore') {
          setNearshoreScoringMatrix(matrix)
          setRefreshKey(prev => prev + 1)
        } else if (type === 'offshore') {
          setOffshoreScoringMatrix(matrix)
          setRefreshKey(prev => prev + 1)
        }
      }

      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('scoringMatrixUpdated', handleMatrixUpdate)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('scoringMatrixUpdated', handleMatrixUpdate)
      }
    } catch (err) {
      console.error('Error loading scoring matrices:', err)
      // Fallback to defaults
      setNearshoreScoringMatrix(NEARSHORE_SCORING_MATRIX)
      setOffshoreScoringMatrix(OFFSHORE_SCORING_MATRIX)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save matrices to localStorage
  const saveMatrices = (nearshore, offshore) => {
    try {
      localStorage.setItem(STORAGE_KEY_NEARSHORE, JSON.stringify(nearshore))
      localStorage.setItem(STORAGE_KEY_OFFSHORE, JSON.stringify(offshore))
      setRefreshKey(prev => prev + 1)
      
      // Dispatch custom events for other components
      window.dispatchEvent(new CustomEvent('scoringMatrixUpdated', {
        detail: { type: 'nearshore', matrix: nearshore }
      }))
      window.dispatchEvent(new CustomEvent('scoringMatrixUpdated', {
        detail: { type: 'offshore', matrix: offshore }
      }))
    } catch (err) {
      console.error('Error saving scoring matrices:', err)
    }
  }

  // Update nearshore scoring matrix
  const updateNearshoreScoringMatrix = (updatedMatrix) => {
    try {
      setNearshoreScoringMatrix(updatedMatrix)
      localStorage.setItem(STORAGE_KEY_NEARSHORE, JSON.stringify(updatedMatrix))
      setRefreshKey(prev => prev + 1)
      
      window.dispatchEvent(new CustomEvent('scoringMatrixUpdated', {
        detail: { type: 'nearshore', matrix: updatedMatrix }
      }))
      
      return { success: true }
    } catch (err) {
      console.error('Error updating nearshore scoring matrix:', err)
      return { success: false, error: 'Failed to update nearshore scoring matrix' }
    }
  }

  // Update offshore scoring matrix
  const updateOffshoreScoringMatrix = (updatedMatrix) => {
    try {
      setOffshoreScoringMatrix(updatedMatrix)
      localStorage.setItem(STORAGE_KEY_OFFSHORE, JSON.stringify(updatedMatrix))
      setRefreshKey(prev => prev + 1)
      
      window.dispatchEvent(new CustomEvent('scoringMatrixUpdated', {
        detail: { type: 'offshore', matrix: updatedMatrix }
      }))
      
      return { success: true }
    } catch (err) {
      console.error('Error updating offshore scoring matrix:', err)
      return { success: false, error: 'Failed to update offshore scoring matrix' }
    }
  }

  // Reset to default matrices
  const resetToDefaults = () => {
    try {
      console.log('Resetting scoring matrices to defaults...')
      setNearshoreScoringMatrix(NEARSHORE_SCORING_MATRIX)
      setOffshoreScoringMatrix(OFFSHORE_SCORING_MATRIX)
      
      localStorage.setItem(STORAGE_KEY_NEARSHORE, JSON.stringify(NEARSHORE_SCORING_MATRIX))
      localStorage.setItem(STORAGE_KEY_OFFSHORE, JSON.stringify(OFFSHORE_SCORING_MATRIX))
      
      setRefreshKey(prev => prev + 1)
      
      // Dispatch events
      window.dispatchEvent(new CustomEvent('scoringMatrixUpdated', {
        detail: { type: 'nearshore', matrix: NEARSHORE_SCORING_MATRIX }
      }))
      window.dispatchEvent(new CustomEvent('scoringMatrixUpdated', {
        detail: { type: 'offshore', matrix: OFFSHORE_SCORING_MATRIX }
      }))
      
      return { success: true }
    } catch (err) {
      console.error('Error resetting scoring matrices:', err)
      return { success: false, error: 'Failed to reset scoring matrices' }
    }
  }

  // Get scoring matrix for a specific tournament type
  const getScoringMatrix = (tournamentType) => {
    return tournamentType === 'offshore' ? offshoreScoringMatrix : nearshoreScoringMatrix
  }

  return {
    nearshoreScoringMatrix,
    offshoreScoringMatrix,
    loading,
    refreshKey,
    updateNearshoreScoringMatrix,
    updateOffshoreScoringMatrix,
    resetToDefaults,
    getScoringMatrix,
    saveMatrices
  }
}
