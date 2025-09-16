import React, { useState, useEffect } from 'react'
import { useBlog, BLOG_CATEGORIES } from '../hooks/useBlog'
import {
  BookOpen,
  Calendar,
  User,
  Tag,
  Eye,
  ThumbsUp,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Bookmark,
  Share2,
  ArrowLeft,
  Heart,
  MessageCircle
} from 'lucide-react'

const Blog = () => {
  const { getPosts, getPost, getStatistics, loading, error } = useBlog()
  const [view, setView] = useState('list') // 'list', 'post'
  const [selectedPost, setSelectedPost] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    page: 1
  })
  const [featuredPosts, setFeaturedPosts] = useState([])

  const stats = getStatistics()
  const publishedPosts = getPosts({ 
    status: 'published', 
    ...filters,
    sortBy: 'publishDate',
    sortOrder: 'desc'
  })

  // Get featured posts
  useEffect(() => {
    const featured = getPosts({ 
      status: 'published', 
      sortBy: 'publishDate',
      sortOrder: 'desc',
      perPage: 3
    }).posts.filter(post => post.featured)
    setFeaturedPosts(featured)
  }, [])

  // Handle post selection
  const handlePostClick = (post) => {
    setSelectedPost(post)
    setView('post')
    // Simulate view increment (in real app, this would be an API call)
    post.views = (post.views || 0) + 1
  }

  // Handle back to list
  const handleBackToList = () => {
    setView('list')
    setSelectedPost(null)
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get reading time estimate
  const getReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(' ').length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  if (loading) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
            <span className="ml-3 text-gray-600">Loading blog posts...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load blog posts</h3>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    )
  }

  // Single Post View
  if (view === 'post' && selectedPost) {
    return (
      <div className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBackToList}
              className="flex items-center text-ocean-600 hover:text-ocean-800 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
          </div>

          {/* Post Header */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {selectedPost.featuredImage && (
              <div className="h-64 md:h-96 bg-gray-200 relative">
                <img
                  src={selectedPost.featuredImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.style.height = '0'
                  }}
                />
              </div>
            )}

            <div className="p-8">
              {/* Post Meta */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(selectedPost.publishDate || selectedPost.createdAt)}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {getReadingTime(selectedPost.content)}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {selectedPost.views} views
                </span>
              </div>

              {/* Category & Tags */}
              <div className="flex items-center space-x-4 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-${BLOG_CATEGORIES[selectedPost.category]?.color}-100 text-${BLOG_CATEGORIES[selectedPost.category]?.color}-800`}>
                  <Tag className="h-4 w-4 mr-1" />
                  {BLOG_CATEGORIES[selectedPost.category]?.name}
                </span>
                {selectedPost.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {selectedPost.title}
              </h1>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              {/* Media Gallery */}
              {((selectedPost.images && selectedPost.images.length > 0) || (selectedPost.videos && selectedPost.videos.length > 0)) && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Media Gallery</h4>
                  
                  {/* Images Gallery */}
                  {selectedPost.images && selectedPost.images.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-md font-medium text-gray-700 mb-3">Images</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedPost.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={image.name || `Gallery image ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                              onClick={() => {
                                // Open image in modal or new tab
                                window.open(image.url, '_blank')
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Videos Gallery */}
                  {selectedPost.videos && selectedPost.videos.length > 0 && (
                    <div>
                      <h5 className="text-md font-medium text-gray-700 mb-3">Videos</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedPost.videos.map((video, index) => (
                          <div key={index} className="relative group">
                            <video
                              src={video.url}
                              className="w-full h-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                              controls
                              preload="metadata"
                            >
                              Your browser does not support the video tag.
                            </video>
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {video.name || `Video ${index + 1}`}
                              </p>
                              {video.size && (
                                <p className="text-xs text-gray-500">
                                  {(video.size / (1024 * 1024)).toFixed(1)} MB
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              {selectedPost.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                        onClick={() => {
                          setFilters({ ...filters, search: tag, page: 1 })
                          handleBackToList()
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Heart className="h-5 w-5" />
                    <span>{selectedPost.likes} likes</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>Comments</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-ocean-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publishedPosts.posts
                .filter(post => 
                  post.id !== selectedPost.id && 
                  (post.category === selectedPost.category || 
                   post.tags.some(tag => selectedPost.tags.includes(tag)))
                )
                .slice(0, 2)
                .map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post)}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${BLOG_CATEGORIES[post.category]?.color}-100 text-${BLOG_CATEGORIES[post.category]?.color}-800`}>
                        {BLOG_CATEGORIES[post.category]?.name}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                      <span>{formatDate(post.publishDate || post.createdAt)}</span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Blog List View
  return (
    <div className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            ASWSC <span className="text-ocean-600">Blog</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the latest fishing tips, techniques, and stories from the Atlanta Saltwater Sportsman's Club community.
          </p>
          <div className="w-24 h-1 bg-ocean-600 mx-auto mb-8"></div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  {post.featuredImage && (
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.style.height = '0'
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${BLOG_CATEGORIES[post.category]?.color}-100 text-${BLOG_CATEGORIES[post.category]?.color}-800`}>
                        {BLOG_CATEGORIES[post.category]?.name}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.publishDate || post.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Posts</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  placeholder="Search by title, content, or tags..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
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
                onClick={() => setFilters({ category: '', search: '', page: 1 })}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {publishedPosts.posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {filters.search || filters.category
                ? 'Try adjusting your filters to find more posts.'
                : 'Check back soon for new blog posts!'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.posts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  {post.featuredImage && (
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.parentElement.style.height = '0'
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${BLOG_CATEGORIES[post.category]?.color}-100 text-${BLOG_CATEGORIES[post.category]?.color}-800`}>
                        {BLOG_CATEGORIES[post.category]?.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getReadingTime(post.content)}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-ocean-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.publishDate || post.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                    </div>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button className="text-ocean-600 hover:text-ocean-800 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                        Read More
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {publishedPosts.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                    disabled={filters.page === 1}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: publishedPosts.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setFilters({ ...filters, page })}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          filters.page === page
                            ? 'bg-ocean-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                    disabled={filters.page === publishedPosts.totalPages}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Blog Stats */}
        <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Blog Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-ocean-600">{stats.published}</div>
              <div className="text-sm text-gray-600">Published Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ocean-600">{stats.totalViews}</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ocean-600">{stats.totalLikes}</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-ocean-600">{Object.keys(BLOG_CATEGORIES).length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
