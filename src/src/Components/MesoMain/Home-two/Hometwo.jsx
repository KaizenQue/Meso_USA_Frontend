import React, { useState, useRef, useEffect } from "react";
import Vector2 from "../../assets/Vector2.png";
import Vector1 from "../../assets/Vector1.png";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";

import { sendHomeFormEmail } from "../../utils/emailService";
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

const 
Hometwo = () => {
  const formRef = useRef();

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
  });

  // Add state for form errors
  const [errors, setErrors] = useState({});
  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, settokenUrl] = useState("");
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for success dialog
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [capVal, setCapVal] = useState(null)

 
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing in the field
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 1) {
      newErrors.firstName = "First name must be at least 1 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 1) {
      newErrors.lastName = "Last name must be at least 1 characters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      // Accept formats like: +1 561-555-7689, (561) 555-7689, 561-555-7689, 5615557689
      const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber =
          "Invalid US phone number format (e.g. +1 561-555-7689)";
      }
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else {
      // Email validation with regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.emailId)) {
        newErrors.emailId = "Please enter a valid email address";
      }
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
      <ToastContainer position="top-right" />

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="home-dialog-title"
        aria-describedby="home-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "16px",
            padding: "16px",
            maxWidth: "550px",
          },
        }}
      >
        <DialogTitle
          id="home-dialog-title"
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
            id="home-dialog-description"
            sx={{
              fontFamily: "Helvetica",
              fontSize: "18px",
              color: "#4b2c5e",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {/* <b>Thank You for Reaching Out!</b> <br></br> */}
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

      {/* Desktop Version */}
      <div className="hidden md:block bg-[#FAF3EC] font-georgia m-0 p-0 2xl:mt-[-30%]">
         <div className="bg-[#FAF3EC] font-georgia m-0 p-0">
          <div className="w-full md:w-[900px] lg:w-[1100px] xl:w-[1280px] 2xl:w-[1440px] h-[1200px] flex-shrink-0 2xl:ml-[20%] mx-auto">   
            <div className="absolute mt-32 w-auto">
              <img
                src={Vector2}
                alt="Senior Couple"
                className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[250px] lg:h-[250px] xl:w-[300px] xl:h-[300px] 2xl:w-[358px] 2xl:h-[364.0168px] ml-[5%] lg:ml-[30px] xl:ml-[5px] 2xl:ml-[1px] mt-[8%] md:mt-[-12%] xl:mt-[36px] 2xl:mt-[36px] object-contain"
              />
               <img
                src={Vector1}
                alt="Family"
                className="w-[70px] h-[48px] ml-[40%] mt-[10%] transform rotate-[1.701deg] hidden md:block md:w-[113px] md:h-[111px] md:ml-[54%] lg:w-[170px] lg:h-[170px] lg:ml-[120px] lg:mt-[0%] xl:w-[200px] xl:h-[200px] xl:ml-[140px] xl:mt-[1px] 2xl:w-[220px] 2xl:h-[136px] 2xl:ml-[170px] 2xl:mt-[0px] flex-shrink-0 absolute object-contain"
              /> 
            </div>
            <div className="flex flex-col items-center text-center h-auto ">
              <div className="mt-[15%] ml-[75%] sm:ml-[23%] lg:ml-[28%] flex flex-wrap gap-4 text-[#4B2C5E] font-feature-dlig font-georgia text-[96px] md:text-[50px] lg:text-[70px] xl:text-[96px] italic font-normal leading-normal xl:mt-[242px] 2xl:mt-[274px] px-0 lg:px-8 xl:px-0 items-start text-left">
                <h1 className="mt-15 text-left text-[96px] md:text-[55px] lg:text-[70px] xl:text-[96px] break-words lg:whitespace-normal w-full">
                  <span className="italic font-georgia">At 70,</span>
                  <br />
                  <span className="text-[#4B2C5E]/60 italic font-georgia">Every Day</span>
                  <span className="text-[#4B2C5E]/60 italic font-georgia"> Matters</span>
                </h1>      
                <p className="text-[#4B2C5E] font-helvetica text-[24px] md:text-[16px] lg:text-[20px] xl:text-[24px] font-normal max-w-md md:max-w-[534px] lg:max-w-none w-full h-auto text-left md:pr-[50px] lg:pr-[100px] xl:pr-0">
                  You're a parent, a partner, a friend-and you deserve more than care. You deserve compassion, presence, and someone who walks beside you every step of the way.
                </p>
              </div>
            </div>

            <div className="p-[30px] mt-[0.5%] ml-[42%] sm:w-[710px] sm:ml-[5%] lg:ml-[19%] lg:mt-[6.5%] w-[817px] md:h-[720px]  text-center shadow-[0_4px_8px_rgba(0,0,0,0.1)] rounded-[20px] bg-white absolute z-10 xl:w-[800px] xl:ml-[25%] xl:h-[730px] xl:mt-0 2xl:w-[40%] 2xl:h-[757px] 2xl:mt-0 min-[1536px]:ml-[15%]">
              <p className="text-[#4B2C5E] font-feature-dlig font-georgia text-[24px] italic font-normal leading-10 w-[679px] text-left h-[100px]">
                <em>Your journey to justice starts here.</em>
              </p>

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
                          new Date().setFullYear(new Date().getFullYear() - 18)
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
                        <b>Type of Diagnosis *</b>
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
                        <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                        <MenuItem value="lung_cancer">Lung Cancer</MenuItem>
                        
                      </Select>
                      {errors.diagnosisType && (
                        <FormHelperText>{errors.diagnosisType}</FormHelperText>
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
                  {/* <div className="flex items-start gap-4 font-helvetica">
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
                    <div className="text-xs sm:text-sm font-helvetica text-left">
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
                        &nbsp; and give my express written consent, affiliates
                        and/or lawyer to contact you at the number provided
                        above, even if this number is a wireless number or if I
                        am presently listed on a Do Not Call list. I understand
                        that I may be contacted by telephone, email, text
                        message or mail regarding case options and that I may be
                        called using automatic dialing equipment. Message and
                        data rates may apply. My consent does not require
                        purchase. This is Legal advertising.
                      </span>
                      <span> </span>
                    </div>
                  </div>
                  {errors.privacyPolicy && (
                    <div className="text-red-500 text-sm">
                      {errors.privacyPolicy}
                    </div>
                  )}

                  <div className="flex items-start gap-4 font-helvetica">
                    <input
                      type="hidden"
                      id="xxTrustedFormCertUrl"
                      name="xxTrustedFormCertUrl"
                    />

                    <input
                      type="checkbox"
                      name="humanVerification"
                      checked={formData.humanVerification}
                      onChange={handleChange}
                      data-tf-element-role="consent-opt-in"
                      className="mt-1"
                    />
                    <div className="text-xs sm:text-sm">
                      Please check this box to verify you're a person.
                    </div>
                  </div>
                  {errors.humanVerification && (
                    <div className="text-red-500 text-sm">
                      {errors.humanVerification}
                    </div>
                  )}
                </div>
                {/* <ReCAPTCHA
                  sitekey="6LfaS0YrAAAAAC-mFXPSwR2R-QLwSGFNsrxddByS" // Get this from Google reCAPTCHA admin
                  onChange={(val) => setCapVal(val)}
                /> */}

                <div className="text-left sm:text-left">
                  <button
                    type="submit" 
                    disabled={isSubmitting}
                    data-tf-element-role="consent-opt-in"
                    className={`rounded-[10px] bg-[#4b2c5e] text-[#f8f2e9] px-8 sm:px-12 py-3 sm:py-4 font-bold transition-colors text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 ${
                      isSubmitting
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
            </div>
          </div>
       
       
       
        </div>
      </div>

      {/* Mobile Version - updated with Material UI fields */}
      <div className="block md:hidden bg-[#FAF3EC] font-georgia p-5">
        {/* Images at the top */}
        <div className="flex flex-col items-center">
          <img
            src={Vector2}
            alt="Senior Couple"
            className="w-[70%] max-w-[280px] mt-8"
          />
          <img
            src={Vector1}
            alt="Family"
            className="w-[60%] max-w-[200px] mt-4 hidden md:block"
          />
        </div>

        {/* Text content below images */}
        <div className="mt-8 text-center">
          <h1 className="text-[#4B2C5E] text-4xl italic font-georgia">
            <span>At 70,</span>
            <br />
            <span className="text-[#4B2C5E]/60">Every Day Matters</span>
          </h1>
          <p className="text-[#4B2C5E] font-helvetica text-lg mt-6 px-4 text-center">
            You're a parent, a partner, a friend-and you deserve more than care.
            You deserve compassion, presence, and someone who walks beside you
            every step of the way.
          </p>
        </div>

        {/* Form container - centered below text with Material UI components */}
        <div className="p-6 rounded-[20px] mt-8 bg-white shadow-md mx-auto max-w-[500px]">
          <p className="text-[#4B2C5E] font-georgia text-xl italic mb-6 text-center">
            {/* <em>We're here to walk beside you every step of the way not just as professionals, but as people who care</em> */}
            <em>Your journey to justice starts here.</em>
          </p>

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
                      new Date().setFullYear(new Date().getFullYear() - 18)
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
                    <b>Type of Diagnosis *</b>
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
                    <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                    <MenuItem value="lung_cancer">Lung Cancer</MenuItem>
                    
                  </Select>
                  {errors.diagnosisType && (
                    <FormHelperText>{errors.diagnosisType}</FormHelperText>
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
              {/* <div className="flex items-start gap-4 font-helvetica">
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
                <div className="text-red-500 text-sm">{errors.settlement}</div>
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
                <div className="text-xs sm:text-sm font-helvetica ">
                  <span className="block" data-tf-element-role="consent-opt-in">
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
                    &nbsp; and give my express written consent, affiliates
                    and/or lawyer to contact you at the number provided above,
                    even if this number is a wireless number or if I am
                    presently listed on a Do Not Call list. I understand that I
                    may be contacted by telephone, email, text message or mail
                    regarding case options and that I may be called using
                    automatic dialing equipment. Message and data rates may
                    apply. My consent does not require purchase. This is Legal
                    advertising.
                  </span>
                  <span> </span>
                </div>
              </div>
              {errors.privacyPolicy && (
                <div className="text-red-500 text-sm">
                  {errors.privacyPolicy}
                </div>
              )}

              <div className="flex items-start gap-4 font-helvetica">
                <input
                  type="hidden"
                  id="xxTrustedFormCertUrl"
                  name="xxTrustedFormCertUrl"
                />

                <input
                  type="checkbox"
                  name="humanVerification"
                  checked={formData.humanVerification}
                  onChange={handleChange}
                  data-tf-element-role="consent-opt-in"
                  className="mt-1"
                />
                <div className="text-xs sm:text-sm">
                  Please check this box to verify you're a person.
                </div>
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
                className={`rounded-[10px] bg-[#4b2c5e] text-[#f8f2e9] px-8 sm:px-12 py-3 sm:py-4 font-bold transition-colors text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 ${
                  isSubmitting
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
        </div>
      </div>
    </>
  );
};

export default Hometwo;
