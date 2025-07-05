"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Play, Pause, Loader2 } from "lucide-react"
import Img from '../assets/MesoFD23.jpg'

export default function VoiceNoteForm() {
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneOtp, setPhoneOtp] = useState("")
  const [email, setEmail] = useState("")
  const [emailOtp, setEmailOtp] = useState("")
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const verifyPhone = () => {
    if (!phoneNumber) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1000)
  }

  const verifyPhoneOtp = () => {
    if (phoneOtp !== "1234") return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 1000)
  }

  const verifyEmail = () => {
    if (!email) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(4)
    }, 1000)
  }

  const verifyEmailOtp = () => {
    if (emailOtp !== "1234") return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(5)
    }, 1000)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSubmit = () => {
    alert("Form submitted successfully!")
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 z-10" />
          <img
            src={Img}
            alt="Authentication"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center text-white p-8"
          >
            <h1 className="text-4xl font-bold mb-4">Fill the Form</h1>
            <p className="text-xl max-w-md">Complete your verification to access your account.</p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md p-8 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Account Verification</h2>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  onClick={verifyPhone}
                  disabled={isLoading || !phoneNumber}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : "Verify Phone Number"}
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="phoneOtp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="phoneOtp" className="block text-sm font-medium">Phone OTP</label>
                  <input
                    id="phoneOtp"
                    type="text"
                    placeholder="Enter OTP sent to your phone"
                    value={phoneOtp}
                    onChange={(e) => setPhoneOtp(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500">Use 1234 for testing</p>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  onClick={verifyPhoneOtp}
                  disabled={isLoading || phoneOtp !== "1234"}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : "Verify OTP"}
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  onClick={verifyEmail}
                  disabled={isLoading || !email}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : "Verify Email"}
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="emailOtp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="emailOtp" className="block text-sm font-medium">Email OTP</label>
                  <input
                    id="emailOtp"
                    type="text"
                    placeholder="Enter OTP sent to your email"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500">Use 1234 for testing</p>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  onClick={verifyEmailOtp}
                  disabled={isLoading || emailOtp !== "1234"}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> : "Verify OTP"}
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dob" className="block text-sm font-medium">Date of Birth</label>
                    <input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium">Voice Verification</label>
                  <div className="flex flex-col items-center space-y-4">
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-colors ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"
                        }`}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      <Mic className="h-8 w-8 text-white" />
                    </motion.div>
                    <p className="text-sm text-center text-gray-500">
                      {isRecording ? "Recording... Tap to stop" : "Tap to record your voice"}
                    </p>
                  </div>

                  {audioBlob && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 p-3 bg-gray-100 rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Voice Preview</p>
                        <button
                          className="p-2 hover:bg-gray-200 rounded-full"
                          onClick={togglePlayback}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                      </div>
                      <audio
                        ref={audioRef}
                        src={URL.createObjectURL(audioBlob)}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    </motion.div>
                  )}
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={!name || !dob}
                >
                  Complete Verification
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
