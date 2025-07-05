import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mic, Square, Play, Pause } from 'lucide-react';
import {
  Button,
  TextField,
} from "@mui/material";
import { sendMesotheliomaLandingPageEmailAudio } from "../../utils/emailService";

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

  // Generate CAPTCHA immediately when component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      generateCaptcha();
    }, 60000);

    return () => {
      clearInterval(timer);
      // Stop any ongoing speech when component unmounts
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
    }
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
        <div className="bg-gray-100 p-3 rounded font-mono text-lg tracking-wider select-none relative captcha-text-container text-black">
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
        <label htmlFor="enableAudio" className="text-sm text-white">Enable Audio</label>
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
          className: "text-black",
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

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    alternateNumber: '',
    emailAddress: '',
    streetAddress: '',
    zipCode: '',
    captcha: '',
    enableAudio: false
  });

  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startRecording = async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });

      // Create MediaRecorder with better audio quality
      const options = {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000,
      };

      let recorder;
      if (MediaRecorder.isTypeSupported(options.mimeType)) {
        recorder = new MediaRecorder(stream, options);
      } else {
        recorder = new MediaRecorder(stream);
      }

      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());

        // Clear timer
        if (recordingTimer) {
          clearInterval(recordingTimer);
          setRecordingTimer(null);
        }
      };

      recorder.start(100); // Record in 100ms chunks
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingTimer(timer);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone. Please check your browser permissions and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
    if (recordingTimer) {
      clearInterval(recordingTimer);
      setRecordingTimer(null);
    }
  };

  const playAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setCurrentAudio(audio);

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      audio.play().catch(err => {
        console.error('Error playing audio:', err);
        setIsPlaying(false);
      });
    }
  };

  const pauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setAudioBlob(null);
    setIsPlaying(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "value"
        ) {
          const certUrl = mutation;
          const certIdVar = mutation.target.value;
          const tokenUrlVar = mutation.target.value;
          const pingUrlVar =
            mutation.target.attributes[0].ownerDocument.all[
              "xxTrustedFormPingUrl"
            ].value;

          console.log("cert_id:", certIdVar);
          console.log("pingUrl:", pingUrlVar);
          console.log("tokenUrl:", tokenUrlVar);

          setCertId(certIdVar);
          setPingUrl(pingUrlVar);
          setTokenUrl(tokenUrlVar);

          if (certUrl) {
            console.log("TrustedForm Cert URL:", certUrl);
            fetchCertData(certUrl); // Fetch the certificate data
          }
        }
      });
    });

    const certField = document.getElementById("xxTrustedFormCertUrl");
    if (certField) {
      observer.observe(certField, { attributes: true });
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    if(!audioBlob){
       alert('No audio recorded.');
      return;
    }
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.emailId ||
      !formData.phone ||
      !birthDate ||
      !diagnosisType ||
      !formData.privacyPolicy ||
      !formData.isHuman
    ) {
      setSubmitStatus({
        success: false,
        message:
          "Please fill in all required fields and check both consent boxes.",
      });
      return;
    }

    // Validate email format
    if (!isValidEmail(formData.emailId)) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      const emailData = {
        ...formData,
        dateOfBirth: birthDate,
        dateOfDiagnosis: dateOfDiagnosis,
        diagnosisType,
        otherDiagnosis: diagnosisType === "other" ? otherDiagnosis : undefined,
        xxTrustedFormCertUrl: certId,
        xxTrustedFormPingUrl: pingUrl,
        xxTrustedFormCertToken: tokenUrl,
      };

      const result = await sendConstructionFormEmail(emailData, {
        xxTrustedFormCertUrl: certId,
        xxTrustedFormPingUrl: pingUrl,
        xxTrustedFormCertToken: tokenUrl,
      });

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you for your submission. We will contact you soon.",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          emailId: "",
          phoneNumber: "",
          dateOfDiagnosis: "",
          jobTitle: "",
          story: "",
          privacyPolicy: false,
          isHuman: false,
        });
        setBirthDate(null);
        setDiagnosisType("");
        setOtherDiagnosis("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "There was an error submitting your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAudio = async () => {
    if (!audioBlob) {
      alert('No video recorded.');
      return;
    }
    let phone = formData.phone || '';
    phone = phone.replace(/\D/g, '');
    if (!phone) phone = 'unknown';
    const formDataObj = new FormData();
    formDataObj.append('audio', audioBlob, `${phone}.webm`);
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
      const videoUrl = `https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/audio/${filename}`;
      const getResp = await fetch(videoUrl);
      if (getResp.ok) {
        console.log('Video uploaded and accessible at: ' + videoUrl);
        
        try {
          const emailResult = await sendMesotheliomaLandingPageEmailAudio(formData, videoUrl);
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
        // Still send email without video URL
        try {
          const emailResult = await sendMesotheliomaLandingPageEmailAudio(formData);
          if (emailResult.success) {
            console.log('Email sent successfully (without audio URL)');
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


  const renderStep1 = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Get Your Free Case Review Today</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="hidden"
            id="xxTrustedFormCertUrl"
            name="xxTrustedFormCertUrl"
            value={certId}
          />
          <input
            type="hidden"
            id="xxTrustedFormCertToken"
            name="xxTrustedFormCertToken"
            value={tokenUrl}
          />
          <input
            type="hidden"
            id="xxTrustedFormPingUrl"
            name="xxTrustedFormPingUrl"
            value={pingUrl}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="alternateNumber"
          placeholder="Alternate Number"
          value={formData.alternateNumber}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="emailAddress"
          placeholder="Email Address"
          value={formData.emailAddress}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={formData.streetAddress}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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


        <CustomCaptcha onCaptchaChange={(isValid) => {
          setFormData(prev => ({
            ...prev,
            isHuman: isValid
          }));
        }} />

        <button
          onClick={handleNext}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Start My Case Review</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Record a Short Audio</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
        <div >
          <p className='text-[#DE6944] font-bold text-left'>Please State</p>
          <ol className="text-left mt-2 space-y-1 text-[#64748B]">
            <li>Your Name</li>
            <li>Email</li>
            <li>Zip Code</li>
            <li>State</li>
            <li>Tell Us Your Story</li>
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-[#DE6944] mb-4 text-left">Audio Recorder</h3>

          {isRecording && (
            <div className="mb-4">
              <div className="font-mono text-lg border-none">
                🔴 Recording: {formatTime(recordingTime)}
              </div>
            </div>
          )}

          {audioBlob && !isRecording && (
            <div className="mb-4">
              <div className="text-green-600 font-medium mb-3">
                ✓ Recording completed
              </div>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={isPlaying ? pauseAudio : playAudio}
                  className="bg-[#4B2C5E] hover:bg-[#4B2C5E] border-none text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={deleteRecording}
                  className="bg-red-500 hover:bg-red-600 border-none text-white px-4 py-2 rounded-md flex items-center space-x-2"
                >
                  <Square size={16} />
                  <span>Delete</span>
                </button>
              </div>

              {isPlaying && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Audio waveform visualization */}
              <div className="mt-4 flex justify-center">
                <div className="flex items-center space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-blue-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''
                        }`}
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                disabled={!navigator.mediaDevices}
                className="bg-[#4B2C5E] hover:bg-[#4B2C5E] border-none disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2 transition-colors"
              >
                <Mic size={18} className='animate-pulse' />
                <span>Start Record</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-orange-600 hover:bg-red-600 border-none text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2"
              >
                <Square size={18} className='border-red-700 animate-pulse' />
                <span>Stop</span>
              </button>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            {!navigator.mediaDevices ? (
              <p className="text-red-500">⚠️ Audio recording not supported in this browser</p>
            ) : (
              <p>Click "Start Record" and allow microphone access when prompted</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <button
          onClick={handleNext}
          className=" w-full flex items-center justify-center gap-2 rounded-md border border-orange-500 bg-white px-4 py-3 text-orange-500 hover:bg-orange-500 transition-colors duration-200"
        >
          <ChevronLeft size={18} />
          <span>Back to Form</span>
        </button>

        <button
          onClick={handleSubmitAudio}
          className=" w-full flex items-center justify-center gap-2 rounded-md border border-orange-500 bg-white px-4 py-3 text-orange-500 hover:bg-orange-500 transition-colors duration-200"
        >
          <span>Submit</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
      </div>
    </div>
  );
};

export default StepperForm;