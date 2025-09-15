import React, { useState } from 'react'
import { Trophy, Ship, Users, Crown, User, Calendar, Target, TrendingUp, Award, FileDown } from 'lucide-react'
import { useAnnualStandings } from '../hooks/useAnnualStandings'
import { exportAnnualStandingsToPDF } from '../utils/pdfExport'

/**
 * Annual Standings Component
 * Displays boat and angler standings across all tournaments for the year
 */
const AnnualStandings = () => {
  const [selectedYear] = useState(2025)
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'boats', 'anglers'
  const [selectedDivision, setSelectedDivision] = useState('nearshore') // 'nearshore', 'offshore'
  const [selectedGender, setSelectedGender] = useState('men') // 'men', 'women'

  const {
    currentStandings,
    topPerformers,
    participationStats,
    getCurrentLeaders,
    getStandingsFor,
    isLoading,
    hasData
  } = useAnnualStandings(selectedYear)

  const currentLeaders = getCurrentLeaders()

  // Handle PDF export
  const handleExportToPDF = () => {
    try {
      exportAnnualStandingsToPDF(currentStandings, selectedYear)
    } catch (error) {
      console.error('Error exporting annual standings PDF:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading annual standings...</p>
        </div>
      </div>
    )
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Year Summary */}
      <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{selectedYear} Season Standings</h2>
            <p className="text-ocean-100">
              Annual boat and angler of the year competitions
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{participationStats.totalBoats + participationStats.totalAnglers}</div>
            <div className="text-ocean-100 text-sm">Total Participants</div>
          </div>
        </div>
      </div>

      {/* Current Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Boat of the Year Leaders */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-4">
            <Ship className="h-6 w-6 text-ocean-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Boat of the Year Leaders</h3>
          </div>
          
          <div className="space-y-4">
            {/* Nearshore Leader */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-700">Nearshore Division</h4>
                  {currentLeaders.boatOfTheYear.nearshore ? (
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {currentLeaders.boatOfTheYear.nearshore.boatName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <Crown className="h-3 w-3 inline mr-1 text-yellow-500" />
                        {currentLeaders.boatOfTheYear.nearshore.captainName}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No entries yet</p>
                  )}
                </div>
                {currentLeaders.boatOfTheYear.nearshore && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {currentLeaders.boatOfTheYear.nearshore.totalPoints}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                )}
              </div>
            </div>

            {/* Offshore Leader */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-700">Offshore Division</h4>
                  {currentLeaders.boatOfTheYear.offshore ? (
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {currentLeaders.boatOfTheYear.offshore.boatName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <Crown className="h-3 w-3 inline mr-1 text-yellow-500" />
                        {currentLeaders.boatOfTheYear.offshore.captainName}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No entries yet</p>
                  )}
                </div>
                {currentLeaders.boatOfTheYear.offshore && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentLeaders.boatOfTheYear.offshore.totalPoints}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Angler of the Year Leaders */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-ocean-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Angler of the Year Leaders</h3>
          </div>
          
          <div className="space-y-4">
            {/* Nearshore Men Leader */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-700">Nearshore Men</h4>
                  {currentLeaders.anglerOfTheYear.nearshore.men ? (
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {currentLeaders.anglerOfTheYear.nearshore.men.anglerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Member #{currentLeaders.anglerOfTheYear.nearshore.men.memberId}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No entries yet</p>
                  )}
                </div>
                {currentLeaders.anglerOfTheYear.nearshore.men && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {currentLeaders.anglerOfTheYear.nearshore.men.totalPoints}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                )}
              </div>
            </div>

            {/* Offshore Men Leader */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-700">Offshore Men</h4>
                  {currentLeaders.anglerOfTheYear.offshore.men ? (
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {currentLeaders.anglerOfTheYear.offshore.men.anglerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Member #{currentLeaders.anglerOfTheYear.offshore.men.memberId}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No entries yet</p>
                  )}
                </div>
                {currentLeaders.anglerOfTheYear.offshore.men && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentLeaders.anglerOfTheYear.offshore.men.totalPoints}
                    </div>
                    <div className="text-xs text-gray-500">points</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4 text-center">
          <Ship className="h-8 w-8 text-ocean-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{participationStats.totalBoats}</div>
          <div className="text-sm text-gray-600">Active Boats</div>
        </div>
        
        <div className="bg-white rounded-lg border p-4 text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{participationStats.totalAnglers}</div>
          <div className="text-sm text-gray-600">Active Anglers</div>
        </div>
        
        <div className="bg-white rounded-lg border p-4 text-center">
          <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{participationStats.activeDivisions.length}</div>
          <div className="text-sm text-gray-600">Active Divisions</div>
        </div>
        
        <div className="bg-white rounded-lg border p-4 text-center">
          <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{selectedYear}</div>
          <div className="text-sm text-gray-600">Season Year</div>
        </div>
      </div>
    </div>
  )

  const renderBoatStandings = () => {
    const standings = getStandingsFor(selectedDivision, 'boats')
    
    return (
      <div className="space-y-6">
        {/* Division Selector */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedDivision('nearshore')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedDivision === 'nearshore'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Nearshore Division
          </button>
          <button
            onClick={() => setSelectedDivision('offshore')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedDivision === 'offshore'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Offshore Division
          </button>
        </div>

        {/* Boat Standings Table */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDivision === 'nearshore' ? 'Nearshore' : 'Offshore'} Boat of the Year Standings
            </h3>
            <p className="text-sm text-gray-600">
              Ranked by total points across all {selectedYear} tournaments
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {standings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Ship className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No boat standings available for {selectedDivision} division yet.</p>
              </div>
            ) : (
              standings.map((boat, index) => (
                <div key={`${boat.boatName}-${boat.captainName}`} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{boat.boatName}</h4>
                        <p className="text-sm text-gray-600">
                          <Crown className="h-3 w-3 inline mr-1 text-yellow-500" />
                          {boat.captainName}
                          {boat.isClubMember && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              🏆 Member
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-ocean-600">{boat.totalPoints}</div>
                          <div className="text-xs text-gray-500">Total Points</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-600">{boat.tournamentCount}</div>
                          <div className="text-xs text-gray-500">Tournaments</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {Math.round(boat.totalPoints / boat.tournamentCount)}
                          </div>
                          <div className="text-xs text-gray-500">Avg/Tournament</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderAnglerStandings = () => {
    const standings = getStandingsFor(selectedDivision, 'anglers', selectedGender)
    
    return (
      <div className="space-y-6">
        {/* Division and Gender Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedDivision('nearshore')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDivision === 'nearshore'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Nearshore
            </button>
            <button
              onClick={() => setSelectedDivision('offshore')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDivision === 'offshore'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Offshore
            </button>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedGender('men')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedGender === 'men'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Men's Division
            </button>
            <button
              onClick={() => setSelectedGender('women')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedGender === 'women'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Women's Division
            </button>
          </div>
        </div>

        {/* Angler Standings Table */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDivision === 'nearshore' ? 'Nearshore' : 'Offshore'} Angler of the Year - {selectedGender === 'men' ? "Men's" : "Women's"} Division
            </h3>
            <p className="text-sm text-gray-600">
              Club members only • Ranked by total points across all {selectedYear} tournaments
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {standings.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No angler standings available for {selectedDivision} {selectedGender}'s division yet.</p>
              </div>
            ) : (
              standings.map((angler, index) => (
                <div key={`${angler.anglerName}-${angler.memberId}`} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{angler.anglerName}</h4>
                        <p className="text-sm text-gray-600">
                          Member #{angler.memberId}
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            🏆 Club Member
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-ocean-600">{angler.totalPoints}</div>
                          <div className="text-xs text-gray-500">Total Points</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-600">{angler.tournamentCount}</div>
                          <div className="text-xs text-gray-500">Tournaments</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {Math.round(angler.totalPoints / angler.tournamentCount)}
                          </div>
                          <div className="text-xs text-gray-500">Avg/Tournament</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-ocean-600" />
              <h1 className="text-3xl font-bold text-gray-900">Annual Standings</h1>
            </div>
            
            {hasData && (
              <button
                onClick={handleExportToPDF}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </button>
            )}
          </div>
          <p className="text-gray-600">
            Track boat and angler of the year competitions across all {selectedYear} tournaments
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('boats')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'boats'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Ship className="h-4 w-4 inline mr-2" />
            Boat Standings
          </button>
          <button
            onClick={() => setActiveTab('anglers')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'anglers'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Angler Standings
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'boats' && renderBoatStandings()}
        {activeTab === 'anglers' && renderAnglerStandings()}
      </div>
    </div>
  )
}

export default AnnualStandings
