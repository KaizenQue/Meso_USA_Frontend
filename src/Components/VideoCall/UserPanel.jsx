import React, { useRef, useState } from 'react';
import { connect } from 'twilio-video';
import axios from 'axios';
import { sendEmailInvitationToAdmin } from '../../utils/emailService';

const UserPanel = ({ onAdminJoin }) => {
    const [room, setRoom] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [adminLink, setAdminLink] = useState('');
    const videoRef = useRef();

    const connectToRoom = async () => {
        setError(null);
        setIsConnecting(true);

        try {
            const res = await axios.post('http://localhost:4000/token', {
                identity: 'User',
                room: 'user-room',
                region: 'us1'
            });

            const token = res.data.token;
            const room = await connect(token, {
                name: 'user-room',
                audio: true,
                video: { width: 640 },
            });

            setRoom(room);
            setIsConnecting(false);

            const link = `${window.location.origin}${window.location.pathname}?room=user-room&admin=true`;
            setAdminLink(link);

            setupRoomEvents(room);
        } catch (err) {
            handleConnectionError(err);
        }
    };

    const setupRoomEvents = (room) => {
        const localParticipant = room.localParticipant;
        localParticipant.tracks.forEach(publication => {
            if (publication.track) {
                const mediaElement = publication.track.attach();
                videoRef.current.appendChild(mediaElement);
            }
        });

        const handleParticipantConnected = (participant) => {
            setParticipants(prev => [...prev, participant]);
            participant.tracks.forEach(publication => {
                if (publication.track) {
                    const mediaElement = publication.track.attach();
                    videoRef.current.appendChild(mediaElement);
                }
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

        room.on('disconnected', cleanupRoom);
    };

    const cleanupRoom = () => {
        if (room) {
            room.participants.forEach(participant => {
                participant.tracks.forEach(publication => {
                    publication.track?.detach().forEach(element => element.remove());
                });
            });
            room.localParticipant.tracks.forEach(publication => {
                publication.track?.detach().forEach(element => element.remove());
            });
        }
        setRoom(null);
        setParticipants([]);
        clearVideoElements();
    };

    const clearVideoElements = () => {
        while (videoRef.current.firstChild) {
            videoRef.current.removeChild(videoRef.current.firstChild);
        }
    };

    const handleConnectionError = (err) => {
        console.error('Error:', err);
        setError(err.message || 'Connection failed');
        setIsConnecting(false);
    };

    const leaveRoom = () => {
        if (room) room.disconnect();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(adminLink);
        alert('Link copied!');
    };

    const sendEmail = async () => {
        if (!adminLink) {
            alert('Please connect first');
            return;
        }

        const email = prompt('Enter admin email:');
        if (!email) return;

        try {
            await sendEmailInvitationToAdmin({
                emailId: email,
                teamLink: adminLink
            });
            alert('Invitation sent!');
        } catch (error) {
            console.error('Email error:', error);
            alert('Failed to send email');
        }
    };

    return (
        <div className="video-container">
            <h2>User Video Room</h2>
            {!room ? (
                <button onClick={connectToRoom} disabled={isConnecting}>
                    {isConnecting ? 'Connecting...' : 'Join Room'}
                </button>
            ) : (
                <button onClick={leaveRoom}>Leave Room</button>
            )}
            {adminLink && (
                <div className="admin-invite">
                    <h4>Invite Admin</h4>
                    <input type="text" value={adminLink} readOnly />
                    <button onClick={copyToClipboard}>Copy Link</button>
                    <button onClick={sendEmail}>Email Link</button>
                </div>
            )}

            <div ref={videoRef} className="video-grid" />

            {room && (
                <div className="participant-count">
                    {participants.length + 1} people in call
                </div>
            )}

            {error && (
                <div className="error-message">
                    <span>Error: {error}</span>
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}
        </div>
    );
};

export default UserPanel;