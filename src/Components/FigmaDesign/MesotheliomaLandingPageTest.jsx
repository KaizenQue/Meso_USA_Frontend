"use client"

import { useState, useRef, useCallback } from "react"
import { ArrowLeft, Play, Pause, Square, Video} from "lucide-react"
import {
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import logo from "../../assets/MesoLogoWhite.png";
import { sendMesotheliomaLandingPageEmail } from "../../utils/emailService";

export default function MesotheliomaLandingPageTest() {
  const [currentState, setCurrentState] = useState("form")
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null)
  const [videoBlob, setVideoBlob] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    alternateNumber: "",
    email: "",
    streetAddress: "",
  })

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const startCaseReview = () => {
    console.log('Form Data:', formData)
    setCurrentState("recording")
  }

  const backToForm = () => {
    setCurrentState("form")
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
  }

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        setRecordedVideoUrl(url)
        setVideoBlob(blob)
        setCurrentState("preview")

        // Stop the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please ensure you have granted camera permissions.")
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }, [isRecording])

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSubmitCaseReview = async () => {
    if (!videoBlob) {
      alert('No video recorded.');
      return;
    }
    // Use phone number as filename, digits only
    let phone = formData.phone || '';
    phone = phone.replace(/\D/g, '');
    if (!phone) phone = 'unknown';
    const formDataObj = new FormData();
    formDataObj.append('video', videoBlob, `${phone}.webm`);
    try {
      const response = await fetch('https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/upload', {
        method: 'POST',
        body: formDataObj,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      console.log('Uploaded URL:', data.url);
      console.log('Uploaded filename:', data.filename);
      let filename = data.filename || data.url?.split('/').pop() || `${Date.now()}-${phone}.webm`;
      const videoUrl = `https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/videos/${filename}`;
      const getResp = await fetch(videoUrl);
      if (getResp.ok) {
        console.log('Video uploaded and accessible at: ' + videoUrl);
        
        try {
          const emailResult = await sendMesotheliomaLandingPageEmail(formData, videoUrl);
          if (emailResult.success) {
            console.log('Email sent successfully with video URL');
          } else {
            console.error('Failed to send email:', emailResult.error);
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }
        
      } else {
        console.log('Video uploaded, but could not retrieve video link.');
        try {
          const emailResult = await sendMesotheliomaLandingPageEmail(formData);
          if (emailResult.success) {
            console.log('Email sent successfully (without video URL)');
          } else {
            console.error('Failed to send email:', emailResult.error);
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }
      }
      setCurrentState("thankyou");
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed');
    }
  };

  const renderForm = () => (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Book your Free Consultation</h2>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <TextField
              id="firstName"
              label="First Name *"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
              fullWidth
              size="small"
              margin="dense"
            />
            <TextField
              id="lastName"
              label="Last Name *"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
              fullWidth
              size="small"
              margin="dense"
            />
          </div>

          <TextField
            id="phone"
            label="Phone Number * (e.g., (333) 444-5555)"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            fullWidth
            size="small"
            margin="dense"
          />

          <TextField
            id="alternateNumber"
            label="Alternate Number (e.g., (333) 444-5555)"
            type="tel"
            value={formData.alternateNumber}
            onChange={(e) => handleInputChange("alternateNumber", e.target.value)}
            fullWidth
            size="small"
            margin="dense"
          />

          <TextField
            id="email"
            label="Email Address *"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            fullWidth
            size="small"
            margin="dense"
          />

          <TextField
            id="streetAddress"
            label="Street Address *"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            required
            fullWidth
            size="small"
            margin="dense"
          />
          <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent1"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-white text-purple-800 focus:ring-0 focus:ring-offset-0"
                />
                <span className="block text-xs sm:text-sm">
                  I agree to the{" "}
                  <a
                    href="/PrivacyPolicy"
                    className="underline hover:text-blue-200"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/Disclaimer"
                    className="underline hover:text-blue-200"
                  >
                    disclaimer
                  </a>
                  &nbsp; and give my express written consent, affiliates and/or
                  lawyer to contact me at the number provided above, even if
                  this number is a wireless number or if I am presently listed
                  on a "Do Not Call" list. I understand that I may be contacted
                  by telephone, email, text message or mail regarding case
                  options and that I may be called using automatic dialing
                  equipment. Message and data rates may apply. My consent does
                  not require purchase. This is legal advertising.
                </span>
                <span> </span>
              </div>
          <Button
            type="button"
            onClick={startCaseReview}
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#C49A6C', '&:hover': { backgroundColor: '#b88a5a' }, color: '#fff', py: 1.5, fontWeight: 600, borderRadius: 2 }}
          >
            Start My Case Review
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  const renderRecording = () => (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={backToForm} className="p-1 hover:bg-gray-100" sx={{ color: '#C49A6C', '&:hover': { backgroundColor: '#f5e7d6' } }}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="ml-2 text-sm text-gray-600">Back to Form</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Record a Short video</h2>
          <p className="text-sm text-gray-600">
            Please record a short video telling us about your case. This helps us better understand your situation.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
          </div>

          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-white text-sm font-medium">Recording...</span>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              variant="contained"
              sx={{ backgroundColor: '#C49A6C', '&:hover': { backgroundColor: '#b88a5a' }, color: '#fff', px: 4, py: 1.5, fontWeight: 600, borderRadius: 2, display: 'flex', alignItems: 'center' }}
            >
              <Video className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="contained"
              color="error"
              sx={{ px: 4, py: 1.5, fontWeight: 600, borderRadius: 2, display: 'flex', alignItems: 'center' }}
            >
              <Square className="w-5 h-5 mr-2" />
              Stop Recording
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderPreview = () => (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentState("recording")}
            className="p-1 hover:bg-gray-100"
            sx={{ color: '#C49A6C', '&:hover': { backgroundColor: '#f5e7d6' } }}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="ml-2 text-sm text-gray-600">Back to Recording</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Video Preview</h2>
          <p className="text-sm text-gray-600">
            Review your recorded video. You can re-record if needed or submit your case review.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={recordedVideoUrl || undefined}
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              controls
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={togglePlayback}
              variant="contained"
              color="inherit"
              sx={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#222', borderRadius: '50%', p: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' } }}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            onClick={handleSubmitCaseReview}
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#C49A6C', '&:hover': { backgroundColor: '#b88a5a' }, color: '#fff', py: 1.5, fontWeight: 600, borderRadius: 2 }}
          >
            Submit Case Review
          </Button>

          <Button
            onClick={() => setCurrentState("recording")}
            fullWidth
            variant="outlined"
            sx={{ color: '#C49A6C', borderColor: '#C49A6C', '&:hover': { backgroundColor: '#f5e7d6', borderColor: '#b88a5a', color: '#b88a5a' }, py: 1.5, fontWeight: 600, borderRadius: 2 }}
          >
            Record Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderThankYou = () => (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Thank you for
          <br />
          Submitting the form
        </h2>

        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 16l2 2 4-4"
                className="text-green-500"
                stroke="currentColor"
              />
            </svg>
          </div>
        </div>

        <Button
          onClick={() => {
            setCurrentState("form")
            setRecordedVideoUrl(null)
            setFormData({
              firstName: "",
              lastName: "",
              phone: "",
              alternateNumber: "",
              email: "",
              streetAddress: "",
            })
          }}
          fullWidth
          variant="contained"
          sx={{ backgroundColor: '#C49A6C', '&:hover': { backgroundColor: '#b88a5a' }, color: '#fff', py: 1.5, fontWeight: 600, borderRadius: 2 }}
        >
          DONE
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(/background-image.png)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 lg:p-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="text-white">
              {/* <div className="text-sm font-medium">{currentState === "thankyou" ? "FIGHT FOR" : "TRUST LAW"}</div>
              <div className="text-xs">{currentState === "thankyou" ? "MESOTHELIOMA" : "ATTORNEYS"}</div> */}
              <a href="/">
            <img
              src={logo}
              alt="Mesotheliamo Logo"
              className="h-[auto] w-[150px] sm:w-[200px]"
            />
          </a>
            </div>

            {/* <div className="hidden md:flex items-center space-x-6 text-white text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>1-800-TRUST-LAW</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@trustlaw.com</span>
              </div>
            </div> */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-white space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Diagnosed With
                <br />
                Mesothelioma?
              </h1>

              {currentState === "thankyou" && (
                <p className="text-yellow-400 text-lg font-medium">Fill Out The Form To Get A Free Case Review</p>
              )}

              <p className="text-lg lg:text-xl text-gray-200 max-w-lg">
                {currentState === "thankyou"
                  ? "If you or a loved one have been diagnosed with mesothelioma after exposure to talc or asbestos, you may be eligible for compensation."
                  : "If you or a loved one have been diagnosed with mesothelioma after exposure to talc or asbestos, you may be eligible for compensation."}
              </p>

              <div className="flex items-center text-yellow-400">
                <span className="text-sm font-medium">Fill out the form to get a free case review</span>
              </div>
              <div className="mt-8">
            <button
              onClick={() =>
                (window.location.href = `tel:${getCleanPhoneNumber()}`)
              }
              className="bg-[#4B2C5E] hover:bg-[#3a2249] text-white rounded-full flex items-center gap-2 py-3 px-6 text-lg transition-all duration-300 hover:scale-105"
            >
              <div className="bg-yellow-400 rounded-full p-2">
                <svg
                  className="h-6 w-6 text-purple-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C18.4 22.07 16.88 21.86 15.45 21.34C14.1208 20.8622 12.8882 20.1763 11.8 19.31C10.7483 18.4784 9.82229 17.5124 9.05 16.43C8.17739 15.3387 7.48375 14.0892 7 12.74C6.47341 11.3043 6.25751 9.77254 6.36 8.24C6.36511 7.69105 6.57538 7.16288 6.94959 6.78961C7.32381 6.41634 7.85172 6.20655 8.4 6.2H11.4C12.3583 6.19137 13.1802 6.87955 13.3 7.83C13.3825 8.46138 13.5351 9.08033 13.755 9.68C13.9896 10.3279 13.8595 11.042 13.4 11.57L12.21 12.76C12.9379 13.8892 13.8734 14.8825 14.985 15.67L16.175 14.48C16.7031 14.0216 17.4159 13.8919 18.063 14.125C18.6643 14.3427 19.2845 14.4941 19.917 14.575C20.8798 14.6976 21.5768 15.5395 21.56 16.5L22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span>000-000-0000</span>
            </button>
          </div>
            </div>

            {/* Right side - Form/Recording/Preview */}
            <div className="w-full">
              {currentState === "form" && renderForm()}
              {currentState === "recording" && renderRecording()}
              {currentState === "preview" && renderPreview()}
              {currentState === "thankyou" && renderThankYou()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
