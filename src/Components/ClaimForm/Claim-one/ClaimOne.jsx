import React, { useState, useRef, useEffect } from "react";
import ClaimFormImg from "../../../assets/Vector.svg";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { sendClaimFormEmail } from "../../../utils/emailService";

import { motion } from "framer-motion";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";
// import SuccessDialog from "./SuccessDialog";
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

const ClaimOne = () => {
  const form = useRef();

  // US States data
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

  // Exposure locations data
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

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    state: "",
    asbestosExposure: "",
    exposureLocation: "",
    dateOfBirth: "",
    story: "",
    privacyPolicy: false,
    humanVerification: false,
  });

  // State for form validation
  const [errors, setErrors] = useState({});
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for success dialog
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const [pingUrl, setPingUrl] = useState("");
  const [certId, setCertId] = useState("");
  const [tokenUrl, settokenUrl] = useState("");
  // Handle input changes
  // Handle input changes
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

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };
  return (
    <>
      <div className="hidden md:block w-full relative bg-[#faf3ec] min-h-screen overflow-hidden text-left text-[20px] text-[#4b2c5e] font-helvetica px-4 sm:px-8 py-8 sm:py-12">
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
                backgroundColor: "#4b2c5e",
                color: "#f8f2e9",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#3a2249",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Hero Section */}
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8 md:mb-16">
          <div className="w-full md:w-[230px] flex-shrink-0 ">
            <img
              src={ClaimFormImg}
              alt="Claim Form Illustration"
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 pt-4 md:pt-8 text-left">
            <i className='font-["Georgia"] relative text-[40px] sm:text-[60px] md:text-[40px] lg:text-[80px] inline-block text-[#4b2c5e]'>
              <span>{`You Don't Have to `}</span>
              <span className="text-[rgba(75,44,94,0.66)]">
                Face This Alone{" "}
              </span>
            </i>
            <div className='font-["Helvetica"] relative text-[18px] sm:text-[20px] md:text-[15px] text-[#4b2c5e] inline-block pb-[30px]'>{`If you, or a family member has been diagnosed with mesothelioma, don't hesitate to reach out. `}</div>
          </div>
        </div>

        <Grid
          item
          xs={12}
          md={6}
            className="pl-6 pr-20 md:pr-40 md:pl-0 flex justify-end items-end"
        >
          <motion.h1
            className="text-[#2E4A7D] font-georgia italic font-normal leading-tight text-left mx-auto px-4 xl:mt-32 lg:w-[1600px]"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.875rem)",
              width: "100%",
              maxWidth: "948px",
              marginBottom: "0",
              marginTop: "clamp(2rem, 8vw, 5rem)", // Responsive top margini
            }}
          >
            {/* Justice for Laborers Diagnosed with Mesothelioma */}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center w-[130%]"
          >
            <Paper
              elevation={3}
              className="w-full max-w-2xl md:-mt-16 md:ml-[400px]  lg:ml-[30%] xl:ml-[-58%]  2xl:-mt-30"
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
                className="text-[#4B2C5E] font-helvetica leading-normal italic
                                    mb-4 md:mb-6 
                                        text-base sm:text-lg md:text-xl 
                                            w-full sm:w-[80%] md:w-[580px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                This exposure wasn't your choice. But taking action is.
                <br></br>
                <b>Start your free claim today. Let's fight together.</b>
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
                    <div className="text-xs sm:text-sm font-helvetica ">
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
            </Paper>
          </motion.div>
        </Grid>

</div>

      <div className="block md:hidden bg-[#FAF3EC] font-georgia p-5">
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
                backgroundColor: "#4b2c5e",
                color: "#f8f2e9",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#3a2249",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Hero Section */}
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-8 md:mb-16">
          <div className="w-full md:w-[450px] flex-shrink-0">
            <img
              src={ClaimFormImg}
              alt="Claim Form Illustration"
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 pt-4 md:pt-8 text-left">
            <i className='font-["Georgia"] relative text-[40px] sm:text-[60px] md:text-[80px] lg:text-[80px] inline-block text-[#4b2c5e]'>
              <span>{`You Don't Have to `}</span>
              <span className="text-[rgba(75,44,94,0.66)]">
                Face This Alone{" "}
              </span>
            </i>
            <div className='font-["Helvetica"] relative text-[18px] sm:text-[20px] md:text-[24px] text-[#4b2c5e] inline-block pb-[30px]'>{`If you, or a family member has been diagnosed with mesothelioma, don't hesitate to reach out. `}</div>
          </div>
        </div>
        <div className="p-6 rounded-[20px] mt-8 bg-white shadow-md mx-auto max-w-[500px]">
          <p className="text-[#4B2C5E] font-georgia text-xl italic mb-6 text-center">
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

export default ClaimOne;
