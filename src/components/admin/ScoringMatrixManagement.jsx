import React, { useState } from 'react'
import { 
  Trophy, 
  Fish, 
  Scale, 
  Ruler, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Edit3,
  AlertTriangle,
  CheckCircle,
  Target,
  FileDown,
  Printer
} from 'lucide-react'
import { useScoringMatrices } from '../../hooks/useScoringMatrices'
import { exportScoringMatricesToPDF } from '../../utils/pdfExport'

const ScoringMatrixManagement = () => {
  const {
    nearshoreScoringMatrix,
    offshoreScoringMatrix,
    loading,
    updateNearshoreScoringMatrix,
    updateOffshoreScoringMatrix,
    resetToDefaults
  } = useScoringMatrices()

  const [activeTab, setActiveTab] = useState('nearshore')
  const [editingCategory, setEditingCategory] = useState(null)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null)

  // Get current matrix based on active tab
  const getCurrentMatrix = () => {
    return activeTab === 'nearshore' ? nearshoreScoringMatrix : offshoreScoringMatrix
  }

  // Update matrix based on active tab
  const updateCurrentMatrix = (updatedMatrix) => {
    const result = activeTab === 'nearshore' 
      ? updateNearshoreScoringMatrix(updatedMatrix)
      : updateOffshoreScoringMatrix(updatedMatrix)
    
    if (result.success) {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(null), 3000)
    } else {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 3000)
    }
    
    return result
  }

  // Handle category update
  const handleCategoryUpdate = (categoryId, updatedCategory) => {
    const currentMatrix = getCurrentMatrix()
    const updatedMatrix = {
      ...currentMatrix,
      [categoryId]: updatedCategory
    }
    updateCurrentMatrix(updatedMatrix)
    setEditingCategory(null)
  }

  // Handle adding new category
  const handleAddCategory = (newCategory) => {
    const currentMatrix = getCurrentMatrix()
    const categoryId = newCategory.category.toLowerCase().replace(/\s+/g, '_')
    const updatedMatrix = {
      ...currentMatrix,
      [categoryId]: newCategory
    }
    updateCurrentMatrix(updatedMatrix)
    setShowAddCategory(false)
  }

  // Handle deleting category
  const handleDeleteCategory = (categoryId) => {
    if (window.confirm(`Are you sure you want to delete the ${categoryId} category? This action cannot be undone.`)) {
      const currentMatrix = getCurrentMatrix()
      const { [categoryId]: deleted, ...updatedMatrix } = currentMatrix
      updateCurrentMatrix(updatedMatrix)
    }
  }

  // Handle reset to defaults
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all scoring matrices to default values? This will overwrite all custom changes.')) {
      const result = resetToDefaults()
      if (result.success) {
        setSaveStatus('reset')
        setTimeout(() => setSaveStatus(null), 3000)
      }
    }
  }

  // Handle PDF export
  const handleExportToPDF = () => {
    try {
      const filename = exportScoringMatricesToPDF(nearshoreScoringMatrix, offshoreScoringMatrix)
      setSaveStatus('export')
      setTimeout(() => setSaveStatus(null), 3000)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-ocean-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading scoring matrices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="h-8 w-8 text-ocean-500 mr-3" />
            Scoring Matrix Management
          </h2>
          <p className="text-gray-600 mt-1">
            Configure tournament scoring rules and point values for nearshore and offshore tournaments
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {saveStatus && (
            <div className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
              saveStatus === 'success' ? 'bg-green-100 text-green-800' :
              saveStatus === 'reset' ? 'bg-blue-100 text-blue-800' :
              saveStatus === 'export' ? 'bg-purple-100 text-purple-800' :
              'bg-red-100 text-red-800'
            }`}>
              {saveStatus === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
              {saveStatus === 'reset' && <RotateCcw className="h-4 w-4 mr-2" />}
              {saveStatus === 'export' && <FileDown className="h-4 w-4 mr-2" />}
              {saveStatus === 'error' && <AlertTriangle className="h-4 w-4 mr-2" />}
              {saveStatus === 'success' && 'Changes saved successfully'}
              {saveStatus === 'reset' && 'Reset to defaults'}
              {saveStatus === 'export' && 'PDF exported successfully'}
              {saveStatus === 'error' && 'Error saving changes'}
            </div>
          )}
          
          <button
            onClick={handleExportToPDF}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          
          <button
            onClick={handleResetToDefaults}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Tournament Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('nearshore')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'nearshore'
                ? 'border-ocean-500 text-ocean-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-2" />
              Nearshore (Length-based)
            </div>
          </button>
          <button
            onClick={() => setActiveTab('offshore')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'offshore'
                ? 'border-ocean-500 text-ocean-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Scale className="h-4 w-4 mr-2" />
              Offshore (Weight-based)
            </div>
          </button>
        </nav>
      </div>

      {/* Scoring Categories */}
      <div className="space-y-6">
        {Object.entries(getCurrentMatrix()).map(([categoryId, category]) => (
          <CategoryEditor
            key={categoryId}
            categoryId={categoryId}
            category={category}
            tournamentType={activeTab}
            isEditing={editingCategory === categoryId}
            onEdit={() => setEditingCategory(categoryId)}
            onSave={(updatedCategory) => handleCategoryUpdate(categoryId, updatedCategory)}
            onCancel={() => setEditingCategory(null)}
            onDelete={() => handleDeleteCategory(categoryId)}
          />
        ))}

        {/* Add New Category Button */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {showAddCategory ? (
            <CategoryEditor
              categoryId="new"
              category={{
                category: '',
                species: [],
                scoringType: activeTab === 'nearshore' ? 'length' : 'weight',
                pointRanges: [],
                releaseBonus: 2
              }}
              tournamentType={activeTab}
              isEditing={true}
              isNew={true}
              onSave={handleAddCategory}
              onCancel={() => setShowAddCategory(false)}
            />
          ) : (
            <button
              onClick={() => setShowAddCategory(true)}
              className="flex items-center justify-center w-full py-4 text-gray-600 hover:text-ocean-600 transition-colors"
            >
              <Plus className="h-6 w-6 mr-2" />
              Add New Category
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Category Editor Component
const CategoryEditor = ({ 
  categoryId, 
  category, 
  tournamentType, 
  isEditing, 
  isNew = false,
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}) => {
  const [editData, setEditData] = useState(category)

  const handleSave = () => {
    // Validate required fields
    if (!editData.category || editData.species.length === 0) {
      alert('Please fill in all required fields (category name and at least one species)')
      return
    }
    
    onSave(editData)
  }

  const addPointRange = () => {
    const newRange = tournamentType === 'nearshore' 
      ? { minLength: 0, maxLength: null, points: 0 }
      : { minWeight: 0, maxWeight: null, points: 0 }
    
    setEditData(prev => ({
      ...prev,
      pointRanges: [...prev.pointRanges, newRange]
    }))
  }

  const updatePointRange = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      pointRanges: prev.pointRanges.map((range, i) => 
        i === index ? { ...range, [field]: value === '' ? null : parseFloat(value) } : range
      )
    }))
  }

  const removePointRange = (index) => {
    setEditData(prev => ({
      ...prev,
      pointRanges: prev.pointRanges.filter((_, i) => i !== index)
    }))
  }

  const addSpecies = () => {
    const newSpecies = prompt('Enter species name:')
    if (newSpecies && newSpecies.trim()) {
      setEditData(prev => ({
        ...prev,
        species: [...prev.species, newSpecies.trim()]
      }))
    }
  }

  const removeSpecies = (index) => {
    setEditData(prev => ({
      ...prev,
      species: prev.species.filter((_, i) => i !== index)
    }))
  }

  if (!isEditing) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Fish className="h-6 w-6 text-ocean-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {category.category}
              </h3>
              <p className="text-sm text-gray-600">
                {category.scoringType === 'release_only' ? 'Catch & Release Only' : 
                 category.scoringType === 'length' ? 'Length-based scoring (inches)' : 
                 'Weight-based scoring (pounds)'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center px-3 py-2 text-sm bg-ocean-100 text-ocean-700 rounded-lg hover:bg-ocean-200 transition-colors"
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
        </div>

        {/* Species List */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Species:</h4>
          <div className="flex flex-wrap gap-2">
            {category.species.map((species, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {species}
              </span>
            ))}
          </div>
        </div>

        {/* Point Ranges */}
        {category.scoringType !== 'release_only' && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Point Ranges:</h4>
            <div className="space-y-2">
              {category.pointRanges.map((range, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  {category.scoringType === 'length' ? (
                    <span>
                      {range.minLength}" - {range.maxLength ? `${range.maxLength}"` : '∞'} = {range.points} points
                    </span>
                  ) : (
                    <span>
                      {range.minWeight} lbs - {range.maxWeight ? `${range.maxWeight} lbs` : '∞'} = {range.points} points
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Release Bonus */}
        <div className="flex items-center text-sm text-gray-600">
          <Target className="h-4 w-4 mr-2 text-green-500" />
          <span>Release Bonus: +{category.releaseBonus} points</span>
        </div>
      </div>
    )
  }

  // Editing mode
  return (
    <div className="bg-white rounded-lg border-2 border-ocean-200 p-6">
      <div className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            placeholder="e.g., Mackerel, Snapper, Grouper"
          />
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
          <div className="space-y-2">
            {editData.species.map((species, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={species}
                  onChange={(e) => setEditData(prev => ({
                    ...prev,
                    species: prev.species.map((s, i) => i === index ? e.target.value : s)
                  }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeSpecies(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addSpecies}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Species
            </button>
          </div>
        </div>

        {/* Scoring Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scoring Type</label>
          <select
            value={editData.scoringType}
            onChange={(e) => setEditData(prev => ({ ...prev, scoringType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          >
            <option value="length">Length-based (inches)</option>
            <option value="weight">Weight-based (pounds)</option>
            <option value="release_only">Catch & Release Only</option>
          </select>
        </div>

        {/* Point Ranges */}
        {editData.scoringType !== 'release_only' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Point Ranges</label>
            <div className="space-y-2">
              {editData.pointRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.1"
                    value={range[editData.scoringType === 'length' ? 'minLength' : 'minWeight'] || ''}
                    onChange={(e) => updatePointRange(index, editData.scoringType === 'length' ? 'minLength' : 'minWeight', e.target.value)}
                    placeholder={`Min ${editData.scoringType === 'length' ? 'length' : 'weight'}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    step="0.1"
                    value={range[editData.scoringType === 'length' ? 'maxLength' : 'maxWeight'] || ''}
                    onChange={(e) => updatePointRange(index, editData.scoringType === 'length' ? 'maxLength' : 'maxWeight', e.target.value)}
                    placeholder={`Max ${editData.scoringType === 'length' ? 'length' : 'weight'} (empty = ∞)`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">=</span>
                  <input
                    type="number"
                    value={range.points || ''}
                    onChange={(e) => updatePointRange(index, 'points', e.target.value)}
                    placeholder="Points"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removePointRange(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addPointRange}
                className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Point Range
              </button>
            </div>
          </div>
        )}

        {/* Release Bonus */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Release Bonus Points</label>
          <input
            type="number"
            value={editData.releaseBonus || ''}
            onChange={(e) => setEditData(prev => ({ ...prev, releaseBonus: parseInt(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
            placeholder="Additional points for catch and release"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-ocean-600 text-white rounded-lg hover:bg-ocean-700 transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            {isNew ? 'Add Category' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScoringMatrixManagement
