import React from 'react'
import { Mail, Phone } from 'lucide-react'

const Footer = ({ onNavigate }) => {
  const navigationLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'resources', label: 'Resources' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <img 
                  src="/sailfish-logo.jpg" 
                  alt="ASWSC Sailfish Logo" 
                  className="h-10 w-10 object-contain object-center"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">ASWSC</h3>
                <p className="text-gray-400 text-sm">Atlanta Saltwater</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Georgia's premier saltwater fishing club, connecting passionate anglers since 1984.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-300 hover:text-ocean-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-ocean-400" />
                <span className="text-gray-300">info@aswsc.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-ocean-400" />
                <span className="text-gray-300">(404) 555-0123</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">Get fishing reports and tournament updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none"
              />
              <button className="bg-ocean-600 px-4 py-2 rounded-r-lg hover:bg-ocean-700">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            © {currentYear} Atlanta Saltwater Sportsman's Club. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
