// Comparison screen functionality
// This script handles the video comparison features

// Import TensorFlow.js and PoseNet
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

// DOM Elements
const coachVideo = document.getElementById('coach-video');
const userVideo = document.getElementById('user-video');
const coachSpeedSelect = document.getElementById('coach-speed');
const userSpeedSelect = document.getElementById('user-speed');
const flipLeftBtn = document.getElementById('flip-left-video');
const flipRightBtn = document.getElementById('flip-right-video');
const prevFrameBtn = document.getElementById('prev-frame');
const playPauseBtn = document.getElementById('play-pause');
const nextFrameBtn = document.getElementById('next-frame');
const timeline = document.getElementById('timeline');
const timelineProgress = document.getElementById('timeline-progress');
const timelineHandle = document.getElementById('timeline-handle');
const currentTimeDisplay = document.getElementById('current-time');
const totalTimeDisplay = document.getElementById('total-time');
const toggleTrackingBtn = document.getElementById('toggle-tracking');
const backToMenuBtn = document.getElementById('back-to-menu');

// State variables
let isPlaying = false;
let isTrackingEnabled = false;
let coachVideoFlipped = false;
let userVideoFlipped = false;
let poseNetModel = null;
let coachVideoCanvas = document.createElement('canvas');
let userVideoCanvas = document.createElement('canvas');
let coachVideoCtx = coachVideoCanvas.getContext('2d');
let userVideoCtx = userVideoCanvas.getContext('2d');
let animationFrameId = null;

// Initialize the comparison screen
async function initComparison() {
    try {
        // Get video paths from main process
        const videoData = await window.api.getComparisonVideos();
        
        // Set video sources
        coachVideo.src = videoData.coachVideo;
        userVideo.src = videoData.userVideo;
        
        // Wait for videos to be loaded
        await Promise.all([
            new Promise(resolve => coachVideo.onloadedmetadata = resolve),
            new Promise(resolve => userVideo.onloadedmetadata = resolve)
        ]);
        
        // Set up canvas dimensions
        coachVideoCanvas.width = coachVideo.videoWidth;
        coachVideoCanvas.height = coachVideo.videoHeight;
        userVideoCanvas.width = userVideo.videoWidth;
        userVideoCanvas.height = userVideo.videoHeight;
        
        // Initialize PoseNet model
        poseNetModel = await posenet.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            inputResolution: { width: 640, height: 480 },
            multiplier: 0.75
        });
        
        // Update total time display
        updateTotalTimeDisplay();
        
        // Add event listeners
        setupEventListeners();
        
        // Sync videos initially
        syncVideos();
    } catch (error) {
        console.error('Error initializing comparison:', error);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Speed change handlers
    coachSpeedSelect.addEventListener('change', () => {
        coachVideo.playbackRate = parseFloat(coachSpeedSelect.value);
    });
    
    userSpeedSelect.addEventListener('change', () => {
        userVideo.playbackRate = parseFloat(userSpeedSelect.value);
    });
    
    // Flip video handlers
    flipLeftBtn.addEventListener('click', () => {
        coachVideoFlipped = !coachVideoFlipped;
        coachVideo.style.transform = coachVideoFlipped ? 'scaleX(-1)' : 'scaleX(1)';
    });
    
    flipRightBtn.addEventListener('click', () => {
        userVideoFlipped = !userVideoFlipped;
        userVideo.style.transform = userVideoFlipped ? 'scaleX(-1)' : 'scaleX(1)';
    });
    
    // Playback control handlers
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevFrameBtn.addEventListener('click', goToPreviousFrame);
    nextFrameBtn.addEventListener('click', goToNextFrame);
    
    // Timeline handlers
    timeline.addEventListener('click', handleTimelineClick);
    timelineHandle.addEventListener('mousedown', handleTimelineDragStart);
    
    // Video time update handler
    coachVideo.addEventListener('timeupdate', updateTimeDisplay);
    
    // Toggle tracking handler
    toggleTrackingBtn.addEventListener('click', toggleTracking);
    
    // Back to menu handler
    backToMenuBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Video ended handler
    coachVideo.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
}

// Toggle play/pause for both videos
function togglePlayPause() {
    if (isPlaying) {
        coachVideo.pause();
        userVideo.pause();
        cancelAnimationFrame(animationFrameId);
    } else {
        Promise.all([coachVideo.play(), userVideo.play()]).then(() => {
            if (isTrackingEnabled) {
                animationFrameId = requestAnimationFrame(trackPoses);
            }
        });
    }
    
    isPlaying = !isPlaying;
    updatePlayPauseButton();
}

// Update play/pause button appearance
function updatePlayPauseButton() {
    playPauseBtn.textContent = isPlaying ? '❚❚' : '▶';
}

// Go to previous frame
function goToPreviousFrame() {
    if (isPlaying) {
        togglePlayPause();
    }
    
    const frameTime = 1 / 30; // Assuming 30fps
    coachVideo.currentTime = Math.max(0, coachVideo.currentTime - frameTime);
    userVideo.currentTime = Math.max(0, userVideo.currentTime - frameTime);
    
    if (isTrackingEnabled) {
        requestAnimationFrame(trackPoses);
    }
}

// Go to next frame
function goToNextFrame() {
    if (isPlaying) {
        togglePlayPause();
    }
    
    const frameTime = 1 / 30; // Assuming 30fps
    coachVideo.currentTime = Math.min(coachVideo.duration, coachVideo.currentTime + frameTime);
    userVideo.currentTime = Math.min(userVideo.duration, userVideo.currentTime + frameTime);
    
    if (isTrackingEnabled) {
        requestAnimationFrame(trackPoses);
    }
}

// Handle timeline click
function handleTimelineClick(event) {
    const rect = timeline.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;
    
    coachVideo.currentTime = position * coachVideo.duration;
    userVideo.currentTime = position * userVideo.duration;
    
    updateTimelinePosition();
    
    if (isTrackingEnabled) {
        requestAnimationFrame(trackPoses);
    }
}

// Handle timeline drag start
function handleTimelineDragStart() {
    const wasPLaying = isPlaying;
    if (isPlaying) {
        togglePlayPause();
    }
    
    function handleDragMove(event) {
        const rect = timeline.getBoundingClientRect();
        let position = (event.clientX - rect.left) / rect.width;
        position = Math.max(0, Math.min(1, position));
        
        coachVideo.currentTime = position * coachVideo.duration;
        userVideo.currentTime = position * userVideo.duration;
        
        updateTimelinePosition();
        
        if (isTrackingEnabled) {
            requestAnimationFrame(trackPoses);
        }
    }
    
    function handleDragEnd() {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        
        if (wasPLaying) {
            togglePlayPause();
        }
    }
    
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
}

// Update timeline position based on current time
function updateTimelinePosition() {
    const position = coachVideo.currentTime / coachVideo.duration;
    timelineProgress.style.width = `${position * 100}%`;
    timelineHandle.style.left = `${position * 100}%`;
}

// Update current time display
function updateTimeDisplay() {
    currentTimeDisplay.textContent = formatTime(coachVideo.currentTime);
    updateTimelinePosition();
}

// Update total time display
function updateTotalTimeDisplay() {
    totalTimeDisplay.textContent = formatTime(coachVideo.duration);
}

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Toggle joint tracking
function toggleTracking() {
    isTrackingEnabled = !isTrackingEnabled;
    toggleTrackingBtn.textContent = isTrackingEnabled ? 'Disable Joint Tracking' : 'Enable Joint Tracking';
    
    if (isTrackingEnabled) {
        if (isPlaying) {
            animationFrameId = requestAnimationFrame(trackPoses);
        } else {
            trackPoses();
        }
    }
}

// Track poses using PoseNet
async function trackPoses() {
    if (!isTrackingEnabled) return;
    
    try {
        // Draw videos to canvases
        coachVideoCtx.drawImage(coachVideo, 0, 0, coachVideoCanvas.width, coachVideoCanvas.height);
        userVideoCtx.drawImage(userVideo, 0, 0, userVideoCanvas.width, userVideoCanvas.height);
        
        // Get poses
        const coachPose = await poseNetModel.estimateSinglePose(coachVideoCanvas);
        const userPose = await poseNetModel.estimateSinglePose(userVideoCanvas);
        
        // Draw poses
        drawPose(coachVideo, coachPose, coachVideoFlipped);
        drawPose(userVideo, userPose, userVideoFlipped);
        
        if (isPlaying) {
            animationFrameId = requestAnimationFrame(trackPoses);
        }
    } catch (error) {
        console.error('Error tracking poses:', error);
    }
}

// Draw pose keypoints and skeletons
function drawPose(videoElement, pose, isFlipped) {
    // Create canvas overlay if it doesn't exist
    let canvas = videoElement.nextElementSibling;
    if (!canvas || !canvas.classList.contains('pose-canvas')) {
        canvas = document.createElement('canvas');
        canvas.classList.add('pose-canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        videoElement.parentNode.insertBefore(canvas, videoElement.nextSibling);
    }
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Define which keypoints to include (excluding hands and feet)
    const includedKeypoints = [
        'nose', 'leftEye', 'rightEye', 'leftEar', 'rightEar',
        'leftShoulder', 'rightShoulder', 'leftElbow', 'rightElbow',
        'leftHip', 'rightHip', 'leftKnee', 'rightKnee'
    ];
    
    // Filter keypoints
    const filteredKeypoints = pose.keypoints.filter(keypoint => 
        includedKeypoints.includes(keypoint.part) && keypoint.score > 0.5
    );
    
    // Draw keypoints
    filteredKeypoints.forEach(keypoint => {
        const { y, x } = keypoint.position;
        
        // Adjust x-coordinate if video is flipped
        const adjustedX = isFlipped ? canvas.width - x : x;
        
        ctx.beginPath();
        ctx.arc(adjustedX, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#00FF00';
        ctx.fill();
    });
    
    // Define connections for skeleton (only one side as requested)
    const skeletonPairs = [
        ['nose', 'leftEye'], ['leftEye', 'leftEar'],
        ['nose', 'leftShoulder'], 
        ['leftShoulder', 'leftElbow'],
        ['leftShoulder', 'leftHip'],
        ['leftHip', 'leftKnee'],
        // Spine
        ['nose', 'leftShoulder'], ['leftShoulder', 'leftHip']
    ];
    
    // Draw skeleton
    skeletonPairs.forEach(pair => {
        const keypoint1 = filteredKeypoints.find(kp => kp.part === pair[0]);
        const keypoint2 = filteredKeypoints.find(kp => kp.part === pair[1]);
        
        if (keypoint1 && keypoint2) {
            const { y: y1, x: x1 } = keypoint1.position;
            const { y: y2, x: x2 } = keypoint2.position;
            
            // Adjust x-coordinates if video is flipped
            const adjustedX1 = isFlipped ? canvas.width - x1 : x1;
            const adjustedX2 = isFlipped ? canvas.width - x2 : x2;
            
            ctx.beginPath();
            ctx.moveTo(adjustedX1, y1);
            ctx.lineTo(adjustedX2, y2);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#00FF00';
            ctx.stroke();
        }
    });
}

// Sync videos to have the same current time
function syncVideos() {
    userVideo.currentTime = coachVideo.currentTime;
}

// Initialize when the page loads
window.addEventListener('DOMContentLoaded', initComparison);
