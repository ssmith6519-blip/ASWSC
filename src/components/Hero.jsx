import React from 'react'
import { ArrowRight, Calendar, Users, Trophy, Waves } from 'lucide-react'

const Hero = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Ocean Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-ocean-700 to-ocean-500">
        {/* Floating Fish Icons */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 opacity-10 animate-pulse">
            <Waves className="h-16 w-16 text-white" />
          </div>
          <div className="absolute top-40 right-20 opacity-10 animate-pulse delay-1000">
            <Waves className="h-12 w-12 text-white" />
          </div>
          <div className="absolute bottom-40 left-20 opacity-10 animate-pulse delay-2000">
            <Waves className="h-20 w-20 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Atlanta Saltwater
              <span className="block text-sand-300">Sportsman's Club</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Georgia's premier saltwater fishing club connecting anglers, 
              sharing knowledge, and creating unforgettable fishing experiences
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="h-8 w-8 text-sand-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-200 text-sm">Active Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Trophy className="h-8 w-8 text-sand-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">25+</div>
              <div className="text-gray-200 text-sm">Annual Tournaments</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Calendar className="h-8 w-8 text-sand-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white mb-1">40+</div>
              <div className="text-gray-200 text-sm">Years of Excellence</div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('tournaments')}
              className="group bg-sand-500 hover:bg-sand-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <span>View Tournaments</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-ocean-700 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
