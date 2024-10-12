import React, { useState, useEffect } from 'react'
import { Music, PlayCircle, PauseCircle, SkipForward, SkipBack, Mic2, List, Settings, Moon, Sun } from 'lucide-react'

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [queue, setQueue] = useState([])

  useEffect(() => {
    fetchCurrentTrack()
    fetchQueue()
  }, [])

  const fetchCurrentTrack = async () => {
    const response = await fetch('/api/current-track')
    const data = await response.json()
    setCurrentTrack(data)
    setIsPlaying(data.isPlaying)
  }

  const fetchQueue = async () => {
    const response = await fetch('/api/queue')
    const data = await response.json()
    setQueue(data)
  }

  const handlePlayPause = async () => {
    await fetch('/api/play-pause', { method: 'POST' })
    setIsPlaying(!isPlaying)
  }

  const handleSkip = async () => {
    await fetch('/api/skip', { method: 'POST' })
    fetchCurrentTrack()
  }

  const handlePrevious = async () => {
    await fetch('/api/previous', { method: 'POST' })
    fetchCurrentTrack()
  }

  const handleAddTrack = async () => {
    const url = prompt('Enter YouTube URL or playlist URL:')
    if (url) {
      await fetch('/api/add-track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      fetchQueue()
    }
  }

  // ... (rest of the component code remains the same)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0D0D0D] text-[#F5F3E7]' : 'bg-[#F5F3E7] text-[#4A2C2A]'}`}>
      {/* ... (existing JSX) */}
      <div className="mt-4 flex justify-center space-x-4">
        <button className="p-2 rounded-full bg-[#4A2C2A] text-[#F5F3E7]" onClick={handlePrevious}>
          <SkipBack size={24} />
        </button>
        <button
          className="p-2 rounded-full bg-[#4A2C2A] text-[#F5F3E7]"
          onClick={handlePlayPause}
        >
          {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
        </button>
        <button className="p-2 rounded-full bg-[#4A2C2A] text-[#F5F3E7]" onClick={handleSkip}>
          <SkipForward size={24} />
        </button>
      </div>
      {/* ... (rest of the JSX) */}
      <button onClick={handleAddTrack} className={`mt-4 px-4 py-2 rounded ${darkMode ? 'bg-[#D4AF37] text-[#0D0D0D]' : 'bg-[#2E5230] text-[#F5F3E7]'}`}>
        Add Track or Playlist
      </button>
      {/* ... (rest of the JSX) */}
    </div>
  )
}

