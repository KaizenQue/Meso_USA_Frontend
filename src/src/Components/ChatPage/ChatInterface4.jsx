"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Phone } from "lucide-react";
import {
  Button,
  Alert,
  AlertTitle,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ChatImg from "../../assets/chatImg.jpg";
import useDynamicPhoneNumber from "../../hooks/useDynamicPhoneNumber";
import { sendLandingPageFormEmail } from "../../utils/emailService";

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-start gap-2">
    <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  </div>
);

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

export default function ChatInterface() {
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const { phoneNumber } = useDynamicPhoneNumber();
  const [showInitialResponse, setShowInitialResponse] = useState(false);
  const [showDiagnosisIntro, setShowDiagnosisIntro] = useState(false);
  const [showDiagnosisQuestion, setShowDiagnosisQuestion] = useState(false);
  const [showQualifiedIntro, setShowQualifiedIntro] = useState(false);
  const [showQualifiedDetails, setShowQualifiedDetails] = useState(false);
  const [showQualifiedCall, setShowQualifiedCall] = useState(false);
  const [showNotQualified, setShowNotQualified] = useState(false);
  const [showNotQualifiedMessage1, setShowNotQualifiedMessage1] =
    useState(false);
  const [showNotQualifiedMessage2, setShowNotQualifiedMessage2] =
    useState(false);
  const [showNotQualifiedMessage3, setShowNotQualifiedMessage3] =
    useState(false);
  const [showNotQualifiedMessage4, setShowNotQualifiedMessage4] =
    useState(false);
  const [showNotQualifiedMessage5, setShowNotQualifiedMessage5] =
    useState(false);
  const [showNotQualifiedMessage6, setShowNotQualifiedMessage6] =
    useState(false);
  const [showDeclined, setShowDeclined] = useState(false);
  const [showDeclinedMessage1, setShowDeclinedMessage1] = useState(false);
  const [showDeclinedMessage2, setShowDeclinedMessage2] = useState(false);
  const [showTyping, setShowTyping] = useState(true);
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [showMessage1, setShowMessage1] = useState(false);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
  const [showMessage4, setShowMessage4] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [diagnosisResponse, setDiagnosisResponse] = useState("");
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [openVerification, setOpenVerification] = useState(false);
  const [openPrivacyPolicy, setOpenPrivacyPolicy] = useState(false);
  const [openDisclaimer, setOpenDisclaimer] = useState(false);
  const [verificationForm, setVerificationForm] = useState({
    name: "",
    number: "",
    email: "",
    consent: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    number: "",
    email: "",
    consent: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [errors, setErrors] = useState({});

  const [capVal, setCapVal] = useState(null);

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

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [
    showInitialMessage,
    showMessage1,
    showMessage2,
    showMessage3,
    showMessage4,
    showInitialResponse,
    showDiagnosisIntro,
    showDiagnosisQuestion,
    showQualifiedIntro,
    showQualifiedDetails,
    showQualifiedCall,
    showNotQualified,
    showNotQualifiedMessage1,
    showNotQualifiedMessage2,
    showNotQualifiedMessage3,
    showNotQualifiedMessage4,
    showNotQualifiedMessage5,
    showNotQualifiedMessage6,
    showDeclined,
    showDeclinedMessage1,
    showDeclinedMessage2,
    showTyping,
  ]);

  useEffect(() => {
    // Show initial message after typing animation
    const timer1 = setTimeout(() => {
      setShowTyping(false);
      setShowInitialMessage(true);
    }, 1300);

    const timer2 = setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setShowMessage1(true);
      }, 1300);
    }, 1600);

    const timer3 = setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setShowMessage2(true);
      }, 1500);
    }, 3400);

    const timer4 = setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setShowMessage3(true);
      }, 1500);
    }, 5000);

    const timer5 = setTimeout(() => {
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setShowMessage4(true);
      }, 1300);
    }, 6600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleInitialYes = () => {
    setUserResponse("Yes");
    setShowInitialResponse(true);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setShowDiagnosisIntro(true);
      setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setShowDiagnosisQuestion(true);
          scrollToBottom();
        }, 1300);
      }, 1800);
    }, 1300);
  };

  const handleInitialNo = () => {
    setUserResponse("No");
    setShowInitialResponse(true);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setShowDeclined(true);
      setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setShowDeclinedMessage1(true);
          setTimeout(() => {
            setShowTyping(true);
            setTimeout(() => {
              setShowTyping(false);
              setShowDeclinedMessage2(true);
              scrollToBottom();
            }, 1300);
          }, 1800);
        }, 1300);
      }, 1800);
    }, 1300);
  };

  const handleDiagnosisYes = () => {
    setDiagnosisResponse("Yes");
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setShowQualifiedIntro(true);
      setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setShowQualifiedDetails(true);
          setTimeout(() => {
            setShowTyping(true);
            setTimeout(() => {
              setShowTyping(false);
              setShowQualifiedCall(true);
              scrollToBottom();
            }, 1300);
          }, 1800);
        }, 1300);
      }, 1800);
    }, 1300);
  };

  const handleDiagnosisNo = () => {
    setDiagnosisResponse("No");
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setShowNotQualified(true);
      setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => {
          setShowTyping(false);
          setShowNotQualifiedMessage1(true);
          setTimeout(() => {
            setShowTyping(true);
            setTimeout(() => {
              setShowTyping(false);
              setShowNotQualifiedMessage2(true);
              setTimeout(() => {
                setShowTyping(true);
                setTimeout(() => {
                  setShowTyping(false);
                  setShowNotQualifiedMessage3(true);
                  setTimeout(() => {
                    setShowTyping(true);
                    setTimeout(() => {
                      setShowTyping(false);
                      setShowNotQualifiedMessage4(true);
                      setTimeout(() => {
                        setShowTyping(true);
                        setTimeout(() => {
                          setShowTyping(false);
                          setShowNotQualifiedMessage5(true);
                          setTimeout(() => {
                            setShowTyping(true);
                            setTimeout(() => {
                              setShowTyping(false);
                              setShowNotQualifiedMessage6(true);
                              scrollToBottom();
                            }, 1300);
                          }, 1800);
                        }, 1300);
                      }, 1800);
                    }, 1300);
                  }, 1800);
                }, 1300);
              }, 1800);
            }, 1300);
          }, 1800);
        }, 1300);
      }, 1800);
    }, 1300);
  };

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

  const handleVerificationOpen = () => {
    setOpenVerification(true);
  };

  const handleVerificationClose = () => {
    setOpenVerification(false);
  };

  const validateForm = () => {
    let errors = {
      name: "",
      number: "",
      email: "",
      consent: "",
    };
    let isValid = true;

    // Name validation - only letters and spaces, minimum 2 characters
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!verificationForm.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    } else if (!nameRegex.test(verificationForm.name.trim())) {
      errors.name = "Name should only contain letters and spaces";
      isValid = false;
    }
    if (!capVal) {
      newErrors.captcha = "Please verify you're not a robot";
      valid = false;
    }
    // Phone number validation - exactly 10 digits, no letters or special characters
    const phoneRegex = /^\d{10}$/;
    if (!verificationForm.number.trim()) {
      errors.number = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(verificationForm.number.replace(/\D/g, ""))) {
      errors.number = "Please enter exactly 10 digits (numbers only)";
      isValid = false;
    }

    // Email validation - standard email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!verificationForm.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(verificationForm.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Consent validation
    if (!verificationForm.consent) {
      errors.consent = "You must agree to the privacy policy and disclaimer";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleVerificationSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await sendLandingPageFormEmail(
          {
            fullName: verificationForm.name,
            email: verificationForm.email,
            phone: verificationForm.number,
            countryCode: "+1", // Default to US country code
          },
          {
            xxTrustedFormCertUrl: certId,
            xxTrustedFormPingUrl: pingUrl,
            xxTrustedFormCertToken: tokenUrl,
          }
        );

        if (response.success) {
          setFormSubmitted(true);
          setShowSuccessCard(true);
          // Reset form after successful submission
          setVerificationForm({
            name: "",
            number: "",
            email: "",
            consent: false,
          });
          handleVerificationClose();
          // Open phone dialer
          window.location.href = `tel:${phoneNumber}`;
        } else {
          console.error("Failed to submit form:", response.error);
          setErrors((prev) => ({
            ...prev,
            submit: "Failed to submit form. Please try again.",
          }));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "An error occurred. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (type === "checkbox") {
      processedValue = checked;
    } else if (name === "number") {
      // Remove any non-digit characters
      processedValue = value.replace(/\D/g, "");
      // Limit to 10 digits
      processedValue = processedValue.slice(0, 10);
    }

    setVerificationForm((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    // Clear error when user starts typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${ChatImg})` }}
    >
      <form
        onSubmit={handleSubmit}
        id="lead-form"
        className="space-y-6"
        data-tf-element-role="offer"
        hidden
      >
        <DialogContent>
          <div className="space-y-4 mt-4">
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
                type="hidden"
                id="xxTrustedFormCertUrl"
                name="xxTrustedFormCertUrl"
              />
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={verificationForm.name}
                onChange={handleInputChange}
                variant="outlined"
                error={!!formErrors.name}
                helperText={formErrors.name}
                InputProps={{
                  className: "text-gray-800",
                }}
                InputLabelProps={{
                  className: "text-gray-600",
                }}
                required
              />
            </div>

            <div>
              <input
                type="hidden"
                id="xxTrustedFormCertUrl"
                name="xxTrustedFormCertUrl"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="number"
                value={verificationForm.number}
                onChange={handleInputChange}
                variant="outlined"
                error={!!formErrors.number}
                helperText={formErrors.number}
                placeholder="(123) 456-7890"
                InputProps={{
                  className: "text-gray-800",
                }}
                InputLabelProps={{
                  className: "text-gray-600",
                }}
                required
              />
            </div>

            <div>
              <input
                type="hidden"
                id="xxTrustedFormCertUrl"
                name="xxTrustedFormCertUrl"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={verificationForm.email}
                onChange={handleInputChange}
                variant="outlined"
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  className: "text-gray-800",
                }}
                InputLabelProps={{
                  className: "text-gray-600",
                }}
                required
              />
            </div>
          </div>
          <div className="text-xs sm:text-sm font-['Helvetica'] mt-4 text-gray-600">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={verificationForm.consent}
                onChange={handleInputChange}
                className="mt-1"
              />
              <label htmlFor="consent" className="block">
                <span className="block" data-tf-element-role="consent-opt-in">
                  I agree to the{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenPrivacyPolicy(true);
                    }}
                    className="underline hover:text-blue-600"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDisclaimer(true);
                    }}
                    className="underline hover:text-blue-600"
                  >
                    disclaimer
                  </a>
                  &nbsp; and give my express written consent, affiliates and/or
                  lawyer to contact you at the number provided above, even if
                  this number is a wireless number or if I am presently listed
                  on a Do Not Call list. I understand that I may be contacted by
                  telephone, email, text message or mail regarding case options
                  and that I may be called using automatic dialing equipment.
                  Message and data rates may apply. My consent does not require
                  purchase. This is Legal advertising.
                </span>
              </label>
            </div>
            {formErrors.consent && (
              <p className="text-red-500 text-xs mt-1">{formErrors.consent}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col h-full max-w-md mx-auto w-full">
        {/* Warning Alert */}
        {/* <Alert severity="warning" className="mb-4">
          <AlertTitle>Warning</AlertTitle>
          <Typography variant="body2">
            This is a demonstration chat interface. Do not share personal information.
          </Typography>
        </Alert> */}

        {/* Online Status */}
        <div className="flex items-center gap-2 mb-4 bg-black/30 p-3 rounded-lg">
          <div className="relative">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <div className="absolute top-0 left-0 h-3 w-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <span className="text-white font-medium">Scarlett is online</span>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 h-[calc(100vh-200px)]"
        >
          {/* Initial message */}
          {showTyping && !showInitialMessage && <TypingIndicator />}
          {showInitialMessage && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Hi, I'm Scarlett from Connect2Attorney.</p>
              </div>
            </div>
          )}

          {showTyping && showInitialMessage && !showMessage1 && (
            <TypingIndicator />
          )}
          {showMessage1 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>If you used talcum powder regularly and were later diagnosed with ovarian cancer, you may be eligible for legal compensation.</p>
              </div>
            </div>
          )}

          {showTyping && showMessage1 && !showMessage2 && <TypingIndicator />}
          {showMessage2 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Would you like to check if you qualify?</p>
                {!showInitialResponse && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleInitialYes}
                    >
                      ✅ Yes
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={handleInitialNo}
                    >
                      ❌ No
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Initial Response */}
          {showInitialResponse && (
            <div className="flex items-start justify-end mb-0">
              <div className="bg-green-600/90 text-white py-2 px-3 rounded-lg rounded-tr-none max-w-[80%] mb-0">
                <p className="mb-0">{userResponse}</p>
              </div>
            </div>
          )}

          {/* Diagnosis Question */}
          {showTyping &&
            showInitialResponse &&
            !showDiagnosisIntro &&
            !showDiagnosisQuestion &&
            !showDeclined && <TypingIndicator />}
          {showDiagnosisIntro && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Thanks. Just one quick question:</p>
              </div>
            </div>
          )}

          {showTyping &&
            showDiagnosisIntro &&
            !showDiagnosisQuestion &&
            !showDeclined && <TypingIndicator />}
          {showDiagnosisQuestion && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Were you diagnosed with ovarian cancer after long-term use of talcum powder products like Johnson's Baby Powder or Shower to Shower?</p>
                {!showQualifiedIntro && !showNotQualified && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleDiagnosisYes}
                    >
                      ✅ Yes
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={handleDiagnosisNo}
                    >
                      ❌ No
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Diagnosis Response */}
          {diagnosisResponse && (
            <div className="flex items-start justify-end mb-0">
              <div className="bg-green-600/90 text-white py-2 px-3 rounded-lg rounded-tr-none max-w-[80%] mb-0">
                <p className="mb-0">{diagnosisResponse}</p>
              </div>
            </div>
          )}

          {/* Qualified Response */}
          {showQualifiedIntro && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>You may be entitled to compensation for your medical costs, pain and suffering, and more — with no upfront legal fees.</p>
              </div>
            </div>
          )}

          {showTyping &&
            showQualifiedIntro &&
            !showQualifiedDetails &&
            !showNotQualified && <TypingIndicator />}
          {showQualifiedDetails && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Tap below to speak with a legal expert for your free case review.</p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mt-2 playbtn relative inline-block w-full text-center py-4 px-6 mb-4 text-white font-semibold tracking-wider overflow-hidden"
                  startIcon={<Phone />}
                  onClick={handleVerificationOpen}
                >
                  <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent to-white animate-border-top"></span>
                  <span className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent to-white animate-border-right"></span>
                  <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent to-white animate-border-bottom"></span>
                  <span className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-transparent to-white animate-border-left"></span>
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-lg">
                      CALL NOW - FREE CASE REVIEW {phoneNumber}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          )}

          {/* Not Qualified Response */}
          {showNotQualified && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Thanks for your response.</p>
              </div>
            </div>
          )}

          {showTyping && showNotQualified && !showNotQualifiedMessage1 && (
            <TypingIndicator />
          )}
          {showNotQualifiedMessage1 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>We're currently helping individuals diagnosed with ovarian cancer after talcum powder use.</p>
              </div>
            </div>
          )}

          {showTyping &&
            showNotQualifiedMessage1 &&
            !showNotQualifiedMessage2 && <TypingIndicator />}
          {showNotQualifiedMessage2 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Not eligible right now? No problem. If anything changes or you need help with another case, we're always just a click away:</p>
                <p className="mt-2">
                  <a href="mailto:enquiry@connect2attorney.com" className="text-blue-400 hover:underline">
                    enquiry@connect2attorney.com
                  </a>
                </p>
                <p>
                  <a href="https://connect2attorney.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://connect2attorney.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Declined Response */}
          {showDeclined && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>Totally understand.</p>
              </div>
            </div>
          )}

          {showTyping && showDeclined && !showDeclinedMessage1 && (
            <TypingIndicator />
          )}
          {showDeclinedMessage1 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>If you or someone you know is impacted by talcum powder use, we're here to help.</p>
              </div>
            </div>
          )}

          {showTyping && showDeclinedMessage1 && !showDeclinedMessage2 && (
            <TypingIndicator />
          )}
          {showDeclinedMessage2 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Scarlett</div>
                <p>You can reach us anytime at:</p>
                <p className="mt-2">
                  <a href="mailto:enquiry@connect2attorney.com" className="text-blue-400 hover:underline">
                    enquiry@connect2attorney.com
                  </a>
                </p>
                <p>
                  <a href="https://connect2attorney.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    https://connect2attorney.com
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Add this at the bottom of the messages */}
          <div ref={bottomRef} />
        </div>

        {/* Message input - just for visual completion */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-gray-1300/70 text-white rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 p-2">
            <MessageSquare className="h-5 w-5" />
          </button>
        </div> */}
      </div>

      {/* Verification Dialog */}
      <Dialog
        open={openVerification}
        onClose={(event, reason) => {
          if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
          }
          handleVerificationClose();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "white",
            color: "black",
            borderRadius: "12px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle className="text-center text-xl font-bold text-gray-800">
          Verify You Are Not a Robot
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-4">
            {errors.submit && (
              <Alert severity="error" className="mb-4">
                {errors.submit}
              </Alert>
            )}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={verificationForm.name}
              onChange={handleInputChange}
              variant="outlined"
              error={!!formErrors.name}
              helperText={formErrors.name}
              InputProps={{
                className: "text-gray-800",
              }}
              InputLabelProps={{
                className: "text-gray-600",
              }}
              required
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="number"
              value={verificationForm.number}
              onChange={handleInputChange}
              variant="outlined"
              error={!!formErrors.number}
              helperText={formErrors.number}
              placeholder="(123) 456-7890"
              InputProps={{
                className: "text-gray-800",
              }}
              InputLabelProps={{
                className: "text-gray-600",
              }}
              required
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={verificationForm.email}
              onChange={handleInputChange}
              variant="outlined"
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                className: "text-gray-800",
              }}
              InputLabelProps={{
                className: "text-gray-600",
              }}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="text-xs sm:text-sm font-['Helvetica'] mt-4 text-gray-600">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={verificationForm.consent}
                onChange={handleInputChange}
                className="mt-1"
              />
              <label htmlFor="consent" className="block">
                <span className="block" data-tf-element-role="consent-opt-in">
                  I agree to the{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenPrivacyPolicy(true);
                    }}
                    className="underline hover:text-blue-600"
                  >
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDisclaimer(true);
                    }}
                    className="underline hover:text-blue-600"
                  >
                    disclaimer
                  </a>
                  &nbsp; and give my express written consent, affiliates and/or
                  lawyer to contact you at the number provided above, even if
                  this number is a wireless number or if I am presently listed
                  on a Do Not Call list. I understand that I may be contacted by
                  telephone, email, text message or mail regarding case options
                  and that I may be called using automatic dialing equipment.
                  Message and data rates may apply. My consent does not require
                  purchase. This is Legal advertising.
                </span>
              </label>
            </div>
            {formErrors.consent && (
              <p className="text-red-500 text-xs mt-1">{formErrors.consent}</p>
            )}

            <CustomCaptcha onCaptchaChange={(valid) => setCapVal(valid)} />
            {formErrors.captcha && (
              <p className="text-red-500 text-xs mt-1">{formErrors.captcha}</p>
            )}
          </div>
        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button
            onClick={handleVerificationSubmit}
            variant="contained"
            color="primary"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting || !verificationForm.consent || !capVal}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog
        open={openPrivacyPolicy}
        onClose={() => setOpenPrivacyPolicy(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "white",
            color: "black",
            borderRadius: "12px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle className="text-center text-xl font-bold text-gray-800">
          Privacy Policy
        </DialogTitle>
        <DialogContent>
          <div className="prose max-w-none">
            <h1>Privacy-Policy</h1>
            <p>
              The Privacy Policy outlined below discloses the specific ways in
              which Fightformesothelioma.com functions, how you should use it or
              can use it, how we collect user information and how that
              information is handled and protected. Your privacy is important to
              Fightformesothelioma.com, and we're committed to making sure it is
              protected. We use your information only in the ways described
              below.{" "}
            </p>
            <p>
              By using this website you consent to this Policy, including your
              consent to our use and disclosure of information about you in the
              manner described in this Policy.{" "}
            </p>
            <h3>Information Collection and Use</h3>
            <p>
              Fightformesothelioma.com receives but does not track, a variety of
              "personally identifiable information," including your email
              address, IP address, and message content. When we need to collect
              personally identifiable information from you to execute a
              requested transaction or provide you with a particular service, we
              will ask you to voluntarily supply us with the information we
              need. We may ask you for information such as, but not limited to:
              your name, address, telephone number, and email address to process
              your submission. You have the option of also providing information
              regarding your name, demographics (such as your state and country
              of residency), operating system, browser, Internet service
              provider ("ISP"), connection type and email program that you are
              using. Fightformesothelioma.com also automatically receives and
              records information on our server logs from your browser,
              including your IP Address and the page you requested. Your IP
              address is not linked to your email address or
              Fightformesothelioma.com.{" "}
            </p>
            <p>
              Fightformesothelioma.com does not collect your email address
              unless you actively provide it to the company so that we can
              communicate with you. When your Web browser or email application
              requests a Web page from another computer on the Internet it
              automatically gives that computer the address where the requested
              information should be sent. This is called your computer's "IP
              address." (IP stands for "Internet protocol.") For most users
              accessing the Internet from a dial-up ISP, the IP address may be
              different every time you log on. Fightformesothelioma.com receives
              your IP address each time you view a Web page from the Site. Your
              IP address is not linked to your email address or any other
              personally identifiable information.{" "}
            </p>

            <p>
              To diagnose service or technology problems reported by you that
              are associated with your IP address{" "}
            </p>
            <ul>
              <p>
                Your IP address may be used for various purposes, including:{" "}
              </p>
              <li>
                To diagnose service or technology problems reported by you that
                are associated with your IP address{" "}
              </li>
              <li>
                To estimate the total number of users visiting the Site from
                specific locales, countries or regions of the world{" "}
              </li>
            </ul>

            <p>
              In certain areas of this website, we require that you provide us
              with personally identifiable information, in order to be able to
              use that portion or those portions of this website. For instance,
              the names and contact information of persons who visit our website
              will be added to our database so that, for example, they may be
              contacted in the future regarding Fightformesothelioma.com
              services or future opportunities. Such contact may occur by email,
              telephone or mail, as Fightformesothelioma.com deems appropriate.{" "}
            </p>

            <ul>
              <h4>
                Fightformesothelioma.com uses your email address for the
                following purposes:{" "}
              </h4>
              <li>
                To notify you when you receive a Fightformesothelioma.com email
                message
              </li>
              <li>
                To communicate with you concerning problems or malfunctions you
                report{" "}
              </li>
            </ul>

            <p>
              The server collects information about which pages on the site are
              accessed and the duration of a visitor's time on the page.
              Fightformesothelioma.com is able to see how a visitor accessed the
              site, whether it is through a search engine or a specific
              advertising banner. We maintain physical, electronic and
              procedural safeguards, in accordance with applicable state and
              federal standards, to protect your personal financial information
              against risks such as loss, destruction or misuse. These measures
              include computer safeguards, secured files and buildings, and
              restrictions on who may access your personal information. In the
              event of a system compromise, Fightformesothelioma.com will
              implement all reasonable measures to ensure the integrity of the
              website's database is protected and ensure proper notice is
              provided under the law.{" "}
            </p>

            <h3>Log Files</h3>
            <p>
              When a Web page on the website is requested, that request
              (including the date and time) is logged on our servers with
              information including the IP address of the computer that
              requested the page. We use log files for debugging and
              troubleshooting purposes. IP addresses and access times are not
              linked to your email address or any other personally identifiable
              information.
            </p>
            <h3>Cookies</h3>
            <p>
              A cookie is a small amount of data, which often includes a unique
              identifier that is sent to your browser from a website's computers
              and then stored on your computer's hard drive. A cookie cannot
              obtain information from your hard drive, destroy files, or
              transmit viruses. Each website can send its own cookie to your
              browser, if your browser's preferences allow it. To protect your
              privacy, your browser normally only permits a website to access
              cookies that it has previously sent to you, but not the cookies
              sent to you by other sites. If you request certain services from
              us, Fightformesothelioma.com may then attempt to set cookies on
              your computer and later access those cookies. You can normally
              refuse cookies by setting preferences in your browser. You do not
              need to accept cookies in order to use the
              Fightformesothelioma.com service.
            </p>
            <h3>Choices about Cookies</h3>
            <p>
              You can normally configure your browser to accept all cookies,
              reject all cookies, or notify you when a cookie is set. (Each
              browser is different, so check the "Help" menu of your browser to
              learn how to change your cookie preferences.) If you reject all
              cookies, you will still be able to use Fightformesothelioma.com
              services. Cookies are used only as an option selected by you that
              allows us to recall your email address from the cookie that we
              sent to your computer. www.Fightformesothelioma.com.com.au uses
              Google Analytics to analyze this website's audience and for
              content improvement. No personal information is collected from
              Google Analytics.
            </p>

            <h3>Data Storage/User Information</h3>
            <p>
              All Fightformesothelioma.com account information (including names,
              phone numbers, and mailing addresses) and content of email
              messages are stored on multiple redundant disk storage systems. No
              removable offline copies or backups are made. If you request the
              deletion of your email address or any other identifiable
              information, your information will be deactivated and removed from
              our user registration database within 30 days. In reviewing the
              information above, please keep in mind Fightformesothelioma.com
              cannot and does not assume any responsibility for any actions or
              omissions of third parties, including other website users and
              including the manner in which they might use the information
              received either from Fightformesothelioma.com or independently.
            </p>

            <h3>Information Sharing and Disclosure</h3>
            <p>
              Fightformesothelioma.com will not sell or rent your email address,
              name, mailing address or other supplied information to anyone,
              except as provided in the legal disclaimer below.
            </p>

            <h3>Legal Disclaimer</h3>
            <p>
              We reserve the right to disclose your personally identifiable
              information, as required, to comply with the law, applicable
              regulations, governmental and quasi-governmental requests,
              judicial proceedings, court orders or subpoenas, to enforce our
              Legal Notices or other agreements, or to protect our rights,
              property or safety or the rights, or to protect the property or
              safety of our users or others (e.g., to a consumer reporting
              agency for fraud protection etc.), and to ensure the security of
              our network and services. Information obtained is utilized solely
              to improve and enhance the quality of Fightformesothelioma.com.
              Information submitted to www.Fightformesothelioma.com.com.au in
              some instances may be shared or sold to a third-party service
              provider. Fightformesothelioma.com will not share or sell
              information submitted to us to any third party unless consent is
              authorized by the visitor.
            </p>

            <p>
              For more information please see our Disclaimer page. To protect
              Personal Information (to the extent that you voluntarily provide
              it) from unauthorized access and use, we use security measures
              that comply with applicable federal and state laws. These measures
              may include device safeguards and secured files and buildings as
              well as oversight of our third-party service providers to ensure
              information remains confidential and secure. Transfer of Ownership
              and Sales of Assets In the event that
              www.Fightformesothelioma.com.com.au goes through a business
              transition, such as a merger, acquisition by another company, or
              sale of all or a portion of its assets, your personally
              identifiable information will likely be among the assets
              transferred to the extent that you voluntarily provided it. You
              will be notified via email and/or a prominent notice on our
              website of any change in ownership or uses of your personal
              information, as well as any choices you may have regarding your
              personal information.
            </p>

            <p>
              Spam, Spyware We do not tolerate spam or spyware coming to our
              website or going to our users through our website. If you suspect
              you received spam or spyware because you used
              www.Fightformesothelioma.com.com.au, please make us aware of the
              issue by alerting us with an email to
              teamup@Fightformesothelioma.com.com.au . You are not permitted to
              use our website to spam or send spyware to a third party.
            </p>
            <h3>Protecting Children's Privacy Online</h3>
            <p>
              We encourage parents and guardians to spend time with their
              children online and to be fully familiar with the websites visited
              by their children. We recognize the particular importance of
              protecting privacy where children are involved. We do not
              knowingly collect personally identifiable information online from
              children under the age of 13. If a child under the age of 13 has
              provided us with personally identifiable information online, we
              ask that a parent or guardian contact us at
              teamup@Fightformesothelioma.com.com.au or call +61470695167. Visit
              the Federal Trade Commission website for more information about
              the Children's Online Privacy Protection Act (COPPA). If you are
              between the ages of 13 and 18, please be sure to read this Privacy
              Policy with your parent and obtain his or her permission before
              you submit or post any Personal Information and before you use any
              features of this website.
            </p>
            <h3>Contacting You</h3>
            <p>
              By filling out and submitting information on our website, you give
              us or one of our affiliates or partners permission to contact you.
              We consider this permission not to be specific to services related
              to drug and medical devices but to include other applicable
              products and services we may market and advertise in the future.
            </p>
            <h3>Removing Your Information</h3>
            <p>
              Fightformesothelioma.com will retain your information for as long
              as your account is active or as needed to provide you services. If
              you wish to request that we no longer use your information to
              provide you services or updates on additional products, contact
              us. Additionally, we will retain and use your information as
              necessary to comply with our legal or regulatory obligations,
              resolve disputes, and enforce our agreements. If your personally
              identifiable information changes or if you no longer desire our
              service, you may update or amend your information with us or ask
              to have it removed from our database lists or production
              directory. Simply contact us by email or traditional mail. We will
              respond to your request to access within 30 calendar days.
            </p>
            <h3>Testimonials</h3>
            <p>
              If you submit a testimonial to us, we will ask for your permission
              to post your testimonial prior to any public use. We will post
              your name as given to us in your testimonial. Please be aware that
              any personally identifiable information you submit as a
              testimonial to be posted can be read, collected, or used by the
              general public, and could be used to send you unsolicited
              messages. We are not responsible for the personally identifiable
              information you choose to include in any testimonial you choose to
              submit. If at any time you decide to remove your testimonial,
              please contact us via email or postal mail.
            </p>
            <h3>Contacting Fightformesothelioma.com</h3>
            <p>
              If you have any questions, concerns or suggestions about our
              Privacy Policy or anything else about
              www.Fightformesothelioma.com.com.au, you may contact us in several
              ways. You can: Send an email to:
              teamup@Fightformesothelioma.com.com.au Any information sent to us
              through email is not encrypted by us. Notice to California
              Residents Residents of the State of California may request a list
              of all third parties to which this website has disclosed certain
              information during the preceding year for those third parties'
              direct marketing purposes. If you are a California resident and
              want such a list, please contact us at
              teamup@Fightformesothelioma.com.com.au For all requests, you must
              put the statement "California Shine the Light Privacy Request" in
              the body of your request, as well as your name, street address,
              city, state, and zip code. Please note that we are not responsible
              for requests that are not labeled or sent properly, or that do not
              have complete information.
            </p>

            <h3>Notice to Vermont Residents</h3>

            <p>
              We will not share any personal information about you with other
              businesses to the extent prohibited by applicable Vermont law or
              to the extent your prior consent to share is required by
              applicable Vermont law. For purposes of compliance with the
              Vermont Consumer Protection Act, if you are a resident of the
              State of Vermont and would like to opt-out from the disclosure of
              your personal information to any third-party for marketing
              purposes, please contact us at
              teamup@Fightformesothelioma.com.com.au
            </p>

            <h3>Changes to Privacy Policy</h3>
            <p>
              www.Fightformesothelioma.com.com.au updates or modifies this
              Privacy Policy from time to time. If we make material changes to
              this Privacy Policy or to how www.Fightformesothelioma.com.com.au
              will use your personal information, we will post those changes
              here. We reserve the right to make changes in this policy at any
              time. Please check the policy each time you use our website to
              ensure that you are aware of any changes in our privacy practices.
              Our Privacy Policy will indicate the date when it was updated.
              Your continued use of our website will signify your acceptance of
              the changes to our Privacy Policy. If you do not agree with the
              changes to how your information will be used, please do not
              continue to use our website. By using this website, you signify
              your consent to the www.Fightformesothelioma.com.com.au Privacy
              Policy. If you do not agree to this policy, please do not read or
              use www.Fightformesothelioma.com.com.au. When you request rate
              quotes or other information through
              www.Fightformesothelioma.com.com.au, you are authorizing us to
              share your information with our business partners, affiliates or
              associates who will contact you by phone, email, or mail. If you
              do not want further communication from them, please notify the
              partner directly. From time to time, we may add new websites that
              may or may not be listed in this Privacy Policy. Please note that
              this policy applies only to the information collected through this
              website and not to websites maintained by other companies or
              organizations to which we link. In addition, this policy applies
              only to information collected by
              www.Fightformesothelioma.com.com.au online or offline.
            </p>
            <h5>
              PLEASE PRINT AND RETAIN A COPY OF THIS PRIVACY POLICY FOR YOUR
              RECORDS.
            </h5>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrivacyPolicy(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Disclaimer Dialog */}
      <Dialog
        open={openDisclaimer}
        onClose={() => setOpenDisclaimer(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "white",
            color: "black",
            borderRadius: "12px",
            padding: "20px",
          },
        }}
      >
        <DialogTitle className="text-center text-xl font-bold text-gray-800">
          Legal Disclaimer
        </DialogTitle>
        <DialogContent>
          <div className="prose max-w-none">
            <h1>Disclaimer</h1>
            <p>
              Fightformesothelioma.com is a website dedicated to serving the
              public as an informational resource, providing accurate content
              about various medical treatments and associated side effects.
              Fightformesothelioma.com also connects users with its legal
              partners, who can evaluate whether an individual has a legal case
              as a result of side effects or complications caused by a medical
              treatment
            </p>
            <p>
              Fightformesothelioma.com is not affiliated with any pharmaceutical
              companies or drug manufacturers and does not accept advertising or
              host online advertisements.{" "}
            </p>
            <p>
              There may be times when a visitor comes to
              Fightformesothelioma.com looking for assistance with a drug or
              medical device and Fightformesothelioma determines that visitor
              would be better served by a trusted outside service provider or
              law firm. In those cases, the visitor may be contacted directly by
              that provider or firm.
            </p>
            <h3>CONSENT TO CONTACT</h3>
            <p>
              By submitting a form about a specific drug or medical device, you
              consent to be contacted by a Fightformesothelioma representative
              or a representative from the appropriate service provider. Any
              information provided to Fightformesothelioma.com will be shared
              with the service provider. Information provided to
              Fightformesothelioma.com will not be shared, sold or provided to a
              data collection company unless specifically authorized.{" "}
            </p>
            <h3>Updated with Latest Information</h3>
            <p>
              Fightformesothelioma.com is continually updated to ensure current
              information about medications and medical devices and associated
              side effects is provided to the public. The information on the
              site is meant to complement a doctor or healthcare professional's
              advice and should not be used in place of medical advice. It is
              important to note that most, if not all, drugs or medical devices
              discussed on Fightformesothelioma.com are FDA approved. Content
              found on Fightformesothelioma.com should not be taken as medical
              advice and site visitors are encouraged to speak with a medical
              professional for medical treatment, information and
              recommendations. Furthermore, site visitors should not discontinue
              use of a drug or medical device without first seeking the advice
              of medical professional. Additionally, the legal information on
              Fightformesothelioma.com should not be taken as legal advice, as
              the content on the site is meant to provide general legal
              information and is not intended to provide information about a
              specific visitor's situation. The information on
              Fightformesothelioma.com is not an offer to create an
              attorney-client relationship or perform legal services. Visitors
              should not act or refrain from acting due to information found on
              this site without the guidance of a qualified and licensed
              attorney.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDisclaimer(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
