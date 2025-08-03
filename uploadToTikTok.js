const puppeteer = require('puppeteer-core');
const path = require('path');
require('dotenv').config();

async function uploadToTikTok(videoPath, caption) {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://www.tiktok.com/login', { waitUntil: 'networkidle2' });

  // Manual login for first run, or use cookies
  console.log('🔐 Please log in manually. Waiting...');
  await new Promise(resolve => setTimeout(resolve, 60000)); // wait 60s for manual login

  await page.goto('https://www.tiktok.com/upload', { waitUntil: 'networkidle2' });
  const input = await page.$('input[type="file"]');
  await input.uploadFile(videoPath);

  await page.waitForSelector('textarea'); // caption box
  await page.type('textarea', caption);

  // Post it
  await page.click('button:has-text("Post")');
  console.log('✅ Posted video to TikTok');

  await browser.close();
}

module.exports = uploadToTikTok;
