import React, { useState } from "react";
import { Phone, CheckCircle, AlertTriangle, Loader2, ArrowLeft, ArrowRight, Shield, Star } from "lucide-react";
import emailjs from "@emailjs/browser";
import logo from '../../../assets/ayan/meso/meso.png';
import union from '../../../assets/ayan/meso/Union.svg';
// import { sendDepoFormEmail } from "../../utils/emailService"; // Adjust the import path as necessary
emailjs.init("DyDZ85E9uwzwSyUoD");


// Header Component (kept exactly the same)
const Header = () => (
  <header className="flex justify-between items-center px-4 md:px-8 py-3 bg-white">
    <img src={logo} alt="Logo" className="h-12 object-contain" />
    <a
      href="tel:+18882128140"
      className="flex items-center gap-2 bg-[#2E4A7D] text-white rounded-full px-3 py-1 hover:bg-[#002244] no-underline"
    >
      <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center">
        <Phone className="w-4 h-4 text-white" />
      </div>
      <span className="font-semibold text-sm no-underline">(888) 212-8140</span>
    </a>
  </header>
);

// Footer Component (kept exactly the same)
const Footer = () => (
  <footer className="bg-black text-white px-4 py-10 text-center">   mm
    <div className="flex justify-center items-center mb-4">
      <img src={union} alt="Union" className="h-8 w-8 mr-2" />
      <h3 className="text-2xl font-bold">Justice Advocates</h3>
    </div>
    <p className="text-sm opacity-80">123 Justice Avenue, Lawsuit City, LC 54321</p>
    <p className="text-sm opacity-80">Phone: (555) 123-4567 | Email: contact@justiceadvocates.law</p>
    <p className="text-xs italic mt-6 opacity-60">
      © 2023 Justice Advocates. Attorney Advertising. Past results do not guarantee future outcomes.
    </p>
    <p className="text-xs mt-2 text-gray-400">
      This website is for informational purposes only and does not constitute legal advice.
    </p>
  </footer>
);

const questions = [
  {
    id: 1,
    question: "Have you or a loved one used Depo-Provera birth control injections?",
    type: "radio",
    options: ["Yes", "No"],
    disqualifyOn: "No",
  },
  {
    id: 2,
    question: "Did you experience any of the following after Depo use?",
    type: "checkbox",
    options: [
      "Osteoporosis",
      "Memory Loss",
      "Neurological Issues",
      "Autoimmune Disorders",
      "Other",
    ],
  
    description: "Select all symptoms you experienced"
  },
  {
    id: 3,
    question: "Approximate year of first Depo-Provera injection?",
    type: "year",
  },
  {
    id: 4,
    question: "How long did you use Depo-Provera?",
    type: "radio",
    options: ["<1 year", "1–3 years", "3–5 years", "5+ years"],
  },
  {
    id: 5,
    question: "Were these symptoms diagnosed by a medical professional?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 6,
    question: "Are you currently represented by an attorney?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 7,
    question: "Who is this form for?",
    type: "radio",
    options: ["Self", "Other"],
  },
  {
    id: 8,
    question: "Contact Information",
    type: "contact",
    fields: ["First Name", "Last Name", "Address", "ZIP Code", "Phone Number", "Email Address", "State"],
  },
  {
    id: 9,
    question: "Consent",
    type: "checkbox",
    options: [
      <span key="consent">
        I agree to the{" "}
        <a href="/PrivacyPolicy" target="_blank" className="underline text-blue-600 hover:text-blue-800">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/Disclaimer" target="_blank" className="underline text-blue-600 hover:text-blue-800">
          Disclaimer
        </a>
        , and give my express written consent to be contacted by Brand Name, its affiliates, and/or a participating law firm at the phone number and 
        email address I provided above—even if it is a wireless number or is on a Do Not Call list. I 
        understand I may be contacted by phone, email, SMS, or mail regarding my potential case and that 
        automated dialing systems may be used. Message and data rates may apply. My consent does not 
        require purchase. This is legal advertising.
      </span>
    ],
  
  },
];

