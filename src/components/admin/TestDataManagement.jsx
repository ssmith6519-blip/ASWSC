import React, { useState } from 'react'
import { Database, Upload, Trash2, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { loadWeighInTestData, clearWeighInTestData } from '../../data/weighInTestData'

const TestDataManagement = () => {
  const [loadStatus, setLoadStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadTestData = async () => {
    setIsLoading(true)
    setLoadStatus('loading')
    
    try {
      // Load the test data
      loadWeighInTestData()
      
      setLoadStatus('success')
      setTimeout(() => setLoadStatus(''), 3000)
    } catch (error) {
      console.error('Error loading test data:', error)
      setLoadStatus('error')
      setTimeout(() => setLoadStatus(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearTestData = async () => {
    if (!window.confirm('Are you sure you want to clear all weigh-in test data? This cannot be undone.')) {
      return
    }

    setIsLoading(true)
    setLoadStatus('clearing')
    
    try {
      clearWeighInTestData()
      
      setLoadStatus('cleared')
      setTimeout(() => setLoadStatus(''), 3000)
    } catch (error) {
      console.error('Error clearing test data:', error)
      setLoadStatus('error')
      setTimeout(() => setLoadStatus(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Data Management</h1>
        <p className="text-gray-600">Load test weigh-in data to see how the live leaderboard works.</p>
      </div>

      {/* Status Messages */}
      {loadStatus && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          loadStatus === 'success' ? 'bg-green-50 border border-green-200' :
          loadStatus === 'cleared' ? 'bg-blue-50 border border-blue-200' :
          loadStatus === 'error' ? 'bg-red-50 border border-red-200' :
          'bg-yellow-50 border border-yellow-200'
        }`}>
          {loadStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
          {loadStatus === 'cleared' && <CheckCircle className="h-5 w-5 text-blue-600" />}
          {loadStatus === 'error' && <AlertTriangle className="h-5 w-5 text-red-600" />}
          {(loadStatus === 'loading' || loadStatus === 'clearing') && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
          )}
          
          <span className={`font-medium ${
            loadStatus === 'success' ? 'text-green-800' :
            loadStatus === 'cleared' ? 'text-blue-800' :
            loadStatus === 'error' ? 'text-red-800' :
            'text-yellow-800'
          }`}>
            {loadStatus === 'success' && 'Test data loaded successfully!'}
            {loadStatus === 'cleared' && 'Test data cleared successfully!'}
            {loadStatus === 'error' && 'Error managing test data. Check console for details.'}
            {loadStatus === 'loading' && 'Loading test data...'}
            {loadStatus === 'clearing' && 'Clearing test data...'}
          </span>
        </div>
      )}

      {/* Test Data Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="h-6 w-6 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">About Test Data</h3>
            <p className="text-blue-800 mb-4">
              This will load realistic weigh-in entries for two tournaments to demonstrate the live leaderboard functionality:
            </p>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span><strong>Darien Nearshore Tournament</strong> - 2 days, length-based scoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span><strong>Grand Isle Offshore Tournament</strong> - 5 days, weight-based scoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Load Test Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Load Test Data</h3>
              <p className="text-sm text-gray-600">Add realistic weigh-in entries to tournaments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">What this includes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multiple fish entries per boat per day</li>
                <li>• Realistic species, sizes, and point values</li>
                <li>• Both keep and release entries</li>
                <li>• Varied angler participation (captain & crew)</li>
              </ul>
            </div>
            
            <button
              onClick={handleLoadTestData}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Database className="h-5 w-5" />
              <span>{isLoading ? 'Loading...' : 'Load Test Data'}</span>
            </button>
          </div>
        </div>

        {/* Clear Test Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Clear Test Data</h3>
              <p className="text-sm text-gray-600">Remove all weigh-in entries from tournaments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Warning:</h4>
              <p className="text-sm text-yellow-700">
                This will permanently delete all weigh-in data from localStorage. 
                This action cannot be undone.
              </p>
            </div>
            
            <button
              onClick={handleClearTestData}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Trash2 className="h-5 w-5" />
              <span>{isLoading ? 'Clearing...' : 'Clear All Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Test the Live Leaderboard</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
            <div>
              <p className="font-medium text-gray-900">Load the test data</p>
              <p className="text-sm text-gray-600">Click "Load Test Data" to populate tournaments with realistic weigh-in entries.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
            <div>
              <p className="font-medium text-gray-900">Go to the public tournaments page</p>
              <p className="text-sm text-gray-600">Switch to the public view and navigate to the Tournaments section.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
            <div>
              <p className="font-medium text-gray-900">View the live leaderboard</p>
              <p className="text-sm text-gray-600">Click "Weigh In" on either tournament to see the live leaderboard with boat and angler standings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestDataManagement



