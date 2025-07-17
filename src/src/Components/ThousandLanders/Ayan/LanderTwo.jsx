
import React, { useState } from 'react';
import { Phone, ChevronDown } from "lucide-react";
import emailjs from '@emailjs/browser';
import hero from '../../../assets/ayan/meso/hero1.png'; 
import ladyJusticeImage from '../../../assets/ayan/meso/sec2.png'; 
import judgeImage from '../../../assets/ayan/meso/sec3.png'; 
import union from '../../../assets/ayan/meso/Union.svg'; 
import logo from '../../../assets/ayan/meso/meso.png';



const LanderTwo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    asbestosExposure: '',
    dob: '',
    state: '',
    dateOfDiagnosis: '',
    story: '',
    agree: false,
    verify: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_9pv809e',       
    USER_TEMPLATE_ID: 'template_vmip1ij', 
    ADMIN_TEMPLATE_ID: 'template_0rolhwf', 
    PUBLIC_KEY: 'DyDZ85E9uwzwSyUoD'        
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const sendUserConfirmationEmail = async (formData) => {
    const templateParams = {
      to_name: `${formData.firstName} ${formData.lastName}`,
      to_email: formData.email,
      user_name: `${formData.firstName} ${formData.lastName}`,
      user_phone: formData.phone,
      user_email: formData.email,
      asbestos_exposure: formData.asbestosExposure,
      date_of_birth: formData.dob,
      state: formData.state,
      dateOfDiagnosis: formData.dateOfDiagnosis,
      story: formData.story || 'No additional information provided',
      submission_date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      submission_time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };

    return emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.USER_TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
  };

  const sendAdminNotificationEmail = async (formData) => {
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      from_phone: formData.phone,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      asbestos_exposure: formData.asbestosExposure,
      date_of_birth: formData.dob,
      state: formData.state,
      dateOfDiagnosis: formData.dateOfDiagnosis,
      story: formData.story || 'No additional information provided',
      submission_date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      submission_time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };

    return emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agree || !formData.verify) {
      alert('Please accept the legal terms and verify the information.');
      return;
    }

    setIsSubmitting(true);

    try {
      
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Send confirmation email to user and notification email to admin
      const [userEmailResult, adminEmailResult] = await Promise.all([
        sendUserConfirmationEmail(formData),
        sendAdminNotificationEmail(formData)
      ]);


  
      alert('🎉 Thank you! Your claim form has been submitted successfully. You will receive a confirmation email shortly.');
    
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        asbestosExposure: '',
        dob: '',
        state: '',
        dateOfDiagnosis: '',
        story: '',
        agree: false,
        verify: false
      });

    } catch (error) {
     
      alert('❌ An error occurred while submitting the form. Please try again or contact us directly at (888) 212-8140.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased">
      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-8 lg:px-12 py-3 bg-white w-full">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-30 h-12 object-cover" />
        </div>
        <a href="tel:+18882128140" className="flex items-center gap-2 bg-[#2E4A7D] text-white rounded-full px-3 py-1 hover:bg-[#002244] no-underline">
          <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">(888) 212-8140</span>
        </a>
      </header>

      <section className="relative flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 pt-10 pb-16 bg-white gap-10">
  {/* Text Section */}
  <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 font-quicksand">
      Diagnosed with Mesothelioma After Years in Construction?
    </h1>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-black mb-8 font-sansation">
      If you worked in construction and have now been diagnosed with Mesothelioma, you're not alone, and you may be eligible for significant compensation.
    </p>
    <button className="bg-[#2E4A7D] hover:bg-[#002244] text-white px-6 py-3 rounded-md text-sm sm:text-base md:text-lg font-bold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-fit mx-auto md:mx-0">
      Check My Eligibility Now
    </button>
  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/2 flex justify-center items-center">
    <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square rounded-3xl overflow-hidden shadow-2xl">
      <img src={hero} alt="Mesothelioma Awareness" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2E4A7D]/30 to-transparent"></div>
    </div>
  </div>
</section>


      {/* Compensation Section */}
      <section className="px-0 py-16 bg-[#F5F6F9]">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-[#000000] font-quicksand">
          You may be eligible for compensation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-[90%] xl:max-w-[85%] mx-auto font-quicksand">
          {[
            {
              title: "Structural Trades",
              desc: "Renovation Contractors, Bricklayers, and Masons often faced asbestos exposure.",
            },
            {
              title: "Mechanical Trades",
              desc: "Sheet Metal Workers, Insulation Installers, and Construction Laborers were at high risk.",
            },
            {
              title: "Skilled Trades",
              desc: "Electricians, Plumbers, Carpenters, and Roofers frequently encountered asbestos materials.",
            }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-row bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-[#e0f2f7] min-w-[320px] max-w-full"
            >
              <div className="w-24 h-24 bg-[#2E4A7D] rounded-xl flex items-center justify-center mr-4 shrink-0">
                {/* Optional icon */}
              </div>

              <div className="flex flex-col justify-center text-black">
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Claim Form Section */}
      <section className="bg-[#ffffff] px-2 md:px-4 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8 max-w-[1600px] mx-auto">
          <div className="md:w-1/2 w-full flex justify-center items-center">
            <img src={ladyJusticeImage} alt="Legal Consultation" className="w-full max-h-[800px] object-cover object-top rounded-2xl" />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-black font-quicksand">Claim Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 max-w-3xl mx-auto p-6 bg-white rounded-2xl">

              {[
                { label: "First Name *", name: "firstName", type: "text", required: true },
                { label: "Last Name *", name: "lastName", type: "text", required: true },
                { label: "Phone Number *", name: "phone", type: "tel", required: true },
                { label: "Email ID *", name: "email", type: "email", required: true },
                { label: "Type of Asbestos Exposure *", name: "asbestosExposure", type: "text", required: true },
                { label: "Date of Birth *", name: "dob", type: "date", required: true }
              ].map((field, idx) => (
                <div key={idx} className="flex flex-col col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A7D]"
                  />
                </div>
              ))}

              {/* State Dropdown */}
              <div className="flex flex-col col-span-1 relative">
                <label className="text-sm font-semibold text-gray-700 mb-1">Select State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A7D] appearance-none pr-10"
                >
                  <option value="">-- Select State --</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
                <span className="absolute right-3 top-11 text-gray-500">&#9662;</span>
              </div>

              {/* dateOfDiagnosis Dropdown */}
               <div className="flex flex-col relative">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Date of Diagnosis <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dateOfDiagnosis"
            value={formData.dateOfDiagnosis}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]} 
            className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A7D] pr-10"
          />
        </div>

              {/* Story Textarea */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-1">Tell us your story (optional)</label>
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2E4A7D] min-h-[100px] resize-none"
                />
              </div>

              {/* Legal Checkbox */}
              <label className="flex items-start gap-3 text-sm text-gray-700 md:col-span-2 leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-[#2E4A7D]"
                  required
                />
                <span className="text-sm text-gray-600">
  I agree to the <a href="/PrivacyPolicy" target="_blank" rel="noopener noreferrer" className="underline font-medium">privacy policy</a> and <a href="/Disclaimer" target="_blank" rel="noopener noreferrer" className="underline font-medium">disclaimer</a> and give my express written consent to be contacted regarding my case options. I understand that I may be contacted using automatic dialing equipment. Message and data rates may apply. My consent does not require purchase. This is Legal advertising.
</span>

              </label>

              {/* Verification Checkbox */}
              <label className="flex items-start gap-3 text-sm text-gray-700 md:col-span-2 leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  name="verify"
                  checked={formData.verify}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-[#2E4A7D]"
                  required
                />
                <span>
                  I verify that the information provided is true and accurate to the best of my knowledge.
                </span>
              </label>

              <div className="md:col-span-2 flex justify-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#2E4A7D] hover:bg-[#002244] text-white px-6 py-3 rounded-md font-bold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

<section className="px-0 md:px-2 py-16 bg-[#F5F6F9]">
  <h2 className="text-3xl md:text-4xl font-bold mb-10 text-left text-black font-quicksand pl-4 sm:pl-6 md:pl-10">
    Frequently Asked Questions
  </h2>

  <div className="w-full md:w-11/12 lg:w-10/12 mx-auto space-y-4">

    <div className="bg-white rounded-xl shadow-md p-6 text-left transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-black">
          Enim sodales consequat adipiscing facilisis massa venenatis, non lorem lobortis?
        </h3>
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 text-left transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-black">
          Venenatis nulla sagittis nunc, lobortis nec sollicitudin neque, dolor?
        </h3>
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 text-left transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-black">
          Varius ultricies molestie tellus fermentum, viverra ipsum scelerisque etiam lorem?
        </h3>
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
 
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 text-left transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-black">
          Nulla etiam vitae, at sagittis, nibh ultrices mattis feugiat faucibus?
        </h3>
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
   
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 text-left transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-black">
          Sagittis consectetur gravida nec turpis eros, id sit et, dictum?
        </h3>
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
 
    </div>

  </div>
</section>


      {/* CTA Section */}
      <section className="px-4 md:px-8 lg:px-12 py-16 bg-gray-50">
        <div className="bg-[#2E4A7D] rounded-3xl shadow-2xl flex flex-col md:flex-row items-stretch w-full mx-auto text-white overflow-hidden">
          <div className="md:w-3/5 p-6 md:p-12 text-left flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
              Ready to Discuss Your Case?
            </h2>
            <p className="mb-8 text-base md:text-lg lg:text-xl leading-relaxed opacity-90">
              Contact us today for a <strong>free, confidential consultation</strong>. Let our experienced attorneys help you understand your legal options and fight for the justice you deserve.
            </p>
            <div className="w-fit">
              <button className="bg-[#C49A6C] text-[#ffffff] text-white px-6 py-3 rounded-md text-base sm:text-lg font-bold shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-fit mx-auto md:mx-0">
                Start Your Claim Now
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-2/5 w-full flex items-stretch">
            <img
              src={judgeImage}
              alt="Consultation"
              className="w-full h-full object-cover object-right rounded-tr-3xl rounded-br-3xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#2E4A7D] text-white px-4 md:px-8 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={union} alt="Union" className="h-8 w-8 mr-2" />
            <h3 className="text-2xl md:text-3xl font-bold leading-none">Justice Advocates</h3>
          </div>

          <p className="mb-2 text-sm md:text-base opacity-80">123 Justice Avenue, Lawsuit City, LC 54321</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-4 text-sm md:text-base opacity-80">
            <p>Phone: (555) 123-4567 |</p>
            <p>Email: contact@justiceadvocates.law</p>
          </div>
          <p className="text-xs md:text-sm italic mt-8 opacity-60">
            © 2023 Justice Advocates: All Rights Reserved. Attorney Advertising: Past results do not guarantee future outcomes.
          </p>
          <p className="text-xs md:text-sm mt-2 text-gray-400">
            This website is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </section>

      <footer className="flex flex-row justify-between items-center px-4 md:px-8 lg:px-12 py-3 bg-[#C49A6C] w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-35 h-12  object-cover"
          />
        </div>

        {/* Phone Button */}
        <a
          href="tel:+18882128140"
          className="flex items-center gap-2 bg-[#C49A6C] text-white rounded-full px-3 py-1 hover:bg-[#002244] transition duration-300 no-underline"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-white">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">(888) 212-8140</span>
        </a>
      </footer>
    </div>
  );
};

export default LanderTwo;


