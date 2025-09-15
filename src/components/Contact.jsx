import React from 'react'
import { Mail, Phone, MapPin, Calendar } from 'lucide-react'

const Contact = () => {
  return (
    <div className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get In <span className="text-ocean-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-ocean-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@aswsc.org</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-ocean-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">(404) 555-0123</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-ocean-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Meeting Location</h4>
                  <p className="text-gray-600">American Legion Post 29<br />Mableton, GA 30126</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="h-6 w-6 text-ocean-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Meetings</h4>
                  <p className="text-gray-600">Second Tuesday of every month<br />7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
