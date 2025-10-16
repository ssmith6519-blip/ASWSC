import React, { useState, useRef, useEffect } from 'react'
import {
  Upload,
  Download,
  Undo,
  Redo,
  Trash2,
  Type,
  Circle,
  Square,
  Minus,
  Edit3,
  Palette,
  Save,
  X,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move
} from 'lucide-react'

const ImageEditor = ({ onSave, onClose, initialImage = null }) => {
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState('pen') // pen, line, rectangle, circle, text, move
  const [color, setColor] = useState('#ff0000')
  const [lineWidth, setLineWidth] = useState(3)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 })
  const [textInput, setTextInput] = useState({ show: false, x: 0, y: 0, text: '' })

  // Drawing state
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 })
  const [currentPath, setCurrentPath] = useState([])

  const tools = [
    { id: 'pen', icon: Edit3, label: 'Pen' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'move', icon: Move, label: 'Move' }
  ]

  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#000000', '#ffffff', '#808080', '#800000', '#008000', '#000080',
    '#808000', '#800080', '#008080', '#ffa500', '#ffc0cb', '#a52a2a'
  ]

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // Load initial image if provided
    if (initialImage) {
      loadImageFromUrl(initialImage)
    } else {
      // Set default canvas size
      canvas.width = 800
      canvas.height = 600
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      saveToHistory()
    }
  }, [initialImage])

  // Load image from URL or file
  const loadImageFromUrl = (url) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      setImage(img)
      saveToHistory()
    }
    img.src = url
  }

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        loadImageFromUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Save current state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current
    const imageData = canvas.toDataURL()
    
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Undo/Redo functionality
  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      
      setHistoryIndex(historyIndex - 1)
      img.src = history[historyIndex - 1]
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      
      setHistoryIndex(historyIndex + 1)
      img.src = history[historyIndex + 1]
    }
  }

  // Get mouse position relative to canvas
  const getMousePos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left - pan.x) / zoom,
      y: (e.clientY - rect.top - pan.y) / zoom
    }
  }

  // Drawing event handlers
  const startDrawing = (e) => {
    const pos = getMousePos(e)
    
    if (tool === 'move') {
      setIsPanning(true)
      setLastPanPoint({ x: e.clientX, y: e.clientY })
      return
    }

    if (tool === 'text') {
      setTextInput({ show: true, x: pos.x, y: pos.y, text: '' })
      return
    }

    setIsDrawing(true)
    setStartPoint(pos)
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    
    if (tool === 'pen') {
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
      setCurrentPath([pos])
    }
  }

  const draw = (e) => {
    if (isPanning && tool === 'move') {
      const deltaX = e.clientX - lastPanPoint.x
      const deltaY = e.clientY - lastPanPoint.y
      
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      
      setLastPanPoint({ x: e.clientX, y: e.clientY })
      return
    }

    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getMousePos(e)
    
    if (tool === 'pen') {
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      setCurrentPath(prev => [...prev, pos])
    }
  }

  const stopDrawing = (e) => {
    if (isPanning) {
      setIsPanning(false)
      return
    }

    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getMousePos(e)
    
    if (tool === 'line') {
      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    } else if (tool === 'rectangle') {
      const width = pos.x - startPoint.x
      const height = pos.y - startPoint.y
      ctx.strokeRect(startPoint.x, startPoint.y, width, height)
    } else if (tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(pos.x - startPoint.x, 2) + Math.pow(pos.y - startPoint.y, 2)
      )
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
      ctx.stroke()
    }
    
    setIsDrawing(false)
    setCurrentPath([])
    saveToHistory()
  }

  // Handle text input
  const handleTextSubmit = () => {
    if (textInput.text.trim()) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      ctx.fillStyle = color
      ctx.font = `${lineWidth * 6}px Arial`
      ctx.fillText(textInput.text, textInput.x, textInput.y)
      
      saveToHistory()
    }
    
    setTextInput({ show: false, x: 0, y: 0, text: '' })
  }

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (image) {
      ctx.drawImage(image, 0, 0)
    }
    
    saveToHistory()
  }

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1))
  }

  // Save and export
  const handleSave = () => {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL('image/png')
    onSave(dataUrl)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'edited-image.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Image Editor</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-gray-800 text-white p-4 flex flex-wrap items-center gap-4">
        {/* File Operations */}
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        </div>

        {/* History Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            title="Clear"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Drawing Tools */}
        <div className="flex items-center space-x-2">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`p-2 rounded-lg transition-colors ${
                tool === t.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
              title={t.label}
            >
              <t.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Line Width */}
        <div className="flex items-center space-x-2">
          <label className="text-sm">Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-sm w-6">{lineWidth}</span>
        </div>

        {/* Colors */}
        <div className="flex items-center space-x-2">
          <Palette className="h-4 w-4" />
          <div className="flex space-x-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded border-2 transition-all ${
                  color === c ? 'border-white scale-110' : 'border-gray-400'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded border border-gray-400"
          />
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden bg-gray-700 relative">
        <div
          className="w-full h-full overflow-auto"
          style={{
            cursor: tool === 'move' ? 'grab' : 'crosshair'
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border border-gray-500 bg-white"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: '0 0'
            }}
          />
        </div>

        {/* Text Input Modal */}
        {textInput.show && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h4 className="text-lg font-semibold mb-4">Add Text</h4>
              <input
                type="text"
                value={textInput.text}
                onChange={(e) => setTextInput(prev => ({ ...prev, text: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter text..."
                autoFocus
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleTextSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Text
                </button>
                <button
                  onClick={() => setTextInput({ show: false, x: 0, y: 0, text: '' })}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 text-white p-2 text-sm flex items-center justify-between">
        <div>
          Tool: <span className="font-semibold">{tools.find(t => t.id === tool)?.label}</span>
          {canvasRef.current && (
            <span className="ml-4">
              Canvas: {canvasRef.current.width} × {canvasRef.current.height}
            </span>
          )}
        </div>
        <div>
          <span className="text-gray-400">
            Click and drag to draw • Use mouse wheel to zoom • Right-click for context menu
          </span>
        </div>
      </div>
    </div>
  )
}

export default ImageEditor


