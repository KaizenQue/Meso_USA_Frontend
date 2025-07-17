// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Mic, Square, Play, Pause } from 'lucide-react';
// import {
//   Button,
//   TextField,
// } from "@mui/material";
// import { sendMesotheliomaLandingPageEmailAudio } from "../../utils/emailService";

// const CustomCaptcha = ({ onCaptchaChange }) => {
//   const [captchaText, setCaptchaText] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [isValid, setIsValid] = useState(false);
//   const [audioEnabled, setAudioEnabled] = useState(false);
//   const [charOffsets, setCharOffsets] = useState([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const generateCaptcha = () => {

//     if (isSpeaking) {
//       window.speechSynthesis.cancel();
//       setIsSpeaking(false);
//     }

//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     let offsets = [];
//     for (let i = 0; i < 6; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//       offsets.push((Math.random() * 10 - 5).toFixed(2));
//     }
//     setCaptchaText(result);
//     setCharOffsets(offsets);
//     setUserInput('');
//     setIsValid(false);
//     onCaptchaChange(false);
//   };

//   // Generate CAPTCHA immediately when component mounts
//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       generateCaptcha();
//     }, 60000);

//     return () => {
//       clearInterval(timer);
//       // Stop any ongoing speech when component unmounts
//       if (isSpeaking) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, [isSpeaking]);

//   const speakCaptcha = () => {
//     if ('speechSynthesis' in window) {
//       // Stop any ongoing speech before starting a new one
//       window.speechSynthesis.cancel();
//       setIsSpeaking(true);

//       // Load voices
//       const voices = window.speechSynthesis.getVoices();

//       // Try to find a female voice
//       const femaleVoice = voices.find(voice =>
//         voice.name.toLowerCase().includes('female') ||
//         voice.name.toLowerCase().includes('woman') ||
//         voice.name.toLowerCase().includes('zira') || // Windows
//         voice.name.toLowerCase().includes('samantha') // macOS
//       ) || voices.find(voice => voice.lang === 'en-US');

//       let currentIndex = 0;

//       const speakNextChar = () => {
//         if (currentIndex < captchaText.length) {
//           const char = captchaText[currentIndex];
//           const utterance = new SpeechSynthesisUtterance(char);
//           utterance.voice = femaleVoice;
//           utterance.rate = 0.5;
//           utterance.pitch = 1.2;
//           utterance.volume = 1.0;
//           utterance.lang = 'en-US';

//           utterance.onend = () => {
//             currentIndex++;
//             speakNextChar();
//           };

//           window.speechSynthesis.speak(utterance);
//         } else {
//           setIsSpeaking(false);
//         }
//       };

//       speakNextChar();
//     }
//   };


//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setUserInput(value);
//     const valid = value === captchaText;
//     setIsValid(valid);
//     onCaptchaChange(valid);
//   };

//   const handleAudioToggle = (e) => {
//     setAudioEnabled(e.target.checked);
//   };

//   return (
//     <div className="mt-4">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//         <div className="bg-gray-100 p-3 rounded font-mono text-lg tracking-wider select-none relative captcha-text-container text-black">
//           {captchaText.split('').map((char, index) => (
//             <span
//               key={index}
//               style={{ transform: `translateY(${charOffsets[index]}px)`, display: 'inline-block' }}
//             >
//               {char}
//             </span>
//           ))}
//         </div>
//         <div className="flex gap-2 items-center justify-center sm:justify-start">
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={generateCaptcha}
//             className="text-gray-600 p-2 min-w-0"
//             title="Refresh CAPTCHA"
//           >
//             ↻
//           </Button>
//           {audioEnabled && (
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={speakCaptcha}
//               className="text-gray-600 p-2 min-w-0"
//               title="Listen to CAPTCHA"
//             >
//               🔊
//             </Button>
//           )}
//         </div>
//       </div>
//       <div className="flex items-center mt-2">
//         <input
//           type="checkbox"
//           id="enableAudio"
//           checked={audioEnabled}
//           onChange={handleAudioToggle}
//           className="mr-2"
//         />
//         <label htmlFor="enableAudio" className="text-sm text-white">Enable Audio</label>
//       </div>
//       <TextField
//         fullWidth
//         label="Enter CAPTCHA"
//         value={userInput}
//         onChange={handleInputChange}
//         variant="outlined"
//         margin="normal"
//         error={userInput !== '' && !isValid}
//         helperText={userInput !== '' && !isValid ? 'CAPTCHA does not match' : ''}
//         InputProps={{
//           className: "text-black",
//         }}
//         InputLabelProps={{
//           className: "text-gray-600",
//         }}
//       />
//       <style jsx>{`
//         .captcha-text-container {
//           background-image: repeating-linear-gradient(
//             0deg,
//             #ccc,
//             #ccc 1px,
//             transparent 1px,
//             transparent 5px
//           );
//           background-size: 100% 10px;
//           background-position: 0 50%;
//         }
//       `}</style>
//     </div>
//   );
// };

