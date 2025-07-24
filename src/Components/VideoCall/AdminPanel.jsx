
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import axios from 'axios';
import "./Video.css"
const AdminPanel = ({ roomName }) => {
    const [room, setRoom] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const videoRef = useRef();

    useEffect(() => {
        connectToRoom();
        return () => {
            if (room) room.disconnect();
        };
    }, []);

    const connectToRoom = async () => {
        setIsConnecting(true);
        setError(null);

        try {
            const res = await axios.post('http://localhost:4000/token', {
                identity: 'Admin',
                room: roomName,
                region: 'us1'
            });

            const token = res.data.token;
            const room = await connect(token, {
                name: roomName,
                audio: true,
                video: { width: 640 },
            });

            setRoom(room);
            setIsConnecting(false);
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
                publication.track?.detach().forEach(element => element.remove());
            });
        });

        room.on('disconnected', cleanupRoom);
    };

    const cleanupRoom = () => {
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

    return (
        <div className="video-container">
            <h2>Admin Video Room: {roomName}</h2>

            {room ? (
                <button onClick={leaveRoom}>Leave Room</button>
            ) : (
                <button onClick={connectToRoom} disabled={isConnecting}>
                    {isConnecting ? 'Connecting...' : 'Reconnect'}
                </button>
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

export default AdminPanel;