const fs = require('fs');
const { execSync } = require('child_process');
const say = require('say');

function generateVideoFromScript(script, outputPath) {
  const audioFile = './output/audio.wav';

  // Generate audio from script
  say.export(script, null, 1.0, audioFile, (err) => {
    if (err) return console.error('Error with TTS:', err);

    // Merge audio with background image using FFmpeg
    const cmd = `ffmpeg -loop 1 -i ./assets/bg.jpg -i ${audioFile} -c:v libx264 -t 15 -pix_fmt yuv420p -vf "scale=720:1280" -c:a aac ${outputPath}`;
    execSync(cmd);
    console.log('✅ Video generated at', outputPath);
  });
}

module.exports = generateVideoFromScript;
