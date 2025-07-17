import React from 'react'
import VideoCall from './VideoCall'
 
function VideoOne() {
    return (
        <div>
            {/* <h1>Twilio Video</h1> */}
            <VideoCall roomName="test-room" userName="User1" />
            <VideoCall roomName="consultation-room" userName="Internal Team" isAdmin={true} />
        </div>
    )
}
 
export default VideoOne