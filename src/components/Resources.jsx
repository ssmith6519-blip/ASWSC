import React from 'react'
import { ExternalLink, Cloud, Fish, BookOpen } from 'lucide-react'

const Resources = () => {
  return (
    <div className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Fishing <span className="text-ocean-600">Resources</span>
          </h2>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Essential resources for successful saltwater fishing. From weather and tides 
            to regulations and fishing reports, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="bg-sand-100 p-3 rounded-full w-fit mb-4">
              <Cloud className="h-6 w-6 text-sand-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">NOAA Weather Service</h4>
            <p className="text-gray-600 mb-4">Official marine weather forecasts and conditions for the Georgia coast.</p>
            <a href="#" className="inline-flex items-center space-x-2 text-sand-600 hover:text-sand-700 font-medium">
              <span>Visit Resource</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="bg-sand-100 p-3 rounded-full w-fit mb-4">
              <BookOpen className="h-6 w-6 text-sand-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">GA DNR Regulations</h4>
            <p className="text-gray-600 mb-4">Current saltwater fishing regulations, limits, and seasons for Georgia waters.</p>
            <a href="#" className="inline-flex items-center space-x-2 text-sand-600 hover:text-sand-700 font-medium">
              <span>Visit Resource</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="card p-6 group hover:shadow-xl transition-all duration-300">
            <div className="bg-sand-100 p-3 rounded-full w-fit mb-4">
              <Fish className="h-6 w-6 text-sand-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Fishing Reports</h4>
            <p className="text-gray-600 mb-4">Weekly fishing reports and conditions from local captains and guides.</p>
            <a href="#" className="inline-flex items-center space-x-2 text-sand-600 hover:text-sand-700 font-medium">
              <span>Visit Resource</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resources
