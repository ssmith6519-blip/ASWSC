import { useState, useEffect } from 'react'

// Default email configuration
const defaultEmailConfig = {
  clubEmail: '',
  clubName: 'Atlanta Saltwater Sportsman\'s Club',
  smtpServer: 'smtp.gmail.com',
  smtpPort: 587,
  useSSL: true,
  emailPassword: '', // App-specific password for Gmail
  senderName: 'ASWSC Admin',
  replyToEmail: '',
  emailSignature: `
Best regards,
Atlanta Saltwater Sportsman's Club
Visit us at: [Website URL]
Follow us on social media for updates!
  `.trim(),
  templates: {
    renewalReminder: {
      subject: 'ASWSC Membership Renewal Reminder',
      body: `Dear {memberName},

This is a friendly reminder that your ASWSC membership is set to expire on {expirationDate}.

To continue enjoying all the benefits of membership, including:
• Access to exclusive tournaments and events
• Member pricing on club activities  
• Monthly club meetings and networking
• Access to member resources and guides

Please renew your membership at your earliest convenience.

Membership Renewal Options:
• Online: Visit our website and log into your member portal
• In Person: Attend our next monthly meeting
• Mail: Send payment to our club address

If you have any questions about your membership or need assistance with renewal, please don't hesitate to contact us.

Thank you for being a valued member of ASWSC!

{signature}`
    },
    welcomeEmail: {
      subject: 'Welcome to ASWSC!',
      body: `Dear {memberName},

Welcome to the Atlanta Saltwater Sportsman's Club! We're thrilled to have you join our community of passionate saltwater fishing enthusiasts.

Your membership includes:
• Access to all club tournaments and events
• Monthly meetings with guest speakers and educational content
• Member directory and networking opportunities
• Discounts on club merchandise and activities
• Access to exclusive fishing reports and tips

Getting Started:
• Join us at our next monthly meeting
• Follow us on social media for updates
• Check out upcoming tournaments and events
• Connect with other members

We look forward to seeing you on the water and at our events!

{signature}`
    },
    tournamentNotification: {
      subject: 'ASWSC Tournament: {tournamentName}',
      body: `Dear ASWSC Members,

We're excited to announce our upcoming tournament: {tournamentName}

Tournament Details:
• Date: {tournamentDate}
• Location: {tournamentLocation}
• Entry Fee: {entryFee}
• Registration Deadline: {registrationDeadline}

Tournament Format: {tournamentType}
{tournamentDetails}

Registration:
Visit our website or contact us directly to register. Space is limited, so register early!

Questions? Feel free to reach out to the tournament director or club officers.

Tight lines!

{signature}`
    }
  },
  isConfigured: false,
  lastUpdated: null
}

const STORAGE_KEY = 'aswsc_email_config'