const LanderThree = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const totalSteps = questions.length;

  const handleStart = () => setStarted(true);

  const validateField = (question, value) => {
    if (question.type === "contact") {
      const contactErrors = {};
      question.fields.forEach(field => {
        if (!formData[field] || formData[field].trim() === "") {
          contactErrors[field] = `${field} is required`;
        }
        // Email validation
        if (field === "Email Address" && formData[field]) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData[field])) {
            contactErrors[field] = "Please enter a valid email address";
          }
        }
        // Phone validation
        if (field === "Phone Number" && formData[field]) {
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          if (!phoneRegex.test(formData[field].replace(/\D/g, ''))) {
            contactErrors[field] = "Please enter a valid phone number";
          }
        }
      });
      return contactErrors;
    }
    return {};
  };

  const handleChange = (question, value) => {
    setFormData({ ...formData, [question]: value });
    // Clear errors for this field
    if (errors[question]) {
      setErrors({ ...errors, [question]: null });
    }
  };

  const handleCheckboxChange = (question, value) => {
    const existing = formData[question] || [];
    if (existing.includes(value)) {
      handleChange(question, existing.filter((item) => item !== value));
    } else {
      handleChange(question, [...existing, value]);
    }
  };

  const currentQuestion = questions[currentStep];

  const showContinue = () => {
    const answer = formData[currentQuestion.question];
    if (currentQuestion.type === "checkbox") return answer && answer.length > 0;
    if (currentQuestion.type === "contact") {
      return currentQuestion.fields.every(field => formData[field] && formData[field].trim() !== "");
    }
    return answer && answer !== "";
  };

  const handleNext = async () => {
    const answer = formData[currentQuestion.question];
    
    // Validate current step
    const fieldErrors = validateField(currentQuestion, answer);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    if (currentQuestion.disqualifyOn && answer === currentQuestion.disqualifyOn) {
      setCurrentStep(-1);
    } else if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit form
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendDepoFormEmail(formData);
      if (result.success) {
        setSubmitStatus('success');
        setCurrentStep(-2); // Success page
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleGoBack = () => {
    setStarted(false);
    setCurrentStep(0);
    setFormData({});
    setErrors({});
    setSubmitStatus(null);
  };

  // Success Page
  if (currentStep === -2) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gradient-to-br from-green-50 to-blue-50 justify-center items-center flex flex-col p-8">
          <div className="bg-white shadow-2xl rounded-2xl p-8 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Thank You!
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Your information has been successfully submitted. Our legal team will review your case and contact you within 24 hours.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-700">
                <strong>Next Steps:</strong> A qualified attorney will reach out to discuss your potential case and answer any questions you may have.
              </p>
            </div>
            <button
              onClick={handleGoBack}
              className="bg-[#C49A6C] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
            >
              Submit Another Form
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Disqualification Page
  if (currentStep === -1) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gradient-to-br from-red-50 to-orange-50 justify-center items-center flex flex-col p-8">
          <div className="bg-white shadow-2xl rounded-2xl p-8 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              You may not qualify at this time.
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Based on your responses, it seems you may not be eligible right now. However, circumstances can change, and we encourage you to contact us directly.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-700">
                <strong>Still have questions?</strong> Call us at (888) 212-8140 to speak with a legal expert.
              </p>
            </div>
            <button
              onClick={handleGoBack}
              className="bg-[#C49A6C] hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
            >
              Start Over
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-50 to-blue-50">
        {!started ? (
          // Landing Page (kept exactly the same)
          <div className="text-center max-w-2xl">
            <img src={union} alt="Union" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Have you or a loved one experienced serious side effects from Depo-Provera?
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              You may be eligible for financial compensation. Take the short qualification quiz to see if you qualify.
            </p>
            <button
              onClick={handleStart}
              className="bg-[#C49A6C] text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started
            </button>
          </div>
        ) : (
          // Enhanced Form UI
          <div className="w-full max-w-3xl">
            {/* Progress Header */}
            <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <div className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Step {currentStep + 1} of {totalSteps}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-b-2xl shadow-lg p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{currentQuestion.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.description && (
                      <p className="text-gray-600 mt-2">{currentQuestion.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {currentQuestion.type === "radio" &&
                  currentQuestion.options.map((opt) => (
                    <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 group">
                      <input
                        type="radio"
                        name={currentQuestion.question}
                        value={opt}
                        onChange={(e) => handleChange(currentQuestion.question, e.target.value)}
                        checked={formData[currentQuestion.question] === opt}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-4 text-lg font-medium text-gray-700 group-hover:text-blue-700">{opt}</span>
                    </label>
                  ))}

                {currentQuestion.type === "checkbox" &&
                  currentQuestion.options.map((opt) => (
                    <label key={opt} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 group">
                      <input
                        type="checkbox"
                        value={opt}
                        onChange={() => handleCheckboxChange(currentQuestion.question, opt)}
                        checked={formData[currentQuestion.question]?.includes(opt) || false}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-4 text-lg font-medium text-gray-700 group-hover:text-blue-700">{opt}</span>
                    </label>
                  ))}

                {currentQuestion.type === "year" && (
                  <select
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    onChange={(e) => handleChange(currentQuestion.question, e.target.value)}
                    value={formData[currentQuestion.question] || ""}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 80 }, (_, i) => (
                      <option key={i} value={2025 - i}>{2025 - i}</option>
                    ))}
                  </select>
                )}

                {currentQuestion.type === "contact" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.fields.map((field) => (
                      <div key={field} className="space-y-2">
                        <input
                          type={field === "Email Address" ? "email" : field === "Phone Number" ? "tel" : "text"}
                          placeholder={field}
                          value={formData[field] || ""}
                          onChange={(e) => handleChange(field, e.target.value)}
                          className={`w-full p-4 border-2 rounded-xl text-lg transition-all duration-200 ${
                            errors[field] 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                              : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                          } focus:ring-2`}
                        />
                        {errors[field] && (
                          <p className="text-red-500 text-sm flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors[field]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Status */}
              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    There was an error submitting your form. Please try again or call us at (888) 212-8140.
                  </p>
                </div>
              )}

              {/* Continue Button */}
              {showContinue() && (
                <div className="mt-8">
                  <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : currentStep === totalSteps - 1 ? (
                      <>
                        Submit Form
                        <CheckCircle className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}

           
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LanderThree;