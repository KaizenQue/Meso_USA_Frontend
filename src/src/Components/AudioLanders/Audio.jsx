import { useState, useEffect, useRef } from 'react';
import { Play, Square, ArrowLeft, Mic } from 'lucide-react';
import AudioRecorders from '../AudioRecorders';

function Audio() {

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

                if (recordingTimeoutRef.current) {
                    clearTimeout(recordingTimeoutRef.current);
                }
            };

            mediaRecorderRef.current.start();
            setRecording(true);

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
        <div>
            <div>
                <h1>Record a Short Audio</h1>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
                    <h2 className="text-orange-300 font-semibold mb-4 text-[15px]">Please State</h2>
                    <div className="space-y-3 text-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-gray-400 font-medium">1. Your Name</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-gray-400 font-medium">2. Email</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-gray-400 font-medium">3. Zip Code</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] text-gray-400 font-medium">4. Street</span>
                        </div>
                        <div className="text-[13px] text-gray-400 font-medium">5. Tell Us Your Story</div>
                    </div>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isRecording && !mediaRecorderRef.current}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-colors ${isRecording
                            ? 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
                            : 'bg-purple-800 text-white hover:bg-purple-900'
                            }`}
                    >
                        {isRecording ? (
                            <>
                                <Square className="w-5 h-5" />
                                Stop
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5" />
                                Start Record
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Audio