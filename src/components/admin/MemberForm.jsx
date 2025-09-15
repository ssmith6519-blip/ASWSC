import React, { useState, useEffect } from 'react'
import { useMembers } from '../../hooks/useMembers'
import { MEMBER_STATUS, createEmptyMember } from '../../data/membersData'
import { Save, X, Plus, Trash2, User, Anchor, Calendar, Users } from 'lucide-react'

const MemberForm = ({ member, onSuccess, onCancel }) => {
  const { createMember, updateMember } = useMembers()
  const [formData, setFormData] = useState(createEmptyMember())
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const isEditing = !!member

  useEffect(() => {
    if (member) {
      setFormData(member)
    } else {
      setFormData(createEmptyMember())
    }
  }, [member])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [
        ...prev.children,
        { firstName: '', birthYear: new Date().getFullYear(), birthMonth: 1 }
      ]
    }))
  }

  const removeChild = (index) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index)
    }))
  }

  const updateChild = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      children: prev.children.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      let result
      if (isEditing) {
        result = updateMember(member.id, formData)
      } else {
        result = createMember(formData)
      }

      if (result.success) {
        onSuccess()
      } else {
        setErrors(result.errors || { general: result.error })
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-ocean-600" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="memberName.first"
                value={formData.memberName.first}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="memberName.middle"
                value={formData.memberName.middle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="memberName.last"
                value={formData.memberName.last}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Membership Information */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Calendar className="h-5 w-5 text-ocean-600" />
            <h3 className="text-lg font-semibold text-gray-900">Membership Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Joining Date *
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                  errors.joiningDate ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.joiningDate && (
                <p className="text-red-500 text-xs mt-1">{errors.joiningDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Renewal Date *
              </label>
              <input
                type="date"
                name="lastRenewalDate"
                value={formData.lastRenewalDate}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                  errors.lastRenewalDate ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.lastRenewalDate && (
                <p className="text-red-500 text-xs mt-1">{errors.lastRenewalDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 ${
                  errors.status ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              >
                {Object.values(MEMBER_STATUS).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">{errors.status}</p>
              )}
            </div>
          </div>
        </div>

        {/* Spouse Information */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Users className="h-5 w-5 text-ocean-600" />
            <h3 className="text-lg font-semibold text-gray-900">Spouse Information</h3>
            <span className="text-sm text-gray-500">(Optional)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="spouse.first"
                value={formData.spouse?.first || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="spouse.middle"
                value={formData.spouse?.middle || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="spouse.last"
                value={formData.spouse?.last || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* Children Information */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-ocean-600" />
              <h3 className="text-lg font-semibold text-gray-900">Children</h3>
              <span className="text-sm text-gray-500">(Optional)</span>
            </div>
            <button
              type="button"
              onClick={addChild}
              className="flex items-center space-x-2 text-ocean-600 hover:text-ocean-700 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add Child</span>
            </button>
          </div>
          
          {formData.children && formData.children.length > 0 ? (
            <div className="space-y-4">
              {formData.children.map((child, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={child.firstName}
                      onChange={(e) => updateChild(index, 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Year"
                      min="1950"
                      max={new Date().getFullYear()}
                      value={child.birthYear}
                      onChange={(e) => updateChild(index, 'birthYear', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    />
                  </div>
                  <div className="w-20">
                    <select
                      value={child.birthMonth}
                      onChange={(e) => updateChild(index, 'birthMonth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
                    >
                      {Array.from({length: 12}, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(0, i).toLocaleString('default', { month: 'short' })}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeChild(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No children added.</p>
          )}
        </div>

        {/* Primary Boat Information */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Anchor className="h-5 w-5 text-ocean-600" />
            <h3 className="text-lg font-semibold text-gray-900">Primary Boat Information</h3>
            <span className="text-sm text-gray-500">(Optional)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Boat Name
              </label>
              <input
                type="text"
                name="primaryBoat.name"
                value={formData.primaryBoat?.name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                name="primaryBoat.make"
                value={formData.primaryBoat?.make || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="primaryBoat.model"
                value={formData.primaryBoat?.model || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                name="primaryBoat.year"
                min="1950"
                max={new Date().getFullYear() + 1}
                value={formData.primaryBoat?.year || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* Secondary Boat Information */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Anchor className="h-5 w-5 text-ocean-600" />
            <h3 className="text-lg font-semibold text-gray-900">Secondary Boat Information</h3>
            <span className="text-sm text-gray-500">(Optional)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Boat Name
              </label>
              <input
                type="text"
                name="secondaryBoat.name"
                value={formData.secondaryBoat?.name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <input
                type="text"
                name="secondaryBoat.make"
                value={formData.secondaryBoat?.make || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <input
                type="text"
                name="secondaryBoat.model"
                value={formData.secondaryBoat?.model || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                name="secondaryBoat.year"
                min="1950"
                max={new Date().getFullYear() + 1}
                value={formData.secondaryBoat?.year || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-6 py-2 flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditing ? 'Update Member' : 'Create Member'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MemberForm
