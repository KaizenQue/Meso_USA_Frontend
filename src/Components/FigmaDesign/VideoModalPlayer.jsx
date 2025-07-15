"use client"

import { useState, useRef, useEffect } from "react"
import { Button, TextField } from "@mui/material"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import v1 from "../../assets/v4.mp4"
import v2 from "../../assets/v2.mp4"
import v3 from "../../assets/v3.mp4"

export default function VideoModalPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [modalTransition, setModalTransition] = useState(false)
  const [videoTransition, setVideoTransition] = useState(false)
  const mainVideoRef = useRef(null)
  const backgroundVideoRef = useRef(null)
  const [startExperience, setStartExperience] = useState(false)

  // Video sources
  const videos = [v1, v2, v3]

  useEffect(() => {
    const video = mainVideoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      // No longer show modal on v1 end, handled by timer
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("ended", handleVideoEnd)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("ended", handleVideoEnd)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [currentVideoIndex])

  const handlePlayPause = () => {
    const video = mainVideoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  const handleMuteToggle = () => {
    const video = mainVideoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setModalTransition(false)
    setTimeout(() => {
      setShowModal(false)
      setCurrentVideoIndex(2)
      setVideoTransition(true)
      // Stop background video
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.pause()
        backgroundVideoRef.current.currentTime = 0
      }
      setTimeout(() => {
        setVideoTransition(false)
        if (mainVideoRef.current) {
          mainVideoRef.current.play()
        }
      }, 700)
    }, 700)
  }

  const handleVideoStart = () => {
    if (mainVideoRef.current) {
      mainVideoRef.current.play()
    }
    setIsPlaying(true)
    setStartExperience(true)
    setTimeout(() => {
      setShowModal(true)
      setTimeout(() => setModalTransition(true), 50)
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.play()
      }
    }, 3000)
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Main Video Container */}
      <div className="relative w-full h-full">
        <video
          ref={mainVideoRef}
          className={`w-full h-full object-cover transition-opacity duration-700 ${videoTransition ? 'opacity-0' : 'opacity-100'}`}
          src={videos[currentVideoIndex]}
          muted={isMuted}
          playsInline
        />

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0"
                onClick={handleMuteToggle}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Start Button for Initial Play */}
        {currentVideoIndex === 0 && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={handleVideoStart}
            >
              <Play className="w-6 h-6 mr-2" />
              Start Experience
            </Button>
          </div>
        )}
      </div>

      {/* Background Video (plays behind modal) */}
      <video
        ref={backgroundVideoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
          showModal ? "opacity-100 blur-md" : "opacity-0 pointer-events-none blur-0"
        }`}
        src={videos[1]}
        loop
        muted
        playsInline
        style={{ zIndex: 20 }}
      />

      {/* Glass Modal with Form */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ease-out ${
          showModal ? (modalTransition ? "opacity-100 backdrop-blur-md bg-black/20" : "opacity-0 backdrop-blur-none") : "opacity-0 pointer-events-none backdrop-blur-none"
        }`}
        style={{ pointerEvents: showModal ? 'auto' : 'none' }}
      >
        <div
          className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 max-w-md md:max-w-lg w-full mx-4 shadow-2xl transition-all duration-700 ease-out ${
            modalTransition ? "scale-100 translate-y-0" : "scale-75 translate-y-8"
          }`}
        >
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl" />

          {/* Content */}
          <div className="relative z-10 text-center text-white">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Ready for Next?
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {"You've completed the first part of your journey. Fill the form to continue to the next experience."}
              </p>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <TextField
                fullWidth
                variant="filled"
                label="Name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                InputProps={{ style: { color: 'white', background: 'rgba(255,255,255,0.1)' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                InputProps={{ style: { color: 'white', background: 'rgba(255,255,255,0.1)' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                required
              />
              <TextField
                fullWidth
                variant="filled"
                label="Message"
                name="message"
                multiline
                minRows={2}
                value={form.message}
                onChange={handleFormChange}
                InputProps={{ style: { color: 'white', background: 'rgba(255,255,255,0.1)' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 hover:from-blue-600/90 hover:to-purple-700/90 text-white border-0 py-3 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                Submit & Continue
              </Button>
            </form>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Loading indicator for video transitions */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
          currentVideoIndex === 2 && !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm">Loading next experience...</p>
        </div>
      </div>
    </div>
  )
}
