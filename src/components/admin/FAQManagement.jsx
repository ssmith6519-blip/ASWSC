import React, { useState } from 'react'
import { useFAQ } from '../../hooks/useFAQ'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  ChevronUp, 
  ChevronDown,
  RotateCcw,
  HelpCircle,
  BarChart3,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const FAQManagement = () => {
  const { 
    faqs, 
    activeFAQs, 
    loading, 
    error, 
    createFAQ, 
    updateFAQ, 
    deleteFAQ, 
    toggleFAQStatus, 
    reorderFAQs, 
    resetFAQs,
    getStatistics 
  } = useFAQ()

  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    isActive: true
  })
  const [message, setMessage] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'inactive'

  const stats = getStatistics()

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 3000)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.question.trim() || !formData.answer.trim()) {
      showMessage('Question and answer are required', 'error')
      return
    }

    try {
      let result
      if (editingId) {
        result = updateFAQ(editingId, formData)
      } else {
        result = createFAQ(formData)
      }

      if (result.success) {
        showMessage(
          editingId ? 'FAQ updated successfully!' : 'FAQ created successfully!',
          'success'
        )
        resetForm()
      } else {
        showMessage(result.error || 'Operation failed', 'error')
      }
    } catch (err) {
      showMessage('An error occurred', 'error')
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({ question: '', answer: '', isActive: true })
    setEditingId(null)
    setShowAddForm(false)
  }

  // Start editing FAQ
  const startEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      isActive: faq.isActive
    })
    setEditingId(faq.id)
    setShowAddForm(true)
  }

  // Handle delete with confirmation
  const handleDelete = (faq) => {
    if (window.confirm(`Are you sure you want to delete the FAQ: "${faq.question}"?`)) {
      const result = deleteFAQ(faq.id)
      if (result.success) {
        showMessage('FAQ deleted successfully!', 'success')
      } else {
        showMessage(result.error || 'Delete failed', 'error')
      }
    }
  }

  // Handle status toggle
  const handleToggleStatus = (faq) => {
    const result = toggleFAQStatus(faq.id)
    if (result.success) {
      showMessage(
        `FAQ ${faq.isActive ? 'deactivated' : 'activated'} successfully!`,
        'success'
      )
    } else {
      showMessage(result.error || 'Status update failed', 'error')
    }
  }

  // Handle reorder (move up/down)
  const handleReorder = (faqId, direction) => {
    const currentIndex = faqs.findIndex(f => f.id === faqId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= faqs.length) return

    const reorderedFAQs = [...faqs]
    const [movedFAQ] = reorderedFAQs.splice(currentIndex, 1)
    reorderedFAQs.splice(newIndex, 0, movedFAQ)

    const result = reorderFAQs(reorderedFAQs)
    if (result.success) {
      showMessage('FAQ order updated!', 'success')
    } else {
      showMessage('Reorder failed', 'error')
    }
  }

  // Handle reset with confirmation
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all FAQs to defaults? This will delete all custom FAQs.')) {
      const result = resetFAQs()
      if (result.success) {
        showMessage('FAQs reset to defaults!', 'success')
        resetForm()
      } else {
        showMessage('Reset failed', 'error')
      }
    }
  }

  // Filter FAQs based on current filter
  const getFilteredFAQs = () => {
    switch (filter) {
      case 'active':
        return faqs.filter(faq => faq.isActive)
      case 'inactive':
        return faqs.filter(faq => !faq.isActive)
      default:
        return faqs
    }
  }

  const filteredFAQs = getFilteredFAQs()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
        <span className="ml-3 text-gray-600">Loading FAQs...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <HelpCircle className="h-8 w-8 text-ocean-600 mr-3" />
            FAQ Management
          </h1>
          <p className="text-gray-600">Manage frequently asked questions for the public website.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add FAQ</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          message.type === 'error' 
            ? 'bg-red-50 border border-red-200 text-red-800'
            : 'bg-green-50 border border-green-200 text-green-800'
        }`}>
          {message.type === 'error' ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-gray-600">Total FAQs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-gray-600">Active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <EyeOff className="h-8 w-8 text-gray-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              <p className="text-gray-600">Inactive</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <HelpCircle className="h-8 w-8 text-ocean-600" />
            <div className="ml-4">
              <p className="text-sm font-bold text-gray-900">Last Updated</p>
              <p className="text-gray-600">{stats.lastUpdated.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Edit FAQ' : 'Add New FAQ'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question *
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                placeholder="Enter the frequently asked question..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer *
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                placeholder="Enter the detailed answer..."
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Active (visible on public website)
              </label>
            </div>
            
            <div className="flex items-center space-x-3 pt-4">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{editingId ? 'Update FAQ' : 'Create FAQ'}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'all', label: 'All FAQs', count: stats.total },
          { key: 'active', label: 'Active', count: stats.active },
          { key: 'inactive', label: 'Inactive', count: stats.inactive }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab.key
                ? 'bg-white text-ocean-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-lg border border-gray-200">
        {filteredFAQs.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? 'Start by creating your first FAQ.'
                : `No ${filter} FAQs found. Try a different filter.`
              }
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Add First FAQ
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFAQs.map((faq, index) => (
              <div key={faq.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">#{faq.order}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        faq.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {faq.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 mb-3">{faq.answer}</p>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(faq.createdAt).toLocaleDateString()} • 
                      Updated: {new Date(faq.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {/* Reorder buttons */}
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => handleReorder(faq.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReorder(faq.id, 'down')}
                        disabled={index === filteredFAQs.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Action buttons */}
                    <button
                      onClick={() => handleToggleStatus(faq)}
                      className={`p-2 rounded-lg transition-colors ${
                        faq.isActive
                          ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                          : 'text-green-600 hover:text-green-800 hover:bg-green-100'
                      }`}
                      title={faq.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {faq.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    
                    <button
                      onClick={() => startEdit(faq)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(faq)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQManagement


