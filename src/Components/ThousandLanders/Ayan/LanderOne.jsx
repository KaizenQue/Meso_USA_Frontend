import React, { useState } from "react";
import { Phone } from "lucide-react";
import logo from '../../../assets/ayan/meso/meso.png';
import union from '../../../assets/ayan/meso/Union.svg';
import emailjs from '@emailjs/browser';


const Header = () => (
  <header className="flex justify-between items-center px-4 md:px-8 lg:px-12 py-3 bg-white w-full">
    <img src={logo} alt="Logo" className="w-30 h-12 object-cover" />
    <a
      href="tel:+18882128140"
      className="flex items-center gap-2 bg-[#2E4A7D] text-white rounded-full px-3 py-1 hover:bg-[#002244] no-underline"
    >
      <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center no-underline">
        <Phone className="w-4 h-4 text-white" />
      </div>
      <span className="font-semibold text-sm no-underline">(888) 212-8140</span>
    </a>
  </header>
);

const Footer = () => (
  <footer className="bg-[#0b1f3a] text-white px-4 md:px-8 lg:px-20 py-12">
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex items-center justify-center mb-4">
        <img src={union} alt="Union" className="h-8 w-8 mr-2" />
        <h3 className="text-2xl md:text-3xl font-bold">Justice Advocates</h3>
      </div>
      <p className="mb-2 text-sm md:text-base opacity-80">
        123 Justice Avenue, Lawsuit City, LC 54321
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-4 text-sm md:text-base opacity-80">
        <p>Phone: (555) 123-4567 |</p>
        <p>Email: contact@justiceadvocates.law</p>
      </div>
      <p className="text-xs md:text-sm italic mt-8 opacity-60">
        © 2023 Justice Advocates. Attorney Advertising.
      </p>
      <p className="text-xs md:text-sm mt-2 text-gray-400">
        This website is for informational purposes only and does not constitute legal advice.
      </p>
    </div>
  </footer>
);

const LanderOne = () => {
  const [step, setStep] = useState(1);
  const [showExitMessage, setShowExitMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    hasCancerDiagnosis: "",
    conditions: [],
    diagnosisMonth: "",
    diagnosisYear: "",
    exposedToAFFF: "",
    exposureLocations: [],
    exposureState: "",
    hasAttorney: "",
    formFor: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zip: "",
    state: "",
    consent: false
  });

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'consent') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle multi-select checkboxes
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleStep1Change = (value) => {
    setFormData(prev => ({ ...prev, hasCancerDiagnosis: value }));
    if (value === "No") {
      setShowExitMessage(true);
    } else {
      setShowExitMessage(false);
      setStep(2);
    }
  };

