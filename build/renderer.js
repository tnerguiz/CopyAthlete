// Renderer process for the main application window
// This script runs in the context of the web page

// DOM Elements
const selectCoachVideoBtn = document.getElementById('select-coach-video');
const recordNewVideoBtn = document.getElementById('record-new-video');
const browseVideoBtn = document.getElementById('browse-video');
const compareVideosBtn = document.getElementById('compare-videos');
const coachVideoStatus = document.getElementById('coach-video-status');
const userVideoStatus = document.getElementById('user-video-status');
const recordingArea = document.getElementById('recording-area');
const cameraPreview = document.getElementById('camera-preview');
const startRecordingBtn = document.getElementById('start-recording');
const stopRecordingBtn = document.getElementById('stop-recording');
const cancelRecordingBtn = document.getElementById('cancel-recording');

// State variables
let selectedCoachVideo = null;
let selectedUserVideo = null;
let mediaRecorder = null;
let recordedChunks = [];
let stream = null;

// Update UI based on video selection status
function updateUI() {
  if (selectedCoachVideo && selectedUserVideo) {
    compareVideosBtn.disabled = false;
  } else {
    compareVideosBtn.disabled = true;
  }
}

// Select coach video handler
selectCoachVideoBtn.addEventListener('click', async () => {
  try {
    // Get list of coach videos
    const coachVideos = await window.api.getCoachVideos();
    
    // For now, just select the first one
    // In a real implementation, this would show a selection dialog
    if (coachVideos && coachVideos.length > 0) {
      selectedCoachVideo = coachVideos[0];
      coachVideoStatus.textContent = selectedCoachVideo.name;
      updateUI();
    }
  } catch (error) {
    console.error('Error selecting coach video:', error);
  }
});

// Browse for user video handler
browseVideoBtn.addEventListener('click', async () => {
  try {
    const videoPath = await window.api.selectUserVideo();
    if (videoPath) {
      selectedUserVideo = { path: videoPath, name: videoPath.split('/').pop() };
      userVideoStatus.textContent = selectedUserVideo.name;
      updateUI();
    }
  } catch (error) {
    console.error('Error browsing for video:', error);
  }
});

// Record new video handler
recordNewVideoBtn.addEventListener('click', async () => {
  try {
    // Show recording area
    recordingArea.classList.remove('hidden');
    
    // Get user media
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { width: 1280, height: 720 },
      audio: true 
    });
    
    // Set up video preview
    cameraPreview.srcObject = stream;
    
    // Enable start recording button
    startRecordingBtn.disabled = false;
    stopRecordingBtn.disabled = true;
  } catch (error) {
    console.error('Error accessing camera:', error);
    recordingArea.classList.add('hidden');
  }
});

// Start recording handler
startRecordingBtn.addEventListener('click', () => {
  recordedChunks = [];
  
  // Create media recorder
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  
  // Handle data available event
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  
  // Handle recording stopped
  mediaRecorder.onstop = async () => {
    // Create blob from recorded chunks
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    
    // Save the recorded video
    try {
      const buffer = await blob.arrayBuffer();
      const filePath = await window.api.saveRecordedVideo(buffer);
      
      if (filePath) {
        selectedUserVideo = { path: filePath, name: filePath.split('/').pop() };
        userVideoStatus.textContent = selectedUserVideo.name;
        updateUI();
      }
    } catch (error) {
      console.error('Error saving recorded video:', error);
    }
    
    // Hide recording area
    recordingArea.classList.add('hidden');
    
    // Stop tracks
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  };
  
  // Start recording
  mediaRecorder.start();
  
  // Update UI
  startRecordingBtn.disabled = true;
  stopRecordingBtn.disabled = false;
});

// Stop recording handler
stopRecordingBtn.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
});

// Cancel recording handler
cancelRecordingBtn.addEventListener('click', () => {
  // Stop recording if active
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  
  // Stop tracks
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  
  // Hide recording area
  recordingArea.classList.add('hidden');
});

// Compare videos handler
compareVideosBtn.addEventListener('click', () => {
  // In a real implementation, this would navigate to the comparison screen
  // For now, just log the selected videos
  console.log('Comparing videos:', {
    coachVideo: selectedCoachVideo,
    userVideo: selectedUserVideo
  });
  
  // TODO: Implement navigation to comparison screen
});
