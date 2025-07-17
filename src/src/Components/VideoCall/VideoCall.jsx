import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'twilio-video';
import axios from 'axios';
import { sendEmailInvitationToAdmin, sendVideoCallEmail } from '../../utils/emailService';

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

        // Send video call email only for non-admin users
        if (!isAdmin) {
            try {
                const adminLink = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(targetRoomName)}&admin=true`;
                await sendVideoCallEmail({
                    subject: `Video Call Invitation for ${targetRoomName}`,
                    message: `${userName} is joining the room: ${targetRoomName}`,
                    meetingTime: new Date().toLocaleString(),
                    meetingLink: adminLink
                });
                setAdminLink(adminLink);
            } catch (e) {
                console.error('Failed to send video call email:', e);
            }
        }

        try {
            const res = await axios.post('https://meso-api-h6aphgemd9hzfwha.centralus-01.azurewebsites.net/token', {
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
        <div className="max-w-3xl mx-auto p-8 font-sans bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-2xl rounded-3xl mt-12 border border-gray-200 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
                {isAdmin ? (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-base font-semibold shadow-sm border border-blue-300">Admin</span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 bg-green-200 text-green-800 rounded-full text-base font-semibold shadow-sm border border-green-300">User</span>
                )}
                <h2 className={`${isAdmin ? 'text-xl' : 'text-xl'} font-extrabold text-gray-900 tracking-tight`}> 
                    {isAdmin ? 'Admin Video Call' : 'Video Call'}: <span className="text-blue-700">{roomName}</span>
                </h2>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-medium text-gray-600">Connected as:</span>
                <span className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg shadow-sm border border-gray-200">{userName}</span>
                {isAdmin && <span className="ml-2 text-xs text-blue-500">(Admin)</span>}
            </div>

            <div className="my-8 flex flex-col sm:flex-row gap-4 justify-center">
                {!room ? (
                    <button
                        onClick={() => connectToRoom()}
                        disabled={isConnecting}
                        className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 text-lg ${isConnecting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white'}`}
                    >
                        {isConnecting ? 'Connecting...' : `Join ${roomName}`}
                    </button>
                ) : (
                    <button
                        onClick={leaveRoom}
                        className="px-8 py-3 rounded-xl font-bold shadow-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                    >
                        Leave Room
                    </button>
                )}
            </div>

            {showAdminInvite && adminLink && !isAdmin && (
                <div className="my-8 p-6 bg-green-100 rounded-2xl border border-green-300 shadow-md flex flex-col gap-3">
                    <h4 className="font-bold text-green-800 text-lg mb-1">Invite Admin</h4>
                    <div className="flex flex-col sm:flex-row gap-3 mb-2">
                        <input
                            type="text"
                            value={adminLink}
                            readOnly
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-gray-700 text-base shadow-sm"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                        >
                            Copy
                        </button>
                        <button
                            onClick={sendEmail}
                            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
                        >
                            Email Invite
                        </button>
                    </div>
                    <p className="text-xs text-green-700">Send this link to your administrator to join the call</p>
                </div>
            )}
            {error && (
                <div className="p-4 my-8 bg-red-100 border border-red-300 rounded-xl text-red-800 flex items-center justify-between shadow">
                    <span><strong>Error:</strong> {error}</span>
                    <button
                        onClick={() => setError(null)}
                        className="ml-4 text-red-600 underline hover:text-red-800 text-sm focus:outline-none"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div
                ref={videoRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 bg-white min-h-[500px] rounded-3xl p-10 border-2 border-blue-200 shadow-2xl overflow-auto transition-all duration-300"
            />

            {room && (
                <div className="mt-6 text-gray-600 text-base text-center">
                    <span className="font-semibold text-gray-800">Participants in call:</span> <span className="font-bold text-blue-700">{participants.length + 1}</span> <span className="text-gray-500">(including you)</span>
                </div>
            )}
        </div>
    );
};

export default VideoCall;