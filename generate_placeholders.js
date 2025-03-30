// Script to generate placeholder videos for testing
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

// Create directories if they don't exist
const assetsDir = path.join(__dirname, 'assets');
const coachesDir = path.join(assetsDir, 'coaches', 'paul_chelimo');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

if (!fs.existsSync(coachesDir)) {
  fs.mkdirSync(coachesDir, { recursive: true });
}

// Generate a solid color video with text
function generatePlaceholderVideo(outputPath, text, duration = 10, color = 'blue') {
  const command = `${ffmpeg} -f lavfi -i color=${color}:s=640x480:d=${duration} -vf "drawtext=text='${text}':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=(h-text_h)/2" -c:v libx264 -pix_fmt yuv420p ${outputPath}`;
  
  try {
    console.log(`Generating placeholder video: ${outputPath}`);
    execSync(command);
    console.log(`Successfully created: ${outputPath}`);
  } catch (error) {
    console.error(`Error creating video: ${error.message}`);
  }
}

// Generate placeholder coach videos
generatePlaceholderVideo(
  path.join(coachesDir, 'sprint.mp4'),
  'Paul Chelimo - Sprint Technique (Placeholder)',
  15,
  'darkgreen'
);

generatePlaceholderVideo(
  path.join(coachesDir, 'distance.mp4'),
  'Paul Chelimo - Distance Running Form (Placeholder)',
  15,
  'darkblue'
);

// Generate placeholder user video
generatePlaceholderVideo(
  path.join(assetsDir, 'user_placeholder.mp4'),
  'User Video (Placeholder)',
  15,
  'darkred'
);

console.log('All placeholder videos generated successfully.');
