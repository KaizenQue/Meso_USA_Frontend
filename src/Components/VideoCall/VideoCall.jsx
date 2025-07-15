import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import axios from 'axios';
import { sendEmailInvitationToAdmin } from '../../utils/emailService';

const VideoCall = ({ roomName, userName, isAdmin = false, showAdminInvite = false }) => {
    const [room, setRoom] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [adminLink, setAdminLink] = useState('');
    const videoRef = useRef();
    // const adminLinkHidde = null;
    useEffect(() => {
        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [room]);

    useEffect(() => {
        if (isAdmin && !room) {
            const urlParams = new URLSearchParams(window.location.search);
            const roomParam = urlParams.get('room');
            if (roomParam) {
                connectToRoom(roomParam);
            }
        }
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();

        if (!adminLink) {
            alert('Please connect to the room first to generate the admin link');
            return;
        }

        const email = prompt('Enter admin email address to send the invitation:');
        if (!email) return;

        try {
            const result = await sendEmailInvitationToAdmin({
                emailId: email,
                teamLink: adminLink
            });

            if (result.success) {
                alert('Invitation sent successfully!');
            } else {
                alert('Failed to send invitation. Please try again.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the invitation.');
        }
    }

    const connectToRoom = async (customRoomName = null) => {
        const targetRoomName = customRoomName || roomName;
        setError(null);
        setIsConnecting(true);

        try {
            const res = await axios.post('http://localhost:4000/token', {
                identity: userName,
                room: targetRoomName,
                region: 'us1'
            });

            if (!res.data?.token) {
                throw new Error('Token is missing in the response');
            }

            const token = res.data.token;

            const room = await connect(token, {
                name: targetRoomName,
                audio: true,
                video: { width: 640 },
            });

            setRoom(room);
            setIsConnecting(false);

            if (!isAdmin) {
                const link = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(targetRoomName)}&admin=true`;
                setAdminLink(link);
                console.log("link", link)
            }

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(adminLink);

        alert('Link copied to clipboard!');
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h2 style={{ color: '#333' }}>
                {isAdmin ? 'Admin Video Call' : 'Video Call'}: {roomName}
            </h2>

            <p style={{ fontWeight: 'bold' }}>
                Connected as: {userName} {isAdmin && '(Admin)'}
            </p>

            <div style={{ margin: '20px 0' }}>
                {!room ? (
                    <button
                        onClick={() => connectToRoom()}
                        disabled={isConnecting}
                        style={{
                            padding: '10px 20px',
                            background: isConnecting ? '#ccc' : '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {isConnecting ? 'Connecting...' : `Join ${roomName}`}
                    </button>
                ) : (
                    <button
                        onClick={leaveRoom}
                        style={{
                            padding: '10px 20px',
                            background: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Leave Room
                    </button>
                )}
            </div>

            {showAdminInvite && adminLink && !isAdmin && (
                <div style={{
                    margin: '20px 0',
                    padding: '15px',
                    background: '#e9f7ef',
                    borderRadius: '4px'
                }}>
                    <h4>Invite Admin</h4>
                    <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                        <input
                            type="text"
                            value={adminLink}
                            readOnly
                            style={{
                                flex: 1,
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        <button
                            onClick={copyToClipboard}
                            style={{
                                padding: '8px 16px',
                                background: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Copy
                        </button>
                        <button
                            onClick={sendEmail}
                            style={{
                                padding: '8px 16px',
                                background: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Email Invite
                        </button>
                    </div>
                    <p>Send this link to your administrator to join the call</p>
                </div>
            )}
            {error && (
                <div style={{
                    padding: '15px',
                    margin: '20px 0',
                    background: '#ffebee',
                    borderRadius: '4px',
                    color: '#d32f2f'
                }}>
                    <strong>Error:</strong> {error}
                    <button
                        onClick={() => setError(null)}
                        style={{
                            marginLeft: '10px',
                            background: 'none',
                            border: 'none',
                            color: '#d32f2f',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div
                ref={videoRef}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '15px',
                    marginTop: '20px',
                    backgroundColor: '#f5f5f5',
                    minHeight: '400px',
                    borderRadius: '8px',
                    padding: '15px'
                }}
            />

            {room && (
                <div style={{ marginTop: '15px', color: '#666' }}>
                    Participants in call: {participants.length + 1} (including you)
                </div>
            )}
        </div>
    );
};

export default VideoCall;