"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { sendConstructionFormEmail } from '../utils/emailService'
import AutoMobileVideo from '../assets/navy1.mp4'
import logo from '../assets/Meso logo-01 1.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useDynamicPhoneNumber from '../hooks/useDynamicPhoneNumber';

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
  CircularProgress
} from '@mui/material'
import SuccessDialog from "./SuccessDialog"

const textFieldStyle = {
  '& .MuiInputLabel-root': {
    color: '#4b2c5e',
    fontSize: '20px',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    '&.Mui-focused': {
      color: '#4b2c5e'
    }
  },
  '& .MuiInput-root': {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    color: '#4b2c5e',
    '&:before': {
      borderBottomColor: 'rgba(75,44,94,0.4)'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'rgba(75,44,94,0.6)'
    },
    '&:after': {
      borderBottomColor: '#4b2c5e'
    },
    '&.Mui-focused': {
      color: '#4b2c5e'
    }
  },
  '& .MuiFormHelperText-root': {
    fontSize: '14px',
    fontFamily: 'Helvetica'
  },
  '& .Mui-error': {
    color: '#d32f2f',
    '&:after': {
      borderBottomColor: '#d32f2f'
    }
  }
};

const selectFieldStyle = {
  ...textFieldStyle,
  '& .MuiSelect-select': {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    color: '#4b2c5e'
  },
  '& .MuiSelect-icon': {
    color: '#4b2c5e'
  },
  '& .MuiInputLabel-root': {
    color: '#4b2c5e',
    fontSize: '20px',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    '&.Mui-focused': {
      color: '#4b2c5e'
    }
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(75,44,94,0.4)'
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'rgba(75,44,94,0.6)'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4b2c5e'
  },
  '& .MuiFormHelperText-root': {
    fontSize: '14px',
    fontFamily: 'Helvetica',
    marginLeft: '0'
  }
};

const menuItemStyle = {
  fontSize: '18px',
  fontFamily: 'Helvetica',
  color: '#4b2c5e'
};


const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'GU', label: 'Guam' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'VI', label: 'U.S. Virgin Islands' }
];


const exposureLocations = [
  { value: 'military', label: 'Military Service' },
  { value: 'shipyard', label: 'Shipyard' },
  { value: 'construction', label: 'Construction Site' },
  { value: 'factory', label: 'Factory/Industrial Plant' },
  { value: 'power_plant', label: 'Power Plant' },
  { value: 'mine', label: 'Mine' },
  { value: 'refinery', label: 'Refinery' },
  { value: 'railroad', label: 'Railroad' },
  { value: 'automotive', label: 'Automotive Industry' },
  { value: 'textile', label: 'Textile Mill' },
  { value: 'insulation', label: 'Insulation Work' },
  { value: 'school', label: 'School/Public Building' },
  { value: 'residential', label: 'Residential Building' },
  { value: 'other', label: 'Other' }
];

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