const sendEmail = async (templateParams, templateId) => {
  try {
    const response = await emailjs.send(
      'service_9pv809e', // Replace with your EmailJS service ID
      templateId,
      templateParams,
      'DyDZ85E9uwzwSyUoD' // Replace with your EmailJS public key
    );
    return response;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare email data
      const emailData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        zip: formData.zip,
        state: formData.state,
        hasCancerDiagnosis: formData.hasCancerDiagnosis,
        conditions: formData.conditions.join(', '),
        diagnosisDate: `${formData.diagnosisMonth} ${formData.diagnosisYear}`,
        exposedToAFFF: formData.exposedToAFFF,
        exposureLocations: formData.exposureLocations.join(', '),
        exposureState: formData.exposureState,
        hasAttorney: formData.hasAttorney,
        formFor: formData.formFor,
        submissionDate: new Date().toLocaleDateString()
      };

      // Send email to admin
      await sendEmail({
        ...emailData,
        to_email: 'admin@justiceadvocates.law',
        subject: 'New PFAS Lawsuit Form Submission'
      }, 'template_d756gjf');

      // Send confirmation email to user
      await sendEmail({
        ...emailData,
        to_email: formData.email,
        subject: 'Your PFAS Lawsuit Form Submission Received'
      }, 'template_xbsrdpp');

      setSubmitMessage('Thank you! Your form has been submitted successfully. You will receive a confirmation email shortly.');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          hasCancerDiagnosis: "",
          conditions: [],
          diagnosisMonth: "",
          diagnosisYear: "",
          exposedToAFFF: "",
          exposureLocations: [],
          exposureState: "",
          hasAttorney: "",
          formFor: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          zip: "",
          state: "",
          consent: false
        });
        setStep(1);
        setSubmitMessage('');
      }, 3000);

    } catch (error) {
      setSubmitMessage('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#0b1f3a] h-64 flex items-center justify-center text-white text-center px-4">
        <div className="p-6 rounded">
          <h2 className="text-4xl font-bold">
            PFAS Cancer Lawsuit
          </h2>
          <div className="h-1 w-25 bg-red-600 mx-auto my-3 rounded"></div>
          <p className="mt-2 text-lg">
            If you or a loved one has been diagnosed with <strong>cancer</strong> after <strong>PFAS exposure</strong>, you may be eligible for <strong>financial compensation</strong>.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="p-6 bg-white text-white flex justify-center">
        <div className="max-w-xl bg-white text-black p-6 rounded shadow-lg w-full">
          <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center bg-[#0b1f3a] p-2 rounded">
            Free Case Review
          </h3>

          {showExitMessage ? (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 font-medium">You may not qualify at this time.</p>
              <button 
                onClick={() => {
                  setShowExitMessage(false);
                  setStep(1);
                  setFormData(prev => ({ ...prev, hasCancerDiagnosis: "" }));
                }}
                className="mt-2 text-blue-600 underline"
              >
                Start Over
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Step 1 */}
              <div>
                <p className="mb-2 font-medium">
                  Have you or a loved one been diagnosed with cancer after PFAS exposure?
                </p>
                <div className="space-y-2">
                  {['Yes', 'No'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="hasCancerDiagnosis"
                        value={option}
                        checked={formData.hasCancerDiagnosis === option}
                        onChange={(e) => handleStep1Change(e.target.value)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {step >= 2 && (
                <div>
                  <p className="mb-2 font-medium">Which condition was diagnosed? (Select all that apply)</p>
                  <div className="space-y-2">
                    {['Kidney Cancer', 'Testicular Cancer', 'Ulcerative Colitis', 'Liver Cancer', 'Not Sure'].map(condition => (
                      <label key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          name="conditions"
                          value={condition}
                          checked={formData.conditions.includes(condition)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {condition}
                      </label>
                    ))}
                  </div>
                  {formData.conditions.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="mt-3 bg-[#0b1f3a] text-white py-1 px-4 rounded"
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}

              {/* Step 3 */}
              {step >= 3 && (
                <div>
                  <p className="mb-2 font-medium">What year was the diagnosis made?</p>
                  <div className="flex gap-2">
                    <select
                      name="diagnosisMonth"
                      value={formData.diagnosisMonth}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value && formData.diagnosisYear) setStep(4);
                      }}
                      className="flex-1 border border-gray-300 p-2 rounded"
                    >
                      <option value="">Month</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      name="diagnosisYear"
                      value={formData.diagnosisYear}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value && formData.diagnosisMonth) setStep(4);
                      }}
                      className="flex-1 border border-gray-300 p-2 rounded"
                    >
                      <option value="">Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step >= 4 && (
                <div>
                  <p className="mb-2 font-medium">Were you exposed to firefighting foam (AFFF)?</p>
                  <div className="space-y-2">
                    {['Yes', 'No'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="exposedToAFFF"
                          value={option}
                          checked={formData.exposedToAFFF === option}
                          onChange={(e) => {
                            handleChange(e);
                            setStep(5);
                          }}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step >= 5 && (
                <div>
                  <p className="mb-2 font-medium">Where did exposure occur? (Select all that apply)</p>
                  <div className="space-y-2">
                    {['Firefighting job', 'Military Base', 'Airport', 'Contaminated Water', 'Chemical Plant'].map(location => (
                      <label key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          name="exposureLocations"
                          value={location}
                          checked={formData.exposureLocations.includes(location)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {location}
                      </label>
                    ))}
                  </div>
                  {formData.exposureLocations.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(6)}
                      className="mt-3 bg-[#0b1f3a] text-white py-1 px-4 rounded"
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}

              {/* Step 6 */}
              {step >= 6 && (
                <div>
                  <p className="mb-2 font-medium">In which state did the exposure occur?</p>
                  <select
                    name="exposureState"
                    value={formData.exposureState}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value) setStep(7);
                    }}
                    className="w-full border border-gray-300 p-2 rounded"
                  >
                    <option value="">Please select</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Step 7 */}
              {step >= 7 && (
                <div>
                  <p className="mb-2 font-medium">Are you currently represented by an attorney?</p>
                  <div className="space-y-2">
                    {['Yes', 'No'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="hasAttorney"
                          value={option}
                          checked={formData.hasAttorney === option}
                          onChange={(e) => {
                            handleChange(e);
                            setStep(8);
                          }}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8 */}
              {step >= 8 && (
                <div>
                  <p className="mb-2 font-medium">Who is this form for?</p>
                  <div className="space-y-2">
                    {['Self', 'Spouse', 'Parent', 'Other'].map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="formFor"
                          value={option}
                          checked={formData.formFor === option}
                          onChange={(e) => {
                            handleChange(e);
                            setStep(9);
                          }}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 9 - Contact Info */}
              {step >= 9 && (
                <div className="space-y-4">
                  <p className="font-medium text-lg">Contact Information</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={(e) => {
                          handleChange(e);
                          if (e.target.value) setStep(10);
                        }}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 10 - Consent */}
              {step >= 10 && (
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mr-2 mt-1"
                    />
                    <span className="text-sm">
                      I consent to receive communications from Justice Advocates regarding my potential case. 
                      I understand that this does not create an attorney-client relationship and that my information 
                      will be kept confidential.
                    </span>
                  </label>

                  <div className="flex justify-center mt-6">
                    <button 
                      type="button"
                      onClick={handleSubmit}
                      disabled={!formData.consent || isSubmitting}
                      className="bg-[#0b1f3a] text-white py-2 px-8 rounded hover:bg-red-700 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </div>
              )}

              {submitMessage && (
                <div className={`text-center p-3 rounded ${submitMessage.includes('error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {submitMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Informational Section */}
      <section className="p-6 bg-white text-center">
        <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
          <h3 className="text-2xl font-bold mb-4 text-black">
            PFAS Cancer Lawsuit: Holding Manufacturers Accountable
          </h3>
          <p>
            The PFAS lawsuit is based on rising concerns that exposure to these "forever chemicals" may lead to various cancers.
          </p>
          <p>
            Many were not warned about these risks. This lawsuit seeks justice, compensation, and accountability.
          </p>
          <div className="flex justify-center">
            <button className="mt-4 px-6 py-2 bg-red-600 text-white text-xl rounded-full hover:bg-red-700">
              Complete Your Free Case Evaluation
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-6 text-center bg-white">
        <h3 className="text-2xl font-bold mb-2">
          I've Been Affected by PFAS, What Should I Do Now?
        </h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          If you or a loved one has developed cancer potentially linked to PFAS exposure, speak with our legal team today.
        </p>
        <div className="flex justify-center">
          <button className="mt-4 px-6 py-2 bg-red-600 text-white text-xl rounded-full hover:bg-red-700">
            Do I Qualify?
          </button>
        </div>
      </section>

      {/* Tiles Section */}
      <section className="p-6 bg-[#e6f0fa]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "https://img.icons8.com/ios-filled/50/form.png",
              title: "Complete Online Form",
              desc: "Time to file is limited. Request your free review.",
            },
            {
              icon: "https://img.icons8.com/ios-filled/50/call-transfer.png",
              title: "Free Case Review",
              desc: "You'll be contacted by an attorney soon.",
            },
            {
              icon: "https://img.icons8.com/ios-filled/50/justice.png",
              title: "Get Justice",
              desc: "No fees unless you receive compensation.",
            },
          ].map((item, index) => (
            <div key={index} className="bg-[#0b1f3a] text-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
              <div className="mb-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img src={item.icon} alt={item.title} className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LanderOne;