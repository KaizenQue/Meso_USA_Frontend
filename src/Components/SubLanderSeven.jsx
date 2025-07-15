"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Flame, Factory, Building } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendConstructionFormEmail } from "../utils/emailService";
import AutoMobileVideo from "../assets/video.mp4";
import NavbarSubDomains from "../Components/NavBarSubDomains/NavBarSubDomains/NavbarSubDomains";
import Group from "../../src/assets/Group 35645.png";
import Vector from "../../src/assets/ChatGPT Image May 12, 2025, 05_22_19 PM.png";
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
  CircularProgress,
} from "@mui/material";
import SuccessDialog from "./SuccessDialog";

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

function SubLanderSeven() {
  const { phoneNumber, getCleanPhoneNumber } = useDynamicPhoneNumber();

  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      color: "#4b2c5e",
      fontSize: "20px",
      fontFamily: "Helvetica",
      fontWeight: "bold",
      "&.Mui-focused": {
        color: "#4b2c5e",
      },
    },
    "& .MuiInput-root": {
      fontSize: "20px",
      fontFamily: "Helvetica",
      color: "#4b2c5e",
      "&:before": {
        borderBottomColor: "rgba(75,44,94,0.4)",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottomColor: "rgba(75,44,94,0.6)",
      },
      "&:after": {
        borderBottomColor: "#4b2c5e",
      },
      "&.Mui-focused": {
        color: "#4b2c5e",
      },
    },
    "& .MuiFormHelperText-root": {
      fontSize: "14px",
      fontFamily: "Helvetica",
    },
    "& .Mui-error": {
      color: "#d32f2f",
      "&:after": {
        borderBottomColor: "#d32f2f",
      },
    },
  };

  const selectFieldStyle = {
    ...textFieldStyle,
    "& .MuiSelect-select": {
      fontSize: "20px",
      fontFamily: "Helvetica",
      color: "#4b2c5e",
    },
    "& .MuiSelect-icon": {
      color: "#4b2c5e",
    },
    "& .MuiInputLabel-root": {
      color: "#4b2c5e",
      fontSize: "20px",
      fontFamily: "Helvetica",
      fontWeight: "bold",
      "&.Mui-focused": {
        color: "#4b2c5e",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(75,44,94,0.4)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "rgba(75,44,94,0.6)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#4b2c5e",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "14px",
      fontFamily: "Helvetica",
      marginLeft: "0",
    },
  };

  const menuItemStyle = {
    fontSize: "18px",
    fontFamily: "Helvetica",
    color: "#4b2c5e",
  };


  const usStates = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
    { value: "DC", label: "District of Columbia" },
    { value: "AS", label: "American Samoa" },
    { value: "GU", label: "Guam" },
    { value: "MP", label: "Northern Mariana Islands" },
    { value: "PR", label: "Puerto Rico" },
    { value: "VI", label: "U.S. Virgin Islands" },
  ];


  const exposureLocations = [
    { value: "military", label: "Military Service" },
    { value: "shipyard", label: "Shipyard" },
    { value: "construction", label: "Construction Site" },
    { value: "factory", label: "Factory/Industrial Plant" },
    { value: "power_plant", label: "Power Plant" },
    { value: "mine", label: "Mine" },
    { value: "refinery", label: "Refinery" },
    { value: "railroad", label: "Railroad" },
    { value: "automotive", label: "Automotive Industry" },
    { value: "textile", label: "Textile Mill" },
    { value: "insulation", label: "Insulation Work" },
    { value: "school", label: "School/Public Building" },
    { value: "residential", label: "Residential Building" },
    { value: "other", label: "Other" },
  ];
  const [showSuccess, setShowSuccess] = useState(false);

  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, settokenUrl] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    dateOfBirth: "",
    dateOfDiagnosis: "",
    diagnosisType: "",
    otherDiagnosis: "",
    jobTitle: "",
    xxTrustedFormPingUrl: "",
    xxTrustedFormCertUrl: "",
    xxTrustedFormCertToken: "",
    // state: "",
    settlement: false,
    privacyPolicy: false,
    humanVerification: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "dateOfDiagnosis") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate > today) {
        setErrors({
          ...errors,
          dateOfDiagnosis: "Diagnosis date cannot be in the future",
        });
        return;
      }
    }
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      [name]: value,
    }));
  };
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) return digits;
    if (digits.length <= 10)
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  };

  // Validate form before submission
  // Add this validation function at the top level of your component file
  const validateName = (name) => {
    // Allows letters, hyphens, apostrophes, and spaces (common in names)
    // Minimum 2 characters, maximum 30
    const nameRegex = /^[a-zA-Zà-üÀ-Ü'\- ]{2,30}$/;
    return nameRegex.test(name.trim());
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();

    // Required field validation
    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "emailId",
      "dateOfBirth",
      "dateOfDiagnosis",
      "diagnosisType",
      "jobTitle",
    ];

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName =
        "Please enter a valid first name (letters only, 2-30 characters)";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName =
        "Please enter a valid last name (letters only, 2-30 characters)";
    }

    // Check other required fields
    requiredFields.forEach((field) => {
      if (!formData[field] && !newErrors[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailId && !emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Please enter a valid email address";
    }

    // Phone number validation
    if (formData.phoneNumber) {
      const digitsOnly = formData.phoneNumber.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        newErrors.phoneNumber = "Phone number must be 10 digits";
      }
    }

    // Date of Birth validation (18+ years)
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }

    // Date of Diagnosis validation (not in future)
    if (formData.dateOfDiagnosis) {
      const diagnosisDate = new Date(formData.dateOfDiagnosis);
      if (diagnosisDate > today) {
        newErrors.dateOfDiagnosis = "Diagnosis date cannot be in the future";
      }
    }

    // Other diagnosis validation
    if (formData.diagnosisType === "other" && !formData.otherDiagnosis) {
      newErrors.otherDiagnosis = "Please specify your diagnosis";
    }

    // Checkbox validations
    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the privacy policy";
    }

    if (!formData.humanVerification) {
      newErrors.humanVerification = "Please verify you are a person";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const result = await sendConstructionFormEmail(formData, {
          xxTrustedFormCertUrl: certId,
          xxTrustedFormPingUrl: pingUrl,
          xxTrustedFormCertToken: tokenUrl,
        });

        if (result.success) {
          setSuccessDialogOpen(true);
          // Reset form data
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            emailId: "",
            dateOfBirth: "",
            dateOfDiagnosis: "",
            diagnosisType: "",
            otherDiagnosis: "",
            jobTitle: "",
            ping_url: "",
            // state: "",
            settlement: false,
            privacyPolicy: false,
            humanVerification: false,
          });
        } else {
          toast.error("Error submitting form. Please try again.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Error submitting form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please correct the errors in the form");
    }
  };
  // Wait for the TrustedForm script to load
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
          settokenUrl(tokenUrlVar);

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

  const fetchCertData = async (certUrl) => {
    try {
      const response = await fetch(certUrl);
      const data = await response.json();
      console.log("TrustedForm Cert Data:", data);
    } catch (error) {
      console.error("Error fetching TrustedForm cert:", error);
    }
  };

  return (
    <>
      <NavbarSubDomains />
      <Box className="relative min-h-[100dvh] w-full overflow-hidden  bg-[#FAF3EC] pb-10">
        <ToastContainer position="top-right" />

        {/* Success Dialog */}
        <Dialog
          open={successDialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              borderRadius: "16px",
              padding: "16px",
              maxWidth: "550px",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              fontFamily: "Georgia",
              fontSize: "28px",
              color: "#4b2c5e",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {"Thank You for Reaching Out!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                fontFamily: "Helvetica",
                fontSize: "18px",
                color: "#4b2c5e",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              One of our representatives will be in touch with you shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
            <Button
              onClick={handleCloseDialog}
              sx={{
                backgroundColor: "#2e4a7d",
                color: "#f8f2e9",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#243c68",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Background Image */}

        {/* Content Container */}
        <Container
          maxWidth="xl"
          className="relative z-10 mx-auto h-[100%] gap-10"
        >
          <Grid container spacing={4} className="min-h-screen">
            {/* Left Side - Content */}
            <Grid item xs={12} md={6} mt={5}>
              <Box className="flex flex-col items-center">
                <img
                  src={Vector}
                  alt="Background"
                  className="h-[500px] w-[500px] sm:h-[250px] sm:w-[250px] md:h-[400px] md:w-[400px] rounded-full "
                />
              </Box>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
                style={{ marginTop: "20px" }} // Fixed 20px gap
              >
                <motion.h1
                  className="text-[#2E4A7D] font-georgia italic font-normal leading-tight text-center w-[500px]"
                  style={{
                    fontSize: "clamp(1.75rem, 5vw, 3.375rem)",
                    width: "clamp(300px, 90vw, 648px)",
                    marginBottom: "clamp(1.5rem, 3vw, 1.5rem)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Justice for Laborers Diagnosed with Mesothelioma
                </motion.h1>

                <motion.p
                  className="text-[#6b6b6b] font-georgia font-normal leading-tight text-left mx-auto text-[21px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Mesothelioma is more than just a diagnosis. It's the result of
                  years of unknowing exposure while working hard and doing your
                  job. If you worked with industrial or automotive parts, you
                  may have come into contact with dangerous asbestos found in:
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {/* <img src={Group} className="h-auto w-auto" alt="" /> */}
                </motion.div>

                <motion.div
                  className="mb-8 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {[
                    "Pipe and duct insulation",
                    "Boiler and furnace linings",
                    "Thermal systems in industrial, commercial, or residential buildings",
                  ].map((text, index) => (
                    <Box
                      key={index}
                      className="flex items-center gap-3 md:gap-4"
                    >
                      <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-[#6b6b6b] shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4b2c5e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="6" />
                          <circle cx="12" cy="12" r="2" />
                        </svg>
                      </Box>
                      <Typography className="text-sm md:text-base">
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center p-8"
              >
                <Paper
                  elevation={3}
                  className="w-full max-w-2xl p-8"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "2rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                  }}
                >
                  <motion.p
                    className="text-[#4B2C5E] font-helvetica font-normal leading-normal italic
                      mb-4 md:mb-6 
                      text-base sm:text-lg md:text-xl 
                      w-full sm:w-[80%] md:w-[580px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <b> Start your free claim today. Let's fight together.</b>
                    <br></br>
                    This exposure wasn't your choice. But taking action is.
                  </motion.p>
                  <form
                    onSubmit={handleSubmit}
                    id="lead-form"
                    className="space-y-6"
                    data-tf-element-role="offer"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        {/* Hidden TrustedForm field (separate from firstName) */}

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

                        {/* First Name TextField (now clean) */}
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
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

                        <TextField
                          id="lastName"
                          name="lastName"
                          label="Last Name *"
                          variant="standard"
                          type="text"
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
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

                        <TextField
                          id="phoneNumber"
                          name="phoneNumber"
                          label="Phone Number *"
                          variant="standard"
                          type="number"
                          inputProps={{
                            maxLength: 10, // Restricts input to 10 characters
                            pattern: "\\d{10}", // Regex for exactly 10 digits
                            inputMode: "numeric", // Shows numeric keyboard on mobile
                          }}
                          fullWidth
                          value={formatPhoneNumber(formData.phoneNumber)}
                          onChange={handleChange}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber}
                          placeholder="+1 XXX-XXX-XXXX"
                          sx={textFieldStyle}
                        />
                      </div>
                      <div className="w-full md:flex-1">
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

                        <TextField
                          id="emailId"
                          name="emailId"
                          label="Email ID *"
                          variant="standard"
                          type="email"
                          fullWidth
                          value={formData.emailId}
                          onChange={handleChange}
                          error={!!errors.emailId}
                          helperText={errors.emailId}
                          sx={textFieldStyle}
                        />
                      </div>
                    </div>

                    {/* <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                                              <div className="w-full md:flex-1">
                                                                  <FormControl
                                                                      fullWidth
                                                                      error={!!errors.state}
                                                                      variant="standard"
                                                                  >
                                                                      <InputLabel
                                                                          id="state-label"
                                                                          sx={{
                                                                              color: "#4b2c5e",
                                                                              fontSize: "20px",
                                                                              fontFamily: "Helvetica",
                                                                              fontWeight: "bold",
                                                                              "&.Mui-focused": {
                                                                                  color: "#4b2c5e",
                                                                              },
                                                                          }}
                                                                      >
                                                                          State *
                                                                      </InputLabel>
                                                                      <Select
                                                                          labelId="state-label"
                                                                          id="state"
                                                                          name="state"
                                                                          value={formData.state}
                                                                          label="State *"
                                                                          onChange={handleChange}
                                                                          sx={selectFieldStyle}
                                                                          MenuProps={{
                                                                              PaperProps: {
                                                                                  sx: {
                                                                                      "& .MuiMenuItem-root": menuItemStyle,
                                                                                  },
                                                                              },
                                                                          }}
                                                                      >
                                                                          <MenuItem value="">Select a state</MenuItem>
                                                                          {usStates.map((state) => (
                                                                              <MenuItem key={state.value} value={state.value}>
                                                                                  {state.label}
                                                                              </MenuItem>
                                                                          ))}
                                                                      </Select>
                                                                      {errors.state && (
                                                                          <FormHelperText>{errors.state}</FormHelperText>
                                                                      )}
                                                                  </FormControl>
                                                              </div>
                                                          </div> */}

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

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
                          inputProps={{
                            max: new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 18
                              )
                            )
                              .toISOString()
                              .split("T")[0], // Restricts dates to 18+ only
                          }}
                          sx={textFieldStyle}
                        />
                      </div>
                      <div className="w-full md:flex-1">
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

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
                          helperText={errors.dateOfDiagnosis || ""}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{
                            max: new Date().toISOString().split("T")[0], // Blocks dates after today
                          }}
                          sx={{
                            ...textFieldStyle,
                            "& .MuiInput-input": {
                              cursor: "pointer", // Shows it's clickable
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <FormControl
                          fullWidth
                          error={!!errors.diagnosisType}
                          variant="standard"
                        >
                          <input
                            type="hidden"
                            id="xxTrustedFormCertUrl"
                            name="xxTrustedFormCertUrl"
                          />

                          <InputLabel
                            id="diagnosis-type-label"
                            sx={{
                              color: "#4b2c5e",
                              fontSize: "20px",
                              fontFamily: "Helvetica",
                              "&.Mui-focused": {
                                color: "#4b2c5e",
                              },
                            }}
                          >
                            Type of Diagnosis *
                          </InputLabel>
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
                                  "& .MuiMenuItem-root": menuItemStyle,
                                },
                              },
                            }}
                          >
                            <MenuItem value="">Select diagnosis type</MenuItem>
                            <MenuItem value="mesothelioma">
                              Mesothelioma
                            </MenuItem>
                            <MenuItem value="lung_cancer">Lung Cancer</MenuItem>

                          </Select>
                          {errors.diagnosisType && (
                            <FormHelperText>
                              {errors.diagnosisType}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                      <div className="w-full md:flex-1">
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

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

                    {formData.diagnosisType === "other" && (
                      <div>
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

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
                      {/* <div className="flex items-start gap-4 font-['Helvetica']">
                                                                  <input
                                                                      type="checkbox"
                                                                      name="settlement"
                                                                      checked={formData.settlement}
                                                                      onChange={handleChange}
                                                                      className="mt-1"
                                                                  />
                                                                  <div className="text-xs sm:text-sm">
                                                                      I would be needing help to file a settlement.
                                                                  </div>
                                                              </div> */}
                      {errors.settlement && (
                        <div className="text-red-500 text-sm">
                          {errors.settlement}
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

                        <input
                          type="checkbox"
                          name="privacyPolicy"
                          checked={formData.privacyPolicy}
                          onChange={handleChange}
                          className="mt-1"
                        />
                        <div className="text-xs sm:text-sm font-['Helvetica'] ">
                          <span
                            className="block"
                            data-tf-element-role="consent-opt-in"
                          >
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
                            &nbsp; and give my express written consent,
                            affiliates and/or lawyer to contact you at the
                            number provided above, even if this number is a
                            wireless number or if I am presently listed on a Do
                            Not Call list. I understand that I may be contacted
                            by telephone, email, text message or mail regarding
                            case options and that I may be called using
                            automatic dialing equipment. Message and data rates
                            may apply. My consent does not require purchase.
                            This is Legal advertising.
                          </span>
                          <span> </span>
                        </div>
                      </div>
                      {errors.privacyPolicy && (
                        <div className="text-red-500 text-sm">
                          {errors.privacyPolicy}
                        </div>
                      )}

                      <div className="flex items-start gap-4 font-['Helvetica']">
                        <input
                          type="hidden"
                          id="xxTrustedFormCertUrl"
                          name="xxTrustedFormCertUrl"
                        />

                        {/* <input
                          type="checkbox"
                          name="humanVerification"
                          checked={formData.humanVerification}
                          onChange={handleChange}
                          data-tf-element-role="consent-opt-in"
                          className="mt-1"
                        />
                        <div className="text-xs sm:text-sm">
                          Please check this box to verify you're a person.
                        </div> */}
                        <CustomCaptcha onCaptchaChange={(isValid) => {
                          setFormData(prev => ({
                            ...prev,
                            humanVerification: isValid
                          }));
                        }} />
                      </div>
                      {errors.humanVerification && (
                        <div className="text-red-500 text-sm">
                          {errors.humanVerification}
                        </div>
                      )}
                    </div>

                    <div className="text-left sm:text-left">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        data-tf-element-role="consent-opt-in"
                        className={`rounded-[10px] bg-[#4b2c5e] text-[#f8f2e9] px-8 sm:px-12 py-3 sm:py-4 font-bold transition-colors text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 ${isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-[#3a2249]"
                          }`}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress size={20} color="inherit" />
                            Submitting...
                          </>
                        ) : (
                          "Submit"
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
    </>
  );
}

export default SubLanderSeven;
