import React, { useState } from 'react'
import { 
  Users, 
  Trophy, 
  Shield, 
  Target, 
  Fish, 
  Calendar, 
  Mail, 
  FileText, 
  BarChart3, 
  Settings,
  CheckCircle,
  Star,
  Anchor,
  Crown,
  Eye,
  Edit,
  Plus,
  Send,
  Download,
  ExternalLink,
  Waves,
  HelpCircle
} from 'lucide-react'

const Features = () => {
  const [activeRole, setActiveRole] = useState('public')

  const roles = [
    {
      id: 'public',
      name: 'Public Users',
      icon: Users,
      color: 'blue',
      description: 'Anyone can access these features without logging in'
    },
    {
      id: 'tournament-director',
      name: 'Tournament Directors',
      icon: Trophy,
      color: 'green',
      description: 'Special privileges for tournament management and weigh-ins'
    },
    {
      id: 'admin',
      name: 'Admin Users',
      icon: Shield,
      color: 'purple',
      description: 'Full system administration and configuration access'
    }
  ]

  const features = {
    public: [
      {
        category: 'Tournament Information',
        icon: Trophy,
        items: [
          {
            name: 'Tournament Listings',
            description: 'View all upcoming and past tournaments with details, dates, and locations',
            icon: Calendar
          },
          {
            name: 'Tournament Registration',
            description: 'Register for tournaments with boat and crew information',
            icon: Plus
          },
          {
            name: 'Live Leaderboards',
            description: 'Real-time tournament standings and results during events',
            icon: BarChart3
          },
          {
            name: 'Scoring Matrices',
            description: 'View current nearshore and offshore point systems',
            icon: Target
          }
        ]
      },
      {
        category: 'Club Information',
        icon: Anchor,
        items: [
          {
            name: 'About ASWSC',
            description: 'Learn about our club history, mission, and activities',
            icon: Star
          },
          {
            name: 'FAQ Section',
            description: 'Frequently asked questions about membership and tournaments',
            icon: HelpCircle
          },
          {
            name: 'Contact Information',
            description: 'Get in touch with club officers and tournament directors',
            icon: Mail
          },
          {
            name: 'Resources',
            description: 'Access fishing guides, regulations, and club documents',
            icon: FileText
          }
        ]
      },
      {
        category: 'Tournament Features',
        icon: Fish,
        items: [
          {
            name: 'Tournament Details',
            description: 'Comprehensive tournament information including rules and prizes',
            icon: Eye
          },
          {
            name: 'Registration Status',
            description: 'Check registration status and view registered participants',
            icon: Users
          },
          {
            name: 'Historical Results',
            description: 'Browse past tournament results and annual standings',
            icon: BarChart3
          }
        ]
      }
    ],
    'tournament-director': [
      {
        category: 'Tournament Management',
        icon: Trophy,
        items: [
          {
            name: 'Weigh-In System',
            description: 'Complete digital weigh-in with real-time scoring and leaderboard updates',
            icon: Fish
          },
          {
            name: 'Multi-Day Support',
            description: 'Handle tournaments spanning multiple days with separate daily entries',
            icon: Calendar
          },
          {
            name: 'Boat & Crew Management',
            description: 'Track boat registrations, crew members, and zip tie colors for offshore events',
            icon: Anchor
          },
          {
            name: 'Real-Time Scoring',
            description: 'Automatic point calculation based on fish species, size, and tournament rules',
            icon: Target
          }
        ]
      },
      {
        category: 'Data Management',
        icon: BarChart3,
        items: [
          {
            name: 'Fish Entry Tracking',
            description: 'Record fish species, weights, lengths, and angler details',
            icon: Fish
          },
          {
            name: 'Member Validation',
            description: 'Verify member status and club standing during weigh-ins',
            icon: CheckCircle
          },
          {
            name: 'Tournament Rules',
            description: 'Enforce tournament-specific rules like fish limits and categories',
            icon: FileText
          },
          {
            name: 'Live Updates',
            description: 'Instant leaderboard updates visible to all participants',
            icon: Eye
          }
        ]
      },
      {
        category: 'Tournament Operations',
        icon: Settings,
        items: [
          {
            name: 'Registration Management',
            description: 'View and manage tournament registrations and participant lists',
            icon: Users
          },
          {
            name: 'Scoring Matrix Access',
            description: 'Reference current point values and tournament rules',
            icon: Target
          },
          {
            name: 'Test Data Tools',
            description: 'Load sample data for testing and demonstration purposes',
            icon: Settings
          }
        ]
      }
    ],
    admin: [
      {
        category: 'Member Management',
        icon: Users,
        items: [
          {
            name: 'Complete Member Database',
            description: 'Full CRUD operations for member records with detailed profiles',
            icon: Users
          },
          {
            name: 'Membership Statistics',
            description: 'Comprehensive analytics on membership status, boats, families',
            icon: BarChart3
          },
          {
            name: 'Member Categories',
            description: 'Track current, expired, lifetime members with filtering and search',
            icon: Crown
          },
          {
            name: 'Quick Actions',
            description: 'Fast access to add members, view directory, send reminders',
            icon: Plus
          }
        ]
      },
      {
        category: 'Tournament Administration',
        icon: Trophy,
        items: [
          {
            name: 'Tournament Creation',
            description: 'Create and configure new tournaments with all settings',
            icon: Plus
          },
          {
            name: 'Scoring Matrix Management',
            description: 'Edit nearshore and offshore point systems with PDF export',
            icon: Target
          },
          {
            name: 'Test Data Management',
            description: 'Load realistic test data for development and training',
            icon: Settings
          },
          {
            name: 'Registration Oversight',
            description: 'Monitor and manage all tournament registrations',
            icon: Eye
          }
        ]
      },
      {
        category: 'Communication System',
        icon: Mail,
        items: [
          {
            name: 'Email Configuration',
            description: 'Gmail integration with SMTP settings and app passwords',
            icon: Settings
          },
          {
            name: 'Email Templates',
            description: 'Customizable templates for renewals, welcome emails, tournaments',
            icon: Edit
          },
          {
            name: 'Renewal Reminders',
            description: 'Automated email reminders for expired and expiring memberships',
            icon: Send
          },
          {
            name: 'Gmail Integration',
            description: 'Direct Gmail launch with club credentials and signatures',
            icon: ExternalLink
          }
        ]
      },
      {
        category: 'Content Management',
        icon: FileText,
        items: [
          {
            name: 'FAQ Management',
            description: 'Full CRUD operations for website FAQs with ordering and status',
            icon: HelpCircle
          },
          {
            name: 'PDF Generation',
            description: 'Export scoring matrices and documents as professional PDFs',
            icon: Download
          },
          {
            name: 'System Settings',
            description: 'Configure system preferences and data management options',
            icon: Settings
          },
          {
            name: 'Data Export',
            description: 'Export member data and system information for backup',
            icon: Download
          }
        ]
      },
      {
        category: 'System Administration',
        icon: Settings,
        items: [
          {
            name: 'User Authentication',
            description: 'Secure admin and tournament director access controls',
            icon: Shield
          },
          {
            name: 'Data Persistence',
            description: 'Local storage management for all system data',
            icon: BarChart3
          },
          {
            name: 'Configuration Status',
            description: 'Monitor system health and configuration completeness',
            icon: CheckCircle
          },
          {
            name: 'Reset & Recovery',
            description: 'System reset options and data recovery tools',
            icon: Settings
          }
        ]
      }
    ]
  }

  const currentFeatures = features[activeRole]
  const currentRole = roles.find(role => role.id === activeRole)

  return (
    <div className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            System <span className="text-ocean-600">Features</span>
          </h1>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tournament management and member administration system designed specifically 
            for the Atlanta Saltwater Sportsman's Club.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                activeRole === role.id
                  ? `border-${role.color}-500 bg-${role.color}-50 text-${role.color}-700`
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <role.icon className={`h-6 w-6 ${
                activeRole === role.id ? `text-${role.color}-600` : 'text-gray-500'
              }`} />
              <div className="text-left">
                <div className="font-semibold">{role.name}</div>
                <div className="text-sm opacity-75">{role.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Features Content */}
        <div className="space-y-12">
          {/* Role Header */}
          <div className="text-center">
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-${currentRole.color}-100 text-${currentRole.color}-800`}>
              <currentRole.icon className="h-6 w-6" />
              <span className="font-semibold text-lg">{currentRole.name} Features</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {currentRole.description}
            </p>
          </div>

          {/* Feature Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg bg-${currentRole.color}-100`}>
                    <category.icon className={`h-6 w-6 text-${currentRole.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                </div>

                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <item.icon className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Highlights */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            System Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-3">
                <Fish className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-Time Scoring</h4>
              <p className="text-sm text-gray-600">Live tournament leaderboards with automatic point calculation</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Integration</h4>
              <p className="text-sm text-gray-600">Gmail integration with automated member communications</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Member Management</h4>
              <p className="text-sm text-gray-600">Complete member database with statistics and analytics</p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-orange-100 rounded-full w-fit mx-auto mb-3">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Configuration</h4>
              <p className="text-sm text-gray-600">Customizable scoring matrices, templates, and system settings</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Built With Modern Technology</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">React 18</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">Vite</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Tailwind CSS</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full">Lucide Icons</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">Gmail API</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Local Storage</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-ocean-600 to-ocean-700 rounded-lg p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Waves className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
            </div>
            <p className="text-ocean-100 mb-6 max-w-2xl mx-auto">
              Join ASWSC and experience the most comprehensive tournament management system 
              designed specifically for saltwater fishing clubs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-ocean-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Tournaments
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-ocean-600 transition-colors">
                Learn About Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
