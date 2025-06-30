"use client"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, Phone } from "lucide-react"
import { Button, Alert, AlertTitle, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material"
import ChatImg from "../../assets/chatImg.jpg"
import useDynamicPhoneNumber from "../../hooks/useDynamicPhoneNumber"
import { sendLandingPageFormEmail } from '../../utils/emailService';

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-start gap-2">
    <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  </div>
)

export default function ChatInterface() {
  const chatContainerRef = useRef(null)
  const bottomRef = useRef(null)
  const { phoneNumber } = useDynamicPhoneNumber()
  const [showInitialResponse, setShowInitialResponse] = useState(false)
  const [showDiagnosisIntro, setShowDiagnosisIntro] = useState(false)
  const [showDiagnosisQuestion, setShowDiagnosisQuestion] = useState(false)
  const [showQualifiedIntro, setShowQualifiedIntro] = useState(false)
  const [showQualifiedDetails, setShowQualifiedDetails] = useState(false)
  const [showQualifiedCall, setShowQualifiedCall] = useState(false)
  const [showNotQualified, setShowNotQualified] = useState(false)
  const [showNotQualifiedMessage1, setShowNotQualifiedMessage1] = useState(false)
  const [showNotQualifiedMessage2, setShowNotQualifiedMessage2] = useState(false)
  const [showNotQualifiedMessage3, setShowNotQualifiedMessage3] = useState(false)
  const [showNotQualifiedMessage4, setShowNotQualifiedMessage4] = useState(false)
  const [showNotQualifiedMessage5, setShowNotQualifiedMessage5] = useState(false)
  const [showNotQualifiedMessage6, setShowNotQualifiedMessage6] = useState(false)
  const [showDeclined, setShowDeclined] = useState(false)
  const [showDeclinedMessage1, setShowDeclinedMessage1] = useState(false)
  const [showDeclinedMessage2, setShowDeclinedMessage2] = useState(false)
  const [showTyping, setShowTyping] = useState(true)
  const [showInitialMessage, setShowInitialMessage] = useState(false)
  const [showMessage1, setShowMessage1] = useState(false)
  const [showMessage2, setShowMessage2] = useState(false)
  const [showMessage3, setShowMessage3] = useState(false)
  const [showMessage4, setShowMessage4] = useState(false)
  const [userResponse, setUserResponse] = useState("")
  const [diagnosisResponse, setDiagnosisResponse] = useState("")
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, setTokenUrl] = useState("");
  const [openVerification, setOpenVerification] = useState(false)
  const [verificationForm, setVerificationForm] = useState({
    name: '',
    number: '',
    email: ''
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    number: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [errors, setErrors] = useState({});

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
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
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
    showTyping
  ])

  useEffect(() => {
    // Show initial message after typing animation
    const timer1 = setTimeout(() => {
      setShowTyping(false)
      setShowInitialMessage(true)
    }, 1300)

    const timer2 = setTimeout(() => {
      setShowTyping(true)
      setTimeout(() => {
        setShowTyping(false)
        setShowMessage1(true)
      }, 1300)
    }, 1600)

    const timer3 = setTimeout(() => {
      setShowTyping(true)
      setTimeout(() => {
        setShowTyping(false)
        setShowMessage2(true)
      }, 1500)
    }, 3400)

    const timer4 = setTimeout(() => {
      setShowTyping(true)
      setTimeout(() => {
        setShowTyping(false)
        setShowMessage3(true)
      }, 1500)
    }, 5000)

    const timer5 = setTimeout(() => {
      setShowTyping(true)
      setTimeout(() => {
        setShowTyping(false)
        setShowMessage4(true)
      }, 1300)
    }, 6600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  const handleInitialYes = () => {
    setUserResponse("Yes")
    setShowInitialResponse(true)
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setShowDiagnosisIntro(true)
      setTimeout(() => {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setShowDiagnosisQuestion(true)
          scrollToBottom()
        }, 1300)
      }, 1800)
    }, 1300)
  }

  const handleInitialNo = () => {
    setUserResponse("No")
    setShowInitialResponse(true)
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setShowDeclined(true)
      setTimeout(() => {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setShowDeclinedMessage1(true)
          setTimeout(() => {
            setShowTyping(true)
            setTimeout(() => {
              setShowTyping(false)
              setShowDeclinedMessage2(true)
              scrollToBottom()
            }, 1300)
          }, 1800)
        }, 1300)
      }, 1800)
    }, 1300)
  }

  const handleDiagnosisYes = () => {
    setDiagnosisResponse("Yes")
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setShowQualifiedIntro(true)
      setTimeout(() => {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setShowQualifiedDetails(true)
          setTimeout(() => {
            setShowTyping(true)
            setTimeout(() => {
              setShowTyping(false)
              setShowQualifiedCall(true)
              scrollToBottom()
            }, 1300)
          }, 1800)
        }, 1300)
      }, 1800)
    }, 1300)
  }

  const handleDiagnosisNo = () => {
    setDiagnosisResponse("No")
    setShowTyping(true)
    setTimeout(() => {
      setShowTyping(false)
      setShowNotQualified(true)
      setTimeout(() => {
        setShowTyping(true)
        setTimeout(() => {
          setShowTyping(false)
          setShowNotQualifiedMessage1(true)
          setTimeout(() => {
            setShowTyping(true)
            setTimeout(() => {
              setShowTyping(false)
              setShowNotQualifiedMessage2(true)
              setTimeout(() => {
                setShowTyping(true)
                setTimeout(() => {
                  setShowTyping(false)
                  setShowNotQualifiedMessage3(true)
                  setTimeout(() => {
                    setShowTyping(true)
                    setTimeout(() => {
                      setShowTyping(false)
                      setShowNotQualifiedMessage4(true)
                      setTimeout(() => {
                        setShowTyping(true)
                        setTimeout(() => {
                          setShowTyping(false)
                          setShowNotQualifiedMessage5(true)
                          setTimeout(() => {
                            setShowTyping(true)
                            setTimeout(() => {
                              setShowTyping(false)
                              setShowNotQualifiedMessage6(true)
                              scrollToBottom()
                            }, 1300)
                          }, 1800)
                        }, 1300)
                      }, 1800)
                    }, 1300)
                  }, 1800)
                }, 1300)
              }, 1800)
            }, 1300)
          }, 1800)
        }, 1300)
      }, 1800)
    }, 1300)
  }


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
    setOpenVerification(true)
  }

  const handleVerificationClose = () => {
    setOpenVerification(false)
  }

  const validateForm = () => {
    let errors = {
      name: '',
      number: '',
      email: ''
    }
    let isValid = true

    // Name validation - only letters and spaces, minimum 2 characters
    const nameRegex = /^[A-Za-z\s]{2,}$/
    if (!verificationForm.name.trim()) {
      errors.name = 'Name is required'
      isValid = false
    } else if (!nameRegex.test(verificationForm.name.trim())) {
      errors.name = 'Name should only contain letters and spaces'
      isValid = false
    }

    // Phone number validation - exactly 10 digits, no letters or special characters
    const phoneRegex = /^\d{10}$/
    if (!verificationForm.number.trim()) {
      errors.number = 'Phone number is required'
      isValid = false
    } else if (!phoneRegex.test(verificationForm.number.replace(/\D/g, ''))) {
      errors.number = 'Please enter exactly 10 digits (numbers only)'
      isValid = false
    }

    // Email validation - standard email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!verificationForm.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!emailRegex.test(verificationForm.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleVerificationSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await sendLandingPageFormEmail({
          fullName: verificationForm.name,
          email: verificationForm.email,
          phone: verificationForm.number,
          countryCode: '+1' // Default to US country code
        }, {
          xxTrustedFormCertUrl: certId,
          xxTrustedFormPingUrl: pingUrl,
          xxTrustedFormCertToken: tokenUrl
        });

        if (response.success) {
          setFormSubmitted(true);
          setShowSuccessCard(true);
          // Reset form after successful submission
          setVerificationForm({
            name: '',
            number: '',
            email: ''
          });
          handleVerificationClose();
          // Open phone dialer
          window.location.href = `tel:${phoneNumber}`;
        } else {
          console.error('Failed to submit form:', response.error);
          setErrors(prev => ({
            ...prev,
            submit: 'Failed to submit form. Please try again.'
          }));
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'An error occurred. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let processedValue = value

    if (name === 'number') {
      processedValue = value.replace(/\D/g, '')
      processedValue = processedValue.slice(0, 10)
    }

    setVerificationForm({
      ...verificationForm,
      [name]: processedValue
    })
    setFormErrors({
      ...formErrors,
      [name]: ''
    })
  }

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
                    className: "text-gray-800"
                  }}
                  InputLabelProps={{
                    className: "text-gray-600"
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
                    className: "text-gray-800"
                  }}
                  InputLabelProps={{
                    className: "text-gray-600"
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
                    className: "text-gray-800"
                  }}
                  InputLabelProps={{
                    className: "text-gray-600"
                  }}
                  required
                />
              </div>

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
          <span className="text-white font-medium">Claire is online</span>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 h-[calc(100vh-200px)]">
          {/* Initial message */}
          {showTyping && !showInitialMessage && <TypingIndicator />}
          {showInitialMessage && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Hi 👋</p>
              </div>
            </div>
          )}

          {showTyping && showInitialMessage && !showMessage1 && <TypingIndicator />}
          {showMessage1 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>I'm from Fight for Mesothelioma.</p>
              </div>
            </div>
          )}

          {showTyping && showMessage1 && !showMessage2 && <TypingIndicator />}
          {showMessage2 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>🏛️ Over $30 billion has been set aside in asbestos trust funds for Mesothelioma victims.</p>
              </div>
            </div>
          )}

          {showTyping && showMessage2 && !showMessage3 && <TypingIndicator />}
          {showMessage3 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Want to check if you qualify for a settlement? 😃</p>
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
          {showTyping && showInitialResponse && !showDiagnosisIntro && !showDiagnosisQuestion && !showDeclined && <TypingIndicator />}
          {showDiagnosisIntro && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Ok, let me ask you one quick question...</p>
              </div>
            </div>
          )}

          {showTyping && showDiagnosisIntro && !showDiagnosisQuestion && !showDeclined && <TypingIndicator />}
          {showDiagnosisQuestion && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>1️⃣ Have you been diagnosed with Mesothelioma?</p>
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
          {showTyping && showDiagnosisQuestion && !showQualifiedIntro && !showNotQualified && <TypingIndicator />}
          {showQualifiedIntro && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>🎉 You're pre-qualified!</p>
              </div>
            </div>
          )}

          {showTyping && showQualifiedIntro && !showQualifiedDetails && !showNotQualified && <TypingIndicator />}
          {showQualifiedDetails && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>You may be entitled to compensation for medical bills, lost income, and more with no upfront costs.</p>
              </div>
            </div>
          )}

          {showTyping && showQualifiedDetails && !showQualifiedCall && !showNotQualified && <TypingIndicator />}
          {showQualifiedCall && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>📞 Tap below to connect with a legal specialist for your free 2-minute case review.</p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mt-2"
                  startIcon={<Phone />}
                  onClick={handleVerificationOpen}
                >
                  Call Now – Free Case Review {phoneNumber}
                </Button>
              </div>
            </div>
          )}

          {/* Not Qualified Response */}
          {showNotQualified && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Thanks for your response 🙏</p>
              </div>
            </div>
          )}

          {showTyping && showNotQualified && !showNotQualifiedMessage1 && <TypingIndicator />}
          {showNotQualifiedMessage1 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>We're currently helping only those who have been diagnosed with Mesothelioma.</p>
              </div>
            </div>
          )}

          {showTyping && showNotQualifiedMessage1 && !showNotQualifiedMessage2 && <TypingIndicator />}
          {showNotQualifiedMessage2 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>If you or someone you love ever faces a Mesothelioma diagnosis, we're here to help. Visit us on <a href="https://fightformesothelioma.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://fightformesothelioma.com/</a></p>
              </div>
            </div>
          )}

          {showTyping && showNotQualifiedMessage2 && !showNotQualifiedMessage3 && <TypingIndicator />}
          {showNotQualifiedMessage3 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Wishing you the best of health!</p>
              </div>
            </div>
          )}

          {/* Declined Response */}
          {showDeclined && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Totally understand 👍</p>
              </div>
            </div>
          )}

          {showTyping && showDeclined && !showDeclinedMessage1 && <TypingIndicator />}
          {showDeclinedMessage1 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>If you or someone you love ever faces a Mesothelioma diagnosis, we're here to help. Visit us on <a href="https://fightformesothelioma.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://fightformesothelioma.com/</a></p>
              </div>
            </div>
          )}

          {showTyping && showDeclinedMessage1 && !showDeclinedMessage2 && <TypingIndicator />}
          {showDeclinedMessage2 && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-700/80 text-white py-2 px-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="text-xs text-gray-300 mb-1">Claire</div>
                <p>Take care and stay well! 💙</p>
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
        onClose={handleVerificationClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '12px',
            padding: '20px'
          }
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
                className: "text-gray-800"
              }}
              InputLabelProps={{
                className: "text-gray-600"
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
                className: "text-gray-800"
              }}
              InputLabelProps={{
                className: "text-gray-600"
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
                className: "text-gray-800"
              }}
              InputLabelProps={{
                className: "text-gray-600"
              }}
              required
              disabled={isSubmitting}
            />
          </div>
        </DialogContent>
        <DialogActions className="justify-center pb-4">
          <Button
            onClick={handleVerificationSubmit}
            variant="contained"
            color="primary"
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
