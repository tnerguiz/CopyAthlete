// At the top of main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');
const isDev = process.env.NODE_ENV === 'development';

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
    nodeIntegration: false,
    contextIsolation: true,
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
  try {
    const dataPath = path.join(__dirname, 'src', 'data', 'coachVideos.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading coach videos data:', error);
    // Return fallback data if file doesn't exist yet
    return {
      categories: [
        {
          id: "track",
          name: "Track & Field",
          description: "Running and jumping techniques",
          subcategories: [
            {
              id: "sprinting",
              name: "Sprinting",
              description: "Sprint technique and form",
              videos: [
                {
                  id: "chelimo_sprint",
                  name: "Paul Chelimo - Sprint Technique",
                  description: "Olympic medalist demonstrates proper sprint form",
                  path: path.join(__dirname, 'assets', 'coaches', 'paul_chelimo', 'sprint.mp4'),
                  thumbnail: "",
                  duration: 45,
                  keyPoints: ["Arm movement", "Foot strike", "Body position"]
                }
              ]
            }
          ]
        }
      ]
    };
  }
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
