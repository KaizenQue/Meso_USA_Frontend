
import React from 'react';
import UserPanel from './UserPanel';
import AdminPanel from './AdminPanel';

const VideoCall = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    const adminParam = urlParams.get('admin');
    if (roomParam && adminParam) {
        return <AdminPanel roomName={roomParam} />;
    }
    return <UserPanel />;
};

export default VideoCall;
