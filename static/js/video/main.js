var usernameInput = document.querySelector('#username')
var btnJoin = document.querySelector('#btn-join')
var username;
var socket;

//websocket onmessage function
var mapPeers = {};
function WebsocketOnMessage(e){
    
    var parsedData = JSON.parse(e.data);

    var action = parsedData['action'];
    // username of other peer
    var PeerUsername = parsedData['peer'];
    
    console.log('PeerUsername: ', PeerUsername);
    console.log('action: ', action);
    // console.log(action);
    var receiver_channel_name = parsedData['message']['receiver_channel_name'];

    if(username == PeerUsername){
        return;
    }
    if(action == 'new-peer'){
        // console.log("sasa")
        createOffer(PeerUsername, receiver_channel_name);
    }
    else if(action == 'new-offer' ){
        console.log("saas")
        var offer = parsedData['message']['sdp'];
        createAnswer(offer,PeerUsername,receiver_channel_name);
        return;
    }
    else if(action == 'new-answer'){
        var answer = parsedData['message']['sdp'];
        var peer = mapPeers[PeerUsername][0];
        peer.setRemoteDescription(answer);
        return;
    }
}

//on click join button

btnJoin.addEventListener('click',()=>{
    username = usernameInput.value;
    if(username == ""){
        return;
    }
 
    usernameInput.value ="";
    usernameInput.disabled = true;
    usernameInput.style.visibility = "hidden";
    
    btnJoin.disabled = true;
    btnJoin.style.visibility = "hidden";
    
    var labelUsername = document.querySelector('#label-username');
    labelUsername.innerText = username;
    
    var loc =window.location;
    var wsStart = 'ws://';
    
    // if(loc.protocol == 'https:'){
        //     wsStart = 'wss://';
        // }
        var endpoint = wsStart + loc.host + loc.pathname;

        
        socket = new WebSocket(endpoint);
        
        
        
        socket.addEventListener('open',(e)=>{
            console.log("Connected to server");
            sendSignal('new-peer',{});
        } );
        socket.addEventListener('message',WebsocketOnMessage);
        socket.addEventListener('close',(e)=>{
            console.log("server closed");
        });
        socket.addEventListener('error',(e)=>{
            console.log("error occurred");
        });
        
    
    
                
                });               
var localStream = new MediaStream();
const  constraints = {
'video':true,
'audio':true,
}
const localVideo = document.querySelector('#local-video');
const btnToggleAudio = document.querySelector('#btn-toggle-audio');
const btnToggleVideo = document.querySelector('#btn-toggle-video');


userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        localStream = stream;
      
        var mediaTracks = stream.getTracks();
        
 
        
        localVideo.srcObject = localStream;
        localVideo.muted = true;

        window.stream = stream; // make variable available to browser console

        audioTracks = stream.getAudioTracks();
        videoTracks = stream.getVideoTracks();
        
   
        // unmute audio and video by default
        audioTracks[0].enabled = true;
        videoTracks[0].enabled = true;

        btnToggleAudio.onclick = function(){
            audioTracks[0].enabled = !audioTracks[0].enabled;
            if(audioTracks[0].enabled){
                btnToggleAudio.innerHTML = 'Audio Mute';
                return;
            }
            
            btnToggleAudio.innerHTML = 'Audio Unmute';
        };

        btnToggleVideo.onclick = function(){
            videoTracks[0].enabled = !videoTracks[0].enabled;
            if(videoTracks[0].enabled){
                btnToggleVideo.innerHTML = 'Video Off';
                return;
            }

            btnToggleVideo.innerHTML = 'Video On';
        };
    })


    .catch(error => {
        console.error('Error accessing media devices.', error);
    });
                
// handel offer and answer    
function createOffer(PeerUsername ,receiver_channel_name){

    var peer = new RTCPeerConnection(null);

    addLocalTracks(peer);
    var dc = peer.createDataChannel("channel");

    dc.addEventListener('open',()=>{
        console.log("connection established");
    });

    dc.addEventListener('message',dcMessage);
    
    var remoteVideo = createVideo(PeerUsername);
    setOnTrack(peer,remoteVideo);
    mapPeers[PeerUsername]=[peer,dc];
    
    peer.addEventListener('iceconnectionstatechange',()=>{
        var iceConnectionState = peer.iceConnectionState;
        if(iceConnectionState == 'failed' || iceConnectionState == 'disconnected' || iceConnectionState == 'closed'){
            delete mapPeers[PeerUsername];
            if(iceConnectionState != "closed"){
                peer.close();
            }
            remoteVideo(remoteVideo);
        }
        
    });
    peer.addEventListener('icecandidate',(event)=>{
        
        if(event.candidate){
            // console.log("new ice can" , JSON.stringify(peer.localDescription));
            console.log("new ice can" , PeerUsername    );
            return;
        }
        sendSignal('new-offer',{
            'sdp': peer.localDescription,
            'receiver_channel_name':receiver_channel_name
        })
    });
   
    peer.createOffer()
        .then(o => peer.setLocalDescription(o))
        .then(()=>{
            console.log("localDescription set successfully");
        });
}

