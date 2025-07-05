import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AudioRecorders = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];

        // Clear timeout when stopped
        if (recordingTimeoutRef.current) {
          clearTimeout(recordingTimeoutRef.current);
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Automatically stop after 3 minutes (180,000 ms)
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 180000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };


  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    // Clear timeout
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }

    setRecording(false);
  };


  const uploadAudio = async () => {
    if (!audioUrl) return;

    try {
      setUploadStatus('Uploading...');

      const response = await fetch(audioUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('audio', blob, `recording-${Date.now()}.webm`);

      const { data } = await axios.post('https://fightformeso-cmdce3begva9h5fs.centralus-01.azurewebsites.net/uploadAudio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadStatus('Upload successful!');
      console.log('File uploaded to:', data.url);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed');
    }
  };

  return (
    <div style={{
      padding: '24px',
      maxWidth: '500px',
      margin: '0 auto',
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        color: '#2d3748'
      }}>
        {/* <svg style={{ marginRight: '12px', width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg> */}
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Audio Recorder</h2>
        {recording && (
          <div style={{
            marginLeft: '12px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            animation: 'blink 1.5s infinite',
            boxShadow: '0 0 8px rgba(239, 68, 68, 0.7)'
          }}></div>
        )}
      </div>

      <div style={{
        marginBottom: '24px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <button
          onClick={recording ? stopRecording : startRecording}
          style={{
            padding: '12px 24px',
            backgroundColor: recording ? '#ef4444' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: recording ? '0 4px 6px rgba(239, 68, 68, 0.2)' : '0 4px 6px rgba(59, 130, 246, 0.2)'
          }}
        >
          {recording ? (
            <>
              <svg style={{ marginRight: '8px', width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Stop Recording
            </>
          ) : (
            <>
              <svg style={{ marginRight: '8px', width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Start Recording
            </>
          )}
        </button>
      </div>

      {audioUrl && (
        <div style={{
          marginBottom: '24px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            marginTop: '0',
            marginBottom: '12px',
            fontSize: '1.1rem',
            fontWeight: '500',
            color: '#2d3748'
          }}>
            <svg style={{ verticalAlign: 'middle', marginRight: '8px', width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            Recording Preview
          </h3>
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <button
          onClick={uploadAudio}
          disabled={!audioUrl || uploadStatus === 'Uploading...'}
          style={{
            padding: '12px 24px',
            backgroundColor: !audioUrl || uploadStatus === 'Uploading...' ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !audioUrl || uploadStatus === 'Uploading...' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            width: '100%',
            boxShadow: !audioUrl || uploadStatus === 'Uploading...' ? 'none' : '0 4px 6px rgba(16, 185, 129, 0.2)'
          }}
        >
          {uploadStatus === 'Uploading...' ? (
            <>
              <svg style={{ marginRight: '8px', width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg style={{ marginRight: '8px', width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {uploadStatus || 'Upload to Azure'}
            </>
          )}
        </button>

        {uploadStatus && (
          <p style={{
            marginTop: '12px',
            marginBottom: '0',
            color: uploadStatus.includes('success') ? '#10b981' : uploadStatus.includes('error') ? '#ef4444' : '#6b7280',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioRecorders;   