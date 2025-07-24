import React, { useState, useRef, useEffect } from 'react';

const VideoCallRecording = ({ isTeamInternal = false, roomName, userName }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [stream, setStream] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
        };
    }, [mediaRecorder]);

    // Only show for team internal users
    if (!isTeamInternal) {
        return null;
    }

    const startRecording = async () => {
        try {
            // Request screen capture
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always",
                    displaySurface: "monitor"
                },
                audio: true
            });

            setStream(screenStream);

            // Try different MIME types for better browser compatibility
            let mimeType = 'video/webm;codecs=vp9';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm;codecs=vp8';
            }
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm';
            }
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/mp4';
            }

            // Create MediaRecorder
            const recorder = new MediaRecorder(screenStream, {
                mimeType: mimeType
            });

            const chunks = [];
            setRecordedChunks(chunks);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                downloadRecording(blob);
                setRecordedChunks([]);
                setStream(null);
            };

            recorder.onstart = () => {
                setIsRecording(true);
                setRecordingTime(0);
                
                // Start timer
                intervalRef.current = setInterval(() => {
                    setRecordingTime(prev => prev + 1);
                }, 1000);
            };

            recorder.onerror = (event) => {
                console.error('MediaRecorder error:', event.error);
                alert('Recording error occurred. Please try again.');
                stopRecording();
            };

            setMediaRecorder(recorder);
            recorder.start();

        } catch (error) {
            console.error('Error starting recording:', error);
            if (error.name === 'NotAllowedError') {
                alert('Screen recording permission denied. Please allow screen sharing to record.');
            } else if (error.name === 'NotSupportedError') {
                alert('Screen recording is not supported in this browser. Please use a modern browser.');
            } else {
                alert('Failed to start recording. Please make sure you have permission to record your screen.');
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        
        setIsRecording(false);
        setRecordingTime(0);
    };

    const downloadRecording = (blob) => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        
        // Determine file extension based on MIME type
        let extension = 'webm';
        if (blob.type.includes('mp4')) {
            extension = 'mp4';
        } else if (blob.type.includes('webm')) {
            extension = 'webm';
        }
        
        const filename = `video-call-${roomName}-${userName}-${timestamp}.${extension}`;
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="my-6 p-6 bg-purple-100 rounded-2xl border border-purple-300 shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <h4 className="font-bold text-purple-800 text-lg">Screen Recording</h4>
                <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full">Team Internal</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
                {!isRecording ? (
                    <button
                        onClick={startRecording}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Start Recording
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg border border-red-300">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-red-700 font-semibold">Recording: {formatTime(recordingTime)}</span>
                        </div>
                        <button
                            onClick={stopRecording}
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                            </svg>
                            Stop Recording
                        </button>
                    </div>
                )}
            </div>
            
            <p className="text-sm text-purple-700 mt-3">
                {isRecording 
                    ? "Recording your screen and audio. The video will be downloaded automatically when you stop recording."
                    : "Click to start recording your screen and audio for this video call."
                }
            </p>
        </div>
    );
};

export default VideoCallRecording; 