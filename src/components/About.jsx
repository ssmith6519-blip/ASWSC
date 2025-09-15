import React from 'react'
import { Fish, Users, Trophy, MapPin, Clock, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-ocean-600">ASWSC</span>
          </h2>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over four decades, the Atlanta Saltwater Sportsman's Club has been 
            Georgia's premier destination for saltwater fishing enthusiasts. We're more 
            than just a club – we're a family of passionate anglers dedicated to the 
            sport we love.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-ocean-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-ocean-900 mb-6">Our Mission</h3>
            <p className="text-lg text-ocean-800 max-w-4xl mx-auto leading-relaxed">
              To promote and preserve the sport of saltwater fishing through fellowship, 
              education, conservation, and competition. We strive to create lasting 
              friendships while sharing our passion for the ocean and its incredible 
              fishing opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
