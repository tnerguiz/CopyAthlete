// Preload script for Electron
// This script runs in the renderer process before the web page loads

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    // Video selection
    selectCoachVideo: () => ipcRenderer.invoke('select-coach-video'),
    selectUserVideo: () => ipcRenderer.invoke('select-user-video'),
    getCoachVideos: () => ipcRenderer.invoke('get-coach-videos'),
    
    // Video recording
    saveRecordedVideo: (buffer) => ipcRenderer.invoke('save-recorded-video', buffer),
    
    // App settings
    getSetting: (key) => ipcRenderer.invoke('get-setting', key),
    setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value),
    
    // Comparison screen
    getComparisonVideos: () => ipcRenderer.invoke('getComparisonVideos')
  }
);
