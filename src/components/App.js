// src/components/App.js
import React, { useState } from 'react';
import MainMenu from './MainMenu';
import VideoRecorder from './VideoRecorder';
import '../styles/App.css';
import CoachVideoSelector from './CoachVideoSelector';
import HelpPage from './HelpPage';

const App = () => {
  const [coachVideo, setCoachVideo] = useState(null);
  const [userVideo, setUserVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showVideoSelector, setShowVideoSelector] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Handle coach video selection
  const handleSelectCoachVideo = () => {
    setShowVideoSelector(true);
  };

  // Handle video selected from the selector
  const handleVideoSelected = (video) => {
    setCoachVideo(video.path);
    setShowVideoSelector(false);
  };

  // Handle user video selection
  const handleSelectUserVideo = async () => {
    const videoPath = await window.electron.selectUserVideo();
    if (videoPath) {
      setUserVideo(videoPath);
    }
  };

  // Toggle recording mode
  const handleRecordVideo = () => {
    setIsRecording(true);
  };

  // Handle recording completion
  const handleRecordingComplete = (videoPath) => {
    setUserVideo(videoPath);
    setIsRecording(false);
  };

  // Handle recording cancellation
  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  // Handle video comparison
  const handleCompareVideos = () => {
    // This will be implemented later to navigate to the comparison screen
    console.log('Compare videos');
  };

  // Toggle help page
  const handleToggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="container">
      <div className="app-header">
        <h1>CopyAthlete</h1>
        <p>Compare your technique with world-class athletes</p>
        <button className="help-button" onClick={handleToggleHelp}>Help</button>
      </div>

      {!isRecording ? (
        <>
          <MainMenu
            onSelectCoachVideo={handleSelectCoachVideo}
            onRecordVideo={handleRecordVideo}
            onSelectUserVideo={handleSelectUserVideo}
            onCompareVideos={handleCompareVideos}
            canCompare={coachVideo && userVideo}
          />

          <div className="status-area">
            <div className="video-status">
              <p>Coach Video: <span>{coachVideo ? (typeof coachVideo === 'string' ? coachVideo.split('\\').pop() : coachVideo.name) : 'Not selected'}</span></p>
              <p>Your Video: <span>{userVideo ? userVideo.split('\\').pop() : 'Not selected'}</span></p>
            </div>
          </div>
        </>
      ) : (
        <VideoRecorder
          onComplete={handleRecordingComplete}
          onCancel={handleCancelRecording}
        />
      )}

      {/* Add the CoachVideoSelector here, inside the container div */}
      {showVideoSelector && (
        <CoachVideoSelector onSelectVideo={handleVideoSelected} />
      )}

      {/* Add the HelpPage component */}
      {showHelp && (
        <HelpPage onClose={handleToggleHelp} />
      )}
    </div>
  );
};

export default App;