export const useEmailConfig = () => {
  const [config, setConfig] = useState(defaultEmailConfig)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load email config from localStorage on mount
  useEffect(() => {
    try {
      console.log('🔄 Loading email configuration...')
      const storedConfig = localStorage.getItem(STORAGE_KEY)
      
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig)
        console.log('✅ Loaded email configuration from storage')
        setConfig({ ...defaultEmailConfig, ...parsedConfig })
      } else {
        console.log('📝 No stored email config found, using defaults')
      }
    } catch (err) {
      console.error('❌ Error loading email config:', err)
      setError('Failed to load email configuration')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save config to localStorage
  const saveConfig = (newConfig) => {
    try {
      const configToSave = {
        ...newConfig,
        lastUpdated: new Date().toISOString(),
        isConfigured: !!(newConfig.clubEmail && newConfig.emailPassword)
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(configToSave))
      setConfig(configToSave)
      console.log('💾 Saved email configuration')
      return { success: true }
    } catch (err) {
      console.error('❌ Error saving email config:', err)
      setError('Failed to save email configuration')
      return { success: false, error: err.message }
    }
  }

  // Update specific config values
  const updateConfig = (updates) => {
    const updatedConfig = { ...config, ...updates }
    return saveConfig(updatedConfig)
  }

  // Update email templates
  const updateTemplate = (templateKey, templateData) => {
    const updatedTemplates = {
      ...config.templates,
      [templateKey]: templateData
    }
    return updateConfig({ templates: updatedTemplates })
  }

  // Test email configuration
  const testEmailConfig = async () => {
    try {
      if (!config.clubEmail || !config.emailPassword) {
        return { success: false, error: 'Email and password are required' }
      }

      // In a real implementation, this would test the SMTP connection
      // For now, we'll just validate the configuration
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.clubEmail)
      if (!isValidEmail) {
        return { success: false, error: 'Invalid email format' }
      }

      console.log('✅ Email configuration test passed')
      return { success: true, message: 'Email configuration is valid' }
    } catch (err) {
      console.error('❌ Email config test failed:', err)
      return { success: false, error: err.message }
    }
  }

  // Get Gmail compose URL with pre-populated data
  const getGmailComposeUrl = (to = '', subject = '', body = '') => {
    const baseUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
    const params = new URLSearchParams()
    
    if (to) params.append('to', to)
    if (subject) params.append('su', subject)
    if (body) params.append('body', body)
    
    return `${baseUrl}&${params.toString()}`
  }

  // Launch Gmail in new tab with club credentials
  const launchGmail = (emailData = {}) => {
    const { to = '', subject = '', body = '' } = emailData
    
    // Add signature to body if not already present
    const bodyWithSignature = body + (body && config.emailSignature ? '\n\n' + config.emailSignature : config.emailSignature)
    
    const gmailUrl = getGmailComposeUrl(to, subject, bodyWithSignature)
    window.open(gmailUrl, '_blank')
    
    console.log('📧 Launched Gmail with pre-populated data')
    return { success: true }
  }

  // Generate email from template
  const generateEmailFromTemplate = (templateKey, variables = {}) => {
    const template = config.templates[templateKey]
    if (!template) {
      return { success: false, error: 'Template not found' }
    }

    let subject = template.subject
    let body = template.body

    // Replace variables in subject and body
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{${key}}`
      subject = subject.replace(new RegExp(placeholder, 'g'), value || '')
      body = body.replace(new RegExp(placeholder, 'g'), value || '')
    })

    // Replace signature placeholder
    body = body.replace('{signature}', config.emailSignature)

    return {
      success: true,
      email: {
        subject,
        body,
        from: `${config.senderName} <${config.clubEmail}>`,
        replyTo: config.replyToEmail || config.clubEmail
      }
    }
  }

  // Send renewal reminders (in real app, this would integrate with email service)
  const sendRenewalReminders = async (members) => {
    try {
      const results = []
      
      for (const member of members) {
        const emailResult = generateEmailFromTemplate('renewalReminder', {
          memberName: member.name,
          expirationDate: member.membershipExpiry ? 
            new Date(member.membershipExpiry).toLocaleDateString() : 'N/A'
        })

        if (emailResult.success) {
          // In a real implementation, this would send the email
          // For now, we'll just log it and return success
          console.log(`📧 Would send renewal reminder to ${member.email}:`, emailResult.email)
          results.push({
            memberId: member.id,
            email: member.email,
            status: 'queued',
            subject: emailResult.email.subject
          })
        }
      }

      return { 
        success: true, 
        results,
        message: `Queued ${results.length} renewal reminder emails`
      }
    } catch (err) {
      console.error('❌ Error sending renewal reminders:', err)
      return { success: false, error: err.message }
    }
  }

  // Reset to default configuration
  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setConfig(defaultEmailConfig)
      console.log('🔄 Reset email configuration to defaults')
      return { success: true }
    } catch (err) {
      console.error('❌ Error resetting email config:', err)
      return { success: false, error: err.message }
    }
  }

  // Get configuration status
  const getConfigStatus = () => {
    const hasBasicConfig = !!(config.clubEmail && config.clubName)
    const hasAdvancedConfig = !!(config.clubEmail && config.emailPassword && config.senderName)
    
    return {
      isConfigured: config.isConfigured,
      hasBasicConfig,
      hasAdvancedConfig,
      lastUpdated: config.lastUpdated,
      missingFields: [
        !config.clubEmail && 'Club Email',
        !config.emailPassword && 'Email Password',
        !config.senderName && 'Sender Name'
      ].filter(Boolean)
    }
  }

  return {
    config,
    loading,
    error,
    updateConfig,
    updateTemplate,
    saveConfig,
    testEmailConfig,
    launchGmail,
    getGmailComposeUrl,
    generateEmailFromTemplate,
    sendRenewalReminders,
    resetConfig,
    getConfigStatus
  }
}

export default useEmailConfig


