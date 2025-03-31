import React from 'react';
import '../styles/MainMenu.css';

const MainMenu = ({
  onSelectCoachVideo,
  onRecordVideo,
  onSelectUserVideo,
  onCompareVideos,
  canCompare
}) => {
  return (
    <div className="main-menu">
      <button onClick={onSelectCoachVideo} className="menu-button">
        Select a Coach Video
      </button>
      <button onClick={onRecordVideo} className="menu-button">
        Record New Video
      </button>
      <button onClick={onSelectUserVideo} className="menu-button">
        Browse for Your Video
      </button>
      <button
        onClick={onCompareVideos}
        className="menu-button"
        disabled={!canCompare}
      >
        Compare Videos
      </button>
    </div>
  );
};

export default MainMenu;
