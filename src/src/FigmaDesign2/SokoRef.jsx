"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle, ArrowRight, Sparkles, Zap, Shield, ChevronRight } from "lucide-react"
import Map from './Map'
import { Button, TextField } from "@mui/material";
import { sendLandingPageFormEmail } from "../utils/emailService";


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

export default function SokoRef() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        humanVerification: false
    })

    const [errors, setErrors] = useState({})
    const [pingUrl, setPingUrl] = useState("");
    const [certId, setCertId] = useState("");
    const [tokenUrl, setTokenUrl] = useState("");
    const [scrolled, setScrolled] = useState(false)
    const [faqOpen, setFaqOpen] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.name || !formData.email || !formData.phone) {
            setErrors(prev => ({
                ...prev,
                submit: 'Please fill in all required fields'
            }));
            return;
        }

        // Validate CAPTCHA
        if (!formData.humanVerification) {
            setErrors(prev => ({
                ...prev,
                submit: 'Please complete the CAPTCHA verification'
            }));
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await sendLandingPageFormEmail({
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone,
                countryCode: "+1" // Default country code
            }, {
                xxTrustedFormCertUrl: certId,
                xxTrustedFormPingUrl: pingUrl,
                xxTrustedFormCertToken: tokenUrl
            });

            if (response.success) {
                setShowSuccessDialog(true);
                // Reset form after successful submission
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    humanVerification: false
                });
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
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else if (name === 'phone') {
            // Remove any non-digit characters
            const numericValue = value.replace(/\D/g, '');
            // Limit to 10 digits
            const limitedValue = numericValue.slice(0, 10);
            setFormData(prev => ({
                ...prev,
                [name]: limitedValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
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

    const features = [
        {
            icon: <Sparkles className="w-5 h-5" />,
            title: "Intelligent Automation",
            text: "AI-powered workflows that adapt to your needs",
        },
        {
            icon: <Zap className="w-5 h-5" />,
            title: "Lightning Performance",
            text: "Blazing fast response times with global CDN",
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Enterprise Security",
            text: "Bank-level encryption with 99.9% uptime guarantee",
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50 overflow-hidden">
            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : ""}`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center rotate-12 hover:rotate-0 transition-all duration-300">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            Nexus
                        </span>
                    </div>
                    {/* <button
            className="hidden md:flex items-center space-x-2 hover:bg-violet-50 hover:text-violet-600 transition-colors px-4 py-2 rounded-lg"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button> */}
                </div>
            </header>

            {/* Main Content */}
            <main className="relative pt-24 px-6">
                {/* Hero Section with Diagonal Layout */}
                <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
                        {/* Floating Badge */}
                        {/* <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:top-0 lg:right-[5%] z-10">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-violet-200 rounded-full text-xs sm:text-sm font-medium text-violet-700 shadow-lg shadow-violet-100/50 hover:scale-105 transition-transform cursor-pointer animate-pulse">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-violet-500" />
                New Release v4.0
              </div>
            </div> */}

                        {/* Main Title - Spans full width */}
                        <div className="col-span-12 text-center mb-6 sm:mb-8 lg:mb-16">
                            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Future-proof
                                </span>
                                <br />
                                <span className="relative">
                                    your workflow
                                    <svg
                                        className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                                        viewBox="0 0 300 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 5.5C32.5 1.5 62.5 1.5 90.5 5.5C118.5 9.5 145.667 9.5 169 5.5C192.333 1.5 222.5 1.5 299 5.5"
                                            stroke="url(#paint0_linear)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="1" y1="6" x2="299" y2="6" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#8B5CF6" />
                                                <stop offset="1" stopColor="#D946EF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </h1>
                        </div>

                        {/* Left Column - Content in diagonal layout */}
                        <div className="col-span-12 lg:col-span-5 lg:col-start-1 relative z-10 order-1">
                            <div className="space-y-6 sm:space-y-8">
                                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                                    Experience the next generation platform that adapts to your needs. Seamlessly integrate with your
                                    existing tools and scale with confidence.
                                </p>

                                {/* Stats in Horizontal Layout */}
                                <div className="flex flex-wrap gap-4 sm:gap-8 py-4 sm:py-6">
                                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                            50K+
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600">Users</span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                            99.9%
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600">Uptime</span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                                            24/7
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-600">Support</span>
                                    </div>
                                </div>

                                {/* Trusted By */}
                                <div className="space-y-3 sm:space-y-4">
                                    <p className="text-xs sm:text-sm text-gray-500">Trusted by innovative companies</p>
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 opacity-60">
                                        <div className="w-16 sm:w-20 h-6 sm:h-8 bg-gray-300 rounded"></div>
                                        <div className="w-20 sm:w-24 h-6 sm:h-8 bg-gray-300 rounded"></div>
                                        <div className="w-12 sm:w-16 h-6 sm:h-8 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Floating Form Card */}
                        <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2 mt-8 lg:mt-0">
                            <div className="relative">
                                {/* Decorative Elements */}
                                <div className="absolute -top-10 -left-10 w-16 sm:w-20 h-16 sm:h-20 bg-violet-200 rounded-full blur-xl opacity-70"></div>
                                <div className="absolute -bottom-10 -right-10 w-16 sm:w-20 h-16 sm:h-20 bg-indigo-200 rounded-full blur-xl opacity-70"></div>

                                {/* Form Card */}
                                <div className="relative backdrop-blur-sm bg-white/90 border-0 shadow-xl sm:shadow-2xl shadow-violet-200/30 rounded-2xl sm:rounded-3xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-indigo-600"></div>

                                    <div className="p-6 sm:p-8">
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="space-y-1.5 sm:space-y-2">
                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Get Started</h2>
                                                <p className="text-sm sm:text-base text-gray-600">Join thousands of forward-thinking teams</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                                <div className="space-y-3 sm:space-y-4">
                                                    <div className="space-y-1.5 sm:space-y-2">
                                                        <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">
                                                            Full Name
                                                        </label>
                                                        <div className="relative">
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
                                                                id="name"
                                                                name="name"
                                                                type="text"
                                                                placeholder="Enter your full name"
                                                                value={formData.name}
                                                                onChange={handleInputChange}
                                                                className="w-full h-10 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base border-2 border-gray-200 bg-gray-50/50 focus:border-violet-500 focus:ring-violet-500/20 rounded-lg sm:rounded-xl transition-all duration-200"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1.5 sm:space-y-2">
                                                        <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                                                            Email Address
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                placeholder="Enter your email address"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                className="w-full h-10 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base border-2 border-gray-200 bg-gray-50/50 focus:border-violet-500 focus:ring-violet-500/20 rounded-lg sm:rounded-xl transition-all duration-200"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1.5 sm:space-y-2">
                                                        <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-gray-700">
                                                            Phone Number
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                id="phone"
                                                                name="phone"
                                                                type="tel"
                                                                placeholder="Enter your phone number"
                                                                value={formData.phone}
                                                                onChange={handleInputChange}
                                                                className="w-full h-10 sm:h-12 pl-3 sm:pl-4 text-sm sm:text-base border-2 border-gray-200 bg-gray-50/50 focus:border-violet-500 focus:ring-violet-500/20 rounded-lg sm:rounded-xl transition-all duration-200"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <CustomCaptcha
                                                        onCaptchaChange={(valid) => {
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                humanVerification: valid,
                                                            }));
                                                        }}
                                                    />
                                                    <div className="flex items-start space-x-2 mt-4 mb-4">
                                                        <input
                                                            type="checkbox"
                                                            name="privacyPolicy"
                                                            checked={formData.privacyPolicy}
                                                            onChange={handleChange}
                                                            className="mt-1"
                                                        />
                                                        <div className="text-xs sm:text-sm font-['Helvetica'] text-gray-700">
                                                            <span
                                                                className="block"
                                                                data-tf-element-role="consent-opt-in"
                                                            >
                                                                I agree to the{" "}
                                                                <a
                                                                    href="/PrivacyPolicy"
                                                                    className="underline text-[#4B2C5E] hover:text-[#C49A6C]"
                                                                >
                                                                    privacy policy
                                                                </a>{" "}
                                                                and{" "}
                                                                <a
                                                                    href="/Disclaimer"
                                                                    className="underline text-[#4B2C5E] hover:text-[#C49A6C]"
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
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`w-full h-10 sm:h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] active:scale-[0.98] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {isSubmitting ? 'Submitting...' : (
                                                        <>
                                                            <span>Continue</span>
                                                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 inline" />
                                                        </>
                                                    )}
                                                </button>

                                                {/* <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                                                    <span>Free 14-day trial • No credit card</span>
                                                </div> */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Map />
                {/* Features Section with Staggered Cards */}
                <section className="py-24 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why teams choose Nexus</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our platform is designed to help you work smarter, not harder.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`relative bg-white rounded-3xl p-8 shadow-xl shadow-violet-100/20 border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 ${index === 1 ? "md:translate-y-12" : ""
                                    }`}
                            >
                                <div className="absolute -top-5 -left-5 w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center rotate-6 hover:rotate-0 transition-all duration-300">
                                    <div className="text-white">{feature.icon}</div>
                                </div>
                                <div className="pt-8 pl-6">
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.text}</p>
                                    <button className="mt-4 p-0 text-violet-600 hover:text-violet-700 flex items-center">
                                        Learn more <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need to know about our platform and services.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left focus:outline-none"
                                onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">What makes Nexus different from other platforms?</h3>
                                    <svg
                                        className={`w-5 h-5 text-violet-600 transform transition-transform duration-200 ${faqOpen === 1 ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            <div
                                className={`px-6 transition-all duration-200 ease-in-out ${faqOpen === 1 ? 'pb-6 opacity-100' : 'h-0 opacity-0 overflow-hidden'
                                    }`}
                            >
                                <p className="text-gray-600">
                                    Nexus stands out with its AI-powered automation, seamless integration capabilities, and enterprise-grade security. Our platform adapts to your workflow, not the other way around, ensuring maximum productivity and efficiency.
                                </p>
                            </div>
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left focus:outline-none"
                                onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">How secure is my data with Nexus?</h3>
                                    <svg
                                        className={`w-5 h-5 text-violet-600 transform transition-transform duration-200 ${faqOpen === 2 ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            <div
                                className={`px-6 transition-all duration-200 ease-in-out ${faqOpen === 2 ? 'pb-6 opacity-100' : 'h-0 opacity-0 overflow-hidden'
                                    }`}
                            >
                                <p className="text-gray-600">
                                    We implement bank-level encryption, regular security audits, and maintain a 99.9% uptime guarantee. Your data is protected with industry-leading security measures, including end-to-end encryption and multi-factor authentication.
                                </p>
                            </div>
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="bg-white rounded-2xl shadow-lg border border-violet-100 overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left focus:outline-none"
                                onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Can I integrate Nexus with my existing tools?</h3>
                                    <svg
                                        className={`w-5 h-5 text-violet-600 transform transition-transform duration-200 ${faqOpen === 3 ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            <div
                                className={`px-6 transition-all duration-200 ease-in-out ${faqOpen === 3 ? 'pb-6 opacity-100' : 'h-0 opacity-0 overflow-hidden'
                                    }`}
                            >
                                <p className="text-gray-600">
                                    Yes! Nexus offers seamless integration with over 100+ popular tools and platforms. Our robust API and pre-built connectors make it easy to connect your existing workflow tools and maintain a unified workspace.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 mb-16">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="relative bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-12 overflow-hidden">
                            {/* Abstract shapes */}
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-[10%] right-[10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-[10%] left-[10%] w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                            </div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your workflow?</h2>
                                <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
                                    Join thousands of teams already using Nexus to streamline their operations and boost productivity.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button className="bg-white text-violet-600 hover:bg-gray-100 hover:text-violet-700 px-6 py-3 rounded-lg">
                                        Start Free Trial
                                    </button>
                                    <button className="border-2 border-white text-white hover:bg-white/20 px-6 py-3 rounded-lg">
                                        Schedule Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Add Success Dialog */}
            {showSuccessDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Form Submitted Successfully!</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Thank you for your submission. We will get back to you soon.
                            </p>
                            <button
                                onClick={() => setShowSuccessDialog(false)}
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add error message display */}
            {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
            )}
        </div>
    )
}
