//Global Variables
var localConnection;
var remoteConnection;
var signalingChannel;

/*
**
	Data Traffic Portion
**
*/

function createConnection() {
  //dataChannelSend.placeholder = '';
  var servers = null;
  dataConstraint = null;
  console.log('Using SCTP based data channels');
  // SCTP is supported from Chrome 31 and is supported in FF.
  // No need to pass DTLS constraint as it is on by default in Chrome 31.
  // For SCTP, reliable and ordered is true by default.
  // Add localConnection to global scope to make it visible
  // from the browser console.
  window.localConnection = localConnection =
      new RTCPeerConnection(servers);
  console.log('Created local peer connection object localConnection');

	//Define Signaling Channel
	signalingChannel = io;
/*
**
	Signaling Portion
**
*/
signalingChannel.onmessage = function(event) {
	var message = JSON.parse(event.data);
	console.log("Signaling message received: "+event.data);
	if(message.sdp) {
		localConnection.setRemoteDescription(new RTCSessionDescription(message.sdp), function() {
			if(localConnection.remoteDescription.type == "offer")
				localConnection.createAnswer(gotDescription1);
		});
	}
	else localConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
}

  sendChannel = localConnection.createDataChannel('sendDataChannel',
      dataConstraint);
  console.log('Created send data channel');

  localConnection.onicecandidate = function(e) {
    onIceCandidate(localConnection, e);
  };
  sendChannel.onopen = onSendChannelStateChange;
  sendChannel.onclose = onSendChannelStateChange;

  // Add remoteConnection to global scope to make it visible
  // from the browser console.
  window.remoteConnection = remoteConnection =
      new RTCPeerConnection(servers);
  console.log('Created remote peer connection object remoteConnection');

  remoteConnection.onicecandidate = function(e) {
    onIceCandidate(remoteConnection, e);
  };
  remoteConnection.ondatachannel = receiveChannelCallback;

  localConnection.createOffer().then(
    gotDescription1,
    onCreateSessionDescriptionError
  );
  //startButton.disabled = true;
  //closeButton.disabled = false;
}

function onCreateSessionDescriptionError(error) {
  console.log('Failed to create session description: ' + error.toString());
}

function sendData(data) {
  //var data = dataChannelSend.value;
  sendChannel.send(data);
  console.log('Sent Data: ' + data);
}

function closeDataChannels() {
  console.log('Closing data channels');
  sendChannel.close();
  console.log('Closed data channel with label: ' + sendChannel.label);
  receiveChannel.close();
  console.log('Closed data channel with label: ' + receiveChannel.label);
  localConnection.close();
  remoteConnection.close();
  localConnection = null;
  remoteConnection = null;
  console.log('Closed peer connections');
  //startButton.disabled = false;
  //sendButton.disabled = true;
  //closeButton.disabled = true;
  //dataChannelSend.value = '';
  //dataChannelReceive.value = '';
  //dataChannelSend.disabled = true;
  disableSendButton();
  enableStartButton();
}

function setRemoteDescription(desc) {
  remoteConnection.setRemoteDescription(desc);
  remoteConnection.createAnswer().then(
    gotDescription2,
    onCreateSessionDescriptionError
  );
}

function gotDescription1(desc) {
  localConnection.setLocalDescription(desc, function() {
		signalingChannel.send(JSON.stringify({
			'sdp': localConnection.localDescription
		}));
	});
  console.log('Offer from localConnection \n' + desc.sdp);
	setRemoteDescription(desc);
}

function gotDescription2(desc) {
  remoteConnection.setLocalDescription(desc);
  console.log('Answer from remoteConnection \n' + desc.sdp);
  localConnection.setRemoteDescription(desc);
}

function getOtherPc(pc) {
  return (pc === localConnection) ? remoteConnection : localConnection;
}

function getName(pc) {
  return (pc === localConnection) ? 'localPeerConnection' :
      'remotePeerConnection';
}

function onIceCandidate(pc, event) {
    if (event.candidate)
      signalingChannel.send(JSON.stringify({
        'candidate': event.candidate
      }));

	pc.onnegotiationneeded = function () {
    pc.createOffer(gotDescription1, logError);
  }
/*
  getOtherPc(pc).addIceCandidate(event.candidate)
  .then(
    function() {
      onAddIceCandidateSuccess(pc);
    },
    function(err) {
      onAddIceCandidateError(pc, err);
    }
  );
  console.log(getName(pc) + ' ICE candidate: \n' + (event.candidate ?
      event.candidate.candidate : '(null)'));
*/
}

function localDescCreated(desc) {

}

function onAddIceCandidateSuccess() {
  console.log('AddIceCandidate success.');
}

function onAddIceCandidateError(error) {
  console.log('Failed to add Ice Candidate: ' + error.toString());
}

function receiveChannelCallback(event) {
  console.log('Receive Channel Callback');
  receiveChannel = event.channel;
  receiveChannel.onmessage = onReceiveMessageCallback;
  receiveChannel.onopen = onReceiveChannelStateChange;
  receiveChannel.onclose = onReceiveChannelStateChange;
}

function onReceiveMessageCallback(event) {
  console.log('Received Message');
  //dataChannelReceive.value = event.data;
	console.log(event.data);
}

function onSendChannelStateChange() {
  var readyState = sendChannel.readyState;
  console.log('Send channel state is: ' + readyState);
  if (readyState === 'open') {
		sendData("Unveil");
    //dataChannelSend.disabled = false;
    //dataChannelSend.focus();
    //sendButton.disabled = false;
    //closeButton.disabled = false;
  } else {
    //dataChannelSend.disabled = true;
    //sendButton.disabled = true;
    //closeButton.disabled = true;
  }
}

function onReceiveChannelStateChange() {
  var readyState = receiveChannel.readyState;
  console.log('Receive channel state is: ' + readyState);
}


