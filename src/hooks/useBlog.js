import { useState, useEffect } from 'react'

// Blog categories with descriptions
export const BLOG_CATEGORIES = {
  'inshore-fishing': {
    name: 'Inshore Fishing',
    description: 'Nearshore and coastal fishing techniques and locations',
    color: 'blue'
  },
  'offshore-fishing': {
    name: 'Offshore Fishing',
    description: 'Deep sea and blue water fishing adventures',
    color: 'indigo'
  },
  'finding-fish': {
    name: 'Finding Fish',
    description: 'Fish location techniques, electronics, and reading water',
    color: 'green'
  },
  'catching-bait': {
    name: 'Catching Bait',
    description: 'Live bait techniques, cast nets, and bait selection',
    color: 'yellow'
  },
  'trolling': {
    name: 'Trolling',
    description: 'Trolling techniques, spreads, and lure selection',
    color: 'purple'
  },
  'slow-pitch-jigging': {
    name: 'Slow Pitch Jigging',
    description: 'Japanese-style jigging techniques and tackle',
    color: 'pink'
  },
  'species-tips': {
    name: 'Species Specific Tips',
    description: 'Targeted techniques for specific fish species',
    color: 'orange'
  },
  'gear': {
    name: 'Gear & Tackle',
    description: 'Equipment reviews, tackle tips, and gear recommendations',
    color: 'gray'
  },
  'boating-safety': {
    name: 'Boating Safety',
    description: 'Safety tips, weather awareness, and emergency preparedness',
    color: 'red'
  },
  'tournament-prep': {
    name: 'Tournament Prep',
    description: 'Competition strategies and tournament preparation',
    color: 'emerald'
  },
  'conservation': {
    name: 'Conservation',
    description: 'Fish conservation, catch and release, and sustainability',
    color: 'teal'
  },
  'club-news': {
    name: 'Club News',
    description: 'ASWSC updates, member spotlights, and club activities',
    color: 'cyan'
  }
}

// Common blog tags
export const BLOG_TAGS = [
  'beginner-friendly', 'advanced-techniques', 'seasonal-tips', 'gear-review',
  'location-specific', 'tournament-fishing', 'family-fishing', 'conservation',
  'safety', 'electronics', 'bait-rigging', 'weather', 'regulations',
  'boat-maintenance', 'knots-rigging', 'photography', 'cooking-fish',
  'member-spotlight', 'guest-post', 'video-content'
]

// Blog status options
export const BLOG_STATUS = {
  draft: { name: 'Draft', color: 'gray', description: 'Work in progress' },
  submitted: { name: 'Submitted', color: 'yellow', description: 'Awaiting review' },
  approved: { name: 'Approved', color: 'green', description: 'Ready to publish' },
  published: { name: 'Published', color: 'blue', description: 'Live on website' },
  rejected: { name: 'Rejected', color: 'red', description: 'Needs revision' },
  archived: { name: 'Archived', color: 'purple', description: 'No longer active' }
}

// Default blog data structure
const defaultBlogData = {
  posts: [],
  categories: BLOG_CATEGORIES,
  tags: BLOG_TAGS,
  settings: {
    postsPerPage: 10,
    allowComments: true,
    requireApproval: true,
    autoSaveInterval: 30000, // 30 seconds
    maxImageSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    seoDefaults: {
      metaDescription: 'Latest fishing tips and techniques from Atlanta Saltwater Sportsman\'s Club',
      ogImage: '/sailfish-logo.jpg'
    }
  }
}

const STORAGE_KEY = 'aswsc_blog_data'