// const StepperForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phoneNumber: '',
//     alternateNumber: '',
//     emailAddress: '',
//     streetAddress: '',
//     zipCode: '',
//     captcha: '',
//     enableAudio: false
//   });

//   const [pingUrl, setPingUrl] = useState("");
//   const [certId, setCertId] = useState("");
//   const [tokenUrl, setTokenUrl] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [recordingTimer, setRecordingTimer] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep < 2) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       // Request microphone permission
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: {
//           echoCancellation: true,
//           noiseSuppression: true,
//           sampleRate: 44100,
//         }
//       });

//       // Create MediaRecorder with better audio quality
//       const options = {
//         mimeType: 'audio/webm;codecs=opus',
//         audioBitsPerSecond: 128000,
//       };

//       let recorder;
//       if (MediaRecorder.isTypeSupported(options.mimeType)) {
//         recorder = new MediaRecorder(stream, options);
//       } else {
//         recorder = new MediaRecorder(stream);
//       }

//       const chunks = [];

//       recorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: recorder.mimeType });
//         const url = URL.createObjectURL(blob);
//         setAudioBlob(blob);
//         setAudioUrl(url);

//         // Stop all tracks
//         stream.getTracks().forEach(track => track.stop());

//         // Clear timer
//         if (recordingTimer) {
//           clearInterval(recordingTimer);
//           setRecordingTimer(null);
//         }
//       };

//       recorder.start(100); // Record in 100ms chunks
//       setMediaRecorder(recorder);
//       setIsRecording(true);
//       setRecordingTime(0);

//       // Start timer
//       const timer = setInterval(() => {
//         setRecordingTime(prev => prev + 1);
//       }, 1000);
//       setRecordingTimer(timer);

//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//       alert('Unable to access microphone. Please check your browser permissions and try again.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder && mediaRecorder.state === 'recording') {
//       mediaRecorder.stop();
//       setIsRecording(false);
//     }
//     if (recordingTimer) {
//       clearInterval(recordingTimer);
//       setRecordingTimer(null);
//     }
//   };

//   const playAudio = () => {
//     if (currentAudio) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0;
//     }

//     if (audioUrl) {
//       const audio = new Audio(audioUrl);
//       setCurrentAudio(audio);

//       audio.onplay = () => setIsPlaying(true);
//       audio.onpause = () => setIsPlaying(false);
//       audio.onended = () => {
//         setIsPlaying(false);
//         setCurrentAudio(null);
//       };

//       audio.play().catch(err => {
//         console.error('Error playing audio:', err);
//         setIsPlaying(false);
//       });
//     }
//   };

//   const pauseAudio = () => {
//     if (currentAudio) {
//       currentAudio.pause();
//       setIsPlaying(false);
//     }
//   };

//   const deleteRecording = () => {
//     if (currentAudio) {
//       currentAudio.pause();
//       setCurrentAudio(null);
//     }
//     if (audioUrl) {
//       URL.revokeObjectURL(audioUrl);
//       setAudioUrl(null);
//     }
//     setAudioBlob(null);
//     setIsPlaying(false);
//     setRecordingTime(0);
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };
  
