"use client"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material'
import PropTypes from 'prop-types'

export default function SuccessDialog({ open, onClose, data }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex items-center gap-2 text-center">
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
          style={{ color: '#4CAF50' }}
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        Submission Successful!
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="text-center mb-4">
          Thank you for reaching out to us. We've received your message and will get back to you shortly.
        </DialogContentText>

        <Paper elevation={0} className="p-4 space-y-3 bg-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{data.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p>{data.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Message</p>
            <p className="break-words">{data.message}</p>
          </div>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SuccessDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired
}
