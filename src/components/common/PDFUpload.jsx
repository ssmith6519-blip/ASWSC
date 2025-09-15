import React, { useState, useRef } from 'react'
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react'

const PDFUpload = ({ 
  onFileSelect, 
  currentFile = null, 
  onRemove = null,
  label = "Upload PDF",
  description = "Select a PDF file to upload",
  maxSizeMB = 10,
  disabled = false 
}) => {
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    // Check file type
    if (file.type !== 'application/pdf') {
      return 'Please select a PDF file only.'
    }

    // Check file size (convert MB to bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB.`
    }

    return null
  }

  const handleFileSelect = async (file) => {
    setError('')
    setUploading(true)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setUploading(false)
      return
    }

    try {
      // Convert file to base64 data URL for persistent storage
      const fileReader = new FileReader()
      
      const fileData = await new Promise((resolve, reject) => {
        fileReader.onload = (e) => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            // Use data URL instead of blob URL for persistence
            url: e.target.result,
            uploadedAt: new Date().toISOString()
          })
        }
        
        fileReader.onerror = () => {
          reject(new Error('Failed to read file'))
        }
        
        // Read file as data URL (base64)
        fileReader.readAsDataURL(file)
      })

      onFileSelect(fileData)
    } catch (err) {
      setError('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)

    if (disabled || uploading) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (!disabled && !uploading) {
      setDragOver(true)
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleBrowseClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click()
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove()
    }
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {currentFile ? (
        // Show current file
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{currentFile.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(currentFile.size)} • PDF
                </p>
                {currentFile.uploadedAt && (
                  <p className="text-xs text-gray-400">
                    Uploaded {new Date(currentFile.uploadedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={currentFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View
              </a>
              {onRemove && (
                <button
                  onClick={handleRemove}
                  disabled={disabled}
                  className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Show upload area
        <div
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${dragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${uploading ? 'pointer-events-none' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleBrowseClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled || uploading}
          />

          <div className="space-y-2">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className={`h-8 w-8 mx-auto ${dragOver ? 'text-blue-600' : 'text-gray-400'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {dragOver ? 'Drop PDF file here' : 'Drop PDF file here or click to browse'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Maximum file size: {maxSizeMB}MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default PDFUpload
