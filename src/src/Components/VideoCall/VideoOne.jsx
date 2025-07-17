import React from 'react'
import VideoCall from './VideoCall'
 
function VideoOne() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';

    return (
        <div className="flex">
            {isAdmin ? (
                <VideoCall roomName="test-room" userName="Internal Team" isAdmin={true} />
            ) : (
                <VideoCall roomName="test-room" userName="User1" />
            )}
        </div>
    )
}
 
export default VideoOne