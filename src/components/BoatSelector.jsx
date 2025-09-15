import React, { useState, useRef, useEffect } from 'react'
import { Search, Ship, ChevronDown, Check, AlertCircle } from 'lucide-react'

const BoatSelector = ({ boats, selectedBoat, onBoatSelect, error, placeholder = "Select a boat..." }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBoats, setFilteredBoats] = useState(boats)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const filtered = boats.filter(boat =>
      boat.boatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boat.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boat.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredBoats(filtered)
  }, [boats, searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleBoatSelect = (boat) => {
    onBoatSelect(boat)
    setIsOpen(false)
    setSearchQuery('')
  }

  const getDisplayText = () => {
    if (selectedBoat) {
      return selectedBoat.displayName
    }
    return placeholder
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Boat Selection *
      </label>
      
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-ocean-500 text-left flex items-center justify-between ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${selectedBoat ? 'text-gray-900' : 'text-gray-500'}`}
      >
        <div className="flex items-center space-x-2">
          <Ship className="h-4 w-4 text-gray-400" />
          <span className="truncate">{getDisplayText()}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search boats or owners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Boats List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredBoats.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No boats found</p>
                <p className="text-xs text-gray-400 mt-1">
                  {boats.length === 0 
                    ? "No boats available from members in good standing"
                    : "Try adjusting your search terms"
                  }
                </p>
              </div>
            ) : (
              filteredBoats.map((boat) => (
                <button
                  key={boat.id}
                  type="button"
                  onClick={() => handleBoatSelect(boat)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0 ${
                    selectedBoat?.id === boat.id ? 'bg-ocean-50 border-ocean-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <Ship className="h-4 w-4 text-ocean-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">
                            {boat.boatName}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            Owner: {boat.memberName}
                          </p>
                          {boat.fullBoatInfo && (
                            <p className="text-xs text-gray-500 truncate">
                              {boat.fullBoatInfo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {selectedBoat?.id === boat.id && (
                      <Check className="h-4 w-4 text-ocean-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer Info */}
          {boats.length > 0 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                {boats.length} boat{boats.length !== 1 ? 's' : ''} available from members in good standing
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BoatSelector
