import React, { useState } from 'react'
import { useEmailConfig } from '../../hooks/useEmailConfig'
import { useMembers } from '../../hooks/useMembers'
import {
  Mail,
  Settings,
  Send,
  Eye,
  EyeOff,
  TestTube,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Save,
  Edit,
  Users,
  Clock,
  RotateCcw
} from 'lucide-react'

const EmailManagement = () => {
  const { 
    config, 
    loading, 
    error, 
    updateConfig, 
    updateTemplate, 
    testEmailConfig, 
    launchGmail,
    generateEmailFromTemplate,
    sendRenewalReminders,
    resetConfig,
    getConfigStatus
  } = useEmailConfig()

  const { members } = useMembers()

  const [activeTab, setActiveTab] = useState('config')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(null)
  const [testingConfig, setTestingConfig] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [configForm, setConfigForm] = useState(config)
  const [templateForm, setTemplateForm] = useState({ subject: '', body: '' })

  const configStatus = getConfigStatus()

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  // Handle config form submission
  const handleConfigSubmit = async (e) => {
    e.preventDefault()
    
    const result = updateConfig(configForm)
    if (result.success) {
      showMessage('Email configuration saved successfully!', 'success')
    } else {
      showMessage(result.error || 'Failed to save configuration', 'error')
    }
  }

  // Handle template editing
  const handleEditTemplate = (templateKey) => {
    const template = config.templates[templateKey]
    setTemplateForm(template)
    setEditingTemplate(templateKey)
  }

  const handleSaveTemplate = () => {
    const result = updateTemplate(editingTemplate, templateForm)
    if (result.success) {
      showMessage('Template saved successfully!', 'success')
      setEditingTemplate(null)
    } else {
      showMessage('Failed to save template', 'error')
    }
  }

  // Test email configuration
  const handleTestConfig = async () => {
    setTestingConfig(true)
    const result = await testEmailConfig()
    
    if (result.success) {
      showMessage(result.message || 'Email configuration test passed!', 'success')
    } else {
      showMessage(result.error || 'Email configuration test failed', 'error')
    }
    
    setTestingConfig(false)
  }

  // Launch Gmail
  const handleLaunchGmail = () => {
    const result = launchGmail()
    if (result.success) {
      showMessage('Gmail launched in new tab', 'success')
    }
  }

  // Send renewal reminders
  const handleSendRenewalReminders = async () => {
    // Get members with expired or soon-to-expire memberships
    const expiredMembers = members.filter(member => 
      member.membershipStatus === 'Expired' || 
      (member.membershipExpiry && new Date(member.membershipExpiry) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
    )

    if (expiredMembers.length === 0) {
      showMessage('No members need renewal reminders at this time', 'info')
      return
    }

    const result = await sendRenewalReminders(expiredMembers)
    if (result.success) {
      showMessage(result.message, 'success')
    } else {
      showMessage(result.error || 'Failed to send renewal reminders', 'error')
    }
  }

  // Reset configuration
  const handleResetConfig = () => {
    if (window.confirm('Are you sure you want to reset all email configuration to defaults? This cannot be undone.')) {
      const result = resetConfig()
      if (result.success) {
        setConfigForm(config)
        showMessage('Email configuration reset to defaults', 'success')
      } else {
        showMessage('Failed to reset configuration', 'error')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
        <span className="ml-3 text-gray-600">Loading email configuration...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Mail className="h-8 w-8 text-ocean-600 mr-3" />
            Email Management
          </h1>
          <p className="text-gray-600">Configure club email settings and manage email communications.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLaunchGmail}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open Gmail</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          message.type === 'error' 
            ? 'bg-red-50 border border-red-200 text-red-800'
            : message.type === 'info'
            ? 'bg-blue-50 border border-blue-200 text-blue-800'
            : 'bg-green-50 border border-green-200 text-green-800'
        }`}>
          {message.type === 'error' ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <CheckCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Configuration Status */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Configuration Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg border ${
            configStatus.isConfigured 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center">
              {configStatus.isConfigured ? (
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className={`font-medium ${
                configStatus.isConfigured ? 'text-green-900' : 'text-red-900'
              }`}>
                {configStatus.isConfigured ? 'Configured' : 'Not Configured'}
              </span>
            </div>
            {!configStatus.isConfigured && configStatus.missingFields.length > 0 && (
              <div className="mt-2 text-sm text-red-700">
                Missing: {configStatus.missingFields.join(', ')}
              </div>
            )}
          </div>

          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">
                {members.filter(m => m.membershipStatus === 'Expired').length} Expired Members
              </span>
            </div>
            <div className="mt-1 text-sm text-blue-700">
              Need renewal reminders
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-gray-50 border-gray-200">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-900">
                Last Updated
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-700">
              {configStatus.lastUpdated 
                ? new Date(configStatus.lastUpdated).toLocaleDateString()
                : 'Never'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'config', label: 'Configuration', icon: Settings },
          { key: 'templates', label: 'Email Templates', icon: Mail },
          { key: 'actions', label: 'Quick Actions', icon: Send }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-ocean-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'config' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Email Configuration</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleResetConfig}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleTestConfig}
                disabled={testingConfig}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {testingConfig ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <TestTube className="h-4 w-4" />
                )}
                <span>{testingConfig ? 'Testing...' : 'Test Config'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleConfigSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Club Email Address *
                </label>
                <input
                  type="email"
                  value={configForm.clubEmail}
                  onChange={(e) => setConfigForm({ ...configForm, clubEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="admin@aswsc.org"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">Gmail account for sending club emails</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={configForm.emailPassword}
                    onChange={(e) => setConfigForm({ ...configForm, emailPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 pr-10"
                    placeholder="Gmail App Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">Generate from Google Account Security settings</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Club Name
                </label>
                <input
                  type="text"
                  value={configForm.clubName}
                  onChange={(e) => setConfigForm({ ...configForm, clubName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="Atlanta Saltwater Sportsman's Club"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender Name
                </label>
                <input
                  type="text"
                  value={configForm.senderName}
                  onChange={(e) => setConfigForm({ ...configForm, senderName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="ASWSC Admin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reply-To Email
                </label>
                <input
                  type="email"
                  value={configForm.replyToEmail}
                  onChange={(e) => setConfigForm({ ...configForm, replyToEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="Leave blank to use club email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Signature
              </label>
              <textarea
                value={configForm.emailSignature}
                onChange={(e) => setConfigForm({ ...configForm, emailSignature: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                placeholder="Best regards,\nAtlanta Saltwater Sportsman's Club"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-ocean-600 text-white px-6 py-2 rounded-lg hover:bg-ocean-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Templates</h3>
          
          <div className="space-y-4">
            {Object.entries(config.templates).map(([key, template]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </h4>
                  <button
                    onClick={() => handleEditTemplate(key)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <div><strong>Subject:</strong> {template.subject}</div>
                  <div className="mt-1"><strong>Body:</strong> {template.body.substring(0, 100)}...</div>
                </div>
              </div>
            ))}
          </div>

          {editingTemplate && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">
                  Edit Template: {editingTemplate.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h4>
                <button
                  onClick={() => setEditingTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={templateForm.subject}
                    onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                  <textarea
                    value={templateForm.body}
                    onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Use {'{memberName}'}, {'{expirationDate}'}, {'{signature}'} as placeholders
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveTemplate}
                    className="flex items-center space-x-2 bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-700 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Template</span>
                  </button>
                  <button
                    onClick={() => setEditingTemplate(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={handleSendRenewalReminders}
              disabled={!configStatus.isConfigured}
              className="p-6 border border-gray-200 rounded-lg text-left hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Send Renewal Reminders</h4>
                  <p className="text-sm text-gray-600">Email expired and expiring members</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {members.filter(m => m.membershipStatus === 'Expired').length} members need reminders
              </div>
            </button>

            <button
              onClick={handleLaunchGmail}
              className="p-6 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExternalLink className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Open Gmail</h4>
                  <p className="text-sm text-gray-600">Launch Gmail with club credentials</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Opens in new tab with signature pre-populated
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmailManagement
