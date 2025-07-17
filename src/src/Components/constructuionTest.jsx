import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { sendConstructionFormEmail } from '../utils/emailService'
import video from '../assets/video.mp4'
import ArrowRight from '../assets/ArrowRight.svg'
import Options from '../assets/options.svg'
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
import CallIcon from '../assets/callIcon.svg'

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

export default function MesoConstruction() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailId: '',
    dateOfBirth: '',
    dateOfDiagnosis: '',
    diagnosisType: '',
    otherDiagnosis: '',
    jobTitle: '',
    state: ''
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
      'dateOfBirth', 'dateOfDiagnosis', 'diagnosisType', 'jobTitle', 'state'
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

    if (formData.diagnosisType === 'other' && !formData.otherDiagnosis) {
      newErrors.otherDiagnosis = 'Please specify your diagnosis';
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
        const emailResponse = await sendConstructionFormEmail(formData);

        if (emailResponse.success) {
          setSuccessDialogOpen(true);

          setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailId: '',
            dateOfBirth: '',
            dateOfDiagnosis: '',
            diagnosisType: '',
            otherDiagnosis: '',
            jobTitle: '',
            state: ''
          });
        } else {
          throw new Error('Failed to send email');
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
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Content Container */}
      <Container maxWidth="100%" className="relative z-10 mx-auto min-h-screen">
        <Grid container spacing={4} className="min-h-screen">
          {/* Left Side - Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full flex flex-col p-8"
            >
              <motion.h1
                className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ fontFamily: "Georgia" }}
              >
                Were You Exposed to Asbestos on the <span className="text-primary">Job?</span>
              </motion.h1>

              <motion.p
                className="mb-6 text-lg text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ fontFamily: "Helvetica" }}
              >
                If you worked in construction and now face a mesothelioma diagnosis you're not alone, and you have rights.
              </motion.p>

              <motion.div
                className="mb-8 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{
                  padding: "0",
                  "@media (max-width: 600px)": {
                    padding: "0",
                    margin: "0"
                  }
                }}
              >
                {[
                  "Asbestos Exposure Often Occurred Decades Ago",
                  "High Risk Due to Direct Asbestos Exposure",
                  "Exposure Risk Extended to Family Members"
                ].map((text, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      position: "relative",
                      height: "60px",
                      textAlign: "left",
                      fontSize: "clamp(14px, 3vw, 20px)",
                      color: "#000",
                      fontFamily: "Lato",
                      marginBottom: "8px",
                      "@media (max-width: 600px)": {
                        marginBottom: "4px",
                        height: "auto",
                        minHeight: "60px"
                      }
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "60px",
                        boxShadow: "4px 5px 12px rgba(0, 0, 0, 0.25)",
                        borderRadius: "15px",
                        backgroundColor: "#fff",
                        width: "calc(100% - 70px)",
                        maxWidth: "454px",
                        height: "60px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        "@media (max-width: 600px)": {
                          left: "50px",
                          width: "calc(100% - 60px)",
                          height: "auto",
                          minHeight: "60px"
                        }
                      }}
                    >
                      <div
                        style={{
                          padding: "0 12px",
                          wordBreak: "break-word",
                          width: "100%",
                          "@media (max-width: 600px)": {
                            padding: "12px 8px"
                          }
                        }}
                      >
                        {text}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        borderRadius: "15px",
                        width: "50px",
                        height: "60px",
                        overflow: "hidden",
                        backgroundColor: "#4b2c5e",
                        boxShadow: "4px 5px 12px rgba(0, 0, 0, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "@media (max-width: 600px)": {
                          width: "40px",
                          height: "auto",
                          minHeight: "60px"
                        }
                      }}
                    >
                      <img
                        style={{
                          objectFit: "cover",
                          backgroundColor: "#4b2c5e",
                          "@media (max-width: 600px)": {
                            width: "40px",
                            height: "40px"
                          }
                        }}
                        alt=""
                        src={Options}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Typography variant="h6" className="mb-4" style={{ fontSize: "24px", fontFamily: "Lato", color: "#4b2c5e", fontWeight: "bold" }}>
                  Call us:
                </Typography>
                <a
                  href="tel:+18882128149"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                >
                  <div style={{
                    position: "relative",
                    borderRadius: "20px",
                    backgroundColor: "#4b2c5e",
                    height: "60px",
                    overflow: "hidden",
                    display: "inline-flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 24px",
                    boxSizing: "border-box",
                    gap: "8px",
                    textAlign: "left",
                    fontSize: "20px",
                    color: "#f5f5f5",
                    fontFamily: "Lato",
                    minWidth: "240px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#3a2247"
                    }
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}>
                      <img
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "contain"
                        }}
                        alt="Call icon"
                        src={CallIcon}
                      />
                      <div style={{
                        fontWeight: "800"
                      }}>
                        (833) 588-0606
                      </div>
                    </div>
                  </div>
                </a>
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
                  backgroundColor: '#4b2c5e',
                  borderRadius: '20px',
                  color: '#fff',
                  fontFamily: 'Inter',
                  minHeight: '700px',
                  height: 'auto',
                  overflow: 'auto',
                  '@media (max-width: 600px)': {
                    padding: '16px',
                    minHeight: 'auto',
                    marginBottom: '32px'
                  }
                }}
              >
                <Box sx={{
                  width: '83.33%',
                  margin: '3% auto',
                  '@media (max-width: 600px)': {
                    width: '100%',
                    margin: '0'
                  }
                }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '32px',
                      fontWeight: 600,
                      marginBottom: '8%'
                    }}
                  >
                    Get a free, no-obligation case review
                  </Typography>

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
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
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
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <FormControl fullWidth error={!!errors.state} variant="standard">
                          <InputLabel id="state-label" sx={{
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: 600,
                            '&.Mui-focused': {
                              color: '#fff'
                            }
                          }}>Select State *</InputLabel>
                          <Select
                            labelId="state-label"
                            id="state"
                            name="state"
                            value={formData.state}
                            label="Select State *"
                            onChange={handleChange}
                            sx={{
                              color: '#fff',
                              '& .MuiSelect-icon': {
                                color: '#fff'
                              },
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
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
                          {errors.state && <FormHelperText sx={{ color: '#fff' }}>{errors.state}</FormHelperText>}
                        </FormControl>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
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
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
                        />
                      </div>
                      <div className="w-full md:flex-1">
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
                          helperText={errors.dateOfDiagnosis}
                          InputLabelProps={{ shrink: true }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      <div className="w-full md:flex-1">
                        <FormControl fullWidth error={!!errors.diagnosisType} variant="standard">
                          <InputLabel id="diagnosis-type-label" sx={{
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: 600,
                            '&.Mui-focused': {
                              color: '#fff'
                            }
                          }}>Type of Diagnosis *</InputLabel>
                          <Select
                            labelId="diagnosis-type-label"
                            id="diagnosisType"
                            name="diagnosisType"
                            value={formData.diagnosisType}
                            label="Type of Diagnosis *"
                            onChange={handleChange}
                            sx={{
                              color: '#fff',
                              '& .MuiSelect-icon': {
                                color: '#fff'
                              },
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            }}
                          >
                            <MenuItem value="">Select diagnosis type</MenuItem>
                            <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                            <MenuItem value="lung_cancer">Lung Cancer</MenuItem>

                          </Select>
                          {errors.diagnosisType && <FormHelperText sx={{ color: '#fff' }}>{errors.diagnosisType}</FormHelperText>}
                        </FormControl>
                      </div>
                      <div className="w-full md:flex-1">
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
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
                        />
                      </div>
                    </div>

                    {formData.diagnosisType === 'other' && (
                      <div>
                        <TextField
                          id="otherDiagnosis"
                          name="otherDiagnosis"
                          label="Please specify your diagnosis *"
                          variant="standard"
                          fullWidth
                          value={formData.otherDiagnosis}
                          onChange={handleChange}
                          error={!!errors.otherDiagnosis}
                          helperText={errors.otherDiagnosis}
                          sx={{
                            '& .MuiInputLabel-root': {
                              color: '#fff',
                              fontSize: '16px',
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: '#fff'
                              }
                            },
                            '& .MuiInput-root': {
                              color: '#fff',
                              '&:before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.4)'
                              },
                              '&:hover:not(.Mui-disabled):before': {
                                borderBottomColor: 'rgba(255, 255, 255, 0.6)'
                              },
                              '&:after': {
                                borderBottomColor: '#fff'
                              }
                            },
                            '& .MuiFormHelperText-root': {
                              color: '#fff'
                            }
                          }}
                        />
                      </div>
                    )}

                    <div className="flex justify-start">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-white text-black px-8 py-4 rounded-[20px] font-bold text-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                        style={{
                          width: '300px',
                          height: '60px'
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress size={24} color="inherit" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit
                            <img src={ArrowRight} alt="" className="w-6 h-6" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
