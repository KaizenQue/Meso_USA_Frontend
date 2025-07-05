"use client";

import React, { useState, useEffect } from "react";
import Img from "../assets/MesoFD2New.jpg";
import ImgSvg1 from "../assets/FD2img1.svg";
import ImgSvg2 from "../assets/FD2img2.svg";
import ImgSvg3 from "../assets/FD2img3.svg";
import ImgSvg4 from "../assets/FD2img4.svg";
import ImgSvg5 from "../assets/FD2img5.svg";
import ImgSvg6 from "../assets/FD2img6.svg";
import logo from "../assets/NewNewLogo.svg";
import ExitPopup from "./ExitPopup";
import { sendLandingPageFormEmail } from "../utils/emailService";
import useDynamicPhoneNumber from "../hooks/useDynamicPhoneNumber";
import CallNow from "../assets/CallNowGif.gif";
import { Button, TextField } from "@mui/material";

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

        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters
        let result = '';
        let offsets = [];
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
            offsets.push((Math.random() * 6 - 3).toFixed(2)); // Reduced offset range for better readability
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
                <div className="bg-white p-4 rounded font-mono text-2xl tracking-widest select-none relative captcha-text-container border-2 border-gray-200">
                    {captchaText.split('').map((char, index) => (
                        <span
                            key={index}
                            style={{
                                transform: `translateY(${charOffsets[index]}px)`,
                                display: 'inline-block',
                                margin: '0 4px',
                                color: '#4B2C5E',
                                fontWeight: 'bold'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
                <div className="flex gap-2 items-center justify-center sm:justify-start">
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={generateCaptcha}
                        className="text-gray-600 p-3 min-w-0 text-xl"
                        title="Refresh CAPTCHA"
                    >
                        ↻
                    </Button>
                    {audioEnabled && (
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={speakCaptcha}
                            className="text-gray-600 p-3 min-w-0 text-xl"
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
                    className="mr-2 w-4 h-4"
                />
                <label htmlFor="enableAudio" className="text-base text-gray-700">Enable Audio</label>
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
                    className: "text-gray-800 text-lg",
                }}
                InputLabelProps={{
                    className: "text-gray-600 text-base",
                }}
            />
            <style jsx>{`
        .captcha-text-container {
          background-image: repeating-linear-gradient(
            0deg,
            #e5e7eb,
            #e5e7eb 1px,
            transparent 1px,
            transparent 8px
          );
          background-size: 100% 12px;
          background-position: 0 50%;
          letter-spacing: 0.5em;
        }
      `}</style>
        </div>
    );
};

const MesotheliomaLandingPageNew4 = () => {
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        countryCode: "+1",
        privacyPolicy: false,
        humanVerification: false,
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [pingUrl, setPingUrl] = useState("");
    const [certId, setCertId] = useState("");
    const [tokenUrl, setTokenUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await sendLandingPageFormEmail(
                {
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    countryCode: formData.countryCode,
                },
                {
                    xxTrustedFormCertUrl: certId,
                    xxTrustedFormPingUrl: pingUrl,
                    xxTrustedFormCertToken: tokenUrl,
                }
            );

            if (response.success) {
                // Reset form data
                setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    countryCode: "+1",
                    privacyPolicy: false,
                    humanVerification: false,
                });
                // Clear CAPTCHA input field
                const captchaInput = document.querySelector('input[type="text"][label="Enter CAPTCHA"]');
                if (captchaInput) {
                    captchaInput.value = '';
                    // Trigger input event to update React state
                    const event = new Event('input', { bubbles: true });
                    captchaInput.dispatchEvent(event);
                }
                // Open dialer with the specified number
                window.location.href = "tel:8882128149";
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClosePopup = () => {
        setShowExitPopup(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (name === "phone") {
            // Remove any non-digit characters
            const numericValue = value.replace(/\D/g, "");
            // Limit to 10 digits
            const limitedValue = numericValue.slice(0, 10);
            setFormData((prev) => ({
                ...prev,
                [name]: limitedValue,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            {showExitPopup && <ExitPopup onClose={handleClosePopup} />}

            {/* Top Section - Background Image & Overlay Content */}
            <div className="relative min-h-[100vh] md:h-[70vh]">
                <div className="absolute inset-0 bg-black/50">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${Img})`,
                            filter: "brightness(0.6)",
                        }}
                    />
                </div>
                <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 md:p-12 lg:p-16">
                    {/* <div className="rounded-lg bg-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 text-white w-16 sm:w-20 text-center text-sm sm:text-base mb-8">LOGO</div> */}
                    <div className="py-2 sm:px-6 sm:py-3 text-white w-46 sm:w-58 text-left text-sm sm:text-base mb-8">
                        <a href="/">
                            <img
                                src={logo}
                                alt="Mesotheliamo Logo"
                                className="h-[auto] w-[180px] sm:w-[250px]"
                            />
                        </a>
                    </div>
                    <div className="space-y-4 sm:space-y-6 md:max-w-[55%] pt-24 md:pt-0 md:mt-32">
                        <h2 className="text-lg sm:text-xl font-bold text-white md:text-2xl">
                            YOU DESERVE JUSTICE
                        </h2>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                            Manufacturing Workers Diagnosed with Mesothelioma
                        </h1>
                        <p className="max-w-xl text-sm sm:text-base text-gray-200 md:max-w-[93%]">
                            If you worked in heavy industry and have mesothelioma, asbestos in machinery, piping, and insulation may be the cause. We're here to help you claim the justice you deserve.
                        </p>
                    </div>
                </div>

                {/* Form Panel - Overlapping */}
                <div className="relative md:absolute md:right-0 md:top-[8%] w-full md:w-2/5 z-20 mt-8 mb-8 md:mt-0">
                    <div className="bg-white rounded-lg shadow-lg mx-6 sm:mx-8 md:mx-12 lg:mx-16">
                        <div className="p-6 sm:p-8 relative overflow-hidden">
                            {/* <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 text-left">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Book Your Free Consultation
                                </h2>
                                <p className="text-sm sm:text-base font-semibold bg-gradient-to-r from-[#4B2C5E] to-[#C49A6C] text-transparent bg-clip-text">Get started in 30 seconds</p>
                            </div> */}

                            <form
                                className="space-y-5 sm:space-y-6"
                                onSubmit={handleSubmit}
                            >
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

                                {/* <div className="space-y-2 sm:space-y-3">
                                    <label
                                        htmlFor="fullName"
                                        className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="w-full bg-white border border-gray-300 rounded-md p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                    />
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                        Phone Number
                                    </label>
                                    <div className="flex">
                                        <div className="flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 sm:px-4 text-xs sm:text-sm text-gray-500">
                                            +1
                                        </div>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            maxLength="10"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            className="w-full bg-white border border-gray-300 rounded-r-md p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                                        />
                                    </div>
                                </div> */}

                                {/* <div className="space-y-2 sm:space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 text-left"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-gray-300 rounded-md p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                  />
                </div> */}

                                <div >


                                    <div className="text-xs sm:text-sm font-['Helvetica'] text-gray-700 flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            name="privacyPolicy"
                                            checked={formData.privacyPolicy}
                                            onChange={handleChange}
                                            className="mt-1 w-6 h-6 min-w-[24px] min-h-[24px] flex-shrink-0" // Adjusted size
                                        />
                                        <span className="block" data-tf-element-role="consent-opt-in">
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

                                <CustomCaptcha
                                    onCaptchaChange={(valid) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            humanVerification: valid,
                                        }));
                                    }}
                                />
                                {/*  */}

                                <div
                                    class="cf-turnstile"
                                    data-sitekey="0x4AAAAAABfAlFRdUfzeAp3-"
                                    data-callback="javascriptCallback"
                                ></div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-[#C49A6C] hover:bg-amber-800 text-white py-3 px-4 rounded-md transition-colors duration-200 text-sm sm:text-base ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Submitting...
                                        </div>
                                    ) : (
                                        "Continue To Connect"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row flex-1">
                {/* Left Section - Risk Information */}
                <div className="relative bg-[#4B2C5E] p-6 sm:p-8 md:p-12 lg:p-16 md:w-3/5">
                    <div className="space-y-6 sm:space-y-8">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white md:text-2xl">
                                Job Roles with the Highest Risk of Asbestos Exposure
                            </h3>
                            <p className="mt-3 text-sm sm:text-base text-gray-200">
                                Even if you're not certain about your asbestos exposure, our
                                legal experts can help you find out. Don't wait—your health and
                                your future could depend on it. Speak with us today.
                            </p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 sm:gap-6">
                            {[
                                "Machine Operator",
                                "Maintenance Technician",
                                "Fabrication Worker",
                                "Foundry or Smelter Worker",
                                "Industrial Equipment Assembler",
                                "Boiler Room or Furnace Operator",
                            ].map((role, index) => (
                                <div
                                    key={role}
                                    className="flex-1 min-w-[200px] flex items-center space-x-3 rounded-md border-2 border-[#C49A6C] p-3 sm:p-4 bg-[#4B2C5E]/80 text-white hover:bg-[#4B2C5E] transition-colors duration-200 overflow-hidden shadow-lg"
                                >
                                    <div className="flex-shrink-0 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/30">
                                        <img
                                            src={
                                                [ImgSvg1, ImgSvg2, ImgSvg3, ImgSvg4, ImgSvg5, ImgSvg6][
                                                index
                                                ]
                                            }
                                            alt={`${role} icon`}
                                            className="h-5 w-5 sm:h-6 sm:w-6"
                                        />
                                    </div>
                                    <span className="text-sm sm:text-base font-semibold text-white drop-shadow-md">
                                        {role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section - Empty space for form overlap */}
                <div className="relative w-full md:w-2/5 bg-[#4B2C5E]"></div>
            </div>
        </div>
    );
};

export default MesotheliomaLandingPageNew4;
