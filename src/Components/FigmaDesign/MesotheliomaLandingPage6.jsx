import React, { useState, useEffect } from "react";
import WorkerImage from "../../assets/6.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendConstructionFormEmail } from "../../utils/emailService";
import logo from "../../assets/MesoLogoWhite.png";
import Svg1 from "../../assets/SY1.svg";
import Svg2 from "../../assets/SY2.svg";
import Svg3 from "../../assets/SY3.svg";
import useDynamicPhoneNumber from "../../hooks/useDynamicPhoneNumber";
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
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";

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

const MesotheliomaLandingPage6 = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [diagnosisType, setDiagnosisType] = useState("");
  const [otherDiagnosis, setOtherDiagnosis] = useState("");
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const { phoneNumber, getCleanPhoneNumber } = useDynamicPhoneNumber();
  const [formData, setFormData] = useState({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateOfDiagnosis, setDateOfDiagnosis] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });

  const [startDate, setStartDate] = useState(null);
  // Add email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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

  const fetchCertData = async (certUrl) => {
    try {
      const response = await fetch(certUrl);
      const data = await response.json();
      console.log("TrustedForm Cert Data:", data);
    } catch (error) {
      console.error("Error fetching TrustedForm cert:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: digitsOnly,
        }));
      }
      return;
    }

    // Special handling for name fields
    if (name === "firstName" || name === "lastName" || name === "jobTitle") {
      // Remove numbers and special characters except allowed ones
      const sanitizedValue = value.replace(/[^A-Za-z\s\-'\.]/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: sanitizedValue,
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.emailId ||
      !formData.phoneNumber ||
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
        dateOfDiagnosis: dateOfDiagnosis,
        dateOfBirth: birthDate,
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
          jobTitle: "",
          story: "",
          dateOfDiagnosis: "",
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

  // Custom date picker styles
  const customDatePickerStyles = {
    control: (base) => ({
      ...base,
      background: "#4B2C5E",
      border: "none",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      color: "white",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      background: "#4B2C5E",
      color: "white",
      zIndex: 50,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#6B3C7E" : "#4B2C5E",
      color: "white",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#6B3C7E",
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={WorkerImage}
          alt="Worker with protective gear"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-center justify-center max-w-7xl mx-auto">
        {/* Logo - Moved outside the left section */}
        <div className="absolute top-4 left-4 z-20">
          <a href="/">
            <img
              src={logo}
              alt="Mesotheliamo Logo"
              className="h-[auto] w-[150px] sm:w-[200px]"
            />
          </a>
        </div>

        {/* Left Section */}
        <div className="w-full lg:w-3/5 text-white pl-4 lg:pl-4 pr-6 lg:pr-12 flex flex-col items-start">
          {/* Main Heading */}
          <div className="mt-24 sm:mt-28 lg:mt-12 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Diagnosed with Mesothelioma After Working in Shipyards?
            </h1>
            <p className="mt-4 text-sm lg:text-base">
              Shipbuilding was critical to American defense and commerce, but
              for many shipyard workers, the job came with invisible risks. If
              you've been diagnosed with mesothelioma after working in a
              shipyard, you may be entitled to significant compensation due to
              asbestos exposure.
            </p>
          </div>

          {/* Industry Icons */}
          <div className="mt-24 flex flex-col gap-6">
            {/* Structural Trades */}
            <div className="flex items-center gap-4">
              <div className="bg-[#4B2C5E] p-4 rounded-lg">
                <img src={Svg1} alt="Auto Repair Icon" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Pipe insulation and boiler lagging
                </h3>
                {/* <p className="text-xs mt-1">Renovation Contractors, Bricklayers, and Masons</p> */}
              </div>
            </div>

            {/* Skilled Trades */}
            <div className="flex items-center gap-4">
              <div className="bg-[#4B2C5E] p-4 rounded-lg">
                <img src={Svg2} alt="Auto Repair Icon" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Gaskets, valves, and pumps{" "}
                </h3>
                {/* <p className="text-xs mt-1">Electricians, Plumbers, Carpenters, Roofers</p> */}
              </div>
            </div>

            {/* Mechanical Trades */}
            <div className="flex items-center gap-4">
              <div className="bg-[#4B2C5E] p-4 rounded-lg">
                <img src={Svg3} alt="Auto Repair Icon" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Bulkhead panels and flooring materials{" "}
                </h3>
              </div>
            </div>
          </div>

          {/* Phone Button - Now after industry sections */}
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
              <span>{phoneNumber}</span>
            </button>
          </div>
        </div>

        {/* Right Section - Claim Form */}
        <div className="w-full lg:w-2/5 text-white p-6 lg:p-10 flex items-center justify-center">
          {/* Form */}
          <div className="space-y-6 bg-[#4B2C5E]/90 backdrop-blur-sm rounded-2xl p-6 mt-16 lg:mt-24">
            <h2 className="text-2xl font-bold">Claim Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitStatus.message && (
                <div
                  className={`p-4 rounded-md ${
                    submitStatus.success
                      ? "bg-green-500/20 text-green-200"
                      : "bg-red-500/20 text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

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

              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name *"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number *"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:text-black [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  placeholder="Email ID *"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div className="relative">
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  dateFormat="MM/dd/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Date of birth *"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                  wrapperClassName="w-full"
                  popperClassName="z-50"
                  popperPlacement="bottom-start"
                  maxDate={new Date()}
                  showMonthDropdown
                  dropdownMode="select"
                  calendarClassName="bg-[#4B2C5E] text-white border-none"
                  dayClassName={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date > today
                      ? "text-white/30 cursor-not-allowed"
                      : "text-white hover:bg-[#6B3C7E]";
                  }}
                  monthClassName={() => "text-white hover:bg-[#6B3C7E]"}
                  yearClassName={() => "text-white hover:bg-[#6B3C7E]"}
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div className="flex items-center justify-between px-2 py-2">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="text-white hover:bg-[#6B3C7E] p-1 rounded"
                      >
                        {"<"}
                      </button>
                      <div className="flex gap-2">
                        <select
                          value={date.getMonth()}
                          onChange={({ target: { value } }) => {
                            const newDate = new Date(date);
                            newDate.setMonth(parseInt(value));
                            setBirthDate(newDate);
                          }}
                          className="bg-[#4B2C5E] text-white border-none rounded px-2 py-1"
                        >
                          {Array.from({ length: 12 }, (_, i) => (
                            <option
                              key={i}
                              value={i}
                              className="bg-[#4B2C5E] text-white"
                            >
                              {new Date(0, i).toLocaleString("default", {
                                month: "long",
                              })}
                            </option>
                          ))}
                        </select>
                        <select
                          value={date.getFullYear()}
                          onChange={({ target: { value } }) => {
                            const newDate = new Date(date);
                            newDate.setFullYear(parseInt(value));
                            setBirthDate(newDate);
                          }}
                          className="bg-[#4B2C5E] text-white border-none rounded px-2 py-1"
                        >
                          {Array.from({ length: 100 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                              <option
                                key={year}
                                value={year}
                                className="bg-[#4B2C5E] text-white"
                              >
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="text-white hover:bg-[#6B3C7E] p-1 rounded"
                      >
                        {">"}
                      </button>
                    </div>
                  )}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-white/70 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <div className="relative">
                <input
                  type="hidden"
                  id="xxTrustedFormCertUrl"
                  name="xxTrustedFormCertUrl"
                />

                <DatePicker
                  selected={dateOfDiagnosis}
                  onChange={(date) => setDateOfDiagnosis(date)}
                  dateFormat="MM/dd/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Date of Diagnosis *"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                  wrapperClassName="w-full"
                  popperClassName="z-50"
                  popperPlacement="bottom-start"
                  dropdownMode="select"
                  calendarClassName="bg-[#4B2C5E] text-white border-none"
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-white/70 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <div className="relative">
                  <select
                    className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30 appearance-none pr-10"
                    value={diagnosisType}
                    onChange={(e) => setDiagnosisType(e.target.value)}
                  >
                    <option value="" disabled>
                      Type of Diagnosis *
                    </option>
                    <option value="mesothelioma">Mesothelioma</option>
                    <option value="lung-cancer">Lung Cancer</option>
                    <option value="asbestosis">Asbestosis</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {diagnosisType === "other" && (
                <div>
                  <input
                    type="text"
                    placeholder="Please specify your diagnosis *"
                    value={otherDiagnosis}
                    onChange={(e) => setOtherDiagnosis(e.target.value)}
                    className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              )}

              <div>
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleInputChange}
                  placeholder="Tell us your story (optional)"
                  className="w-full bg-[#4B2C5E] border-none rounded-md p-2 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[80px]"
                ></textarea>
              </div>

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

              <div className="flex items-start space-x-2">
                {/* <input
                  type="checkbox"
                  id="consent2"
                  name="isHuman"
                  checked={formData.isHuman}
                  onChange={handleInputChange}
                  className="mt-1 rounded border-white text-purple-800 focus:ring-0 focus:ring-offset-0"
                />
                <div className="text-xs sm:text-sm">
                  Please check this box to verify you're a person.
                </div> */}
                <CustomCaptcha onCaptchaChange={(isValid) => {
                  setFormData(prev => ({
                    ...prev,
                    isHuman: isValid
                  }));
                }} />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-purple-900 hover:bg-gray-100 py-2 px-4 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {!isSubmitting && (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesotheliomaLandingPage6;
