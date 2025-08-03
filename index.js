const fs = require('fs');
const path = require('path');
const generateVideo = require('./generateVideo');
const uploadToTikTok = require('./uploadToTikTok');

(async () => {
  const scripts = fs.readFileSync('./scripts.txt', 'utf-8').split('\n').filter(Boolean);
  const script = scripts[Math.floor(Math.random() * scripts.length)];

  const videoPath = `./output/video_${Date.now()}.mp4`;
  const caption = `${script}\n\n🎯 Get the full scripts here: https://payhip.com/b/lVSiG`;

  generateVideo(script, videoPath);

  // Wait for TTS to finish (10–15 sec)
  setTimeout(async () => {
    await uploadToTikTok(videoPath, caption);
  }, 15000);
})();
