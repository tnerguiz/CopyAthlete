// src/components/CoachVideoSelector.js
import React, { useState, useEffect } from 'react';
import '../styles/CoachVideoSelector.css';

const CoachVideoSelector = ({ onSelectVideo }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load video data from JSON
    const loadVideoData = async () => {
      try {
        setLoading(true);
        const videoData = await window.electron.getCoachVideos();
        setCategories(videoData.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error loading coach videos:', error);
        setError('Failed to load coach videos. Please try again.');
        setLoading(false);
      }
    };

    loadVideoData();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setVideos([]);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setVideos(subcategory.videos);
  };

  const handleVideoSelect = (video) => {
    onSelectVideo(video);
  };

  const handleClose = () => {
    onSelectVideo(null);
  };

  if (loading) {
    return (
      <div className="coach-video-selector">
        <div className="selector-header">
          <h2>Loading Coach Videos...</h2>
        </div>
        <div className="selector-content loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coach-video-selector">
        <div className="selector-header">
          <h2>Error</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="selector-content error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="coach-video-selector">
      <div className="selector-header">
        <h2>Select a Coach Video</h2>
        <button className="close-button" onClick={handleClose}>×</button>
      </div>

      <div className="selector-content">
        <div className="categories-list">
          <h3>Sport</h3>
          <ul>
            {categories.map(category => (
              <li
                key={category.id}
                className={selectedCategory?.id === category.id ? 'selected' : ''}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
                <span className="category-description">{category.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedCategory && (
          <div className="subcategories-list">
            <h3>Technique</h3>
            <ul>
              {selectedCategory.subcategories.map(subcategory => (
                <li
                  key={subcategory.id}
                  className={selectedSubcategory?.id === subcategory.id ? 'selected' : ''}
                  onClick={() => handleSubcategorySelect(subcategory)}
                >
                  {subcategory.name}
                  <span className="subcategory-description">{subcategory.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedSubcategory && (
          <div className="videos-list">
            <h3>Videos</h3>
            {videos.length === 0 ? (
              <p className="no-videos">No videos available for this technique yet.</p>
            ) : (
              <div className="video-grid">
                {videos.map(video => (
                  <div
                    key={video.id}
                    className="video-card"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <div className="video-thumbnail">
                      {video.thumbnail ? (
                        <img src={video.thumbnail} alt={video.name} />
                      ) : (
                        <div className="placeholder-thumbnail">
                          <span>No Preview</span>
                        </div>
                      )}
                      <span className="video-duration">
                        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="video-info">
                      <h4>{video.name}</h4>
                      <p>{video.description}</p>
                      {video.keyPoints && video.keyPoints.length > 0 && (
                        <div className="key-points">
                          <h5>Key Points:</h5>
                          <ul>
                            {video.keyPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachVideoSelector;