export default function USNavyPersonal() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailId: '',
    dateOfBirth: '',
    dateOfDiagnosis: '',
    diagnosisType: '',
    otherDiagnosis: '',
    jobTitle: '',
    settlement: false,
    privacyPolicy: false,
    humanVerification: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const { phoneNumber, getCleanPhoneNumber } = useDynamicPhoneNumber();

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
            fetchCertData(certUrl);
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

  const fetchCertData = async (certUrl) => {
    try {
      const response = await fetch(certUrl);
      const data = await response.json();
      console.log("TrustedForm Cert Data:", data);
    } catch (error) {
      console.error("Error fetching TrustedForm cert:", error);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prevState => ({
          ...prevState,
          [name]: digitsOnly
        }));
      }
      return;
    }

    if (name === 'firstName' || name === 'lastName' || name === 'jobTitle') {
      const sanitizedValue = value.replace(/[^A-Za-z\s\-'\.]/g, '');
      setFormData(prevState => ({
        ...prevState,
        [name]: sanitizedValue
      }));
      return;
    }

    if (name === 'emailId') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Invalid email format'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      'firstName', 'lastName', 'phoneNumber', 'emailId',
      'dateOfBirth', 'dateOfDiagnosis', 'diagnosisType', 'jobTitle'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    const nameRegex = /^[A-Za-z\s\-'\.]+$/;
    if (formData.firstName && !nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name should only contain letters, spaces, hyphens, apostrophes, and periods';
    }
    if (formData.lastName && !nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain letters, spaces, hyphens, apostrophes, and periods';
    }

    const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (formData.phoneNumber) {
      const digitsOnly = formData.phoneNumber.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
      } else if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Invalid US phone number format (e.g. +1 561-555-7689)';
      }
    }

    if (formData.diagnosisType === 'other' && !formData.otherDiagnosis) {
      newErrors.otherDiagnosis = 'Please specify your diagnosis';
    }


    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = 'You must agree to the privacy policy';
    }

    if (!formData.humanVerification) {
      newErrors.humanVerification = 'Please verify you are a person';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const emailData = {
          ...formData,
          xxTrustedFormCertUrl: certId,
          xxTrustedFormPingUrl: pingUrl,
          xxTrustedFormCertToken: tokenUrl
        };

        const result = await sendConstructionFormEmail(emailData, {
          xxTrustedFormCertUrl: certId,
          xxTrustedFormPingUrl: pingUrl,
          xxTrustedFormCertToken: tokenUrl
        });

        if (result.success) {
          setSuccessDialogOpen(true);
          setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailId: '',
            dateOfBirth: '',
            dateOfDiagnosis: '',
            diagnosisType: '',
            otherDiagnosis: '',
            jobTitle: '',
            settlement: false,
            privacyPolicy: false,
            humanVerification: false
          });
        } else {
          toast.error('Error submitting form. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Error submitting form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please correct the errors in the form');
    }
  };

  return (
    <Box className="relative min-h-screen w-full overflow-hidden">
      <ToastContainer position="top-right" />

      <Dialog
        open={successDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '16px',
            maxWidth: '550px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{
          fontFamily: 'Georgia',
          fontSize: '28px',
          color: '#4b2c5e',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '16px'
        }}>
          {"Thank You for Reaching Out!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{
            fontFamily: 'Helvetica',
            fontSize: '18px',
            color: '#4b2c5e',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            One of our representatives will be in touch with you shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: '#4b2c5e',
              color: '#f8f2e9',
              fontFamily: 'Helvetica',
              fontWeight: 'bold',
              padding: '8px 24px',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#3a2249',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={AutoMobileVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      <Box className="relative z-10 min-h-screen w-full flex justify-center">
        <Container maxWidth="xl" className="relative mx-auto min-h-screen 2xl:max-w-[1920px]">
          <Box className="fixed top-4 left-4 z-20 bg-[#FAF3EC] p-2 rounded-md">
            <a href="/">
              <img
                src={logo}
                alt="Mesothelioma Logo"
                className="h-[auto] w-[80px] md:w-[120px] 2xl:w-[160px]"
              />
            </a>
          </Box>

          <Grid container spacing={4} className="min-h-screen pt-16 2xl:pt-24 2xl:max-w-[1600px] 2xl:mx-auto">
            {/* Left Side - Content */}
            <Grid item xs={12} md={6} className="2xl:flex 2xl:justify-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex flex-col justify-center p-8 2xl:p-12 2xl:w-[700px]"
              >
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    '@media (min-width: 1536px)': {
                      padding: '3rem',
                      width: '100%',
                      margin: '0 auto'
                    }
                  }}
                >
                  <motion.h1
                    className="mb-6 text-4xl font-bold tracking-tight md:text-5xl 2xl:text-6xl text-[#4b2c5e]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Mesothelioma After Serving in the U.S. Navy?
                  </motion.h1>

                  <motion.p
                    className="mb-6 text-lg 2xl:text-xl text-black-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    If you served in the U.S. Navy and have been diagnosed with mesothelioma, you're not alone and you may be entitled to compensation.
                  </motion.p>

                  <motion.div
                    className="mb-8 space-y-4 2xl:space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {[
                      "Engine rooms and boiler spaces",
                      "Pipes, gaskets, valves, and pumps",
                      "Insulation around turbines and electrical panels"
                    ].map((text, index) => (
                      <Box key={index} className="flex items-center gap-3 2xl:gap-4">
                        <Box className="flex h-10 w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CheckCircleIcon sx={{ color: '#4b2c5e', fontSize: '24px' }} />
                        </Box>
                        <Typography className="2xl:text-lg font-georgia text-lg" sx={{ fontWeight: 'normal' }}>{text}</Typography>
                      </Box>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Card sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.1)'
                    }}>
                      <CardContent>
                        <Box className="flex items-center gap-2 mb-2">
                          <Typography variant="h6">Call Today</Typography>
                          <motion.div
                            animate={{
                              x: [0, 10, 0],
                              y: [0, 0, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="hidden md:block"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-[#4b2c5e]"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.div>
                          <motion.a
                            href={`tel:+1${getCleanPhoneNumber()}`}
                            animate={{
                              x: [0, 10, 0],
                              y: [0, 0, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            style={{
                              textDecoration: 'none',
                              color: 'inherit'
                            }}
                          >
                            <Typography variant="h6" sx={{ color: '#4b2c5e', fontWeight: 'bold', fontFamily: 'Helvetica' }}>
                              {phoneNumber}
                            </Typography>
                          </motion.a>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontStyle: 'italic',
                            color: '#4b2c5e',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textAlign: 'start'
                          }}
                        >
                          If you or a loved one worked in a shipyard and are now facing mesothelioma, take action today.

                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} md={6} className="2xl:flex 2xl:justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center p-8 2xl:p-12 2xl:w-[700px]"
              >
                <Paper
                  elevation={3}
                  className="w-full p-8"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    '@media (min-width: 1536px)': {
                      padding: '3rem',
                      width: '100%',
                      '& .MuiInputLabel-root': {
                        fontSize: '24px'
                      },
                      '& .MuiInput-root': {
                        fontSize: '24px'
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: '16px'
                      }
                    }
                  }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden TrustedForm fields */}
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

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <TextField
                          id="firstName"
                          name="firstName"
                          label="First Name *"
                          variant="standard"
                          fullWidth
                          value={formData.firstName}
                          onChange={handleChange}
                          error={!!errors.firstName}
                          helperText={errors.firstName}
                          sx={textFieldStyle}
                        />
                      </div>
                      <div className="w-full md:flex-1">
                        <TextField
                          id="lastName"
                          name="lastName"
                          label="Last Name *"
                          variant="standard"
                          fullWidth
                          value={formData.lastName}
                          onChange={handleChange}
                          error={!!errors.lastName}
                          helperText={errors.lastName}
                          sx={textFieldStyle}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <TextField
                          id="phoneNumber"
                          name="phoneNumber"
                          label="Phone Number *"
                          variant="standard"
                          fullWidth
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber}
                          placeholder="+1 XXX-XXX-XXXX"
                          inputProps={{
                            maxLength: 14 
                          }}
                          sx={textFieldStyle}
                        />
                      </div>
                      <div className="w-full md:flex-1">
                        <TextField
                          id="emailId"
                          name="emailId"
                          label="Email ID *"
                          variant="standard"
                          fullWidth
                          value={formData.emailId}
                          onChange={handleChange}
                          error={!!errors.emailId}
                          helperText={errors.emailId}
                          sx={textFieldStyle}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <TextField
                          id="dateOfBirth"
                          name="dateOfBirth"
                          label="Date of Birth *"
                          type="date"
                          variant="standard"
                          fullWidth
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          error={!!errors.dateOfBirth}
                          helperText={errors.dateOfBirth}
                          InputLabelProps={{ shrink: true }}
                          sx={textFieldStyle}
                        />
                      </div>
                      <div className="w-full md:flex-1">
                        <TextField
                          id="dateOfDiagnosis"
                          name="dateOfDiagnosis"
                          label="Date of Diagnosis *"
                          type="date"
                          variant="standard"
                          fullWidth
                          value={formData.dateOfDiagnosis}
                          onChange={handleChange}
                          error={!!errors.dateOfDiagnosis}
                          helperText={errors.dateOfDiagnosis}
                          InputLabelProps={{ shrink: true }}
                          sx={textFieldStyle}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <FormControl fullWidth error={!!errors.diagnosisType} variant="standard">
                          <InputLabel id="diagnosis-type-label" sx={{
                            color: '#4b2c5e',
                            fontSize: '20px',
                            fontFamily: 'Helvetica',
                            fontWeight: 'bold',
                            '&.Mui-focused': {
                              color: '#4b2c5e'
                            }
                          }}>Type of Diagnosis *</InputLabel>
                          <Select
                            labelId="diagnosis-type-label"
                            id="diagnosisType"
                            name="diagnosisType"
                            value={formData.diagnosisType}
                            label="Type of Diagnosis *"
                            onChange={handleChange}
                            sx={selectFieldStyle}
                            MenuProps={{
                              PaperProps: {
                                sx: {
                                  '& .MuiMenuItem-root': menuItemStyle
                                }
                              }
                            }}
                          >
                            <MenuItem value="">Select diagnosis type</MenuItem>
                            <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                            <MenuItem value="lung_cancer">Lung Cancer</MenuItem>

                          </Select>
                          {errors.diagnosisType && <FormHelperText>{errors.diagnosisType}</FormHelperText>}
                        </FormControl>
                      </div>
                      <div className="w-full md:flex-1">
                        <TextField
                          id="jobTitle"
                          name="jobTitle"
                          label="Job Title *"
                          variant="standard"
                          fullWidth
                          value={formData.jobTitle}
                          onChange={handleChange}
                          error={!!errors.jobTitle}
                          helperText={errors.jobTitle}
                          sx={textFieldStyle}
                        />
                      </div>
                    </div>

                    {formData.diagnosisType === 'other' && (
                      <div>
                        <TextField
                          id="otherDiagnosis"
                          name="otherDiagnosis"
                          label="Please specify your type diagnosis *"
                          variant="standard"
                          fullWidth
                          value={formData.otherDiagnosis}
                          onChange={handleChange}
                          error={!!errors.otherDiagnosis}
                          helperText={errors.otherDiagnosis}
                          sx={textFieldStyle}
                        />
                      </div>
                    )}

                    <div className="space-y-4">
                      {errors.settlement && <div className="text-red-500 text-sm">{errors.settlement}</div>}
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          name="privacyPolicy"
                          checked={formData.privacyPolicy}
                          onChange={handleChange}
                          className="mt-1"
                        />
                        <div className="text-xs sm:text-sm font-['Helvetica'] ">
                          <span className="block">
                            I agree to the{' '}
                            <a href="/PrivacyPolicy" className="underline hover:text-blue-200">
                              privacy policy
                            </a>{' '}
                            and{' '}
                            <a href="/Disclaimer" className="underline hover:text-blue-200">
                              disclaimer
                            </a>
                            &nbsp; and give my express written consent, affiliates and/or lawyer to contact me at the number provided above, even if this number is a wireless number or if I am presently listed on a "Do Not Call" list. I understand that I may be contacted by telephone, email, text message or mail regarding case options and that I may be called using automatic dialing equipment. Message and data rates may apply. My consent does not require purchase. This is legal advertising.
                          </span>
                          <span> </span>
                        </div>
                      </div>
                      {errors.privacyPolicy && <div className="text-red-500 text-sm">{errors.privacyPolicy}</div>}

                      <div className="flex items-start gap-4 font-['Helvetica']">
                        {/* <input
                          type="checkbox"
                          name="humanVerification"
                          checked={formData.humanVerification}
                          onChange={handleChange}
                          className="mt-1"
                        />
                        <div className="text-xs sm:text-sm">Please check this box to verify you're a person.</div> */}
                        <CustomCaptcha onCaptchaChange={(isValid) => {
                          setFormData(prev => ({
                            ...prev,
                            humanVerification: isValid
                          }));
                        }} />
                      </div>
                      {errors.humanVerification && <div className="text-red-500 text-sm">{errors.humanVerification}</div>}
                    </div>

                    <div className="text-left sm:text-left">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`rounded-[10px] bg-[#4b2c5e] text-[#f8f2e9] px-8 sm:px-12 py-3 sm:py-4 2xl:py-5 2xl:px-16 font-bold transition-colors text-sm sm:text-base md:text-lg 2xl:text-xl flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#3a2249]'
                          }`}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress size={20} color="inherit" />
                            Submitting...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                  </form>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
