import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import axios from 'axios';
 
const VideoAdmin = ({ roomName, userName }) => {
    const [room, setRoom] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const videoRef = useRef();
 
    useEffect(() => {
        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [room]);
 
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const roomParam = urlParams.get('room');
        if (roomParam && !room) {
            connectToRoom(roomParam);
        }
    }, []);
 
    const connectToRoom = async (customRoomName) => {
        setError(null);
        setIsConnecting(true);
 
        try {
            const res = await axios.post('https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/token', {
                identity: userName,
                room: customRoomName,
                region: 'us1'
            });
 
            if (!res.data?.token) {
                throw new Error('Token is missing in the response');
            }
 
            const token = res.data.token;
 
            const room = await connect(token, {
                name: customRoomName,
                audio: true,
                video: { width: 640 },
            });
 
            setRoom(room);
            setIsConnecting(false);
 
            const localParticipant = room.localParticipant;
            localParticipant.tracks.forEach(publication => {
                if (publication.track) {
                    const mediaElement = publication.track.attach();
                    videoRef.current.appendChild(mediaElement);
                }
            });
 
            const handleParticipantConnected = (participant) => {
                setParticipants(prevParticipants => [...prevParticipants, participant]);
 
                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        const mediaElement = publication.track.attach();
                        videoRef.current.appendChild(mediaElement);
                    }
                });
 
                participant.on('trackSubscribed', track => {
                    const mediaElement = track.attach();
                    videoRef.current.appendChild(mediaElement);
                });
 
                participant.on('trackUnsubscribed', track => {
                    track.detach().forEach(element => element.remove());
                });
            };
 
            room.participants.forEach(handleParticipantConnected);
            room.on('participantConnected', handleParticipantConnected);
 
            room.on('participantDisconnected', participant => {
                setParticipants(prev => prev.filter(p => p !== participant));
                participant.tracks.forEach(publication => {
                    if (publication.track) {
                        publication.track.detach().forEach(element => element.remove());
                    }
                });
            });
 
            room.on('disconnected', () => {
                setRoom(null);
                setParticipants([]);
                if (room) {
                    room.participants.forEach(participant => {
                        participant.tracks.forEach(publication => {
                            if (publication.track) {
                                publication.track.detach().forEach(element => element.remove());
                            }
                        });
                    });
                    room.localParticipant.tracks.forEach(publication => {
                        if (publication.track) {
                            publication.track.detach().forEach(element => element.remove());
                        }
                    });
                }
                while (videoRef.current.firstChild) {
                    videoRef.current.removeChild(videoRef.current.firstChild);
                }
            });
 
        } catch (err) {
            console.error('Error connecting to room:', err);
            setError(err.message || 'Failed to connect to room');
            setIsConnecting(false);
 
            if (err.name === 'TwilioError') {
                switch (err.code) {
                    case 20101:
                        setError('Invalid token. Please try again.');
                        break;
                    case 20104:
                        setError('Token expired. Please refresh and try again.');
                        break;
                    default:
                        setError(`Video error: ${err.message}`);
                }
            }
        }
    };
 
    const leaveRoom = () => {
        if (room) {
            room.disconnect();
        }
    };
 
    return (
        <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '24px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div>
                    <h2 style={{
                        color: '#1e293b',
                        fontSize: '24px',
                        fontWeight: '600',
                        margin: '0'
                    }}>
                        Admin Video Room: <span style={{ color: '#3b82f6' }}>{roomName}</span>
                    </h2>
                    <p style={{
                        color: '#64748b',
                        margin: '4px 0 0',
                        fontSize: '14px'
                    }}>
                        Connected as: <span style={{ fontWeight: '500', color: '#1e293b' }}>{userName}</span>
                        <span style={{
                            background: '#e0f2fe',
                            color: '#0369a1',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            marginLeft: '6px'
                        }}>Admin</span>
                    </p>
                </div>
 
                {room && (
                    <button
                        onClick={leaveRoom}
                        style={{
                            padding: '10px 24px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                            ':hover': {
                                background: '#dc2626'
                            }
                        }}
                    >
                        Leave Room
                    </button>
                )}
            </div>
 
 
        </div>
    )
}
 
export default VideoAdmin