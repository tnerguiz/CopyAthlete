import React, { useRef, useState, useEffect } from 'react';
import '../styles/VideoRecorder.css';

const VideoRecorder = ({ onComplete, onCancel }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  // Set up camera access
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    setupCamera();

    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Start recording
  const handleStartRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    const stream = videoRef.current.srcObject;
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks(prev => [...prev, event.data]);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });

      // Convert blob to array buffer for IPC
      const arrayBuffer = await blob.arrayBuffer();

      // Save video via Electron IPC
      const videoPath = await window.electron.saveRecordedVideo(arrayBuffer);
      if (videoPath) {
        onComplete(videoPath);
      }

      setRecordedChunks([]);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  };

  // Stop recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="recording-area">
      <video ref={videoRef} autoPlay muted></video>
      <div className="recording-controls">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="control-button"
            id="start-recording"
          >
            Record
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="control-button"
            id="stop-recording"
          >
            Stop Recording
          </button>
        )}
        <button
          onClick={onCancel}
          className="control-button"
          id="cancel-recording"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VideoRecorder;
