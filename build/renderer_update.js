// Update the renderer.js file to connect to the comparison screen

// Add this to the existing compareVideosBtn.addEventListener('click', ...) function
// Replace the console.log and TODO comment with this code:

compareVideosBtn.addEventListener('click', async () => {
  if (selectedCoachVideo && selectedUserVideo) {
    // Save the selected videos to electron store for the comparison screen
    await window.api.setSetting('comparisonVideos', {
      coachVideo: selectedCoachVideo.path,
      userVideo: selectedUserVideo.path
    });
    
    // Navigate to the comparison screen
    window.location.href = 'comparison.html';
  }
});
