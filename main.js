const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');

// Initialize store for app settings
const store = new Store();

// Keep a global reference of the window object to prevent garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, recreate window when dock icon is clicked and no windows are open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for video operations
ipcMain.handle('select-coach-video', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Videos', extensions: ['mp4', 'webm', 'mov'] }]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// Get and set settings
ipcMain.handle('get-setting', (event, key) => {
  return store.get(key);
});

ipcMain.handle('set-setting', (event, key, value) => {
  store.set(key, value);
  return true;
});

// Get comparison videos
ipcMain.handle('getComparisonVideos', () => {
  return store.get('comparisonVideos');
});

ipcMain.handle('select-user-video', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Videos', extensions: ['mp4', 'webm', 'mov'] }]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('get-coach-videos', () => {
  // In a real app, this would load from the installed coach videos
  // For now, return placeholder data
  return [
    {
      id: 'chelimo_1',
      name: 'Paul Chelimo - Sprint Technique',
      path: path.join(__dirname, 'assets', 'coaches', 'paul_chelimo', 'sprint.mp4')
    },
    {
      id: 'chelimo_2',
      name: 'Paul Chelimo - Distance Running Form',
      path: path.join(__dirname, 'assets', 'coaches', 'paul_chelimo', 'distance.mp4')
    }
  ];
});

// Save recorded video
ipcMain.handle('save-recorded-video', async (event, buffer) => {
  const userVideosDir = path.join(app.getPath('userData'), 'user_videos');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(userVideosDir)) {
    fs.mkdirSync(userVideosDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const filePath = path.join(userVideosDir, `recording_${timestamp}.webm`);
  
  fs.writeFileSync(filePath, Buffer.from(buffer));
  return filePath;
});
