# CopyAthlete Windows Application - Installation Guide

This guide provides step-by-step instructions for installing and running the CopyAthlete Windows application.

## System Requirements

- Windows 10 or higher
- 4GB RAM minimum (8GB recommended)
- 500MB free disk space
- Webcam (for recording videos)
- Internet connection (for initial setup)

## Installation Steps

### Installing from the Pre-built Installer

1. Download the CopyAthlete installer (`CopyAthlete-Setup-1.1.0.exe`) from the official website or provided link
2. Double-click the installer file to begin installation
3. Follow the on-screen instructions:
   - Choose installation location (default is recommended)
   - Select whether to create desktop and start menu shortcuts
   - Click "Install" to begin the installation process
4. Wait for the installation to complete
5. Click "Finish" to exit the installer

### Building and Installing from Source

If you prefer to build the application from source:

1. Ensure you have Node.js installed (v16 or higher)
2. Install pnpm: `npm install -g pnpm`
3. Clone or download the source code
4. Navigate to the app directory in a terminal
5. Install dependencies: `pnpm install`
6. Build the application: `pnpm run build`
7. The installer will be created in the `dist` folder
8. Run the installer as described above

## First Launch

1. Launch CopyAthlete from the desktop shortcut or start menu
2. On first launch, the application will:
   - Download required TensorFlow.js and PoseNet models (requires internet connection)
   - Set up default application settings
3. The main interface will appear, showing options to select or record videos

## Updating the Application

When a new version is available:

1. Download the new installer
2. Run the installer - it will automatically update your existing installation
3. Your settings and saved videos will be preserved

## Uninstallation

To uninstall CopyAthlete:

1. Open Windows Settings
2. Go to Apps > Apps & features
3. Find "CopyAthlete" in the list
4. Click "Uninstall" and follow the prompts

Alternatively:
1. Open Control Panel
2. Go to Programs > Programs and Features
3. Find "CopyAthlete" in the list
4. Click "Uninstall" and follow the prompts

## Troubleshooting Installation Issues

### Installer Won't Run

- Ensure you have administrator privileges
- Try right-clicking the installer and selecting "Run as administrator"
- Temporarily disable antivirus software if it's blocking the installer
- Verify the installer file isn't corrupted by downloading it again

### Application Won't Start

- Check that your system meets the minimum requirements
- Ensure you have the latest Windows updates installed
- Try reinstalling the application
- Check Windows Event Viewer for any error messages

### Missing Dependencies

If you see errors about missing DLLs or other dependencies:
- Install the latest Microsoft Visual C++ Redistributable
- Ensure your Windows is up to date
- Try reinstalling the application

For additional help, please contact support at support@copyathlete.com
