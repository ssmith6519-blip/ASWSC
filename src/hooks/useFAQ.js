import { useState, useEffect } from 'react'

// Default FAQ data
const defaultFAQs = [
  {
    id: 1,
    question: 'How do I become a member of ASWSC?',
    answer: 'Becoming a member is easy! You can apply online through our website or attend one of our monthly meetings. New members are always welcome.',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    question: 'What are the membership dues?',
    answer: 'Annual membership dues are $75 for individuals and $100 for families. This includes access to all club meetings, tournaments, and events.',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    question: 'Do I need my own boat to participate?',
    answer: 'While having your own boat is helpful, it\'s not required! Many members team up for tournaments and trips. We encourage boat sharing and can help connect members.',
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    question: 'What tournaments does ASWSC host?',
    answer: 'We host several tournaments throughout the year including nearshore and offshore competitions. Our signature events include the Darien Nearshore Tournament and the Grand Isle Offshore Championship.',
    order: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    question: 'How is tournament scoring calculated?',
    answer: 'Tournament scoring is based on our point matrix system which varies by fish species, size, and tournament type. Points are awarded for both kept and released fish, with bonus points for catch and release.',
    order: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const STORAGE_KEY = 'aswsc_faqs'

export const useFAQ = () => {
  const [faqs, setFAQs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load FAQs from localStorage on mount
  useEffect(() => {
    try {
      console.log('🔄 Loading FAQs from localStorage...')
      const storedFAQs = localStorage.getItem(STORAGE_KEY)
      
      if (storedFAQs) {
        const parsedFAQs = JSON.parse(storedFAQs)
        console.log(`✅ Loaded ${parsedFAQs.length} FAQs from storage`)
        setFAQs(parsedFAQs)
      } else {
        console.log('📝 No stored FAQs found, using defaults')
        setFAQs(defaultFAQs)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultFAQs))
      }
    } catch (err) {
      console.error('❌ Error loading FAQs:', err)
      setError('Failed to load FAQs')
      setFAQs(defaultFAQs)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save FAQs to localStorage
  const saveFAQs = (updatedFAQs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFAQs))
      setFAQs(updatedFAQs)
      console.log(`💾 Saved ${updatedFAQs.length} FAQs to storage`)
    } catch (err) {
      console.error('❌ Error saving FAQs:', err)
      setError('Failed to save FAQs')
      throw err
    }
  }

  // Get active FAQs sorted by order
  const getActiveFAQs = () => {
    return faqs
      .filter(faq => faq.isActive)
      .sort((a, b) => a.order - b.order)
  }

  // Get all FAQs for admin (including inactive)
  const getAllFAQs = () => {
    return faqs.sort((a, b) => a.order - b.order)
  }

  // Create new FAQ
  const createFAQ = (faqData) => {
    try {
      const newId = Math.max(...faqs.map(f => f.id), 0) + 1
      const maxOrder = Math.max(...faqs.map(f => f.order), 0)
      
      const newFAQ = {
        id: newId,
        question: faqData.question.trim(),
        answer: faqData.answer.trim(),
        order: faqData.order || maxOrder + 1,
        isActive: faqData.isActive !== undefined ? faqData.isActive : true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const updatedFAQs = [...faqs, newFAQ]
      saveFAQs(updatedFAQs)
      
      console.log('✅ Created new FAQ:', newFAQ.question)
      return { success: true, faq: newFAQ }
    } catch (err) {
      console.error('❌ Error creating FAQ:', err)
      return { success: false, error: err.message }
    }
  }

  // Update existing FAQ
  const updateFAQ = (id, updates) => {
    try {
      const faqIndex = faqs.findIndex(f => f.id === id)
      if (faqIndex === -1) {
        throw new Error('FAQ not found')
      }

      const updatedFAQ = {
        ...faqs[faqIndex],
        ...updates,
        question: updates.question?.trim() || faqs[faqIndex].question,
        answer: updates.answer?.trim() || faqs[faqIndex].answer,
        updatedAt: new Date().toISOString()
      }

      const updatedFAQs = [...faqs]
      updatedFAQs[faqIndex] = updatedFAQ
      saveFAQs(updatedFAQs)

      console.log('✅ Updated FAQ:', updatedFAQ.question)
      return { success: true, faq: updatedFAQ }
    } catch (err) {
      console.error('❌ Error updating FAQ:', err)
      return { success: false, error: err.message }
    }
  }

  // Delete FAQ
  const deleteFAQ = (id) => {
    try {
      const faqToDelete = faqs.find(f => f.id === id)
      if (!faqToDelete) {
        throw new Error('FAQ not found')
      }

      const updatedFAQs = faqs.filter(f => f.id !== id)
      saveFAQs(updatedFAQs)

      console.log('✅ Deleted FAQ:', faqToDelete.question)
      return { success: true }
    } catch (err) {
      console.error('❌ Error deleting FAQ:', err)
      return { success: false, error: err.message }
    }
  }

  // Toggle FAQ active status
  const toggleFAQStatus = (id) => {
    const faq = faqs.find(f => f.id === id)
    if (!faq) return { success: false, error: 'FAQ not found' }

    return updateFAQ(id, { isActive: !faq.isActive })
  }

  // Reorder FAQs
  const reorderFAQs = (reorderedFAQs) => {
    try {
      const updatedFAQs = reorderedFAQs.map((faq, index) => ({
        ...faq,
        order: index + 1,
        updatedAt: new Date().toISOString()
      }))

      saveFAQs(updatedFAQs)
      console.log('✅ Reordered FAQs')
      return { success: true }
    } catch (err) {
      console.error('❌ Error reordering FAQs:', err)
      return { success: false, error: err.message }
    }
  }

  // Reset to default FAQs
  const resetFAQs = () => {
    try {
      saveFAQs(defaultFAQs)
      console.log('🔄 Reset FAQs to defaults')
      return { success: true }
    } catch (err) {
      console.error('❌ Error resetting FAQs:', err)
      return { success: false, error: err.message }
    }
  }

  // Get FAQ statistics
  const getStatistics = () => {
    return {
      total: faqs.length,
      active: faqs.filter(f => f.isActive).length,
      inactive: faqs.filter(f => !f.isActive).length,
      lastUpdated: faqs.reduce((latest, faq) => {
        const faqDate = new Date(faq.updatedAt)
        return faqDate > latest ? faqDate : latest
      }, new Date(0))
    }
  }

  return {
    faqs: getAllFAQs(),
    activeFAQs: getActiveFAQs(),
    loading,
    error,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    toggleFAQStatus,
    reorderFAQs,
    resetFAQs,
    getStatistics
  }
}

export default useFAQ
