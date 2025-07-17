"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { sendClaimFormEmail } from '../utils/emailService'
import AutoMobileVideo from '../assets/AutoMobile.mp4'


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
  CircularProgress
} from '@mui/material'
import SuccessDialog from "./SuccessDialog"

const textFieldStyle = {
  '& .MuiInputLabel-root': {
    color: '#4b2c5e',
    fontSize: '20px',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    '&.Mui-focused': {
      color: '#4b2c5e'
    }
  },
  '& .MuiInput-root': {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    color: '#4b2c5e',
    '&:before': {
      borderBottomColor: 'rgba(75,44,94,0.4)'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'rgba(75,44,94,0.6)'
    },
    '&:after': {
      borderBottomColor: '#4b2c5e'
    },
    '&.Mui-focused': {
      color: '#4b2c5e'
    }
  },
  '& .MuiFormHelperText-root': {
    fontSize: '14px',
    fontFamily: 'Helvetica'
  },
  '& .Mui-error': {
    color: '#d32f2f',
    '&:after': {
      borderBottomColor: '#d32f2f'
    }
  }
};

const selectFieldStyle = {
  ...textFieldStyle,
  '& .MuiSelect-select': {
    fontSize: '20px',
    fontFamily: 'Helvetica',
    color: '#4b2c5e'
  },
  '& .MuiSelect-icon': {
    color: '#4b2c5e'
  },
  '& .MuiInputLabel-root': {
    color: '#4b2c5e',
    fontSize: '20px',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    '&.Mui-focused': {
      color: '#4b2c5e'
    }
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(75,44,94,0.4)'
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'rgba(75,44,94,0.6)'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#4b2c5e'
  },
  '& .MuiFormHelperText-root': {
    fontSize: '14px',
    fontFamily: 'Helvetica',
    marginLeft: '0'
  }
};

const menuItemStyle = {
  fontSize: '18px',
  fontFamily: 'Helvetica',
  color: '#4b2c5e'
};

const usStates = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'GU', label: 'Guam' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'VI', label: 'U.S. Virgin Islands' }
];

const exposureLocations = [
  { value: 'military', label: 'Military Service' },
  { value: 'shipyard', label: 'Shipyard' },
  { value: 'construction', label: 'Construction Site' },
  { value: 'factory', label: 'Factory/Industrial Plant' },
  { value: 'power_plant', label: 'Power Plant' },
  { value: 'mine', label: 'Mine' },
  { value: 'refinery', label: 'Refinery' },
  { value: 'railroad', label: 'Railroad' },
  { value: 'automotive', label: 'Automotive Industry' },
  { value: 'textile', label: 'Textile Mill' },
  { value: 'insulation', label: 'Insulation Work' },
  { value: 'school', label: 'School/Public Building' },
  { value: 'residential', label: 'Residential Building' },
  { value: 'other', label: 'Other' }
];

