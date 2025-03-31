# CopyAthlete Windows Application

CopyAthlete is an application that allows athletes to compare their technique with world-class athletes using pose detection technology.

## Features

- Select coach videos from a library of professional athletes
- Record your own videos directly within the app
- Upload existing videos for comparison
- Advanced pose detection using TensorFlow.js and PoseNet
- Real-time joint tracking and angle analysis
- Detailed feedback with specific improvement suggestions
- Side-by-side video comparison with skeleton overlay

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm (recommended)
- Windows 10 or higher (for running the application)

### Installation

1. Clone the repository or extract the project files
2. Navigate to the app directory
3. Install dependencies:

```bash
# Using npm
npm install

# Using pnpm (recommended to avoid React dependency conflicts)
npm install -g pnpm
pnpm install
```

### Running in Development Mode

To run the application in development mode with DevTools enabled:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev
```

## Building the Windows Installer

To build the Windows installer:

1. Make sure you have updated the application version in `package.json` if needed
2. Ensure the application icon is in place at `assets/icon.ico` (must be at least 256x256 pixels)
3. Run the build command:

```bash
# Using npm
npm run build

# Using pnpm
pnpm run build
```

4. The installer will be created in the `dist` folder with the name `CopyAthlete-Setup-{version}.exe`

## Usage Guide

### Main Screen

The main screen provides options to:
- Select a coach video from the library
- Record a new video of yourself
- Browse for an existing video on your computer
- Compare videos (enabled once both coach and user videos are selected)

### Recording Videos

1. Click "Record New Video" on the main screen
2. Allow camera access when prompted
3. Position yourself in the frame
4. Click "Record" to start recording
5. Perform your athletic movement
6. Click "Stop Recording" when finished
7. The recorded video will automatically be saved and selected for comparison

### Comparing Videos

1. Select a coach video and your video
2. Click "Compare Videos" to go to the comparison screen
3. Use the controls to:
   - Play both videos simultaneously
   - Pause both videos
   - Sync videos (reset both to beginning)
   - Toggle skeleton display on/off
4. View the analysis results showing:
   - Overall similarity score
   - Joint angle scores
   - Joint position scores
   - Areas for improvement

## Troubleshooting

### Common Issues

1. **Camera not working**
   - Ensure your camera is connected and working
   - Check that you've granted camera permissions to the application
   - Try restarting the application

2. **Videos not loading**
   - Ensure the video files exist and are not corrupted
   - Check that the video format is supported (MP4, WebM, MOV)
   - Try converting the video to a different format

3. **Pose detection not working**
   - Ensure you have a stable internet connection for the initial model download
   - Make sure you're clearly visible in the frame
   - Try recording in a well-lit environment with a plain background

4. **Application crashes**
   - Check the application logs for error messages
   - Ensure you have the latest version of the application
   - Try reinstalling the application

### Build Issues

1. **Missing icon error**
   - Ensure the icon file is at least 256x256 pixels
   - Verify the icon path in package.json is correct

2. **Dependency conflicts**
   - Use pnpm instead of npm to avoid React dependency conflicts
   - Or use npm with the --legacy-peer-deps flag

## License

This application is proprietary and unlicensed. All rights reserved by the CopyAthlete Team.