export const useBlog = () => {
  const [blogData, setBlogData] = useState(defaultBlogData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load blog data from localStorage
  useEffect(() => {
    try {
      console.log('🔄 Loading blog data from localStorage...')
      const storedData = localStorage.getItem(STORAGE_KEY)
      
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        console.log(`✅ Loaded ${parsedData.posts?.length || 0} blog posts from storage`)
        setBlogData({ ...defaultBlogData, ...parsedData })
      } else {
        console.log('📝 No stored blog data found, using defaults')
        // Initialize with sample blog posts
        const samplePosts = createSamplePosts()
        const initialData = { ...defaultBlogData, posts: samplePosts }
        setBlogData(initialData)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
      }
    } catch (err) {
      console.error('❌ Error loading blog data:', err)
      setError('Failed to load blog data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save blog data to localStorage
  const saveBlogData = (newData) => {
    try {
      const dataToSave = {
        ...newData,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      setBlogData(dataToSave)
      console.log('💾 Saved blog data to storage')
      return { success: true }
    } catch (err) {
      console.error('❌ Error saving blog data:', err)
      setError('Failed to save blog data')
      return { success: false, error: err.message }
    }
  }

  // Create new blog post
  const createPost = (postData) => {
    try {
      const newPost = {
        id: generatePostId(),
        title: postData.title || 'Untitled Post',
        slug: generateSlug(postData.title || 'untitled-post'),
        content: postData.content || '',
        excerpt: postData.excerpt || generateExcerpt(postData.content || ''),
        author: postData.author || 'Anonymous',
        authorId: postData.authorId || null,
        category: postData.category || 'club-news',
        tags: postData.tags || [],
        status: postData.status || 'draft',
        featured: postData.featured || false,
        featuredImage: postData.featuredImage || null,
        seo: {
          metaTitle: postData.seo?.metaTitle || postData.title,
          metaDescription: postData.seo?.metaDescription || generateExcerpt(postData.content || ''),
          keywords: postData.seo?.keywords || postData.tags?.join(', ') || ''
        },
        publishDate: postData.publishDate || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        comments: []
      }

      const updatedData = {
        ...blogData,
        posts: [newPost, ...blogData.posts]
      }

      const result = saveBlogData(updatedData)
      if (result.success) {
        console.log('✅ Created new blog post:', newPost.title)
        return { success: true, post: newPost }
      }
      return result
    } catch (err) {
      console.error('❌ Error creating blog post:', err)
      return { success: false, error: err.message }
    }
  }

  // Update existing blog post
  const updatePost = (postId, updates) => {
    try {
      const postIndex = blogData.posts.findIndex(post => post.id === postId)
      if (postIndex === -1) {
        return { success: false, error: 'Post not found' }
      }

      const updatedPost = {
        ...blogData.posts[postIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
        slug: updates.title ? generateSlug(updates.title) : blogData.posts[postIndex].slug,
        excerpt: updates.content ? generateExcerpt(updates.content) : blogData.posts[postIndex].excerpt
      }

      const updatedPosts = [...blogData.posts]
      updatedPosts[postIndex] = updatedPost

      const updatedData = {
        ...blogData,
        posts: updatedPosts
      }

      const result = saveBlogData(updatedData)
      if (result.success) {
        console.log('✅ Updated blog post:', updatedPost.title)
        return { success: true, post: updatedPost }
      }
      return result
    } catch (err) {
      console.error('❌ Error updating blog post:', err)
      return { success: false, error: err.message }
    }
  }

  // Delete blog post
  const deletePost = (postId) => {
    try {
      const postIndex = blogData.posts.findIndex(post => post.id === postId)
      if (postIndex === -1) {
        return { success: false, error: 'Post not found' }
      }

      const postTitle = blogData.posts[postIndex].title
      const updatedPosts = blogData.posts.filter(post => post.id !== postId)

      const updatedData = {
        ...blogData,
        posts: updatedPosts
      }

      const result = saveBlogData(updatedData)
      if (result.success) {
        console.log('✅ Deleted blog post:', postTitle)
        return { success: true }
      }
      return result
    } catch (err) {
      console.error('❌ Error deleting blog post:', err)
      return { success: false, error: err.message }
    }
  }

  // Get posts with filtering and pagination
  const getPosts = (filters = {}) => {
    let filteredPosts = [...blogData.posts]

    // Filter by status
    if (filters.status) {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status)
    }

    // Filter by category
    if (filters.category) {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category)
    }

    // Filter by tag
    if (filters.tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(filters.tag))
    }

    // Filter by author
    if (filters.authorId) {
      filteredPosts = filteredPosts.filter(post => post.authorId === filters.authorId)
    }

    // Search in title and content
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
      )
    }

    // Sort posts
    const sortBy = filters.sortBy || 'createdAt'
    const sortOrder = filters.sortOrder || 'desc'
    
    filteredPosts.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'publishDate') {
        aValue = new Date(aValue || 0)
        bValue = new Date(bValue || 0)
      }
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1
      } else {
        return aValue > bValue ? 1 : -1
      }
    })

    // Pagination
    const page = filters.page || 1
    const perPage = filters.perPage || blogData.settings.postsPerPage
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    return {
      posts: filteredPosts.slice(startIndex, endIndex),
      totalPosts: filteredPosts.length,
      totalPages: Math.ceil(filteredPosts.length / perPage),
      currentPage: page,
      hasMore: endIndex < filteredPosts.length
    }
  }

  // Get single post by ID or slug
  const getPost = (identifier) => {
    return blogData.posts.find(post => 
      post.id === identifier || post.slug === identifier
    )
  }

  // Get blog statistics
  const getStatistics = () => {
    const posts = blogData.posts
    return {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      submitted: posts.filter(p => p.status === 'submitted').length,
      approved: posts.filter(p => p.status === 'approved').length,
      rejected: posts.filter(p => p.status === 'rejected').length,
      totalViews: posts.reduce((sum, post) => sum + (post.views || 0), 0),
      totalLikes: posts.reduce((sum, post) => sum + (post.likes || 0), 0),
      categoryCounts: Object.keys(BLOG_CATEGORIES).reduce((counts, category) => {
        counts[category] = posts.filter(p => p.category === category).length
        return counts
      }, {}),
      recentPosts: posts
        .filter(p => p.status === 'published')
        .sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt))
        .slice(0, 5)
    }
  }

  // Utility functions
  const generatePostId = () => {
    return 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const generateExcerpt = (content, maxLength = 160) => {
    const textContent = content.replace(/<[^>]*>/g, '') // Strip HTML
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent
  }

  // Reset blog data
  const resetBlogData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setBlogData(defaultBlogData)
      console.log('🔄 Reset blog data to defaults')
      return { success: true }
    } catch (err) {
      console.error('❌ Error resetting blog data:', err)
      return { success: false, error: err.message }
    }
  }

  return {
    blogData,
    posts: blogData.posts,
    categories: blogData.categories,
    tags: blogData.tags,
    settings: blogData.settings,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPost,
    getStatistics,
    saveBlogData,
    resetBlogData
  }
}

