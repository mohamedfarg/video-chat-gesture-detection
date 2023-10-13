var localStream = new MediaStream();
const  constraints = {
'video':true,
'audio':true,
}
const localVideo = document.querySelector('#local-video');



userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        localStream = stream;
     
    
        
        localVideo.srcObject = localStream;
        localVideo.muted = true;

        window.stream = stream; // make variable available to browser console

        audioTracks = stream.getAudioTracks();
        videoTracks = stream.getVideoTracks();

        // unmute audio and video by default
        audioTracks[0].enabled = true;
        videoTracks[0].enabled = true;

       
    })


    .catch(error => {
        console.error('Error accessing media devices.', error);
    });