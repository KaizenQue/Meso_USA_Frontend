"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ArrowLeft, Play, Pause, Square, Video, Phone, Mail } from "lucide-react"
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { Card, CardContent } from "../ui/card"
// import logo from "../../assets/MesoLogoWhite.png";
import DoneImg from '../../assets/Done.png'
import Image from '../../assets/MainAV.webp'
import { sendMesotheliomaLandingPageEmail } from "../../utils/emailService";
import logo from '../../assets/whiteLogoNew.svg'
import { Snackbar, Alert } from "@mui/material";

const CustomCaptcha = ({ onCaptchaChange }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [charOffsets, setCharOffsets] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const generateCaptcha = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    let offsets = [];
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      offsets.push((Math.random() * 10 - 5).toFixed(2));
    }
    setCaptchaText(result);
    setCharOffsets(offsets);
    setUserInput('');
    setIsValid(false);
    onCaptchaChange(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      generateCaptcha();
    }, 60000); 

    return () => {
      clearInterval(timer);
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]); 

const speakCaptcha = () => {
        if ('speechSynthesis' in window) {
            // Stop any ongoing speech before starting a new one
            window.speechSynthesis.cancel();
            setIsSpeaking(true);

            // Load voices
            const voices = window.speechSynthesis.getVoices();

            // Try to find a female voice
            const femaleVoice = voices.find(voice =>
                voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('woman') ||
                voice.name.toLowerCase().includes('zira') || // Windows
                voice.name.toLowerCase().includes('samantha') // macOS
            ) || voices.find(voice => voice.lang === 'en-US');

            let currentIndex = 0;

            const speakNextChar = () => {
                if (currentIndex < captchaText.length) {
                    const char = captchaText[currentIndex];
                    const utterance = new SpeechSynthesisUtterance(char);
                    utterance.voice = femaleVoice;
                    utterance.rate = 0.5;
                    utterance.pitch = 1.2;
                    utterance.volume = 1.0;
                    utterance.lang = 'en-US';

                    utterance.onend = () => {
                        currentIndex++;
                        speakNextChar();
                    };

                    window.speechSynthesis.speak(utterance);
                } else {
                    setIsSpeaking(false);
                }
            };

            speakNextChar();
        }``
    };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    const valid = value === captchaText;
    setIsValid(valid);
    onCaptchaChange(valid);
  };

  const handleAudioToggle = (e) => {
    setAudioEnabled(e.target.checked);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="bg-gray-100 p-3 rounded font-mono text-lg tracking-wider select-none relative captcha-text-container">
          {captchaText.split('').map((char, index) => (
            <span
              key={index}
              style={{ transform: `translateY(${charOffsets[index]}px)`, display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="flex gap-2 items-center justify-center sm:justify-start">
          <Button
            variant="outlined"
            size="small"
            onClick={generateCaptcha}
            className="text-gray-600 p-2 min-w-0"
            title="Refresh CAPTCHA"
          >
            ↻
          </Button>
          {audioEnabled && (
            <Button
              variant="outlined"
              size="small"
              onClick={speakCaptcha}
              className="text-gray-600 p-2 min-w-0"
              title="Listen to CAPTCHA"
            >
              🔊
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="enableAudio"
          checked={audioEnabled}
          onChange={handleAudioToggle}
          className="mr-2"
        />
        <label htmlFor="enableAudio" className="text-sm text-gray-700">Enable Audio</label>
      </div>
      <TextField
        fullWidth
        label="Enter CAPTCHA"
        value={userInput}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        error={userInput !== '' && !isValid}
        helperText={userInput !== '' && !isValid ? 'CAPTCHA does not match' : ''}
        InputProps={{
          className: "text-gray-800",
        }}
        InputLabelProps={{
          className: "text-gray-600",
        }}
      />
      <style jsx>{`
        .captcha-text-container {
          background-image: repeating-linear-gradient(
            0deg,
            #ccc,
            #ccc 1px,
            transparent 1px,
            transparent 5px
          );
          background-size: 100% 10px;
          background-position: 0 50%;
        }
      `}</style>
    </div>
  );
};

export default function MesotheliomaLandingPageTest() {
  const phoneNumber = '(888) 212 8149';
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
    zipcode: "",
    privacyPolicy: false,
    humanVerification: false,
  })
  const [videoDuration, setVideoDuration] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // User-friendly field labels
  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone Number",
    alternateNumber: "Alternate Number",
    email: "Email Address",
    streetAddress: "Street Address",
    zipcode: "ZIP Code",
    privacyPolicy: "Privacy Policy Agreement",
    humanVerification: "CAPTCHA Verification",
  };

  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])

  // Phone number formatting function
  function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    const len = digits.length;
    if (len === 0) return '';
    if (len < 4) return `(${digits}`;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

  const handleInputChange = (field, value) => {
    if (field === "phone" || field === "alternateNumber") {
      // Only allow numbers and format as (XXX) XXX-XXXX
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [field]: formatted }));
    } else if (field === "zipcode") {
      // Only allow numbers, max 5 digits
      const numeric = value.replace(/[^0-9]/g, '').slice(0, 5);
      setFormData((prev) => ({ ...prev, zipcode: numeric }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    if (!formData.streetAddress.trim()) errors.streetAddress = 'Street address is required.';
    if (!formData.zipcode.trim()) {
      errors.zipcode = 'ZIP code is required.';
    } else if (!/^\d{5}$/.test(formData.zipcode)) {
      errors.zipcode = 'ZIP code must be exactly 5 digits.';
    }
    if (!formData.privacyPolicy) errors.privacyPolicy = 'You must agree to the privacy policy.';
    if (!formData.humanVerification) errors.humanVerification = 'Please complete the CAPTCHA.';
    return errors;
  };

  const startCaseReview = () => {
    setHasSubmitted(true);
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
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
      setRecordingTime(0);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev + 1 >= 180) {
            stopRecording();
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please ensure you have granted camera permissions.")
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  }, []);

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
    setIsSubmitting(true); // Start spinner
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
      let filename = data.filename || data.url?.split('/').pop() || `${Date.now()}-${phone}.webm`;
      const videoUrl = `https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/videos/${filename}`;
      const getResp = await fetch(videoUrl);
      if (getResp.ok) {
        try {
          const emailResult = await sendMesotheliomaLandingPageEmail(formData, videoUrl);
          if (emailResult.success) {
            setNotification({ open: true, message: 'Submitted successfully!', severity: 'success' });
          } else {
            setNotification({ open: true, message: 'Submission succeeded, but email failed.', severity: 'warning' });
          }
        } catch (emailError) {
          setNotification({ open: true, message: 'Submission succeeded, but email failed.', severity: 'warning' });
        }
      } else {
        try {
          const emailResult = await sendMesotheliomaLandingPageEmail(formData);
          if (emailResult.success) {
            setNotification({ open: true, message: 'Submitted successfully (without video URL)!', severity: 'success' });
          } else {
            setNotification({ open: true, message: 'Submission succeeded, but email failed.', severity: 'warning' });
          }
        } catch (emailError) {
          setNotification({ open: true, message: 'Submission succeeded, but email failed.', severity: 'warning' });
        }
      }
      setCurrentState("thankyou");
    } catch (err) {
      setNotification({ open: true, message: 'Upload failed. Please try again.', severity: 'error' });
      console.error('Upload failed:', err);
      alert('Upload failed');
    } finally {
      setIsSubmitting(false); // Stop spinner
    }
  };

  useEffect(() => {
    if (currentState === 'preview' && videoRef.current) {
      const handleLoadedMetadata = () => {
        const dur = videoRef.current.duration
        if (isFinite(dur) && !isNaN(dur)) {
          setVideoDuration(dur)
        } else {
          setVideoDuration(0)
        }
      }
      const video = videoRef.current
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      // If metadata is already loaded
      if (video.readyState >= 1) {
        handleLoadedMetadata()
      }
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [currentState, recordedVideoUrl])

  useEffect(() => {
    if (currentState !== 'recording' && recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
      setRecordingTime(0);
    }
  }, [currentState]);

  const renderForm = () => (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-6">
        <div className="text-left mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Book your Free Consultation</h2>
        </div>
        {/* Error summary box
        {hasSubmitted && Object.keys(formErrors).length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
            <strong>Please fix the following fields:</strong>
            <ul className="list-disc pl-5 mt-1">
              {Object.keys(formErrors)
                .filter(key => key !== 'humanVerification')
                .map((key) => (
                  <li key={key}>{fieldLabels[key] || key}: {formErrors[key]}</li>
              ))}
            </ul>
          </div>
        )} */}
        <form className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              fullWidth
              size="small"
              margin="dense"
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
            <TextField
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              fullWidth
              size="small"
              margin="dense"
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />
          </div>
          <TextField
            id="phone"
            label="Phone Number (e.g., (333) 444-5555)"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            inputProps={{ maxLength: 14, inputMode: 'tel', pattern: '[0-9]*' }}
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
            inputProps={{ maxLength: 14, inputMode: 'tel', pattern: '[0-9]*' }}
          />
          <TextField
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            id="streetAddress"
            label="Street Address"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            error={!!formErrors.streetAddress}
            helperText={formErrors.streetAddress}
          />
          <TextField
            id="zipcode"
            label="ZIP Code"
            value={formData.zipcode}
            onChange={(e) => handleInputChange("zipcode", e.target.value)}
            fullWidth
            size="small"
            margin="dense"
            error={!!formErrors.zipcode}
            helperText={formErrors.zipcode}
            inputProps={{ maxLength: 5, inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="consent1"
              name="privacyPolicy"
              checked={!!formData.privacyPolicy}
              onChange={e => handleInputChange("privacyPolicy", e.target.checked)}
              className="mt-1 rounded border-white text-purple-800 focus:ring-0 focus:ring-offset-0"
            />
            <span className="block text-xs sm:text-sm">
            By submitting this form and signing up for texts, I consent to the{" "}
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
              &nbsp; and give my express written consent to affiliates and/or lawyer to contact me at the number provided above, even if this number is a wireless number or if I am presently listed on a Do Not Call list. I understand that I may be contacted by telephone, email, text message or mail regarding general customer service including case options, and reminders and follow-ups and that I may be called using automatic dialling equipment. Message frequency varies. Unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available). Reply HELP for help. This is Legal advertising.
            </span>
          </div>
          {formErrors.privacyPolicy && (
            <div className="text-red-600 text-xs mt-1">{formErrors.privacyPolicy}</div>
          )}
          <CustomCaptcha onCaptchaChange={(isValid) => {
            setFormData(prev => ({
              ...prev,
              humanVerification: isValid
            }));
          }} />
          {formErrors.humanVerification && (
            <div className="text-red-600 text-xs mt-1">{formErrors.humanVerification}</div>
          )}
          {/* Error summary box */}
        {hasSubmitted && Object.keys(formErrors).length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
            <strong>Please fix the following fields:</strong>
            <ul className="list-disc pl-5 mt-1">
              {Object.keys(formErrors)
                .filter(key => key !== 'humanVerification')
                .map((key) => (
                  <li key={key}>{fieldLabels[key] || key}: {formErrors[key]}</li>
              ))}
            </ul>
          </div>
        )}
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
        {/* Form Data Preview */}
        <Box className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50">
        <Typography variant="h6" className="font-bold mb-1" style={{ color: '#4B2C5E', fontSize: 24 }}>
            Record a Short video
          </Typography>
          <Typography variant="subtitle1" className="font-bold mb-2" style={{ color: '#4B2C5E' }}>
            <span style={{ color: '#C0492B', fontWeight: 700 }}>Please State</span>: Your Name, Email, Phone Number, Street Address & Zip Code, Tell Us Your Story
          </Typography>
          <Typography variant="body2"><b>Name:</b> {formData.firstName} {formData.lastName}</Typography>
          <Typography variant="body2"><b>Email:</b> {formData.email}</Typography>
          <Typography variant="body2"><b>Phone Number:</b> {formData.phone}</Typography>
          <Typography variant="body2"><b>Alternate Number:</b> {formData.alternateNumber}</Typography>
          <Typography variant="body2"><b>Street Address:</b> {formData.streetAddress}</Typography>
          <Typography variant="body2"><b>ZIP Code:</b> {formData.zipcode}</Typography>
          <Typography variant="body2" className="mt-2" style={{ color: '#C0492B', fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" fill="none" stroke="#C0492B" strokeWidth="2" style={{ marginRight: 4 }}><circle cx="8" cy="8" r="7" /><line x1="8" y1="4" x2="8" y2="8" /><circle cx="8" cy="11" r="1" /></svg>
              Video must not exceed 3 minutes.
            </span>
          </Typography>
        </Box>

        {/* Video Recorder Area */}
        <div className="mb-6 flex justify-center">
          <div
            style={{
              width: 280,
              height: 280,
              border: '2px dashed #C49A6C',
              borderRadius: 16,
              background: '#F6F2F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Timer display while recording */}
            {isRecording && (
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: '#4B2C5E',
                color: '#fff',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                padding: '2px 10px',
                zIndex: 2,
              }}>
                {`${String(Math.floor(recordingTime / 60)).padStart(2, '0')} min, ${String(recordingTime % 60).padStart(2, '0')} sec`}
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: isRecording ? 'block' : 'none',
                borderRadius: 16,
              }}
            />
            {!isRecording && (
              <svg width="120" height="120" fill="none" stroke="#BCA6C7" strokeWidth="2">
                <circle cx="60" cy="60" r="50" />
                <path d="M60 40a20 20 0 1 1 0 40a20 20 0 1 1 0-40z" />
                <path d="M60 60v10" />
              </svg>
            )}
            {isRecording && (
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 12, height: 12, background: '#C0492B', borderRadius: '50%', marginRight: 8, animation: 'pulse 1s infinite' }}></div>
                <span style={{ color: '#C0492B', fontWeight: 600, fontSize: 14 }}>Recording...</span>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              variant="contained"
              sx={{
                backgroundColor: '#4B2C5E',
                color: '#fff',
                px: 4,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                minWidth: 160,
              }}
            >
              <Video className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="outlined"
              sx={{
                color: '#C0492B',
                borderColor: '#C0492B',
                px: 4,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                minWidth: 160,
              }}
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          )}
        </div>

        {/* Back to Form Button */}
        <Button
          onClick={backToForm}
          fullWidth
          variant="outlined"
          sx={{
            mt: 4,
            color: '#C49A6C',
            borderColor: '#C49A6C',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            py: 1.5,
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>
      </CardContent>
    </Card>
  )

  const renderPreview = () => (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-6">
        {/* Title and instructions */}
        <div className="mb-2">
          <Typography variant="h6" className="font-bold mb-1" style={{ color: '#4B2C5E', fontSize: 24 }}>
            Record a Short video
          </Typography>
          {/* <Typography variant="body2" className="mb-1" style={{ color: '#C0492B', fontWeight: 700 }}>
            Please State <span style={{ color: '#222', fontWeight: 400 }}>: Your Name, Email, Phone Number, Street Address & Zip Code, Tell Us Your Story</span>
          </Typography> */}
          <Typography variant="body2" style={{ color: '#C0492B', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <svg width="16" height="16" fill="none" stroke="#C0492B" strokeWidth="2" style={{ marginRight: 4 }}><circle cx="8" cy="8" r="7" /><line x1="8" y1="4" x2="8" y2="8" /><circle cx="8" cy="11" r="1" /></svg>
            Video must not exceed 3 minutes.
          </Typography>
        </div>

        {/* Video Preview Area */}
        <div className="mb-6 relative flex justify-center">
          <div
            style={{
              width: 320,
              height: 240,
              border: '1.5px solid #BCA6C7',
              borderRadius: 16,
              background: '#F6F2F7',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(76, 42, 94, 0.04)',
            }}
          >
            {/* Time label */}
            {/* <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: '#4B2C5E',
              color: '#fff',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              padding: '2px 10px',
              zIndex: 2,
            }}>
              {`${String(Math.floor(videoDuration / 60)).padStart(2, '0')} min, ${String(Math.floor(videoDuration % 60)).padStart(2, '0')} sec`}
            </div> */}
            {/* Close (X) button */}
            <Button
              onClick={() => setCurrentState('form')}
              size="small"
              sx={{
                minWidth: 0,
                width: 32,
                height: 32,
                position: 'absolute',
                top: 6,
                right: 6,
                zIndex: 2,
                background: '#fff',
                borderRadius: '50%',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                color: '#C0492B',
                fontWeight: 700,
                p: 0,
                '&:hover': { background: '#F6F2F7' },
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#C0492B" strokeWidth="2"><line x1="5" y1="5" x2="15" y2="15"/><line x1="15" y1="5" x2="5" y2="15"/></svg>
            </Button>
            {/* Video element */}
            <video
              ref={videoRef}
              src={recordedVideoUrl || undefined}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, background: '#F6F2F7' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              controls={false}
              tabIndex={-1}
            />
            {/* Play button overlay */}
            {!isPlaying && (
              <Button
                onClick={togglePlayback}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#fff',
                  color: '#4B2C5E',
                  borderRadius: '50%',
                  minWidth: 0,
                  width: 64,
                  height: 64,
                  boxShadow: '0 2px 8px rgba(76, 42, 94, 0.10)',
                  zIndex: 2,
                  p: 0,
                  '&:hover': { background: '#F6F2F7' },
                }}
              >
                <Play style={{ width: 36, height: 36 }} />
              </Button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mb-4">
          <Button
            onClick={() => setCurrentState('form')}
            variant="outlined"
            sx={{
              color: '#4B2C5E',
              borderColor: '#BCA6C7',
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              px: 3,
              py: 1.5,
              flex: 1,
              '&:hover': { background: '#F6F2F7', borderColor: '#4B2C5E' },
            }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Form
          </Button>
          <Button
            onClick={() => setCurrentState('recording')}
            variant="outlined"
            sx={{
              color: '#C0492B',
              borderColor: '#C0492B',
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              px: 3,
              py: 1.5,
              flex: 1,
              '&:hover': { background: '#F6F2F7', borderColor: '#C0492B' },
            }}
          >
            Record Again
          </Button>
        </div>
        <Button
          onClick={handleSubmitCaseReview}
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#C49A6C',
            color: '#fff',
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            fontSize: 18,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(196, 154, 108, 0.10)',
            '&:hover': { backgroundColor: '#b88a5a' },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: '#fff' }} />
          ) : (
            <>
              Submit Now
              <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </>
          )}
        </Button>
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
          <div className="w-40 h-40 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
            <img src={DoneImg} alt="Done" className="w-20 h-50 object-contain" />
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
              zipcode: "",
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
      style={{ backgroundImage: `url(${Image})` }}
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
                  ? "If you or a loved one have been diagnosed with mesothelioma after exposure to asbestos, you may be eligible for compensation.."
                  : "If you or a loved one have been diagnosed with mesothelioma after exposure to asbestos, you may be eligible for compensation.."}
              </p>

              <div className="flex items-center text-yellow-400">
                <span className="text-sm font-medium">Fill out the form to get a free case review</span>
              </div>
              <div className="mt-8">
            <button
              onClick={() =>
                (window.location.href = `tel:${phoneNumber.replace(/[^0-9+]/g, '')}`)
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
              <span>{phoneNumber}</span>
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
        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={() => setNotification({ ...notification, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