// Create sample blog posts for initial setup
const createSamplePosts = () => {
  return [
    {
      id: 'sample_001',
      title: 'Essential Inshore Fishing Techniques for Georgia Waters',
      slug: 'essential-inshore-fishing-techniques-georgia-waters',
      content: `<p>Georgia's inshore waters offer some of the best fishing opportunities on the East Coast. From the marshes of Savannah to the sounds around Brunswick, understanding these waters is key to consistent success.</p>

<h2>Understanding Tidal Movement</h2>
<p>Tidal flow is the lifeblood of inshore fishing. Fish use these currents to feed, and understanding when and where to fish based on tidal movement can make or break your day.</p>

<h2>Key Species and Techniques</h2>
<ul>
<li><strong>Redfish:</strong> Target oyster bars and grass flats during moving water</li>
<li><strong>Trout:</strong> Focus on drop-offs and channel edges</li>
<li><strong>Flounder:</strong> Work sandy bottoms near structure</li>
</ul>

<p>Remember, patience and persistence are your best tools. The fish are there - it's just a matter of presenting the right bait at the right time.</p>`,
      excerpt: 'Georgia\'s inshore waters offer some of the best fishing opportunities on the East Coast. Learn essential techniques for success.',
      author: 'Captain Mike Johnson',
      authorId: 'member_001',
      category: 'inshore-fishing',
      tags: ['beginner-friendly', 'georgia-waters', 'redfish', 'trout'],
      status: 'published',
      featured: true,
        featuredImage: '/blog/inshore-fishing.jpg',
        images: [],
        videos: [],
        publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        views: 245,
        likes: 18,
        comments: []
    },
    {
      id: 'sample_002',
      title: 'Slow Pitch Jigging: A Game-Changing Technique',
      slug: 'slow-pitch-jigging-game-changing-technique',
      content: `<p>Slow pitch jigging has revolutionized bottom fishing, offering an incredibly effective way to target a wide variety of species in deeper water.</p>

<h2>What Makes It Different</h2>
<p>Unlike traditional jigging, slow pitch jigging uses lighter tackle and a more finesse approach. The jig falls naturally, mimicking injured baitfish.</p>

<h2>Essential Gear</h2>
<ul>
<li>Specialized slow pitch rods (6'6" to 7' medium action)</li>
<li>High-speed conventional reels</li>
<li>Proper slow pitch jigs (60-200g depending on depth)</li>
</ul>

<p>The technique requires patience and feel, but once mastered, it's incredibly productive for grouper, snapper, and amberjack.</p>`,
      excerpt: 'Slow pitch jigging has revolutionized bottom fishing. Learn this game-changing technique for deeper water success.',
      author: 'Sarah Chen',
      authorId: 'member_002',
      category: 'slow-pitch-jigging',
      tags: ['advanced-techniques', 'offshore-fishing', 'gear-review'],
      status: 'published',
        featured: false,
        featuredImage: '/blog/slow-pitch-jigging.jpg',
        images: [],
        videos: [],
        publishDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        views: 189,
        likes: 24,
        comments: []
    },
    {
      id: 'sample_003',
      title: 'Safety First: Essential Boating Safety Tips',
      slug: 'safety-first-essential-boating-safety-tips',
      content: `<p>Safety should always be your top priority when heading offshore. Proper preparation and equipment can mean the difference between a great day and a dangerous situation.</p>

<h2>Pre-Trip Checklist</h2>
<ul>
<li>Check weather conditions and marine forecast</li>
<li>Inspect all safety equipment</li>
<li>File a float plan with someone on shore</li>
<li>Ensure communication devices are working</li>
</ul>

<h2>Essential Safety Equipment</h2>
<p>Beyond the Coast Guard requirements, consider adding:</p>
<ul>
<li>EPIRB or PLB for offshore trips</li>
<li>First aid kit with marine-specific supplies</li>
<li>Emergency food and water</li>
<li>Signaling devices (flares, mirror, whistle)</li>
</ul>`,
      excerpt: 'Safety should always be your top priority when heading offshore. Learn essential preparation and equipment tips.',
      author: 'Captain Tom Rodriguez',
      authorId: 'member_003',
      category: 'boating-safety',
      tags: ['safety', 'offshore-fishing', 'beginner-friendly'],
      status: 'submitted',
        featured: false,
        featuredImage: '/blog/boating-safety.jpg',
        images: [],
        videos: [],
        publishDate: null,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        views: 0,
        likes: 0,
        comments: []
    }
  ]
}

export default useBlog