function createAnswer(offer,PeerUsername,receiver_channel_name){
    
    var peer = new RTCPeerConnection(null);
    addLocalTracks(peer);
    var remoteVideo = createVideo(PeerUsername);
    setOnTrack(peer,remoteVideo);
     
    peer.addEventListener('datachannel',e =>{
        peer.dc=e.channel;
        peer.dc.addEventListener('open',()=>{
            console.log("connection established");
        });
        peer.dc.addEventListener('message',dcMessage);
        mapPeers[PeerUsername]= [peer,peer.dc];
      });
        
    // mapPeers[PeerUsername]=[peer,dc];
    peer.addEventListener('iceconnectionstatechange',()=>{
        var iceConnectionState = peer.iceConnectionState;
        if(iceConnectionState == 'failed' || iceConnectionState == 'disconnected' || iceConnectionState == 'closed'){
            delete mapPeers[PeerUsername];
            if(iceConnectionState != "closed"){
                peer.close();
            }
            removeVideo(remoteVideo);
        }

    });
    peer.addEventListener('icecandidate',(event)=>{
        if(event.candidate){
            // console.log("new ice can" , JSON.stringify(peer.localDescription));
            console.log("new ice can :" , PeerUsername);
            return;
        }
        sendSignal('new-answer',{
            'sdp': peer.localDescription,
            'receiver_channel_name':receiver_channel_name
        });
    });
    peer.setRemoteDescription(offer)
        .then(()=>{
            console.log('remote description set successfully for %s', PeerUsername);
            return peer.createAnswer();
        })
        .then(a=>{
            console.log('answer created successfully for %s', PeerUsername);
            peer.setLocalDescription(a)
        });
}
// hadle real time tracking
function addLocalTracks(peer) {


    // console.log(localStream.getVideoTracks())
    localStream.getTracks().forEach(track => {
        
        peer.addTrack(track, localStream);
        console.log('ADD TRACK FOR CONNECTION');
            // peer.addTrack(track, localStream);
        
          });
        
    
    return;
}
function setOnTrack(peer, remoteVideo){
    console.log('Setting ontrack:');
    // create new MediaStream for remote tracks
    var remoteStream = new MediaStream();

    // assign remoteStream as the source for remoteVideo
    remoteVideo.srcObject = remoteStream;

    console.log('remoteVideo: ', remoteVideo.srcObject);

    peer.addEventListener('track', async (event) => {
        console.log('Adding track: ', event.track);
        remoteStream.addTrack(event.track, remoteStream);
    });
}

// to handle video creation on icecandidate
function createVideo(peerUsername){
    var videoContainer = document.querySelector('#video-streams');
    // create the new video element
    // and corresponding user gesture button
    var remoteVideo = document.createElement('video');
    // var btnPlayRemoteVideo = document.createElement('button');
    
    remoteVideo.id = peerUsername + '-video';
    remoteVideo.autoplay = true;
    remoteVideo.playsinline = true;
    // btnPlayRemoteVideo.id = peerUsername + '-btn-play-remote-video';
    // btnPlayRemoteVideo.innerHTML = 'Click here if remote video does not play';
    
    // wrapper for the video and button elements
    var videoWrapper = document.createElement('div');
    videoWrapper.id ="user-container-1"
    videoWrapper.classList.add("video-container");
    videoWrapper.classList.add("d-flex");
    videoWrapper.classList.add("justify-content-center");

    // add the wrapper to the video container
    videoContainer.appendChild(videoWrapper);

    // add the video and button to the wrapper
    videoWrapper.appendChild(remoteVideo);
    // videoWrapper.appendChild(btnPlayRemoteVideo);

    // as user gesture
    // video is played by button press
    // otherwise, some browsers might block video
    // btnPlayRemoteVideo.addEventListener("click", function (){
    //     remoteVideo.play();
    //     btnPlayRemoteVideo.style.visibility = 'hidden';
    // });

    return remoteVideo;
}

function removeVideo(video){
    // get the video wrapper
    var videoWrapper = video.parentNode;
    // remove it
    videoWrapper.parentNode.removeChild(videoWrapper);
}


// handel chat channels
var btnSendMsg = document.querySelector('#btn-send-msg');
var messageInput = document.querySelector('#msg');
var ul = document.querySelector("#message-list");
btnSendMsg.onclick = btnSendMsgOnClick;
var messagelist = document.querySelector('#message-list');

function dcMessage(event){
    var message = event.data;
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    messagelist.appendChild(li);
}
//send button functionality
function btnSendMsgOnClick(){
    var message = messageInput.value;
    
    var li = document.createElement("li");
    li.appendChild(document.createTextNode("Me: " + message));
    ul.appendChild(li);
    
    var dataChannels = getDataChannels();

    console.log('Sending: ', message);

    // send to all data channels
    for(index in dataChannels){
        dataChannels[index].send(username + ': ' + message);
    }
    
    messageInput.value = '';
}

// get all stored data channels
function getDataChannels(){
    var dataChannels = [];
    
    for(peerUsername in mapPeers){
        console.log('mapPeers[', peerUsername, ']: ', mapPeers[peerUsername]);
        var dataChannel = mapPeers[peerUsername][1];
        console.log('dataChannel: ', dataChannel);

        dataChannels.push(dataChannel);
    }

    return dataChannels;
}

//to send to websocket channels
function sendSignal(action, message){
    var Json_str = JSON.stringify({
        'peer':username,
        'action': action,
        'message': message,
        
    });

    socket.send(Json_str);
}