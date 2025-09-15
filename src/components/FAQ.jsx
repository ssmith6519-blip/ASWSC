import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([1]))

  const faqs = [
    {
      id: 1,
      question: 'How do I become a member of ASWSC?',
      answer: 'Becoming a member is easy! You can apply online through our website or attend one of our monthly meetings. New members are always welcome.'
    },
    {
      id: 2,
      question: 'What are the membership dues?',
      answer: 'Annual membership dues are $75 for individuals and $100 for families. This includes access to all club meetings, tournaments, and events.'
    },
    {
      id: 3,
      question: 'Do I need my own boat to participate?',
      answer: 'While having your own boat is helpful, it\'s not required! Many members team up for tournaments and trips.'
    }
  ]

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
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
          {faqs.map((faq) => {
            const isOpen = openItems.has(faq.id)
            return (
              <div key={faq.id} className="card overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
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
