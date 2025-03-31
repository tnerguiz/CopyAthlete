const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    selectCoachVideo: () => ipcRenderer.invoke('select-coach-video'),
    selectUserVideo: () => ipcRenderer.invoke('select-user-video'),
    getCoachVideos: () => ipcRenderer.invoke('get-coach-videos'),
    saveRecordedVideo: (buffer) => ipcRenderer.invoke('save-recorded-video', buffer),
    getSetting: (key) => ipcRenderer.invoke('get-setting', key),
    setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value),
    getComparisonVideos: () => ipcRenderer.invoke('getComparisonVideos'),
  }
);
