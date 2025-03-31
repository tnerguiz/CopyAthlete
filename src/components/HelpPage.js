// src/components/HelpPage.js
import React, { useState } from 'react';
import '../styles/HelpPage.css';

const HelpPage = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const helpContent = {
    'getting-started': {
      title: 'Getting Started',
      content: [
        {
          type: 'text',
          value: 'Welcome to CopyAthlete! This guide will help you get started with using the application to improve your athletic technique.'
        },
        {
          type: 'heading',
          value: 'Application Overview'
        },
        {
          type: 'text',
          value: 'CopyAthlete allows you to compare your athletic technique with world-class athletes. By recording yourself or uploading existing videos, you can perform side-by-side comparisons to identify areas for improvement.'
        },
        {
          type: 'image',
          src: 'assets/help/app_overview.jpg',
          alt: 'CopyAthlete application overview',
          caption: 'The main interface of CopyAthlete'
        },
        {
          type: 'heading',
          value: 'Basic Workflow'
        },
        {
          type: 'steps',
          steps: [
            'Select a coach video from our library',
            'Record yourself or upload an existing video',
            'Use the comparison tools to analyze your technique',
            'Make adjustments to your form based on the comparison'
          ]
        },
        {
          type: 'text',
          value: 'The navigation menu on the left provides access to all features of the application. Click on the icons to access different sections.'
        },
        {
          type: 'video',
          src: 'assets/help/getting_started.mp4',
          poster: 'assets/help/getting_started_poster.jpg',
          caption: 'Video walkthrough of basic application usage'
        }
      ]
    },
    'video-comparison': {
      title: 'Video Comparison',
      content: [
        {
          type: 'text',
          value: 'The video comparison feature is the core functionality of CopyAthlete. This guide explains how to effectively use the comparison tools.'
        },
        {
          type: 'heading',
          value: 'Loading Videos for Comparison'
        },
        {
          type: 'steps',
          steps: [
            'Select a coach video by clicking "Select Coach Video" in the main menu',
            'Browse through categories and techniques to find an appropriate reference video',
            'Select your own video by clicking "Select Your Video" or "Record Video"',
            'Once both videos are loaded, click "Compare Videos" to enter comparison mode'
          ]
        },
        {
          type: 'image',
          src: 'assets/help/video_selection.jpg',
          alt: 'Video selection interface',
          caption: 'Selecting videos for comparison'
        },
        {
          type: 'heading',
          value: 'Comparison Tools'
        },
        {
          type: 'text',
          value: 'CopyAthlete provides several tools to help you analyze and compare techniques:'
        },
        {
          type: 'list',
          items: [
            '<strong>Playback Controls</strong>: Play, pause, and navigate through videos frame by frame',
            '<strong>Playback Speed</strong>: Adjust speed (0.25x, 0.5x, 0.75x, 1.0x) for detailed analysis',
            '<strong>Joint Tracking</strong>: Visualize key body positions and movements',
            '<strong>Video Flipping</strong>: Mirror videos for better comparison of different orientations'
          ]
        },
        {
          type: 'image',
          src: 'assets/help/comparison_tools.jpg',
          alt: 'Video comparison tools',
          caption: 'Tools available in comparison mode'
        },
        {
          type: 'heading',
          value: 'Analyzing Your Technique'
        },
        {
          type: 'text',
          value: 'For effective analysis, focus on one aspect of your technique at a time. Use the frame-by-frame navigation to identify key positions and compare them with the coach video.'
        },
        {
          type: 'video',
          src: 'assets/help/comparison_demo.mp4',
          poster: 'assets/help/comparison_demo_poster.jpg',
          caption: 'Demonstration of video comparison analysis'
        }
      ]
    },
    'recording-videos': {
      title: 'Recording Videos',
      content: [
        {
          type: 'text',
          value: 'High-quality videos are essential for accurate technique analysis. This guide covers how to record videos both within the app and using external devices.'
        },
        {
          type: 'heading',
          value: 'Recording Directly in the App'
        },
        {
          type: 'steps',
          steps: [
            'Click "Record Video" in the main menu',
            'Position yourself in frame, ensuring your full body is visible',
            'Click the record button to start recording',
            'Perform your athletic movement',
            'Click stop when finished',
            'Review the recording and click "Use Video" if satisfied, or "Retry" to record again'
          ]
        },
        {
          type: 'image',
          src: 'assets/help/in_app_recording.jpg',
          alt: 'In-app recording interface',
          caption: 'The recording interface within CopyAthlete'
        },
        {
          type: 'heading',
          value: 'Recording with a Smartphone'
        },
        {
          type: 'text',
          value: 'For better quality or different angles, you can record videos using your smartphone and transfer them to CopyAthlete.'
        },
        {
          type: 'steps',
          steps: [
            'Position your phone on a stable surface or use a tripod',
            'Ensure good lighting - natural daylight works best',
            'Frame the shot to capture your full body and movement area',
            'Record in landscape orientation for better compatibility',
            'Record your athletic movement',
            'Transfer the video to your computer (see methods below)'
          ]
        },
        {
          type: 'heading',
          value: 'Transferring Videos from Smartphone to Computer'
        },
        {
          type: 'list',
          items: [
            '<strong>USB Cable</strong>: Connect your phone directly to your computer with a USB cable and copy the video files',
            '<strong>Cloud Services</strong>: Upload videos to Google Drive, Dropbox, or iCloud, then download to your computer',
            '<strong>Email/Messaging</strong>: Send the video to yourself via email or messaging apps (note: file size limitations may apply)',
            '<strong>AirDrop</strong>: For Apple devices, use AirDrop to transfer directly to your Mac'
          ]
        },
        {
          type: 'image',
          src: 'assets/help/phone_transfer.jpg',
          alt: 'Transferring videos from phone',
          caption: 'Transferring videos from smartphone to computer'
        },
        {
          type: 'heading',
          value: 'Video Recording Tips'
        },
        {
          type: 'list',
          items: [
            'Record in a well-lit area with minimal shadows',
            'Use a plain, contrasting background',
            'Wear form-fitting clothing that contrasts with the background',
            'Ensure the camera is at an appropriate height (usually waist level)',
            'Position the camera perpendicular to your movement path',
            'Record at 60fps if possible for smoother slow-motion playback'
          ]
        },
        {
          type: 'video',
          src: 'assets/help/recording_tips.mp4',
          poster: 'assets/help/recording_tips_poster.jpg',
          caption: 'Demonstration of proper video recording techniques'
        }
      ]
    }
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return <p key={index}>{item.value}</p>;
        case 'heading':
          return <h3 key={index}>{item.value}</h3>;
        case 'image':
          return (
            <div key={index} className="help-image-container">
              <img src={item.src} alt={item.alt} className="help-image" />
              {item.caption && <p className="image-caption">{item.caption}</p>}
            </div>
          );
        case 'video':
          return (
            <div key={index} className="help-video-container">
              <video
                controls
                poster={item.poster}
                className="help-video"
              >
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {item.caption && <p className="video-caption">{item.caption}</p>}
            </div>
          );
        case 'steps':
          return (
            <ol key={index} className="help-steps">
              {item.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step}</li>
              ))}
            </ol>
          );
        case 'list':
          return (
            <ul key={index} className="help-list">
              {item.items.map((listItem, itemIndex) => (
                <li key={itemIndex} dangerouslySetInnerHTML={{ __html: listItem }}></li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <h1>CopyAthlete Help</h1>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="help-content">
        <div className="help-sidebar">
          <ul>
            <li
              className={activeSection === 'getting-started' ? 'active' : ''}
              onClick={() => setActiveSection('getting-started')}
            >
              Getting Started
            </li>
            <li
              className={activeSection === 'video-comparison' ? 'active' : ''}
              onClick={() => setActiveSection('video-comparison')}
            >
              Video Comparison
            </li>
            <li
              className={activeSection === 'recording-videos' ? 'active' : ''}
              onClick={() => setActiveSection('recording-videos')}
            >
              Recording Videos
            </li>
          </ul>
        </div>

        <div className="help-main">
          <h2>{helpContent[activeSection].title}</h2>
          <div className="help-section">
            {renderContent(helpContent[activeSection].content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