export default function AutoMobile() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailId: '',
    state: '',
    asbestosExposure: '',
    exposureLocation: '',
    dateOfBirth: '',
    story: '',
    privacyPolicy: false,
    humanVerification: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      'firstName', 'lastName', 'phoneNumber', 'emailId',
      'state', 'asbestosExposure', 'exposureLocation', 'dateOfBirth'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailId && !emailRegex.test(formData.emailId)) {
      newErrors.emailId = 'Invalid email format';
    }

    const phoneRegex = /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid US phone number format (e.g. +1 561-555-7689)';
    }

    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = 'You must agree to the privacy policy';
    }

    if (!formData.humanVerification) {
      newErrors.humanVerification = 'Please verify you are a person';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const result = await sendClaimFormEmail(formData);

        if (result.success) {
          setSuccessDialogOpen(true);
          setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailId: '',
            state: '',
            asbestosExposure: '',
            exposureLocation: '',
            dateOfBirth: '',
            story: '',
            privacyPolicy: false,
            humanVerification: false
          });
        } else {
          toast.error('Error submitting form. Please try again.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Error submitting form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please correct the errors in the form');
    }
  };

  return (
    <Box className="relative min-h-screen w-full overflow-hidden">
      <ToastContainer position="top-right" />

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '16px',
            maxWidth: '550px'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{
          fontFamily: 'Georgia',
          fontSize: '28px',
          color: '#4b2c5e',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '16px'
        }}>
          {"Thank You for Reaching Out!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{
            fontFamily: 'Helvetica',
            fontSize: '18px',
            color: '#4b2c5e',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            One of our representatives will be in touch with you shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: '#2e4a7d',
              color: '#f8f2e9',
              fontFamily: 'Helvetica',
              fontWeight: 'bold',
              padding: '8px 24px',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#243c68',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Background Video */}
      <Box className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-20"
        >
          <source src={AutoMobileVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Content Container */}
      <Container maxWidth="lg" className="relative z-10 mx-auto min-h-screen">
        <Grid container spacing={4} className="min-h-screen">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col justify-center p-8"
            >
              <motion.h1
                className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Served Your Country, <span className="text-primary">Exposed to Asbestos?</span>
              </motion.h1>

              <motion.p
                className="mb-6 text-lg text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                You May Be Entitled to Compensation for Mesothelioma Caused by Military-Related Asbestos Exposure.
              </motion.p>

              <motion.div
                className="mb-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {[
                  "Military Service Increased Asbestos Exposure",
                  "Long Latency Period Delays Diagnosis",
                  "Access to VA Asbestos Trust Funds and Compensation"
                ].map((text, index) => (
                  <Box key={index} className="flex items-center gap-3">
                    <Box className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </Box>
                    <Typography>{text}</Typography>
                  </Box>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6" className="mb-2">Claim Now</Typography>
                    <Typography variant="body1" className="italic text-gray-600">
                      Take the first step towards securing the compensation you deserve for your service-related asbestos exposure.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full flex items-center justify-center p-8"
            >
              <Paper
                elevation={3}
                className="w-full max-w-2xl p-8"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* <Typography variant="h5" className="mb-6 text-center font-bold">
                  Get in Touch
                </Typography> */}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="w-full md:flex-1">
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
                      <TextField
                        id="lastName"
                        name="lastName"
                        label="Last Name *"
                        variant="standard"
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
                      <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number *"
                        variant="standard"
                        fullWidth
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        placeholder="+1 XXX-XXX-XXXX"
                        sx={textFieldStyle}
                      />
                    </div>
                    <div className="w-full md:flex-1">
                      <TextField
                        id="emailId"
                        name="emailId"
                        label="Email ID *"
                        variant="standard"
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
                      <FormControl fullWidth error={!!errors.state} variant="standard">
                        <InputLabel id="state-label" sx={{
                          color: '#4b2c5e',
                          fontSize: '20px',
                          fontFamily: 'Helvetica',
                          fontWeight: 'bold',
                          '&.Mui-focused': {
                            color: '#4b2c5e'
                          }
                        }}>State *</InputLabel>
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
                                '& .MuiMenuItem-root': menuItemStyle
                              }
                            }
                          }}
                        >
                          <MenuItem value="">Select a state</MenuItem>
                          {usStates.map((state) => (
                            <MenuItem key={state.value} value={state.value}>
                              {state.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
                      </FormControl>
                    </div>
                    <div className="w-full md:flex-1">
                      <FormControl fullWidth error={!!errors.asbestosExposure} variant="standard">
                        <InputLabel id="asbestos-exposure-label" sx={{
                          color: '#4b2c5e',
                          fontSize: '20px',
                          fontFamily: 'Helvetica',
                          fontWeight: 'bold',
                          '&.Mui-focused': {
                            color: '#4b2c5e'
                          }
                        }}>Asbestos Exposure *</InputLabel>
                        <Select
                          labelId="asbestos-exposure-label"
                          id="asbestosExposure"
                          name="asbestosExposure"
                          value={formData.asbestosExposure}
                          label="Asbestos Exposure *"
                          onChange={handleChange}
                          sx={selectFieldStyle}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                '& .MuiMenuItem-root': menuItemStyle
                              }
                            }
                          }}
                        >
                          <MenuItem value="">Select exposure type</MenuItem>
                          <MenuItem value="workplace">Workplace</MenuItem>
                          <MenuItem value="home">Home</MenuItem>
                          <MenuItem value="secondary">Secondary Exposure</MenuItem>

                        </Select>
                        {errors.asbestosExposure && <FormHelperText>{errors.asbestosExposure}</FormHelperText>}
                      </FormControl>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="w-full md:flex-1">
                      <FormControl fullWidth error={!!errors.exposureLocation} variant="standard">
                        <InputLabel id="exposure-location-label" sx={{
                          color: '#4b2c5e',
                          fontSize: '20px',
                          fontFamily: 'Helvetica',
                          fontWeight: 'bold',
                          '&.Mui-focused': {
                            color: '#4b2c5e'
                          }
                        }}>Exposure Location *</InputLabel>
                        <Select
                          labelId="exposure-location-label"
                          id="exposureLocation"
                          name="exposureLocation"
                          value={formData.exposureLocation}
                          label="Exposure Location *"
                          onChange={handleChange}
                          sx={selectFieldStyle}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                '& .MuiMenuItem-root': menuItemStyle
                              }
                            }
                          }}
                        >
                          <MenuItem value="">Select exposure location</MenuItem>
                          {exposureLocations.map((location) => (
                            <MenuItem key={location.value} value={location.value}>
                              {location.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.exposureLocation && <FormHelperText>{errors.exposureLocation}</FormHelperText>}
                      </FormControl>
                    </div>
                    <div className="w-full md:flex-1">
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
                        sx={textFieldStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <TextField
                      id="story"
                      name="story"
                      label="Tell us your story (optional)"
                      variant="standard"
                      fullWidth
                      multiline
                      minRows={4}
                      value={formData.story}
                      onChange={handleChange}
                      sx={textFieldStyle}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 font-['Helvetica']">
                      <input
                        type="checkbox"
                        name="settlement"
                        checked={formData.settlement}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div className="text-xs sm:text-sm">I would be needing help to file a settlement.</div>
                    </div>
                    {errors.settlement && <div className="text-red-500 text-sm">{errors.settlement}</div>}
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        name="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div className="text-xs sm:text-sm font-['Helvetica'] ">
                        <span className="block">
                          I agree to the{' '}
                          <a href="/PrivacyPolicy" className="underline hover:text-blue-200">
                            privacy policy
                          </a>{' '}
                          and{' '}
                          <a href="/Disclaimer" className="underline hover:text-blue-200">
                            disclaimer
                          </a>
                          &nbsp; and give my express written consent, affiliates and/or lawyer to contact you at the number provided above, even if this number is a wireless number or if I am presently listed on a Do Not Call list. I understand that I may be contacted by telephone, email, text message or mail regarding case options and that I may be called using automatic dialing equipment. Message and data rates may apply. My consent does not require purchase. This is Legal advertising.
                        </span>
                        <span> </span>
                      </div>
                    </div>
                    {errors.privacyPolicy && <div className="text-red-500 text-sm">{errors.privacyPolicy}</div>}

                    <div className="flex items-start gap-4 font-['Helvetica']">
                      <input
                        type="checkbox"
                        name="humanVerification"
                        checked={formData.humanVerification}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div className="text-xs sm:text-sm">Please check this box to verify you're a person.</div>
                    </div>
                    {errors.humanVerification && <div className="text-red-500 text-sm">{errors.humanVerification}</div>}
                  </div>

                  <div className="text-left sm:text-left">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`rounded-[10px] bg-[#2e4a7d] text-[#f8f2e9] px-8 sm:px-12 py-3 sm:py-4 font-bold transition-colors text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#243c68]'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <CircularProgress size={20} color="inherit" />
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
