// This script generates a circular favicon from your profile picture
// You can run this script with Node.js

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function createCircularFavicon() {
  try {
    // Create a canvas for the favicon (32x32 is standard favicon size)
    const size = 180; // Large enough for high-res displays
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Load the profile image
    const image = await loadImage('profile.jpg');
    
    // Create circular clipping path
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    // Draw image with proper centering and scaling
    const scale = Math.max(size / image.width, size / image.height);
    const x = (size - image.width * scale) / 2;
    const y = (size - image.height * scale) / 2;
    
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    
    // Add a thin blue border
    ctx.strokeStyle = '#1B56FD';
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Output the PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('circular-favicon.png', buffer);
    
    console.log('Circular favicon created successfully!');
  } catch (err) {
    console.error('Error creating circular favicon:', err);
  }
}

createCircularFavicon(); 