//   useEffect(() => {
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (
//           mutation.type === "attributes" &&
//           mutation.attributeName === "value"
//         ) {
//           const certUrl = mutation;
//           const certIdVar = mutation.target.value;
//           const tokenUrlVar = mutation.target.value;
//           const pingUrlVar =
//             mutation.target.attributes[0].ownerDocument.all[
//               "xxTrustedFormPingUrl"
//             ].value;

//           console.log("cert_id:", certIdVar);
//           console.log("pingUrl:", pingUrlVar);
//           console.log("tokenUrl:", tokenUrlVar);

//           setCertId(certIdVar);
//           setPingUrl(pingUrlVar);
//           setTokenUrl(tokenUrlVar);

//           if (certUrl) {
//             console.log("TrustedForm Cert URL:", certUrl);
//             fetchCertData(certUrl); // Fetch the certificate data
//           }
//         }
//       });
//     });

//     const certField = document.getElementById("xxTrustedFormCertUrl");
//     if (certField) {
//       observer.observe(certField, { attributes: true });
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleSubmit = async (e) => {
//     if(!audioBlob){
//        alert('No audio recorded.');
//       return;
//     }
//     e.preventDefault();
//     if (
//       !formData.firstName ||
//       !formData.lastName ||
//       !formData.emailId ||
//       !formData.phone ||
//       !birthDate ||
//       !diagnosisType ||
//       !formData.privacyPolicy ||
//       !formData.isHuman
//     ) {
//       setSubmitStatus({
//         success: false,
//         message:
//           "Please fill in all required fields and check both consent boxes.",
//       });
//       return;
//     }

//     // Validate email format
//     if (!isValidEmail(formData.emailId)) {
//       setSubmitStatus({
//         success: false,
//         message: "Please enter a valid email address.",
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus({ success: null, message: "" });

//     try {
//       const emailData = {
//         ...formData,
//         dateOfBirth: birthDate,
//         dateOfDiagnosis: dateOfDiagnosis,
//         diagnosisType,
//         otherDiagnosis: diagnosisType === "other" ? otherDiagnosis : undefined,
//         xxTrustedFormCertUrl: certId,
//         xxTrustedFormPingUrl: pingUrl,
//         xxTrustedFormCertToken: tokenUrl,
//       };

//       const result = await sendConstructionFormEmail(emailData, {
//         xxTrustedFormCertUrl: certId,
//         xxTrustedFormPingUrl: pingUrl,
//         xxTrustedFormCertToken: tokenUrl,
//       });

//       if (result.success) {
//         setSubmitStatus({
//           success: true,
//           message: "Thank you for your submission. We will contact you soon.",
//         });
//         // Reset form
//         setFormData({
//           firstName: "",
//           lastName: "",
//           emailId: "",
//           phoneNumber: "",
//           dateOfDiagnosis: "",
//           jobTitle: "",
//           story: "",
//           privacyPolicy: false,
//           isHuman: false,
//         });
//         setBirthDate(null);
//         setDiagnosisType("");
//         setOtherDiagnosis("");
//       } else {
//         throw new Error("Failed to send email");
//       }
//     } catch (error) {
//       setSubmitStatus({
//         success: false,
//         message: "There was an error submitting your form. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSubmitAudio = async () => {
//     if (!audioBlob) {
//       alert('No video recorded.');
//       return;
//     }
//     let phone = formData.phone || '';
//     phone = phone.replace(/\D/g, '');
//     if (!phone) phone = 'unknown';
//     const formDataObj = new FormData();
//     formDataObj.append('audio', audioBlob, `1532-${phone}.webm`);
//     try {
//       const response = await fetch('https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/upload/audio', {
//         method: 'POST',
//         body: formDataObj, 
//       });
//       // if (!response.ok) throw new Error('Upload failed');
//       const data = await response.json();
//       console.log('Uploaded URL:', data.url);
//       console.log('Uploaded filename:', data.filename);
//       let filename = data.filename || data.url?.split('/').pop() || `1532-${Date.now()}-${phone}.webm`;
//       const videoUrl = `https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/audio/${filename}`;
//       // Extract phone number from filename if possible
//       let extractedPhone = '';
//       const match = filename.match(/^1532-(\d+)/);
//       if (match) {
//         extractedPhone = match[1];
//       }
//       const getResp = await fetch(videoUrl);
//       if (getResp.ok) {
//         console.log('Video uploaded and accessible at: ' + videoUrl);
//         try {
//           // Map formData fields to expected keys for emailjs, use extractedPhone if available
//           const emailFormData = {
//             ...formData,
//             phone: extractedPhone || formData.phoneNumber,
//             email: formData.emailAddress,
//           };
//           console.log('Email payload:', emailFormData);
//           const emailResult = await sendMesotheliomaLandingPageEmailAudio(emailFormData, videoUrl);
//           if (emailResult.success) {
//             console.log('Email sent successfully with video URL');
//           } else {
//             console.error('Failed to send email:', emailResult.error);
//           }
//         } catch (emailError) {
//           console.error('Error sending email:', emailError);
//         }
//       } else {
//         console.log('Video uploaded, but could not retrieve video link.');
//         // Still send email without video URL
//         try {
//           const emailFormData = {
//             ...formData,
//             phone: extractedPhone || formData.phoneNumber,
//             email: formData.emailAddress,
//           };
//           console.log('Email payload:', emailFormData);
//           const emailResult = await sendMesotheliomaLandingPageEmailAudio(emailFormData);
//           if (emailResult.success) {
//             console.log('Email sent successfully (without audio URL)');
//           } else {
//             console.error('Failed to send email:', emailResult.error);
//           }
//         } catch (emailError) {
//           console.error('Error sending email:', emailError);
//         }
//       }
//       // Reset form fields and audio state
//       setFormData({
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         alternateNumber: '',
//         emailAddress: '',
//         streetAddress: '',
//         zipCode: '',
//         captcha: '',
//         enableAudio: false
//       });
//       setAudioBlob(null);
//       setAudioUrl(null);
//       setRecordingTime(0);
//       setIsPlaying(false);
//       setCurrentAudio(null);
//       setCurrentStep(1);
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Upload failed');
//     }
//   };


//   const renderStep1 = () => (
//     <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Get Your Free Case Review Today</h2>

//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-3">
//           <input
//             type="hidden"
//             id="xxTrustedFormCertUrl"
//             name="xxTrustedFormCertUrl"
//             value={certId}
//           />
//           <input
//             type="hidden"
//             id="xxTrustedFormCertToken"
//             name="xxTrustedFormCertToken"
//             value={tokenUrl}
//           />
//           <input
//             type="hidden"
//             id="xxTrustedFormPingUrl"
//             name="xxTrustedFormPingUrl"
//             value={pingUrl}
//           />
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <input
//           type="tel"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="tel"
//           name="alternateNumber"
//           placeholder="Alternate Number"
//           value={formData.alternateNumber}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="email"
//           name="emailAddress"
//           placeholder="Email Address"
//           value={formData.emailAddress}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="text"
//           name="streetAddress"
//           placeholder="Street Address"
//           value={formData.streetAddress}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="text"
//           name="zipCode"
//           placeholder="ZIP Code"
//           value={formData.zipCode}
//           onChange={handleInputChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <div className="flex items-start space-x-2">
//           <input
//             type="checkbox"
//             id="consent1"
//             name="privacyPolicy"
//             checked={formData.privacyPolicy}
//             onChange={handleInputChange}
//             className="mt-1 rounded border-white text-purple-800 focus:ring-0 focus:ring-offset-0"
//           />
//           <span className="block text-xs sm:text-sm">
//             I agree to the{" "}
//             <a
//               href="/PrivacyPolicy"
//               className="underline hover:text-blue-200"
//             >
//               privacy policy
//             </a>{" "}
//             and{" "}
//             <a
//               href="/Disclaimer"
//               className="underline hover:text-blue-200"
//             >
//               disclaimer
//             </a>
//             &nbsp; and give my express written consent, affiliates and/or
//             lawyer to contact me at the number provided above, even if
//             this number is a wireless number or if I am presently listed
//             on a "Do Not Call" list. I understand that I may be contacted
//             by telephone, email, text message or mail regarding case
//             options and that I may be called using automatic dialing
//             equipment. Message and data rates may apply. My consent does
//             not require purchase. This is legal advertising.
//           </span>
//           <span> </span>
//         </div>


//         <CustomCaptcha onCaptchaChange={(isValid) => {
//           setFormData(prev => ({
//             ...prev,
//             isHuman: isValid
//           }));
//         }} />

//         <button
//           onClick={handleNext}
//           className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
//         >
//           <span>Start My Case Review</span>
//           <span>→</span>
//         </button>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-xl font-semibold text-gray-800 mb-6">Record a Short Audio</h2>

//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
//         <div >
//           <p className='text-[#DE6944] font-bold text-left'>Please State</p>
//           <ol className="text-left mt-2 space-y-1 text-[#64748B]">
//             <li>Your Name: <span className="font-bold">{formData.firstName} {formData.lastName}</span></li>
//             <li>Email: <span className="font-bold">{formData.emailAddress}</span></li>
//             <li>Zip Code: <span className="font-bold">{formData.zipCode}</span></li>
//             <li>State: <span className="font-bold">{formData.streetAddress}</span></li>
//             <li>Tell Us Your Story: <span className="font-bold">(Please record your story below)</span></li>
//           </ol>
//         </div>

//         <div className="mt-6">
//           <h3 className="text-lg font-medium text-[#DE6944] mb-4 text-left">Audio Recorder</h3>

//           {isRecording && (
//             <div className="mb-4">
//               <div className="font-mono text-lg border-none">
//                 🔴 Recording: {formatTime(recordingTime)}
//               </div>
//             </div>
//           )}

//           {audioBlob && !isRecording && (
//             <div className="mb-4">
//               <div className="text-green-600 font-medium mb-3">
//                 ✓ Recording completed
//               </div>
//               <div className="flex justify-center space-x-3">
//                 <button
//                   onClick={isPlaying ? pauseAudio : playAudio}
//                   className="bg-[#4B2C5E] hover:bg-[#4B2C5E] border-none text-white px-4 py-2 rounded-md flex items-center space-x-2"
//                 >
//                   {isPlaying ? <Pause size={16} /> : <Play size={16} />}
//                   <span>{isPlaying ? 'Pause' : 'Play'}</span>
//                 </button>
//                 <button
//                   onClick={deleteRecording}
//                   className="bg-red-500 hover:bg-red-600 border-none text-white px-4 py-2 rounded-md flex items-center space-x-2"
//                 >
//                   <Square size={16} />
//                   <span>Delete</span>
//                 </button>
//               </div>

//               {isPlaying && (
//                 <div className="mt-3">
//                   <div className="w-full bg-gray-200 rounded-full h-1">
//                     <div
//                       className="bg-blue-500 h-1 rounded-full transition-all duration-300"
//                       style={{ width: '0%' }}
//                     ></div>
//                   </div>
//                 </div>
//               )}

//               {/* Audio waveform visualization */}
//               <div className="mt-4 flex justify-center">
//                 <div className="flex items-center space-x-1">
//                   {[...Array(20)].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`w-1 bg-blue-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''
//                         }`}
//                       style={{
//                         height: `${Math.random() * 20 + 10}px`,
//                         animationDelay: `${i * 0.1}s`
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-center space-x-4">
//             {!isRecording ? (
//               <button
//                 onClick={startRecording}
//                 disabled={!navigator.mediaDevices}
//                 className="bg-[#4B2C5E] hover:bg-[#4B2C5E] border-none disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2 transition-colors"
//               >
//                 <Mic size={18} className='animate-pulse' />
//                 <span>Start Record</span>
//               </button>
//             ) : (
//               <button
//                 onClick={stopRecording}
//                 className="bg-orange-600 hover:bg-red-600 border-none text-white px-6 py-3 rounded-md font-medium flex items-center space-x-2"
//               >
//                 <Square size={18} className='border-red-700 animate-pulse' />
//                 <span>Stop</span>
//               </button>
//             )}
//           </div>

//           <div className="mt-4 text-xs text-gray-500 text-center">
//             {!navigator.mediaDevices ? (
//               <p className="text-red-500">⚠️ Audio recording not supported in this browser</p>
//             ) : (
//               <p>Click "Start Record" and allow microphone access when prompted</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row gap-4">
//         <button
//           onClick={handleBack}
//           className=" w-full flex items-center justify-center gap-2 rounded-md border border-orange-500 bg-white px-4 py-3 text-orange-500 hover:bg-orange-500 transition-colors duration-200"
//         >
//           <ChevronLeft size={18} />
//           <span>Back to Form</span>
//         </button>

//         <button
//           onClick={handleSubmitAudio}
//           className=" w-full flex items-center justify-center gap-2 rounded-md border border-orange-500 bg-white px-4 py-3 text-orange-500 hover:bg-orange-500 transition-colors duration-200"
//         >
//           <span>Submit</span>
//           <ChevronRight size={18} />
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         {currentStep === 1 && renderStep1()}
//         {currentStep === 2 && renderStep2()}
//       </div>
//     </div>
//   );
// };

// export default StepperForm;


import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Mic, Square, Play, Pause } from 'lucide-react';
import {
  Button, TextField, Card,
  CardContent,
} from "@mui/material";
import { sendMesotheliomaLandingPageEmailAudio } from "../../utils/emailService";
import DoneImg from "../../assets/Done.png"
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
      window.speechSynthesis.cancel();
      setIsSpeaking(true);

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice =>
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha')
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
        <label htmlFor="enableAudio" className="text-sm">Enable Audio</label>
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

// Phone number formatting function
function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const len = digits.length;
  if (len === 0) return '';
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

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
    enableAudio: false,
    privacyPolicy: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    streetAddress: '',
    zipCode: '',
    privacyPolicy: '',
    captcha: '',
    audio: ''
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // User-friendly field labels
  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    alternateNumber: "Alternate Number",
    emailAddress: "Email Address",
    streetAddress: "Street Address",
    zipCode: "ZIP Code",
    privacyPolicy: "Privacy Policy Agreement",
    captcha: "CAPTCHA Verification",
    audio: "Audio Recording"
  };

  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(null);

  const validateStep1 = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      streetAddress: '',
      zipCode: '',
      privacyPolicy: '',
      captcha: ''
    };

    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
      isValid = false;
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
      isValid = false;
    }

    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = 'You must agree to the privacy policy';
      isValid = false;
    }

    if (!formData.isHuman) {
      newErrors.captcha = 'Please complete the CAPTCHA';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = {
      audio: ''
    };

    let isValid = true;

    if (!audioBlob) {
      newErrors.audio = 'Please record your audio message';
      isValid = false;
    } else if (recordingTime > 180) {
      newErrors.audio = 'Audio must not exceed 3 minutes';
      isValid = false;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phoneNumber" || name === "alternateNumber") {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === "zipCode") {
      // Only allow digits, and max 5 characters
      const digits = value.replace(/\D/g, '').slice(0, 5);
      setFormData(prev => ({
        ...prev,
        [name]: digits
      }));
      if (errors.zipCode) {
        setErrors(prev => ({
          ...prev,
          zipCode: ''
        }));
      }
      return;
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    setHasSubmitted(true);
    if (currentStep === 1 && validateStep1()) {
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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });

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

        stream.getTracks().forEach(track => track.stop());

        if (recordingTimer) {
          clearInterval(recordingTimer);
          setRecordingTimer(null);
        }
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingTime(0);

      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev + 1 >= 180) {
            stopRecording();
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
      setRecordingTimer(timer);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone. Please check your browser permissions and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
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

  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state at the top of your component
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmitAudio = async () => {
    if (!validateStep2()) return;

    if (!audioBlob) {
      setErrors(prev => ({ ...prev, audio: 'Please record your audio message' }));
      return;
    }

    setIsSubmitting(true); // Start loading

    try {
      let phone = formData.phoneNumber || '';
      phone = phone.replace(/\D/g, '');
      if (!phone) phone = 'unknown';

      const formDataObj = new FormData();
      formDataObj.append('audio', audioBlob, `${phone}.webm`);

      const response = await fetch('https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/upload/audio', {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      let filename = data.filename || data.url?.split('/').pop() || `${Date.now()}-${phone}.webm`;
      const videoUrl = `https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/audio/${filename}`;

      const getResp = await fetch(videoUrl);
      if (getResp.ok) {
        try {
          const emailFormData = {
            ...formData,
            phone: formData.phoneNumber,
            email: formData.emailAddress,
            zipcode: formData.zipCode,
          };
          const emailResult = await sendMesotheliomaLandingPageEmailAudio(emailFormData, videoUrl);
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
          const emailFormData = {
            ...formData,
            phone: formData.phoneNumber,
            email: formData.emailAddress,
          };
          const emailResult = await sendMesotheliomaLandingPageEmailAudio(emailFormData);
          if (emailResult.success) {
            setNotification({ open: true, message: 'Submitted successfully (without audio URL)!', severity: 'success' });
          } else {
            setNotification({ open: true, message: 'Submission succeeded, but email failed.', severity: 'warning' });
          }
        } catch (emailError) {
          setNotification({ open: true, message: 'Submission succeeded, but email failed.', severity: 'warning' });
        }
      }
      setCurrentStep(3); // Show thank you screen
    } catch (err) {
      setNotification({ open: true, message: 'Upload failed. Please try again.', severity: 'error' });
    } finally {
      setIsSubmitting(false); // Stop loading whether successful or not
    }
  };

  const renderStep1 = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Get Your Free Case Review Today</h2>

      {/* Error summary box */}
      {/* {hasSubmitted && Object.keys(errors).some(key => errors[key] && key !== 'captcha') && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          <strong>Please fix the following fields:</strong>
          <ul className="list-disc pl-5 mt-1">
            {Object.keys(errors)
              .filter(key => errors[key] && key !== 'captcha')
              .map((key) => (
                <li key={key}>{fieldLabels[key] || key}: {errors[key]}</li>
            ))}
          </ul>
        </div>
      )} */}
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
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number (e.g., (205) 927-0597)"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            maxLength={14}
            inputMode="tel"
            pattern="[0-9]*"
            className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        <input
          type="tel"
          name="alternateNumber"
          placeholder="Alternate Number"
          value={formData.alternateNumber}
          onChange={handleInputChange}
          maxLength={14}
          inputMode="tel"
          pattern="[0-9]*"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address"
            value={formData.emailAddress}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.emailAddress ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
        </div>

        <div>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleInputChange}
            className={`w-full p-3 border ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
        </div>

        <div>
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            maxLength={5}
            className={`w-full p-3 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent1"
            name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={handleInputChange}
            className={`mt-1 rounded border-white text-purple-800 focus:ring-0 focus:ring-offset-0 ${errors.privacyPolicy ? 'border-red-500' : ''}`}
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
        {errors.privacyPolicy && <p className="text-red-500 text-xs mt-1">{errors.privacyPolicy}</p>}

        <CustomCaptcha onCaptchaChange={(isValid) => {
          setFormData(prev => ({
            ...prev,
            isHuman: isValid
          }));
          setErrors(prev => ({
            ...prev,
            captcha: isValid ? '' : 'Please complete the CAPTCHA'
          }));
        }} />
        {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}

        {hasSubmitted && Object.keys(errors).some(key => errors[key] && key !== 'captcha') && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
          <strong>Please fix the following fields:</strong>
          <ul className="list-disc pl-5 mt-1">
            {Object.keys(errors)
              .filter(key => errors[key] && key !== 'captcha')
              .map((key) => (
                <li key={key}>{fieldLabels[key] || key}: {errors[key]}</li>
            ))}
          </ul>
        </div>
      )}
        <button
          onClick={handleNext}
          className="w-full bg-orange-400 border-none hover:bg-orange-500 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Start My Case Review</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-[#4B2C5E] mb-6">Record a Short Audio</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-2">
        <div>
          <p className='text-[#DE6944] text-lg font-bold text-left'>Please State</p>
          <ol className="text-left mt-2 space-y-1 text-[#64748B]">
            <li>Your Name</li>
            <li>Email</li>
            <li>Phone Number</li>
            <li>Street Address & Zip Code</li>
            <li>Tell Us Your Story</li>
          </ol>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-[#4B2C5E] mb-2 text-left">Audio Recorder</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className='mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className=''>
              <path d="M9 15.9375C12.8315 15.9375 15.9375 12.8315 15.9375 9C15.9375 5.16852 12.8315 2.0625 9 2.0625C5.16852 2.0625 2.0625 5.16852 2.0625 9C2.0625 12.8315 5.16852 15.9375 9 15.9375Z" stroke="#F06767" strokeWidth="1.5" />
              <path d="M9 8.85986V12.6099" stroke="#F06767" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 7.26611C9.51777 7.26611 9.9375 6.84638 9.9375 6.32861C9.9375 5.81085 9.51777 5.39111 9 5.39111C8.48223 5.39111 8.0625 5.81085 8.0625 6.32861C8.0625 6.84638 8.48223 7.26611 9 7.26611Z" fill="#F06767" />
            </svg>
            <p style={{ margin: 0 }} className='text-[#DE6944] mb-1'>Audio must not exceed 3 minutes.</p>
          </div>

          {errors.audio && <p className="text-red-500 text-xs mt-1">{errors.audio}</p>}

          {isRecording && (
            <div className="mb-1">
              <div className="font-mono text-lg border-none">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <p className="w-[326px] h-[55px] flex-shrink-0 rounded-[10px] bg-[#4B2C5E] text-white p-3 mt-3">
                    {formatTime(recordingTime)} Sec&nbsp;&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10.502 19.5835V17.0635C12.068 16.9378 13.5292 16.227 14.5948 15.0725C15.6603 13.918 16.252 12.4046 16.252 10.8335V9.5835H15.252V10.8335C15.252 12.2259 14.6988 13.5612 13.7143 14.5458C12.7297 15.5304 11.3943 16.0835 10.002 16.0835C8.60957 16.0835 7.27421 15.5304 6.28964 14.5458C5.30508 13.5612 4.75195 12.2259 4.75195 10.8335V9.5835H3.75195V10.8335C3.75195 12.4046 4.34361 13.918 5.40915 15.0725C6.47469 16.227 7.93593 16.9378 9.50195 17.0635V19.5835H10.502Z" fill="white" />
                      <path d="M7.3503 3.18185C6.64704 3.88511 6.25195 4.83893 6.25195 5.8335V10.8335C6.25195 11.8281 6.64704 12.7819 7.3503 13.4851C8.05356 14.1884 9.00739 14.5835 10.002 14.5835C10.9965 14.5835 11.9503 14.1884 12.6536 13.4851C13.3569 12.7819 13.752 11.8281 13.752 10.8335V5.8335C13.752 4.83893 13.3569 3.88511 12.6536 3.18185C11.9503 2.47858 10.9965 2.0835 10.002 2.0835C9.00739 2.0835 8.05356 2.47858 7.3503 3.18185Z" fill="white" />
                    </svg>
                    Recording...
                  </p>
                </div>
              </div>
            </div>
          )}

          {audioBlob && !isRecording && (
            <div className="mb-0">
              {isPlaying && (
                <div className="mt-2 mb-2">
                  <div
                    className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              )}

              <div className="mt-3 flex justify-center mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-[#4B2C5E] rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''
                        }`}
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-3">
                <button
                  onClick={isPlaying ? pauseAudio : playAudio}
                  className="border-2 border-[#C49A6C] hover:bg-[#C49A6C] bg-transparent px-10 py-2 rounded-md flex text-[#C49A6C] items-center space-x-2 transition-colors duration-200"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span className='font-semibold'>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  onClick={deleteRecording}
                  className="inline-flex justify-center items-center gap-[10px] flex-shrink-0 border-2 px-10 py-2 rounded-md border-[#DE6944] text-red-800 transition-colors"
                >
                  <Square size={16} />
                  <span className='font-semibold'>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4 w-full">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={!navigator.mediaDevices}
              className="bg-[#4B2C5E] hover:bg-[#4B2C5E] border-none disabled:bg-gray-400 text-white w-[300px] py-3 rounded-md font-medium flex justify-center items-center transition-colors"
            >
              <Mic size={18} className='animate-pulse mr-2' />
              <span>Start Record</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="border-2 border-red-600 text-red-800 w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-1"
            >
              <Square size={28} className="border-red-700 animate-pulse" />
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <button
          onClick={handleBack}
          className="inline-flex h-[50px] w-[160px] border-none px-3 py-3 justify-center items-center gap-2.5 text-white rounded-lg bg-amber-700 hover:bg-amber-700/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          <ChevronLeft size={18} />
          <span>Back to Form</span>
        </button>

        <button
          onClick={handleSubmitAudio}
          disabled={isSubmitting}
          className="inline-flex h-[50px] w-[160px] px-3 py-3 justify-center border-none items-center gap-2.5 text-white rounded-lg bg-amber-700 hover:bg-amber-700/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 border-none text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span onClick={renderStep3} >Submit</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
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
            setCurrentStep(1);
            setFormData({
              firstName: '',
              lastName: '',
              phoneNumber: '',
              alternateNumber: '',
              emailAddress: '',
              streetAddress: '',
              zipCode: '',
              captcha: '',
              enableAudio: false,
              privacyPolicy: false
            });
            setAudioBlob(null);
            setAudioUrl(null);
            setRecordingTime(0);
            setIsPlaying(false);
            setCurrentAudio(null);
            setErrors({
              firstName: '',
              lastName: '',
              phoneNumber: '',
              emailAddress: '',
              streetAddress: '',
              zipCode: '',
              privacyPolicy: '',
              captcha: '',
              audio: ''
            });
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
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>
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
  );
};

export default StepperForm;