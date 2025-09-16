import React, { useState, useEffect } from 'react'
import { useBlog, BLOG_CATEGORIES, BLOG_TAGS } from '../hooks/useBlog'
import { useAuth } from '../contexts/AuthContext'
import ImageEditor from './ImageEditor'
import {
  BookOpen,
  Save,
  Send,
  Eye,
  X,
  Plus,
  Tag,
  Image,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  ArrowLeft,
  Edit3,
  Trash2,
  Upload,
  Edit2,
  Video,
  Play,
  Pause
} from 'lucide-react'

const BlogEditor = ({ onClose, editingPost = null }) => {
  const { createPost, updatePost, getPosts } = useBlog()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('write')
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [showMyPosts, setShowMyPosts] = useState(false)
  const [showImageEditor, setShowImageEditor] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedVideos, setUploadedVideos] = useState([])
  
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'inshore-fishing',
    tags: [],
    status: 'draft',
    author: user?.name || 'Member',
    authorId: user?.id || null,
    featured: false,
    featuredImage: null,
    images: [],
    videos: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  })

  // Initialize with editing post if provided
  useEffect(() => {
    if (editingPost) {
      setPost({ ...editingPost })
      setUploadedImages(editingPost.images || [])
      setUploadedVideos(editingPost.videos || [])
    }
  }, [editingPost])

  // Auto-save functionality
  useEffect(() => {
    if (post.title || post.content) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveDraft(true) // Silent save
      }, 30000) // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer)
    }
  }, [post.title, post.content])

  // Get user's posts
  const myPosts = getPosts({ 
    authorId: user?.id,
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  })

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  // Handle save as draft
  const handleSaveDraft = async (silent = false) => {
    setSaving(true)
    
    try {
      const postData = {
        ...post,
        status: 'draft',
        excerpt: post.excerpt || generateExcerpt(post.content)
      }

      let result
      if (editingPost) {
        result = updatePost(editingPost.id, postData)
      } else {
        result = createPost(postData)
        if (result.success) {
          // Update the post with the returned post data (including ID)
          setPost(result.post)
        }
      }

      if (result.success && !silent) {
        showMessage('Draft saved successfully!', 'success')
      } else if (!result.success) {
        showMessage(result.error || 'Failed to save draft', 'error')
      }
    } catch (error) {
      if (!silent) {
        showMessage('Failed to save draft', 'error')
      }
    } finally {
      setSaving(false)
    }
  }

  // Handle submit for review
  const handleSubmitForReview = async () => {
    if (!post.title.trim()) {
      showMessage('Please enter a title for your post', 'error')
      return
    }
    if (!post.content.trim()) {
      showMessage('Please write some content for your post', 'error')
      return
    }

    setSubmitting(true)

    try {
      const postData = {
        ...post,
        status: 'submitted',
        excerpt: post.excerpt || generateExcerpt(post.content)
      }

      let result
      if (editingPost) {
        result = updatePost(editingPost.id, postData)
      } else {
        result = createPost(postData)
      }

      if (result.success) {
        showMessage('Post submitted for admin review!', 'success')
        setTimeout(() => {
          if (onClose) onClose()
        }, 2000)
      } else {
        showMessage(result.error || 'Failed to submit post', 'error')
      }
    } catch (error) {
      showMessage('Failed to submit post', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Generate excerpt from content
  const generateExcerpt = (content, maxLength = 160) => {
    const textContent = content.replace(/<[^>]*>/g, '') // Strip HTML
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent
  }

  // Handle tag addition
  const addTag = (tagToAdd) => {
    if (tagToAdd && !post.tags.includes(tagToAdd)) {
      setPost({ ...post, tags: [...post.tags, tagToAdd] })
    }
  }

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setPost({ ...post, tags: post.tags.filter(tag => tag !== tagToRemove) })
  }

  // Image handling functions
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageData = {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            size: file.size
          }
          setUploadedImages(prev => [...prev, imageData])
          setPost(prev => ({ ...prev, images: [...(prev.images || []), imageData] }))
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleImageEdit = (imageData) => {
    setEditingImage(imageData)
    setShowImageEditor(true)
  }

  const handleImageSave = (editedImageUrl) => {
    if (editingImage) {
      const updatedImage = { ...editingImage, url: editedImageUrl }
      const updatedImages = uploadedImages.map(img => 
        img.id === editingImage.id ? updatedImage : img
      )
      setUploadedImages(updatedImages)
      setPost(prev => ({ 
        ...prev, 
        images: updatedImages
      }))
    }
    setShowImageEditor(false)
    setEditingImage(null)
    showMessage('Image updated successfully!', 'success')
  }

  const handleImageDelete = (imageId) => {
    const updatedImages = uploadedImages.filter(img => img.id !== imageId)
    setUploadedImages(updatedImages)
    setPost(prev => ({ ...prev, images: updatedImages }))
    showMessage('Image removed successfully!', 'success')
  }

  const insertImageToContent = (imageData) => {
    const imageHtml = `<img src="${imageData.url}" alt="${imageData.name}" style="max-width: 100%; height: auto; margin: 10px 0;" />`
    setPost(prev => ({
      ...prev,
      content: prev.content + '\n' + imageHtml
    }))
    showMessage('Image inserted into content!', 'success')
  }

  // Video handling functions
  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        // Check file size (limit to 100MB)
        const maxSize = 100 * 1024 * 1024 // 100MB
        if (file.size > maxSize) {
          showMessage(`Video "${file.name}" is too large. Maximum size is 100MB.`, 'error')
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const videoData = {
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type,
            duration: null // Will be set when video loads
          }
          setUploadedVideos(prev => [...prev, videoData])
          setPost(prev => ({ ...prev, videos: [...(prev.videos || []), videoData] }))
          showMessage(`Video "${file.name}" uploaded successfully!`, 'success')
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleVideoDelete = (videoId) => {
    const updatedVideos = uploadedVideos.filter(video => video.id !== videoId)
    setUploadedVideos(updatedVideos)
    setPost(prev => ({ ...prev, videos: updatedVideos }))
    showMessage('Video removed successfully!', 'success')
  }

  const insertVideoToContent = (videoData) => {
    const videoHtml = `
      <video controls style="max-width: 100%; height: auto; margin: 10px 0;" preload="metadata">
        <source src="${videoData.url}" type="${videoData.type}">
        Your browser does not support the video tag.
      </video>
    `
    setPost(prev => ({
      ...prev,
      content: prev.content + '\n' + videoHtml
    }))
    showMessage('Video inserted into content!', 'success')
  }

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Handle content change with basic formatting
  const handleContentChange = (e) => {
    let content = e.target.value
    
    // Basic markdown-like formatting
    content = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n\n/g, '</p><p>') // Paragraphs
      .replace(/\n/g, '<br>') // Line breaks

    // Wrap in paragraph tags if not already
    if (content && !content.startsWith('<p>')) {
      content = '<p>' + content + '</p>'
    }

    setPost({ ...post, content })
  }

  // My Posts View
  if (showMyPosts) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              My Blog Posts
            </h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowMyPosts(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="flex-1 overflow-y-auto">
            {myPosts.posts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">Start writing your first blog post to share with the ASWSC community.</p>
                <button
                  onClick={() => setShowMyPosts(false)}
                  className="btn-primary"
                >
                  Write Your First Post
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {myPosts.posts.map((userPost) => (
                  <div key={userPost.id} className="p-6 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{userPost.title}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          userPost.status === 'published' ? 'bg-green-100 text-green-800' :
                          userPost.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                          userPost.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          userPost.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {userPost.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{userPost.excerpt}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{BLOG_CATEGORIES[userPost.category]?.name}</span>
                        <span>{new Date(userPost.updatedAt).toLocaleDateString()}</span>
                        {userPost.views > 0 && <span>{userPost.views} views</span>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          setPost({ ...userPost })
                          setShowMyPosts(false)
                        }}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Main Editor View
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              {editingPost ? 'Edit Blog Post' : 'Write New Blog Post'}
            </h3>
            <button
              onClick={() => setShowMyPosts(true)}
              className="text-sm text-ocean-600 hover:text-ocean-800 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              My Posts ({myPosts.totalPosts})
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSaveDraft()}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{saving ? 'Saving...' : 'Save Draft'}</span>
            </button>
            <button
              onClick={handleSubmitForReview}
              disabled={submitting}
              className="flex items-center space-x-2 bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-700 transition-colors disabled:opacity-50"
            >
              {submitting ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{submitting ? 'Submitting...' : 'Submit for Review'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mx-6 mt-4 p-4 rounded-lg flex items-center space-x-3 ${
            message.type === 'error'
              ? 'bg-red-50 border border-red-200 text-red-800'
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

        {/* Tabs */}
        <div className="flex space-x-1 px-6 mt-4">
          {[
            { key: 'write', label: 'Write', icon: Edit3 },
            { key: 'preview', label: 'Preview', icon: Eye },
            { key: 'settings', label: 'Settings', icon: Tag }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-gray-100 text-ocean-600 border-b-2 border-ocean-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'write' && (
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="w-full px-4 py-3 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="Enter an engaging title for your post..."
                />
              </div>

              {/* Image Management */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <div className="border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Images</span>
                    </label>
                    <button
                      onClick={() => {
                        setEditingImage(null)
                        setShowImageEditor(true)
                      }}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Create New Image</span>
                    </button>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                            <button
                              onClick={() => insertImageToContent(image)}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              title="Insert into content"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleImageEdit(image)}
                              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              title="Edit image"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleImageDelete(image.id)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                              title="Delete image"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-lg truncate">
                            {image.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedImages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No images uploaded yet</p>
                      <p className="text-sm">Upload images to enhance your blog post</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Management */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Videos
                </label>
                <div className="border border-gray-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                    >
                      <Video className="h-4 w-4" />
                      <span>Upload Videos</span>
                    </label>
                    <div className="text-sm text-gray-500">
                      Supported formats: MP4, MOV, AVI, WebM (Max: 100MB each)
                    </div>
                  </div>

                  {uploadedVideos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uploadedVideos.map((video) => (
                        <div key={video.id} className="relative group bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Video className="h-8 w-8 text-purple-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {video.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatFileSize(video.size)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {video.type}
                              </p>
                            </div>
                          </div>
                          
                          {/* Video Preview */}
                          <div className="mt-3">
                            <video
                              src={video.url}
                              className="w-full h-24 object-cover rounded border border-gray-200"
                              preload="metadata"
                              controls={false}
                              muted
                            />
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex space-x-1">
                              <button
                                onClick={() => insertVideoToContent(video)}
                                className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title="Insert into content"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleVideoDelete(video.id)}
                                className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                title="Delete video"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-16">
                            <div className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                              <Play className="h-4 w-4 text-white ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {uploadedVideos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No videos uploaded yet</p>
                      <p className="text-sm">Upload videos to enhance your blog post</p>
                      <p className="text-xs mt-2">Tip: Fishing action videos, technique demonstrations, and trip highlights work great!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Formatting tips:</span>
                      <span>**bold**</span>
                      <span>*italic*</span>
                      <span>Double enter for new paragraph</span>
                      <span className="text-blue-600">Click + on images/videos to insert</span>
                    </div>
                  </div>
                  
                  {/* Text Area */}
                  <textarea
                    value={post.content.replace(/<[^>]*>/g, '').replace(/<br>/g, '\n').replace(/<\/p><p>/g, '\n\n')}
                    onChange={handleContentChange}
                    rows={16}
                    className="w-full px-4 py-3 border-0 focus:ring-0 resize-none"
                    placeholder="Start writing your blog post here...

Share your fishing experiences, tips, and techniques with the ASWSC community. Include details about:
- Locations and conditions
- Techniques and tackle used
- Species targeted
- Results and lessons learned

Remember to be descriptive and helpful to fellow anglers!"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt (Optional)
                </label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="Brief description for previews (will be auto-generated if left empty)"
                />
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {/* Preview Header */}
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Preview Mode</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    This is how your post will appear to readers.
                  </p>
                </div>

                {/* Post Preview */}
                <article className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-8">
                    {/* Meta */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${BLOG_CATEGORIES[post.category]?.color}-100 text-${BLOG_CATEGORIES[post.category]?.color}-800`}>
                        {BLOG_CATEGORIES[post.category]?.name}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {post.title || 'Your Post Title'}
                    </h1>

                    {/* Content */}
                    <div 
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: post.content || '<p>Your post content will appear here...</p>' 
                      }}
                    />

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={post.category}
                    onChange={(e) => setPost({ ...post, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  >
                    {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
                      <option key={key} value={key}>
                        {category.name} - {category.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-ocean-100 text-ocean-800 text-sm rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-ocean-600 hover:text-ocean-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addTag(e.target.value)
                        e.target.value = ''
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  >
                    <option value="">Add a tag...</option>
                    {BLOG_TAGS.filter(tag => !post.tags.includes(tag)).map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                {/* SEO Settings */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">SEO Settings (Optional)</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={post.seo.metaTitle}
                        onChange={(e) => setPost({
                          ...post,
                          seo: { ...post.seo, metaTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        placeholder="Leave empty to use post title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        value={post.seo.metaDescription}
                        onChange={(e) => setPost({
                          ...post,
                          seo: { ...post.seo, metaDescription: e.target.value }
                        })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        placeholder="Leave empty to use excerpt"
                      />
                    </div>
                  </div>
                </div>

                {/* Submission Guidelines */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Submission Guidelines</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Posts are reviewed by admins before publication</li>
                    <li>• Focus on fishing-related content relevant to ASWSC members</li>
                    <li>• Include specific details and helpful information</li>
                    <li>• Use appropriate categories and tags</li>
                    <li>• Keep content family-friendly and respectful</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Editor Modal */}
      {showImageEditor && (
        <ImageEditor
          initialImage={editingImage?.url}
          onSave={handleImageSave}
          onClose={() => {
            setShowImageEditor(false)
            setEditingImage(null)
          }}
        />
      )}
    </div>
  )
}

export default BlogEditor
