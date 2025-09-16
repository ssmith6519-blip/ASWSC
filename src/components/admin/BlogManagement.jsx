import React, { useState } from 'react'
import { useBlog, BLOG_CATEGORIES, BLOG_TAGS, BLOG_STATUS } from '../../hooks/useBlog'
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  FileText,
  Settings,
  Bookmark
} from 'lucide-react'

const BlogManagement = () => {
  const {
    posts,
    categories,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPost,
    getStatistics
  } = useBlog()

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPost, setSelectedPost] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: '',
    author: '',
    page: 1
  })
  const [message, setMessage] = useState(null)
  const [editingPost, setEditingPost] = useState(null)

  const stats = getStatistics()
  const filteredPosts = getPosts(filters)

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  // Handle post creation
  const handleCreatePost = () => {
    const newPostData = {
      title: 'New Blog Post',
      content: '<p>Start writing your blog post here...</p>',
      author: 'Admin User',
      category: 'club-news',
      tags: [],
      status: 'draft'
    }

    const result = createPost(newPostData)
    if (result.success) {
      setEditingPost(result.post)
      setShowEditor(true)
      showMessage('New blog post created!', 'success')
    } else {
      showMessage(result.error || 'Failed to create post', 'error')
    }
  }

  // Handle post editing
  const handleEditPost = (post) => {
    setEditingPost({ ...post })
    setShowEditor(true)
  }

  // Handle post saving
  const handleSavePost = () => {
    if (!editingPost) return

    const result = updatePost(editingPost.id, editingPost)
    if (result.success) {
      setShowEditor(false)
      setEditingPost(null)
      showMessage('Blog post saved successfully!', 'success')
    } else {
      showMessage(result.error || 'Failed to save post', 'error')
    }
  }

  // Handle post deletion
  const handleDeletePost = (post) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      const result = deletePost(post.id)
      if (result.success) {
        showMessage('Blog post deleted successfully!', 'success')
      } else {
        showMessage(result.error || 'Failed to delete post', 'error')
      }
    }
  }

  // Handle status change
  const handleStatusChange = (post, newStatus) => {
    const updates = { 
      status: newStatus,
      ...(newStatus === 'published' && !post.publishDate ? { publishDate: new Date().toISOString() } : {})
    }
    
    const result = updatePost(post.id, updates)
    if (result.success) {
      showMessage(`Post ${newStatus} successfully!`, 'success')
    } else {
      showMessage(result.error || 'Failed to update status', 'error')
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    const statusConfig = BLOG_STATUS[status]
    return statusConfig ? statusConfig.color : 'gray'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
        <span className="ml-3 text-gray-600">Loading blog data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <BookOpen className="h-8 w-8 text-ocean-600 mr-3" />
            Blog Management
          </h1>
          <p className="text-gray-600">Create, manage, and publish blog content for the ASWSC community.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreatePost}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
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

      {/* Blog Editor Modal */}
      {showEditor && editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPost.id.startsWith('post_') ? 'Edit Blog Post' : 'New Blog Post'}
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSavePost}
                  className="flex items-center space-x-2 bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    setShowEditor(false)
                    setEditingPost(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                      placeholder="Enter blog post title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                    <textarea
                      value={editingPost.content.replace(/<[^>]*>/g, '')} // Strip HTML for editing
                      onChange={(e) => setEditingPost({ ...editingPost, content: `<p>${e.target.value.replace(/\n/g, '</p><p>')}</p>` })}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                      placeholder="Write your blog post content here..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Rich text editor coming soon. For now, basic HTML formatting is supported.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                      placeholder="Brief description for previews (auto-generated if empty)"
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publishing */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Publishing</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={editingPost.status}
                          onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        >
                          {Object.entries(BLOG_STATUS).map(([key, status]) => (
                            <option key={key} value={key}>{status.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                          type="text"
                          value={editingPost.author}
                          onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={editingPost.featured}
                          onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                          className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                          Featured Post
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Categories & Tags */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Categories & Tags</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={editingPost.category}
                          onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        >
                          {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
                            <option key={key} value={key}>{category.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editingPost.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-ocean-100 text-ocean-800 text-xs rounded-full"
                            >
                              {tag}
                              <button
                                onClick={() => {
                                  const newTags = editingPost.tags.filter((_, i) => i !== index)
                                  setEditingPost({ ...editingPost, tags: newTags })
                                }}
                                className="ml-1 text-ocean-600 hover:text-ocean-800"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <select
                          onChange={(e) => {
                            if (e.target.value && !editingPost.tags.includes(e.target.value)) {
                              setEditingPost({
                                ...editingPost,
                                tags: [...editingPost.tags, e.target.value]
                              })
                            }
                            e.target.value = ''
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        >
                          <option value="">Add a tag...</option>
                          {BLOG_TAGS.filter(tag => !editingPost.tags.includes(tag)).map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SEO */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">SEO Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                        <input
                          type="text"
                          value={editingPost.seo?.metaTitle || editingPost.title}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            seo: { ...editingPost.seo, metaTitle: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                        <textarea
                          value={editingPost.seo?.metaDescription || editingPost.excerpt}
                          onChange={(e) => setEditingPost({
                            ...editingPost,
                            seo: { ...editingPost.seo, metaDescription: e.target.value }
                          })}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'posts', label: 'All Posts', icon: FileText },
          { key: 'categories', label: 'Categories', icon: Bookmark },
          { key: 'settings', label: 'Settings', icon: Settings }
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-gray-600">Total Posts</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                  <p className="text-gray-600">Published</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.submitted}</p>
                  <p className="text-gray-600">Awaiting Review</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                  <p className="text-gray-600">Total Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentPosts.slice(0, 5).map((post) => (
                <div key={post.id} className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishDate || post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusBadgeColor(post.status)}-100 text-${getStatusBadgeColor(post.status)}-800`}>
                      {BLOG_STATUS[post.status]?.name}
                    </span>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                    placeholder="Search posts..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                >
                  <option value="">All Statuses</option>
                  {Object.entries(BLOG_STATUS).map(([key, status]) => (
                    <option key={key} value={key}>{status.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                >
                  <option value="">All Categories</option>
                  {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
                    <option key={key} value={key}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ status: '', category: '', search: '', author: '', page: 1 })}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="divide-y divide-gray-200">
              {filteredPosts.posts.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4">
                    {filters.search || filters.status || filters.category
                      ? 'Try adjusting your filters or create a new post.'
                      : 'Start by creating your first blog post.'
                    }
                  </p>
                  <button
                    onClick={handleCreatePost}
                    className="btn-primary"
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                filteredPosts.posts.map((post) => (
                  <div key={post.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusBadgeColor(post.status)}-100 text-${getStatusBadgeColor(post.status)}-800`}>
                            {BLOG_STATUS[post.status]?.name}
                          </span>
                          {post.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            {BLOG_CATEGORIES[post.category]?.name}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views} views
                          </span>
                          <span className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes} likes
                          </span>
                        </div>

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {post.status === 'submitted' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(post, 'approved')}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(post, 'rejected')}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        
                        {post.status === 'approved' && (
                          <button
                            onClick={() => handleStatusChange(post, 'published')}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Publish"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDeletePost(post)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredPosts.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {(filters.page - 1) * 10 + 1} to {Math.min(filters.page * 10, filteredPosts.totalPosts)} of {filteredPosts.totalPosts} posts
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    disabled={filters.page === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-2 text-sm text-gray-700">
                    Page {filters.page} of {filteredPosts.totalPages}
                  </span>
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    disabled={filters.page === filteredPosts.totalPages}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Blog Categories</h3>
            <p className="text-gray-600 mt-1">Manage blog categories and view post counts.</p>
          </div>
          <div className="divide-y divide-gray-200">
            {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
              <div key={key} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full bg-${category.color}-500`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {stats.categoryCounts[key] || 0} posts
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Settings</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posts Per Page</label>
                <input
                  type="number"
                  defaultValue={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auto-save Interval (seconds)</label>
                <input
                  type="number"
                  defaultValue={30}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="allowComments"
                defaultChecked
                className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
              />
              <label htmlFor="allowComments" className="text-sm text-gray-700">
                Allow comments on blog posts
              </label>
            </div>
            
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="requireApproval"
                defaultChecked
                className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
              />
              <label htmlFor="requireApproval" className="text-sm text-gray-700">
                Require admin approval for member submissions
              </label>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button className="bg-ocean-600 text-white px-6 py-2 rounded-lg hover:bg-ocean-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogManagement
