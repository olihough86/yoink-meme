let lastRightClickPosition = { x: 0, y: 0 };

document.addEventListener('mousedown', (event) => {
  if (event.button === 2) {
    lastRightClickPosition = { x: event.clientX, y: event.clientY };
  }
});

function findClosestVideo(x, y) {
  const videos = document.querySelectorAll('video');
  let closestVideo = null;
  let closestDistance = Infinity;

  videos.forEach((video) => {
    const rect = video.getBoundingClientRect();
    const centerX = (rect.left + rect.right) / 2;
    const centerY = (rect.top + rect.bottom) / 2;
    const distance = Math.hypot(centerX - x, centerY - y);

    if (distance < closestDistance) {
      closestVideo = video;
      closestDistance = distance;
    }
  });

  return closestVideo;
}

function findGifUrl() {
  const closestVideo = findClosestVideo(lastRightClickPosition.x, lastRightClickPosition.y);

  if (closestVideo && closestVideo.src.startsWith('https://video.twimg.com/tweet_video/') && closestVideo.src.endsWith('.mp4')) {
    return closestVideo.src;
  }

  return null;
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'findGifUrl') {
    return Promise.resolve(findGifUrl());
  }
});
