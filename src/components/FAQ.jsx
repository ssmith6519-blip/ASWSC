import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { useFAQ } from '../hooks/useFAQ'

const FAQ = () => {
  const { activeFAQs, loading, error } = useFAQ()
  const [openItems, setOpenItems] = useState(new Set([activeFAQs[0]?.id]))

  // Update openItems when activeFAQs changes
  React.useEffect(() => {
    if (activeFAQs.length > 0 && openItems.size === 0) {
      setOpenItems(new Set([activeFAQs[0].id]))
    }
  }, [activeFAQs])

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // Loading state
  if (loading) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-ocean-600">Questions</span>
            </h2>
            <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
            <span className="ml-3 text-gray-600">Loading FAQs...</span>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-ocean-600">Questions</span>
            </h2>
            <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          </div>
          
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load FAQs</h3>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    )
  }

  // No FAQs state
  if (activeFAQs.length === 0) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-ocean-600">Questions</span>
            </h2>
            <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
          </div>
          
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs Available</h3>
            <p className="text-gray-600">Check back later for frequently asked questions.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-ocean-600">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
        </div>

        <div className="space-y-4">
          {activeFAQs.map((faq) => {
            const isOpen = openItems.has(faq.id)
            return (
              <div key={faq.id} className="card overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {isOpen ? <ChevronUp className="h-5 w-5 text-ocean-600" /> : <ChevronDown className="h-5 w-5 text-ocean-600" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FAQ
