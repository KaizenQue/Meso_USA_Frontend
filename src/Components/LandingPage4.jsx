"use client"

import { useState, useEffect } from "react"
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
import { format } from "date-fns"
import { CalendarIcon, CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Img from '../assets/working.jpg'

export default function LandingPage4() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    dob: undefined,
    diagnosisDate: undefined,
    diagnosisType: "",
    otherDiagnosis: "",
    jobTitle: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (field, date) => {
    setFormData((prev) => ({ ...prev, [field]: date }))
  }

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, diagnosisType: e.target.value }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormSubmitted(true)

    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        emailId: "",
        dob: undefined,
        diagnosisDate: undefined,
        diagnosisType: "",
        otherDiagnosis: "",
        jobTitle: "",
      })
      setCurrentStep(1)
    }, 3000)
  }

  if (!mounted) return null

  const renderStepIndicator = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, gap: 2 }}>
      {[1, 2, 3].map((step) => (
        <Box
          key={step}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: currentStep === step ? '#4B2C5E' : 'rgba(75, 44, 94, 0.1)',
            color: currentStep === step ? '#FAF3EC' : '#4B2C5E',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: step < 3 ? '100%' : 0,
              height: 2,
              background: 'rgba(75, 44, 94, 0.1)',
              right: '-50%',
              top: '50%',
              transform: 'translateY(-50%)',
            },
          }}
        >
          {step}
        </Box>
      ))}
    </Box>
  )

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" sx={{ mb: 3, color: '#4B2C5E' }}>Personal Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="emailId"
                  type="email"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" sx={{ mb: 3, color: '#4B2C5E' }}>Medical Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob || ''}
                  onChange={(e) => handleDateChange('dob', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Diagnosis"
                  type="date"
                  name="diagnosisDate"
                  value={formData.diagnosisDate || ''}
                  onChange={(e) => handleDateChange('diagnosisDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type of Diagnosis</InputLabel>
                  <Select
                    value={formData.diagnosisType}
                    onChange={handleSelectChange}
                    label="Type of Diagnosis"
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    <MenuItem value="mesothelioma">Mesothelioma</MenuItem>
                    <MenuItem value="lungCancer">Lung Cancer</MenuItem>
                    {/* <MenuItem value="others">Others</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
              {formData.diagnosisType === "others" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Please Specify"
                    name="otherDiagnosis"
                    value={formData.otherDiagnosis}
                    onChange={handleInputChange}
                    placeholder="Please specify your diagnosis"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" sx={{ mb: 3, color: '#4B2C5E' }}>Professional Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Software Engineer"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAF3EC', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative shapes */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '32rem',
        height: '32rem',
        background: 'linear-gradient(135deg, rgba(75, 44, 94, 0.3), rgba(75, 44, 94, 0.2))',
        borderRadius: '50%',
        filter: 'blur(32px)',
        transform: 'translate(-50%, -50%) translateX(33%)',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '32rem',
        height: '32rem',
        background: 'linear-gradient(135deg, rgba(75, 44, 94, 0.3), rgba(75, 44, 94, 0.2))',
        borderRadius: '50%',
        filter: 'blur(32px)',
        transform: 'translate(50%, 50%) translateX(-33%)',
      }} />

      {/* Header with Logo */}
      <Container maxWidth="lg" sx={{ py: 3, px: 2, position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              height: 40,
              width: 40,
              background: '#4B2C5E',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(75, 44, 94, 0.2)',
            }}>
              <Typography sx={{ color: '#FAF3EC', fontWeight: 'bold', fontSize: '1.25rem' }}>M</Typography>
            </Box>
            <Typography sx={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: '#4B2C5E',
            }}>
              MediCare
            </Typography>
          </Box>
        </motion.div>
      </Container>

      <Container maxWidth="lg" sx={{ py: 4, px: 2, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left side - Form and Feature Cards */}
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper elevation={3} sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(75, 44, 94, 0.1)',
                },
                height: { xs: 'auto', md: '600px' },
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Typography variant="h4" sx={{
                  fontWeight: 'bold',
                  color: '#4B2C5E',
                  mb: 1,
                }}>
                  Patient Information
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Please fill out the form below with your details
                </Typography>

                {formSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: 6,
                      textAlign: 'center',
                      flex: 1,
                    }}>
                      <Box sx={{
                        height: 80,
                        width: 80,
                        background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.2)',
                      }}>
                        <CheckCircle sx={{ height: 40, width: 40, color: '#16a34a' }} />
                      </Box>
                      <Typography variant="h5" sx={{ color: '#15803d', fontWeight: 'bold', mb: 1 }}>
                        Information Submitted
                      </Typography>
                      <Typography color="text.secondary">
                        Thank you for providing your details.
                      </Typography>
                    </Box>
                  </motion.div>
                ) : (
                  <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {renderStepIndicator()}
                    <Box sx={{
                      flex: 1,
                      overflowY: 'auto',
                      px: 1,
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'rgba(75, 44, 94, 0.1)',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(75, 44, 94, 0.2)',
                        borderRadius: '4px',
                        '&:hover': {
                          background: 'rgba(75, 44, 94, 0.3)',
                        },
                      },
                    }}>
                      {renderFormStep()}
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 4,
                      pt: 2,
                      borderTop: '1px solid rgba(75, 44, 94, 0.1)',
                    }}>
                      <Button
                        variant="outlined"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        sx={{
                          borderRadius: 2,
                          borderColor: '#4B2C5E',
                          color: '#4B2C5E',
                          '&:hover': {
                            borderColor: '#3a2349',
                            background: 'rgba(75, 44, 94, 0.04)',
                          },
                        }}
                      >
                        Back
                      </Button>
                      {currentStep < 3 ? (
                        <Button
                          variant="contained"
                          onClick={nextStep}
                          sx={{
                            background: '#4B2C5E',
                            borderRadius: 2,
                            '&:hover': {
                              background: '#3a2349',
                            },
                          }}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            background: '#4B2C5E',
                            borderRadius: 2,
                            '&:hover': {
                              background: '#3a2349',
                            },
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </Box>
                  </Box>
                )}
              </Paper>

              {/* Feature Cards */}
              <Grid container spacing={2} sx={{ mt: 4 }}>
                {[
                  { icon: "shield", label: "Secure", color: "purple" },
                  { icon: "clock", label: "Fast", color: "violet" },
                  { icon: "clipboard", label: "Organized", color: "fuchsia" },
                ].map((feature, index) => (
                  <Grid item xs={4} key={feature.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <Card sx={{
                        p: 2.5,
                        borderRadius: 2,
                        background: '#FAF3EC',
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 10px 15px -3px rgba(75, 44, 94, 0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: '0 20px 25px -5px rgba(75, 44, 94, 0.2)',
                          transform: 'translateY(-4px)',
                        },
                        border: '1px solid rgba(75, 44, 94, 0.1)',
                      }}>
                        <Box sx={{
                          height: 48,
                          width: 48,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1.5,
                          background: '#4B2C5E',
                          boxShadow: '0 4px 6px -1px rgba(75, 44, 94, 0.2)',
                        }}>
                          {feature.icon === "shield" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#FAF3EC"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          )}
                          {feature.icon === "clock" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#FAF3EC"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )}
                          {feature.icon === "clipboard" && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#FAF3EC"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                          )}
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, textAlign: 'center', color: '#4B2C5E' }}>
                          {feature.label}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

          {/* Right side - Image and text */}
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }} sx={{ mt: { xs: 0, md: -14 } }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Box sx={{
                textAlign: { xs: 'center', md: 'left' },
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                height: '100%',
                justifyContent: 'flex-start',
              }}>
                <Box sx={{
                  position: 'relative',
                  height: { xs: 256, md: 384 },
                  width: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 25px -5px rgba(75, 44, 94, 0.2)',
                  '&:hover img': {
                    transform: 'scale(1.1)',
                  },
                }}>
                  <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(75, 44, 94, 0.3), rgba(75, 44, 94, 0.2))',
                    opacity: 0.8,
                    transition: 'opacity 0.3s',
                    '&:hover': {
                      opacity: 0.6,
                    },
                  }} />
                  <Box
                    component="img"
                    src={Img}
                    alt="Medical care illustration"
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.7s',
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
                  }}>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      Personalized care for your unique needs
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h3" sx={{
                    fontWeight: 'bold',
                    lineHeight: 1.2,
                    color: '#4B2C5E',
                    mb: 2,
                  }}>
                    We're Here to{" "}
                    <Box component="span" sx={{
                      color: '#4B2C5E',
                    }}>
                      Support
                    </Box>{" "}
                    Your Health Journey
                  </Typography>

                  <Typography variant="h6" color="text.secondary">
                    Your health information helps us provide the best care possible. Fill out the form to begin your
                    personalized care plan.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>


      {/* <Box component="footer" sx={{
        borderTop: '1px solid rgba(75, 44, 94, 0.1)',
        mt: 8,
        py: 4,
        px: 2,
        position: 'relative',
        zIndex: 10,
        background: '#FAF3EC',
      }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} MediCare. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, md: 0 } }}>
                <Typography
                  component="a"
                  href="#"
                  sx={{ color: '#4B2C5E', '&:hover': { opacity: 0.8 }, transition: 'opacity 0.2s' }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{ color: '#4B2C5E', '&:hover': { opacity: 0.8 }, transition: 'opacity 0.2s' }}
                >
                  Terms of Service
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  sx={{ color: '#4B2C5E', '&:hover': { opacity: 0.8 }, transition: 'opacity 0.2s' }}
                >
                  Contact Us
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box> */}
    </Box>
  )
}
